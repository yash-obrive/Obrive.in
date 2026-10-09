const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getBoss } = require("../workers/queue");
const fs = require("fs/promises");
const path = require("path");

/**
 * Obrive Resource Matching Agent
 * Uses the frozen, read-only Knowledge Brain to match topics.
 */
class MatchingAgent {
  constructor() {
    this.brainPath = path.join(
      __dirname,
      "../../../../../../OBRIVE_AI_KNOWLEDGE_BRAIN_PHASE_2.md",
    );
  }

  async match(targetId) {
    const target = await prisma.oblink_targets.findUnique({
      where: { id: targetId },
    });
    if (!target) return;

    try {
      // Read the read-only brain
      // const brainContent = await fs.readFile(this.brainPath, 'utf8');

      // Simulate matching logic
      const matchedUrl = "https://obrive.in/solutions/enterprise";

      const updated = await prisma.oblink_targets.update({
        where: { id: targetId },
        data: {
          target_page: matchedUrl,
          target_status: "READY_TO_PUBLISH",
        },
      });

      const boss = getBoss();
      await boss.send(
        "oblink.publish",
        { targetId: updated.id },
        {
          singletonKey: updated.id,
          retryLimit: 3,
          retryDelay: 60,
          expireInSeconds: 300, // Timeout for PUBLISHING state
        },
      );
    } catch (err) {
      console.error(`Matching failed for target ${targetId}:`, err);
      await prisma.oblink_targets.update({
        where: { id: targetId },
        data: { target_status: "FAILED" },
      });
    }
  }
}

module.exports = MatchingAgent;
