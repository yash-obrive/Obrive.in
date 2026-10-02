const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const users = await prisma.users.findMany({ select: { id: true, name: true, role: true } });
  console.log("Users:", users);
}
run().finally(() => prisma.$disconnect());
