const { PrismaClient } = require("@prisma/client");
const { initQueue } = require("./src/modules/oblink/workers/queue");
const prisma = new PrismaClient();

async function test() {
  try {
    const boss = await initQueue();
    const wpAccount = await prisma.oblink_publishing_accounts.findFirst();
    if (wpAccount && boss) {
      console.log("Account found:", wpAccount.id);
      const ts = Date.now();
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
      console.log("Created target:", mockTarget.id);
      await boss.send("oblink.publish", { targetId: mockTarget.id }, {
        singletonKey: mockTarget.id,
        retryLimit: 1,
      });
      console.log("Enqueued job!");
    }
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}
test();
