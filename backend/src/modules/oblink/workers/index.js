const { initQueue } = require("./queue");
const DiscoveryAgent = require("../agents/DiscoveryAgent");
const AnalysisAgent = require("../agents/AnalysisAgent");
const MatchingAgent = require("../agents/MatchingAgent");
const PublisherAgent = require("../agents/PublisherAgent");
const VerificationAgent = require("../agents/VerificationAgent");

async function startWorkers() {
  console.log("Starting OBLINK AI Workers...");
  const boss = await initQueue();

  const discoveryAgent = new DiscoveryAgent();
  const analysisAgent = new AnalysisAgent();
  const matchingAgent = new MatchingAgent();
  const publisherAgent = new PublisherAgent();
  const verificationAgent = new VerificationAgent();

  // 1. Discovery Worker (e.g. triggered by cron to discover new things)
  /*
  await boss.work("oblink.discovery", async (job) => {
    const { query, topic } = job.data;
    await discoveryAgent.discover(query, topic);
  });
  */

  // 2. Analysis Worker
  /*
  await boss.work("oblink.analysis", async (job) => {
    const { targetId } = job.data;
    await analysisAgent.analyze(targetId);
  });
  */

  // 3. Matching Worker
  /*
  await boss.work("oblink.matching", async (job) => {
    const { targetId } = job.data;
    await matchingAgent.match(targetId);
  });
  */

  // 4. Publish Worker
  await boss.work(
    "oblink.publish",
    {
      teamSize: parseInt(process.env.BATCH_SIZE) || 10,
      teamConcurrency: parseInt(process.env.BATCH_SIZE) || 10,
      newJobCheckInterval: 2000,
    },
    async (jobs) => {
      const jobArray = Array.isArray(jobs) ? jobs : [jobs];
      for (const job of jobArray) {
        if (!job.data) continue;
        const { targetId } = job.data;
        await publisherAgent.execute(targetId);
      }
    },
  );

  // 5. Verification Worker
  /*
  await boss.work("oblink.verify", async (job) => {
    const { targetId } = job.data;
    await verificationAgent.verifyLink(targetId);
  });
  */

  console.log("OBLINK AI Workers registered and polling.");
}

if (require.main === module) {
  startWorkers().catch((err) => {
    console.error("Failed to start OBLINK workers:", err);
    process.exit(1);
  });
}

module.exports = { startWorkers };
