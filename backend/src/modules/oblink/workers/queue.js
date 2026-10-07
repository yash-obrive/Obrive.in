const { PgBoss } = require("pg-boss");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("DATABASE_URL is missing. OBLINK queue cannot start.");
}

const boss = new PgBoss({
  connectionString: dbUrl.split('?')[0],
  max: 2,
  ssl: { rejectUnauthorized: false }
});

boss.on("error", (error) => console.error("OBLINK pg-boss error:", error));

let isStarted = false;

async function initQueue() {
  if (isStarted) return boss;
  await boss.start();

  await boss.createQueue("oblink.discovery").catch(() => {});
  await boss.createQueue("oblink.analysis").catch(() => {});
  await boss.createQueue("oblink.matching").catch(() => {});
  await boss.createQueue("oblink.publish").catch(() => {});
  await boss.createQueue("oblink.verify").catch(() => {});

  isStarted = true;
  console.log("OBLINK pg-boss queue started successfully.");
  return boss;
}

function getBoss() {
  if (!isStarted) {
    throw new Error("pg-boss not started. Call initQueue() first.");
  }
  return boss;
}

module.exports = {
  initQueue,
  getBoss,
};
