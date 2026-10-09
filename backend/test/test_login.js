const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

async function testAuth() {
  const user = await prisma.users.findUnique({ where: { email: 'ai@obrive.in' } });
  
  if (!user) {
    console.log("User not found");
    return;
  }
  
  // Assume JWT_SECRET is in process.env or fallback
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback-secret', // we will check what the app uses
    { expiresIn: '1h' }
  );
  
  console.log("Test Token generated. Role:", user.role);
}

testAuth();
