const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const DiscoveryAgent = require("../agents/DiscoveryAgent");
const AnalysisAgent = require("../agents/AnalysisAgent");
const MatchingAgent = require("../agents/MatchingAgent");
const PublisherAgent = require("../agents/PublisherAgent");

const { initQueue } = require("../workers/queue");

async function runDryRun() {
  console.log("--- OBLINK AI DRY RUN E2E TEST ---");
  process.env.DRY_RUN = "true";
  process.env.GLOBAL_PAUSE = "false";
  process.env.DISCOVERY_SEARCH_PROVIDER = "MOCK";

  await initQueue();

  // Clean DB for clean test
  await prisma.oblink_publishing_events.deleteMany();
  await prisma.oblink_link_checks.deleteMany();
  await prisma.oblink_links.deleteMany();
  await prisma.oblink_agent_decisions.deleteMany();
  await prisma.oblink_targets.deleteMany();
  await prisma.oblink_publishing_accounts.deleteMany();

  // 1. Discovery
  console.log("[1/5] Running DiscoveryAgent...");
  const discovery = new DiscoveryAgent();
  const targets = await discovery.discover(
    "Obrive test",
    "enterprise solutions",
  );
  const targetId = targets[0].id;
  console.log(`Discovered target ID: ${targetId}`);

  // 2. Analysis
  console.log("[2/5] Running AnalysisAgent...");
  const analysis = new AnalysisAgent();
  await analysis.analyze(targetId);

  // 3. Matching
  console.log("[3/5] Running MatchingAgent...");
  const matching = new MatchingAgent();
  await matching.match(targetId);

  // Mocking Content & AI Review for the test flow (simulating the intermediate steps)
  console.log("[4/5] Simulating Content Gen & AI Review...");
  await prisma.oblink_agent_decisions.create({
    data: {
      target_id: targetId,
      agent_name: "AI_REVIEW",
      decision: "APPROVE",
      confidence: 0.95,
    },
  });

  // 5. Publisher (Safety Gate & Dry Run)
  console.log("[5/5] Running PublisherAgent...");
  const publisher = new PublisherAgent();
  await publisher.execute(targetId);

  // Verification Results
  const events = await prisma.oblink_publishing_events.findMany({
    where: { target_id: targetId },
  });
  const target = await prisma.oblink_targets.findUnique({
    where: { id: targetId },
  });

  console.log("\n--- RESULTS ---");
  console.log("Final Target Status:", target.target_status);
  console.log(
    "Events Logged:",
    events.map((e) => e.event_type),
  );

  if (events.some((e) => e.event_type === "PUBLISH_SIMULATED")) {
    console.log(
      "✅ SUCCESS: DRY_RUN accurately prevented real publication and logged PUBLISH_SIMULATED.",
    );
  } else {
    console.error("❌ FAIL: PUBLISH_SIMULATED event was not found.");
  }
}

runDryRun()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
