const { PrismaClient } = require("@prisma/client");
const { initQueue } = require("./src/modules/oblink/workers/queue");
const prisma = new PrismaClient();

async function run() {
  try {
    const boss = await initQueue();
    const wpAccount = await prisma.oblink_publishing_accounts.findFirst();
    if (!wpAccount) throw new Error("No WP Account found");

    for (let i = 1; i <= 3; i++) {
      const ts = Date.now() + i;
      const target = await prisma.oblink_targets.create({
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
      await boss.send("oblink.publish", { targetId: target.id }, {
        singletonKey: target.id,
        retryLimit: 1,
      });
      console.log("Enqueued target:", target.id);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}
run();
