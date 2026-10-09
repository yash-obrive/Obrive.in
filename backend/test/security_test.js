require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const request = require('supertest');
const oblinkRoutes = require('../src/modules/oblink/routes/dashboard');
const { signAccessToken } = require('../src/utils/jwt');

process.env.JWT_ACCESS_SECRET = 'test-secret';

const app = express();
app.use(express.json());
app.use('/api/oblink', oblinkRoutes);

async function runTests() {
  // Create admin token
  const adminToken = signAccessToken({ id: 1, email: 'ai@obrive.in', role: 'admin' });
  // Create employee token
  const employeeToken = signAccessToken({ id: 2, email: 'emp@obrive.in', role: 'employee' });

  console.log("Testing with Employee (should fail)");
  const resEmp = await request(app)
    .get('/api/oblink/dashboard/stats')
    .set('Authorization', `Bearer ${employeeToken}`);
  console.log("Employee response status:", resEmp.status);

  console.log("Testing with Admin (should succeed)");
  const resAdmin = await request(app)
    .get('/api/oblink/dashboard/stats')
    .set('Authorization', `Bearer ${adminToken}`);
  console.log("Admin response status:", resAdmin.status);
  
  // Test getting targets
  const targetsRes = await request(app)
    .get('/api/oblink/targets')
    .set('Authorization', `Bearer ${adminToken}`);
  console.log("Targets status:", targetsRes.status);
  
  if (targetsRes.body && targetsRes.body.data && targetsRes.body.data.length > 0) {
      const targetId = targetsRes.body.data[0].id;
      
      console.log(`Testing Authorize target ${targetId}`);
      const authRes = await request(app)
        .put(`/api/oblink/targets/${targetId}/authorize`)
        .send({ target_status: 'AUTHORIZED', authorization_status: true })
        .set('Authorization', `Bearer ${adminToken}`);
      console.log("Authorize status:", authRes.status);
      
      console.log(`Testing Add Credentials for target ${targetId}`);
      const credRes = await request(app)
        .post(`/api/oblink/targets/${targetId}/credentials`)
        .send({ account_name: 'test_wp', account_email: 'test@obrive.in', password: 'secure_app_pass', platform: 'OWNED' })
        .set('Authorization', `Bearer ${adminToken}`);
      console.log("Credentials status:", credRes.status);
      
      console.log(`Testing Get Target ${targetId} (ensure secrets not leaked)`);
      const getRes = await request(app)
        .get(`/api/oblink/targets/${targetId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      console.log("Get Target status:", getRes.status);
      console.log("Is credential_configured present?", getRes.body.credential_configured === true);
      console.log("Is encrypted_credentials undefined?", getRes.body.account?.encrypted_credentials === undefined);
  } else {
      console.log("No targets found to test updates on.");
  }
}

runTests().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
