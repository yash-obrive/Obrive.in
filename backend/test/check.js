const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const targets = await prisma.oblink_targets.findMany();
  console.log(targets);
}
main().catch(console.error);
