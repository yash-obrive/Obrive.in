const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.users.findUnique({ where: { email: 'yashveer@obrive.in' }});
  if (!user) return console.log("User not found");
  console.log("User ID:", user.id);
  const assignments = await prisma.project_assignments.findMany({ where: { employee_id: user.id }});
  console.log("Assignments:", assignments);
}
run().finally(() => prisma.$disconnect());
