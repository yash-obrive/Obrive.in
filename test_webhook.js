const crypto = require("crypto");
require("dotenv").config({ path: "./backend/.env" });
const { webhook } = require("./backend/src/modules/payments/payment.controller");

// Mock prisma to avoid actual database calls during this basic signature test
jest = require("jest-mock");
const { prisma } = require("./backend/prisma");
if (prisma) {
  prisma.$transaction = async () => ({ existingOrder: { id: 1, customerEmailSentAt: new Date() } });
}

async function testWebhook() {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  const payload = {
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_xyz",
          order_id: "order_xyz"
        }
      }
    }
  };

  const rawBody = Buffer.from(JSON.stringify(payload));
  const signature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

  let status = null;
  let json = null;

  const req = {
    headers: {
      "x-razorpay-signature": signature
    },
    rawBody: rawBody,
    body: payload
  };

  const res = {
    status: (code) => {
      status = code;
      return res;
    },
    json: (data) => {
      json = data;
    }
  };

  await webhook(req, res);
  
  console.log("Status:", status);
  console.log("JSON:", json);
}

testWebhook().catch(console.error);
