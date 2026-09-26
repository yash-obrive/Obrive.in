require("dotenv").config();
const vars = [
  "DATABASE_URL",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "BREVO_API_KEY",
  "BREVO_SENDER_EMAIL",
  "BREVO_SENDER_NAME",
  "PAYMENT_NOTIFICATION_EMAIL",
];
for (const v of vars) {
  if (process.env[v]) {
    console.log(`${v}: PRESENT`);
  } else {
    console.log(`${v}: MISSING`);
  }
}
