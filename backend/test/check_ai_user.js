const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.users.findUnique({
    where: { email: 'ai@obrive.in' }
  });
  console.log(user);
}
main().catch(console.error);
