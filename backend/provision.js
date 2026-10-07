const { PrismaClient } = require('@prisma/client');
const ObriveSecurity = require('./src/modules/oblink/utils/security');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function run() {
  try {
    const wpUrl = 'https://dev-obrive.pantheonsite.io';
    const wpUser = '@obrive';
    const wpPass = '0uh9 OTrE G52t 0C1u WyFA G7SC';

    const credentials = JSON.stringify({ username: wpUser, application_password: wpPass });
    const encryptedCredentials = ObriveSecurity.encryptCredential(credentials);

    const account = await prisma.oblink_publishing_accounts.create({
      data: {
        platform: 'WordPress',
        domain: 'dev-obrive.pantheonsite.io',
        account_name: 'Obrive Dev',
        account_type: 'PUBLISHER',
        authorization_status: true,
        status: 'ACTIVE',
        encrypted_credentials: encryptedCredentials,
      }
    });
    console.log("Account created:", account.id);



    const target = await prisma.oblink_targets.create({
      data: {
        domain: 'dev-obrive.pantheonsite.io',
        url: wpUrl,
        platform: 'WordPress',
        opportunity_type: 'BLOG_POST',
        publishing_method: 'API',
        api_supported: true,
        authorization_status: true,
        target_status: 'PUBLISH_READY',
        account: {
          connect: { id: account.id }
        }
      }
    });

    console.log("Target created successfully:", target.url);
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
