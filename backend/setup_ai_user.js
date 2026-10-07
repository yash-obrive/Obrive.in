const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function setupAIUser() {
  const email = 'ai@obrive.com';
  // Use the password from the conversation
  const rawPassword = process.env.AI_DASHBOARD_PASSWORD;
  
  if (!rawPassword) {
    console.error('Missing AI_DASHBOARD_PASSWORD environment variable.');
    process.exit(1);
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log(`User ${email} already exists. Updating password and role to admin.`);
      await prisma.users.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'admin',
          status: 'online',
          is_active: true
        }
      });
      console.log('User updated successfully.');
    } else {
      console.log(`Creating new user ${email}.`);
      const crypto = require('crypto');
      await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          name: 'OBLINK Admin',
          role: 'admin',
          status: 'online',
          is_active: true,
          userid: crypto.randomUUID(),
          updated_at: new Date()
        }
      });
      console.log('User created successfully.');
    }
  } catch (error) {
    console.error('Failed to setup AI user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAIUser();
