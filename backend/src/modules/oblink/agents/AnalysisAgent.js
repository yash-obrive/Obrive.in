const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getBoss } = require("../workers/queue");

/**
 * Analysis & Scoring Agent
 * Fetches the URL, analyzes the domain, calculates spam risk and relevance.
 */
class AnalysisAgent {
  constructor() {}

  async analyze(targetId) {
    const target = await prisma.oblink_targets.findUnique({
      where: { id: targetId },
    });
    if (!target) return;

    try {
      // Simulate fetching and analyzing the URL via LLM or Heuristics
      // e.g. const html = await fetch(target.url).then(r => r.text());
      // const scores = await llm.analyzeSpam(html);

      const relevance = 75.0; // MOCK
      const spamScore = 5.0; // MOCK

      const updated = await prisma.oblink_targets.update({
        where: { id: targetId },
        data: {
          relevance_score: relevance,
          spam_score: spamScore,
          target_status: "QUALIFIED",
        },
      });

      // Queue the next step: Matching
      const boss = getBoss();
      await boss.send("oblink.matching", { targetId: updated.id });
    } catch (err) {
      console.error(`Analysis failed for target ${targetId}:`, err);
      await prisma.oblink_targets.update({
        where: { id: targetId },
        data: { target_status: "FAILED" },
      });
    }
  }
}

module.exports = AnalysisAgent;
