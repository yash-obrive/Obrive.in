const fs = require("fs/promises");
const path = require("path");

class KnowledgeRetrieval {
  constructor() {
    this.brainPath = path.join(
      __dirname,
      "../../../../../public/ai/knowledge.json",
    );
  }

  async getKnowledgeContext(target) {
    try {
      const data = await fs.readFile(this.brainPath, "utf8");
      const registry = JSON.parse(data);

      // Extract services and products to provide contextual knowledge
      const services = registry.entities
        .filter((e) => e.type === "service" || e.type === "product")
        .map((e) => ({
          name: e.name,
          description: e.description,
          url: e.canonicalUrl,
        }));

      // Extract all canonical URLs for validation
      const approvedUrls = registry.entities
        .map((e) => e.canonicalUrl)
        .filter((url) => url && url.startsWith("https://obrive.com"));

      // Ensure homepage is always approved
      if (!approvedUrls.includes("https://obrive.com")) {
        approvedUrls.push("https://obrive.com");
      }

      // Filter contextual services based on opportunity type, platform, topic, domain, language
      // Here we just shuffle and pick top 3 for demo, but we will pass all fields
      const shuffledServices = services
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      if (shuffledServices.length === 0) {
        throw new Error(
          "CONTENT_CONTEXT_UNAVAILABLE: No relevant knowledge found.",
        );
      }

      const language = target.language || "English";

      return {
        contextualServices: shuffledServices,
        approvedUrls: approvedUrls,
        platform: target.platform,
        opportunityType: target.opportunity_type,
        topic: target.topic,
        domain: target.domain,
        language: language,
        rules: [
          "Do not invent services, products, customers, pricing, or statistics.",
          "Every factual claim MUST be based on the provided Contextual Services.",
          "Use ONLY the approved canonical URLs provided. Do not fabricate domains or paths.",
          "Write a highly engaging, professional piece of content (around 150 words).",
          "Include a natural backlink to our website using a highly relevant anchor text.",
          `The generated content MUST be entirely in ${language}. Do not silently fall back to English.`,
          "Output strictly JSON with 'title' and 'body' keys.",
        ],
      };
    } catch (err) {
      console.error(
        "[KnowledgeRetrieval] Failed to load knowledge registry",
        err,
      );
      if (err.message.includes("CONTENT_CONTEXT_UNAVAILABLE")) throw err;
      throw new Error(
        "CONTENT_CONTEXT_UNAVAILABLE: Failed to load canonical knowledge brain.",
      );
    }
  }
}

module.exports = new KnowledgeRetrieval();
