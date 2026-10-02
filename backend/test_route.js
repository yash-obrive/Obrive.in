const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const userId = 29;
  const assignments = await prisma.project_assignments.findMany({
    where: { employee_id: userId },
    select: { project_id: true }
  });
  console.log("Assignments:", assignments);
  const projectIds = assignments.map(a => a.project_id).filter(id => id !== null);
  console.log("Project IDs:", projectIds);
  const projects = await prisma.projects.findMany({
    where: { id: { in: projectIds } }
  });
  console.log("Projects found:", projects.length);
}
run().finally(() => prisma.$disconnect());
