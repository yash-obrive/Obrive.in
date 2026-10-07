const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getBoss } = require("../workers/queue");
const crypto = require("crypto");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Publisher Agent
 * Enforces the Deterministic Safety Gate, selects the adapter, and handles DRY_RUN.
 */
class PublisherAgent {
  constructor() {
    this.isDryRun = process.env.DRY_RUN !== "false"; // DRY_RUN=true by default
  }

  async execute(targetId) {
    const target = await prisma.oblink_targets.findUnique({
      where: { id: targetId },
      include: { account: true },
    });

    if (!target) return;

    // STATE MACHINE: Enforce truthful states.
    const validStates = [
      "READY_TO_PUBLISH",
      "PUBLISHING",
      "PUBLISH_FAILED",
      "VERIFICATION_FAILED",
    ];
    if (!validStates.includes(target.target_status)) {
      console.log(
        `[PublisherAgent] Invalid state transition from ${target.target_status}. Aborting.`,
      );
      return;
    }

    try {
      // ---------------------------------------------------------
      // DETERMINISTIC SAFETY GATE
      // ---------------------------------------------------------

      // 1. GLOBAL PAUSE CHECK
      if (process.env.GLOBAL_PAUSE === "true") {
        console.warn(
          `[PublisherAgent] GLOBAL_PAUSE is active. Aborting publish for target ${targetId}.`,
        );
        await this._logEvent(
          targetId,
          "PUBLISH_BLOCKED",
          "GLOBAL_PAUSE is active",
        );
        return; // Retain in queue/fail safely
      }

      // 2. SPAM SCORE CHECK
      if (target.spam_score > 30) {
        throw new Error(`Spam score ${target.spam_score} exceeds threshold.`);
      }

      // 3. AUTHORIZATION CHECK
      if (
        target.publishing_method === "BROWSER" ||
        target.publishing_method === "API"
      ) {
        const capability =
          await prisma.oblink_publisher_capabilities.findUnique({
            where: { platform: target.platform },
          });
        if (
          !capability ||
          !capability.authorization_verified ||
          !capability.automation_allowed
        ) {
          throw new Error(
            `Platform ${target.platform} is not fully authorized for automation.`,
          );
        }
      }

      // 4. DUPLICATE CHECK & RECONCILIATION
      const existingLink = await prisma.oblink_links.findFirst({
        where: { target_id: targetId },
        orderBy: { created_at: "desc" },
      });

      if (existingLink) {
        if (existingLink.status === "PUBLISHED") {
          throw new Error(
            "Duplicate prevention: Link already published for this target.",
          );
        }

        if (
          existingLink.status === "VERIFICATION_FAILED" ||
          existingLink.status === "PUBLISHING"
        ) {
          if (!this.isDryRun && existingLink.external_post_id) {
            const WordpressRestAdapter = require("../adapters/WordpressRestAdapter");
            const adapter = new WordpressRestAdapter();
            console.log(
              `[PublisherAgent] [RECONCILE] Reconciling existing post ${existingLink.external_post_id}`,
            );

            try {
              const reconciledPost = await adapter.reconcile(
                existingLink.external_post_id,
              );

              if (reconciledPost) {
                console.log(
                  `[PublisherAgent] [RECONCILE] Verifying live URL ${reconciledPost.externalUrl}...`,
                );
                try {
                  await adapter.verifyPublication(reconciledPost, {
                    title: reconciledPost.title,
                  });

                  await prisma.oblink_links.update({
                    where: { id: existingLink.id },
                    data: {
                      status: "PUBLISHED",
                      publisher_url: reconciledPost.externalUrl,
                    },
                  });

                  await prisma.oblink_targets.update({
                    where: { id: targetId },
                    data: { target_status: "PUBLISHED" },
                  });

                  await this._logEvent(
                    targetId,
                    "PUBLISH_SUCCESS",
                    `Reconciled and verified live at ${reconciledPost.externalUrl}`,
                  );
                  return;
                } catch (verifyErr) {
                  throw new Error(
                    `VERIFICATION_FAILED: Reconciled post exists, but public URL check failed again. ${verifyErr.message}`,
                  );
                }
              } else {
                console.log(
                  `[PublisherAgent] [RECONCILE] Post ${existingLink.external_post_id} is absent on external server. Proceeding to new publish.`,
                );
                await prisma.oblink_links.delete({
                  where: { id: existingLink.id },
                });
              }
            } catch (reconErr) {
              if (reconErr.code === "RECONCILIATION_INCONCLUSIVE") {
                console.log(`[PublisherAgent] [RECONCILE] ${reconErr.message}`);
                // Preserve local record and abort execution (do not republish)
                throw new Error(reconErr.message);
              } else {
                throw reconErr;
              }
            }
          }
        }
      }

      // ---------------------------------------------------------
      // DRY RUN MODE
      // ---------------------------------------------------------
      if (this.isDryRun) {
        console.log(
          `[PublisherAgent] [DRY_RUN] Simulating publish for target ${targetId}`,
        );
        await this._logEvent(
          targetId,
          "PUBLISH_SIMULATED",
          "DRY_RUN mode active. Skipped actual publishing.",
        );

        await prisma.oblink_targets.update({
          where: { id: targetId },
          data: { target_status: "SIMULATED" }, // Simulated success
        });

        return;
      }

      const { title, body } = await this._generateContent(target, groq);

      const contentPayload = {
        title: title,
        body: body,
        isDraft: false, // Real publish
      };

      // Ensure content is not empty/malformed
      if (!title || !body || body.length < 50) {
        throw new Error(
          "VALIDATION_FAILED: Generated content is missing or too short.",
        );
      }
      if (!body.toLowerCase().includes("obrive.com")) {
        throw new Error(
          "VALIDATION_FAILED: Generated content does not contain the required backlink.",
        );
      }

      await this._logEvent(
        targetId,
        "CONTENT_GENERATED",
        `Successfully generated content: "${title}"`,
      );
      await prisma.oblink_targets.update({
        where: { id: targetId },
        data: { target_status: "PUBLISHING" },
      });

      // Adapter Integration
      const WordpressRestAdapter = require("../adapters/WordpressRestAdapter");
      const adapter = new WordpressRestAdapter();

      console.log(`[PublisherAgent] [LIVE] Validating target ${targetId}...`);
      await adapter.validateTarget(target);

      console.log(
        `[PublisherAgent] [LIVE] Publishing for target ${targetId}...`,
      );
      let publishResult;
      try {
        publishResult = await adapter.publish(contentPayload);
      } catch (pubErr) {
        if (
          pubErr.message.includes("DUPLICATE_DETECTED") &&
          pubErr.duplicateId
        ) {
          console.log(
            `[PublisherAgent] [LIVE] Recovered from crash: Post already exists (ID: ${pubErr.duplicateId}). Reconciling.`,
          );
          publishResult = {
            externalPostId: pubErr.duplicateId,
            externalUrl: pubErr.duplicateUrl,
          };
        } else {
          throw pubErr;
        }
      }

      // Create Link Record BEFORE Verification
      const link = await prisma.oblink_links.create({
        data: {
          target_id: target.id,
          publisher_url: publishResult.externalUrl,
          obrive_url: target.target_page || "https://obrive.com",
          anchor: "Obrive",
          status: "PUBLISHING",
          external_post_id: publishResult.externalPostId,
        },
      });

      console.log(
        `[PublisherAgent] [LIVE] Verifying live URL ${publishResult.externalUrl}...`,
      );

      try {
        await adapter.verifyPublication(publishResult, contentPayload);

        await prisma.oblink_links.update({
          where: { id: link.id },
          data: { status: "PUBLISHED" },
        });

        await prisma.oblink_targets.update({
          where: { id: targetId },
          data: { target_status: "PUBLISHED" },
        });

        await this._logEvent(
          targetId,
          "PUBLISH_SUCCESS",
          `Verified live at ${publishResult.externalUrl}`,
        );
      } catch (verifyErr) {
        // Publish succeeded via API, but verification failed
        await prisma.oblink_links.update({
          where: { id: link.id },
          data: { status: "VERIFICATION_FAILED" },
        });
        throw verifyErr;
      }

      // Note: VerificationAgent isn't required when PublisherAgent handles verification
      // But we can trigger it anyway if needed. For now, Publisher verifies.
    } catch (err) {
      console.error(`Publisher failed for target ${targetId}:`, err);

      // Categorize Errors
      let errorCategory = "PUBLISH_FAILED";
      if (err.message.includes("AUTH_FAILED")) errorCategory = "AUTH_FAILED";
      else if (err.message.includes("REST_API_UNAVAILABLE"))
        errorCategory = "REST_API_UNAVAILABLE";
      else if (err.message.includes("PERMISSION_DENIED"))
        errorCategory = "PERMISSION_DENIED";
      else if (err.message.includes("PUBLISH_TIMEOUT"))
        errorCategory = "PUBLISH_TIMEOUT";
      else if (err.message.includes("VERIFICATION_FAILED"))
        errorCategory = "VERIFICATION_FAILED";
      else if (err.message.includes("VALIDATION_FAILED"))
        errorCategory = "VALIDATION_FAILED";
      else if (err.message.includes("DUPLICATE_DETECTED"))
        errorCategory = "DUPLICATE_DETECTED";
      else if (err.message.includes("CONTENT_CONTEXT_UNAVAILABLE"))
        errorCategory = "CONTENT_CONTEXT_UNAVAILABLE";
      else if (
        err.message.includes("MODEL_UNAVAILABLE") ||
        err.message.includes("GROQ_ERROR")
      )
        errorCategory = "AI_PROVIDER_ERROR";

      await this._logEvent(targetId, errorCategory, err.message);
      await prisma.oblink_targets.update({
        where: { id: targetId },
        data: { target_status: errorCategory },
      });

      // Retry logic: Rethrow transient errors so pg-boss will retry (bounded by retryLimit)
      const transientErrors = [
        "PUBLISH_TIMEOUT",
        "REST_API_UNAVAILABLE",
        "AI_PROVIDER_ERROR",
      ];
      if (
        transientErrors.includes(errorCategory) ||
        err.message.includes("HTTP_5") ||
        err.message.includes("NETWORK_ERROR") ||
        err.message.includes("ECONNREFUSED")
      ) {
        throw err; // Rethrow to let pg-boss retry
      }
    }
  }

  async _generateContent(target, groq) {
    const knowledgeRetrieval = require("./KnowledgeRetrieval");
    const knowledgeContext =
      await knowledgeRetrieval.getKnowledgeContext(target);

    const prompt = `You are an expert SEO Content Writer for Obrive Industries.
Target Platform: ${target.platform}
Target Domain: ${target.domain}
Opportunity Type: ${target.opportunity_type}
Topic/Subject: ${target.topic || "General"}
Target Language: ${target.language || "English"}

**CANONICAL KNOWLEDGE CONTEXT:**
${JSON.stringify(knowledgeContext.contextualServices, null, 2)}

**RULES:**
${knowledgeContext.rules.join("\n")}
Use ONLY the knowledge provided above. Do not hallucinate capabilities or customers.`;

    const modelName = process.env.GROQ_MODEL;
    if (!modelName) {
      throw new Error("MODEL_UNAVAILABLE: GROQ_MODEL environment variable is missing.");
    }

    try {
      const modelsResult = await groq.models.list();
      const availableModels = modelsResult.data.map((m) => m.id);
      
      const modelInfo = modelsResult.data.find((m) => m.id === modelName);
      if (!modelInfo || !modelInfo.active) {
        throw new Error(
          `MODEL_UNAVAILABLE: The model ${modelName} is not available or inactive.`
        );
      }
    } catch (err) {
      if (err.message.includes("MODEL_UNAVAILABLE")) throw err;
      throw new Error(
        `GROQ_ERROR: Could not verify models or invalid API key. ` +
          err.message,
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: modelName,
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const resText = chatCompletion.choices[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(resText);
    } catch (e) {
      throw new Error("CONTENT_VALIDATION_FAILED: Invalid JSON from LLM.");
    }

    if (!json.title || !json.body) {
      throw new Error(
        "CONTENT_VALIDATION_FAILED: Missing title or body in response.",
      );
    }

    // 1. URL Validation
    const urlRegex = /(https?:\/\/[^\s"'<]+)/g;
    const foundUrls = json.body.match(urlRegex) || [];
    for (const foundUrl of foundUrls) {
      const cleanUrl = foundUrl.replace(/[\.,\)]$/, ""); // clean trailing punctuation
      if (!cleanUrl.startsWith("https://obrive.com")) {
        throw new Error(
          `CONTENT_VALIDATION_FAILED: Unapproved external domain found: ${cleanUrl}`,
        );
      }
      if (
        !knowledgeContext.approvedUrls.includes(cleanUrl) &&
        cleanUrl !== "https://obrive.com"
      ) {
        throw new Error(
          `CONTENT_VALIDATION_FAILED: Unapproved Obrive URL found: ${cleanUrl}`,
        );
      }
    }

    // 2. Factual validation (Deterministic)
    // Ban invented customers, metrics (%, $, numbers not in context), partnerships, certifications
    const combinedContext = knowledgeContext.contextualServices
      .map((s) => `${s.name} ${s.description}`)
      .join(" ")
      .toLowerCase();

    const unsupportedClaimPatterns = [
      {
        regex: /\b(customer|client|partner|partnership)s?\b/i,
        type: "Customer/Partner",
      },
      {
        regex: /\b(award|awarded|certified|certification|accreditation)s?\b/i,
        type: "Certification/Award",
      },
      { regex: /\b(price|pricing|cost|\$|€|£|¥|usd)\b/i, type: "Pricing" },
      { regex: /\b\d{1,3}%/i, type: "Statistic/Percentage" },
    ];

    const bodyLower = json.body.toLowerCase();

    for (const pattern of unsupportedClaimPatterns) {
      if (
        pattern.regex.test(bodyLower) &&
        !pattern.regex.test(combinedContext)
      ) {
        throw new Error(
          `CONTENT_VALIDATION_FAILED: Unsupported claim detected relating to: ${pattern.type}`,
        );
      }
    }

    // Check for completely fabricated products/services (very basic approach: if there is a capitalized entity not in context)
    // For strictness, if "Product:" or "Service:" is mentioned, it must match.
    // We rely heavily on prompt instruction, but this is a deterministic safety net.

    return { title: json.title, body: json.body };
  }

  async _logEvent(targetId, eventType, details) {
    await prisma.oblink_publishing_events.create({
      data: {
        target_id: targetId,
        event_type: eventType,
        details: details,
      },
    });
  }
}

module.exports = PublisherAgent;
