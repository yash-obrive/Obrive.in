require("dotenv").config();

function validateConfig() {
  const required = [
    "DATABASE_URL",
    "GROQ_API_KEY",
    "GROQ_MODEL"
  ];

  // Optional but recommended for full functionality
  const recommended = [
    "CREDENTIAL_SECRET_KEY",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
    "RAZORPAY_WEBHOOK_SECRET",
    "BREVO_API_KEY",
    "BREVO_SENDER_EMAIL",
    "BREVO_SENDER_NAME",
    "PAYMENT_NOTIFICATION_EMAIL"
  ];

  const missingRequired = [];
  const missingRecommended = [];

  for (const key of required) {
    if (!process.env[key] || process.env[key].trim() === "") {
      missingRequired.push(key);
    }
  }

  for (const key of recommended) {
    if (!process.env[key] || process.env[key].trim() === "") {
      missingRecommended.push(key);
    }
  }

  if (missingRecommended.length > 0) {
    console.warn(`[WARN] Missing recommended environment variables: ${missingRecommended.join(", ")}`);
  }

  if (missingRequired.length > 0) {
    console.error(`[FATAL] Missing required environment variables: ${missingRequired.join(", ")}`);
    console.error(`[FATAL] Server cannot start due to missing configuration. Exiting...`);
    process.exit(1);
  }
}

validateConfig();
