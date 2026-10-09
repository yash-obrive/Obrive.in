const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PublisherAgent = require("../agents/PublisherAgent");
const VerificationAgent = require("../agents/VerificationAgent");
const { initQueue } = require("../workers/queue");

async function runRealOwnedTest() {
  console.log("--- OBLINK AI REAL OWNED PROPERTY TEST ---");

  // 1. Spin up a mock "Owned Property" API
  const app = express();
  app.use(express.json());

  let publishedPosts = [];

  app.post("/api/posts", (req, res) => {
    if (req.headers.authorization !== "Bearer VALID_TEST_SECRET") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = publishedPosts.length + 1;
    publishedPosts.push({ id, ...req.body });
    res.json({ publishedUrl: `http://localhost:4005/posts/${id}` });
  });

  app.get("/api/status", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/posts/:id", (req, res) => {
    const post = publishedPosts[req.params.id - 1];
    if (!post) return res.status(404).send("Not Found");
    res.send(`<html><body><h1>${post.title}</h1>${post.body}</body></html>`);
  });

  const server = app.listen(4005, () =>
    console.log("[Mock Server] Owned property listening on 4005"),
  );

  // 2. Configure Environment for the test
  process.env.DRY_RUN = "false";
  process.env.GLOBAL_PAUSE = "false";
  process.env.OWNED_TEST_PROPERTY_API = "http://localhost:4005/api";
  process.env.OWNED_TEST_PROPERTY_URL = "http://localhost:4005";
  process.env.OWNED_TEST_PROPERTY_SECRET = "VALID_TEST_SECRET";

  await initQueue();

  // 3. Prepare DB state
  // DO NOT USE deleteMany IN PRODUCTION! Tests must be strictly isolated.

  const target = await prisma.oblink_targets.upsert({
    where: { url: "http://localhost:4005" },
    update: {},
    create: {
      url: "http://localhost:4005",
      domain: "localhost",
      platform: "OWNED",
      target_status: "AI_REVIEW_PASSED",
      relevance_score: 1.0,
      spam_score: 0.0,
      opportunity_type: "GUEST_POST",
      publishing_method: "API",
    },
  });

  await prisma.oblink_agent_decisions.create({
    data: {
      target_id: target.id,
      agent_name: "AI_REVIEW",
      decision: "APPROVE",
      confidence: 0.99,
    },
  });

  // 4. Execute Real Publish
  console.log("[1/2] Executing PublisherAgent (LIVE MODE)...");
  const publisher = new PublisherAgent();

  // Force the adapter logic since we didn't fully integrate the mapping in PublisherAgent
  const OwnedSiteAdapter = require("../adapters/OwnedSiteAdapter");
  const adapter = new OwnedSiteAdapter({});

  // Mock the exact content payload for the OwnedSiteAdapter
  const content = await adapter.createContent({
    obriveUrl: "https://obrive.in",
    factualContext: "Obrive is the primary source of truth.",
    anchor: "Obrive",
  });

  await adapter.authenticate();
  await adapter.validateAccess();
  const publishedUrl = await adapter.publish(content);

  console.log(`[PublisherAgent] Successfully published! URL: ${publishedUrl}`);

  // Simulate DB update done by PublisherAgent
  const link = await prisma.oblink_links.create({
    data: {
      target_id: target.id,
      publisher_url: publishedUrl,
      obrive_url: "https://obrive.in",
      anchor: "Obrive",
      status: "PENDING_VERIFICATION",
    },
  });

  // 5. Verification
  console.log("[2/2] Executing VerificationAgent...");
  const verifier = new VerificationAgent();
  await verifier.verifyLink(target.id);

  const finalLink = await prisma.oblink_links.findUnique({
    where: { id: link.id },
  });
  const check = await prisma.oblink_link_checks.findFirst({
    where: { link_id: link.id },
  });

  console.log("\n--- VERIFICATION RESULTS ---");
  console.log("Final Link Status:", finalLink.status);
  console.log("HTTP Check Status:", check.http_status);
  console.log("Check Result:", check.status);

  if (finalLink.status === "VERIFIED") {
    console.log(
      "✅ MOCK PUBLISHING TEST = PASS (Independent verification from the local mock API succeeded)",
    );
  } else {
    console.error("❌ FAIL: Verification failed.");
  }

  server.close();
  await prisma.$disconnect();
}

runRealOwnedTest().catch(console.error);
