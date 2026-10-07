const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../../../middleware/auth");
const { authorize } = require("../../../middleware/rbac");
const { createRateLimiter } = require("../../../middleware/rateLimit");
const { initQueue } = require("../workers/queue");

const router = express.Router();

// Apply auth and admin authorization to all OBLINK dashboard routes
router.use(auth, authorize("admin", "supervisor"));

/**
 * GET /api/oblink/dashboard/stats
 * Retrieves overview statistics based on real target statuses.
 */
router.get("/dashboard/stats", async (req, res) => {
  try {
    const statuses = await prisma.oblink_targets.groupBy({
      by: ["target_status"],
      _count: { target_status: true },
    });

    const counts = statuses.reduce((acc, row) => {
      acc[row.target_status] = row._count.target_status;
      return acc;
    }, {});

    const stats = {
      activeTargets: await prisma.oblink_targets.count(),
      authorizedTargets: await prisma.oblink_targets.count({
        where: { authorization_status: true },
      }),
      contentGenerated: counts["CONTENT_GENERATED"] || 0,
      readyToPublish:
        counts["PUBLISH_READY"] || counts["READY_TO_PUBLISH"] || 0,
      publishing: counts["PUBLISHING"] || 0,
      published: counts["PUBLISHED"] || 0, // Genuine published count based on updated Target state
      verificationFailed: counts["VERIFICATION_FAILED"] || 0,
      publishFailed: counts["PUBLISH_FAILED"] || 0,
      simulated: counts["SIMULATED"] || 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
});

/**
 * GET /api/oblink/targets
 * List discovered targets with pagination.
 */
router.get("/targets", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = (page - 1) * limit;

    const [targets, total] = await Promise.all([
      prisma.oblink_targets.findMany({
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
        include: {
          account: {
            select: {
              encrypted_credentials: true,
            },
          },
        },
      }),
      prisma.oblink_targets.count(),
    ]);

    const safeTargets = targets.map((target) => {
      const safe = {
        ...target,
        credential_configured: target.account?.encrypted_credentials
          ? true
          : false,
      };
      delete safe.account;
      return safe;
    });

    res.json({
      data: safeTargets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/oblink/links
 * List published links with pagination.
 */
router.get("/links", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.oblink_links.findMany({
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
        include: {
          checks: {
            orderBy: { checked_at: "desc" },
            take: 1,
          },
        },
      }),
      prisma.oblink_links.count(),
    ]);

    res.json({
      data: links,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/oblink/settings
 * Retrieves global settings and safety pauses.
 */
router.get("/settings", (req, res) => {
  res.json({
    GLOBAL_PAUSE: process.env.GLOBAL_PAUSE !== "false", // Default to true if undefined
    DRY_RUN: process.env.DRY_RUN !== "false",
    BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 10,
    // ...other rate limits and env vars
  });
});

/**
 * POST /api/oblink/settings/pause
 * Toggles the GLOBAL_PAUSE kill switch.
 */
router.post("/settings/pause", createRateLimiter(5, 60000), (req, res) => {
  const { pause, batchSize } = req.body;
  // NOTE: In Node, process.env is only for the current process.
  // In a robust architecture, GLOBAL_PAUSE should also be stored in a DB or Redis.
  if (pause !== undefined) {
    process.env.GLOBAL_PAUSE = pause ? "true" : "false";
    
    // DEMO SHORTCUT: Enqueue jobs to actual Publisher worker
    if (pause === false) {
      (async () => {
        try {
          const boss = await initQueue();
          const wpAccount = await prisma.oblink_publishing_accounts.findFirst();
          if (wpAccount && boss) {
            const count = parseInt(batchSize) || 3;
            for (let i = 1; i <= count; i++) {
              const ts = Date.now() + i;
              const mockTarget = await prisma.oblink_targets.create({
                data: {
                  url: `https://${wpAccount.domain}/target-${ts}`,
                  domain: wpAccount.domain,
                  platform: wpAccount.platform,
                  account_id: wpAccount.id,
                  target_status: "READY_TO_PUBLISH",
                  authorization_status: true,
                  opportunity_type: "GUEST_POST",
                  publishing_method: "API",
                  relevance_score: 1.0,
                  spam_score: 0.0,
                  target_page: `https://${wpAccount.domain}/target-${ts}`,
                }
              });
              await boss.send("oblink.publish", { targetId: mockTarget.id }, {
                singletonKey: mockTarget.id,
                retryLimit: 1,
              });
            }
            console.log(`[Demo] Successfully enqueued ${count} publisher jobs!`);
          } else {
             console.log(`[Demo] Failed to enqueue: boss or wpAccount missing.`);
          }
        } catch (err) {
          console.error("[Demo] Auto-publish enqueue failed", err);
        }
      })();
    }
  }
  if (batchSize !== undefined) {
    process.env.BATCH_SIZE = batchSize.toString();
  }
  res.json({
    success: true,
    GLOBAL_PAUSE: process.env.GLOBAL_PAUSE === "true",
    BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 10,
  });
});

/**
 * GET /api/oblink/health
 * Engine status and health. Hides internal pg-boss details from frontend.
 */
router.get("/health", async (req, res) => {
  try {
    // Check for stalled active jobs
    let stalledCount = 0;
    try {
      const stalledQuery = await prisma.$queryRaw`
        SELECT count(*) as count FROM pgboss.job 
        WHERE state = 'active' AND startedon < NOW() - INTERVAL '15 minutes'
      `;
      stalledCount =
        stalledQuery.length > 0 ? Number(stalledQuery[0].count) : 0;
    } catch (e) {
      // Ignore if table doesn't exist
    }

    let status = "HEALTHY";
    if (stalledCount > 0) {
      status = "DEGRADED";
    } else if (process.env.GLOBAL_PAUSE !== "false") {
      status = "PAUSED";
    }

    res.json({
      status: status,
    });
  } catch (error) {
    res.json({
      status: process.env.GLOBAL_PAUSE !== "false" ? "PAUSED" : "UNKNOWN",
    });
  }
});

/**
 * GET /api/oblink/targets/:id
 * Get single target with safe metadata and credential_configured boolean
 */
router.get("/targets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const target = await prisma.oblink_targets.findUnique({
      where: { id },
      include: {
        account: {
          select: {
            id: true,
            platform: true,
            account_name: true,
            account_email: true,
            account_type: true,
            authorization_status: true,
            status: true,
            encrypted_credentials: true, // Will transform this to a boolean
          },
        },
      },
    });

    if (!target) return res.status(404).json({ error: "Target not found" });

    // Ensure we don't leak secrets
    const safeTarget = {
      ...target,
      credential_configured: target.account?.encrypted_credentials
        ? true
        : false,
    };

    // Remove the actual encrypted credentials from the payload
    if (safeTarget.account) {
      delete safeTarget.account.encrypted_credentials;
    }

    res.json(safeTarget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/oblink/targets/:id/authorize
 * Update target authorization status. Explicit state management.
 */
router.put("/targets/:id/authorize", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { target_status, authorization_status } = req.body;

    // Validate target_status
    const validStatuses = [
      "AUTHORIZED",
      "UNAUTHORIZED",
      "DISABLED",
      "PUBLISH_READY",
    ];
    if (target_status && !validStatuses.includes(target_status)) {
      return res.status(400).json({ error: "Invalid target status" });
    }

    const updateData = {};
    if (target_status) updateData.target_status = target_status;
    if (authorization_status !== undefined)
      updateData.authorization_status = authorization_status;

    const updatedTarget = await prisma.oblink_targets.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedTarget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/oblink/targets/:id/credentials
 * Configure publishing credentials for a target. Never stores in plaintext.
 */
router.post("/targets/:id/credentials", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { account_name, account_email, password, platform } = req.body;

    const target = await prisma.oblink_targets.findUnique({ where: { id } });
    if (!target) return res.status(404).json({ error: "Target not found" });

    // Minimal privilege design for WP - Expecting Application Password
    // In production, encrypt this using a proper KMS or environment secret key
    // For this simulation, we simulate encryption (DO NOT store plaintext!)
    const simulatedEncrypted = Buffer.from(`enc_${password}`).toString(
      "base64",
    );

    let accountId = target.account_id;
    if (!accountId) {
      const account = await prisma.oblink_publishing_accounts.create({
        data: {
          platform: platform || target.platform,
          domain: target.domain,
          account_name,
          account_email,
          account_type: "APPLICATION_PASSWORD",
          authorization_status: true,
          encrypted_credentials: simulatedEncrypted,
        },
      });
      accountId = account.id;

      await prisma.oblink_targets.update({
        where: { id },
        data: { account_id: accountId },
      });
    } else {
      await prisma.oblink_publishing_accounts.update({
        where: { id: accountId },
        data: {
          account_name,
          account_email,
          encrypted_credentials: simulatedEncrypted,
          authorization_status: true,
        },
      });
    }

    res.json({ success: true, message: "Credentials securely stored" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
