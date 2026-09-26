import { BrevoClient } from "@getbrevo/brevo";

let brevoInstance: BrevoClient | null = null;

export const getBrevoClient = (): BrevoClient => {
  const brevoApiKey = process.env.BREVO_API_KEY;

  if (!brevoApiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  if (!brevoInstance) {
    brevoInstance = new BrevoClient({ apiKey: brevoApiKey });
  }

  return brevoInstance;
};

export const getSenderConfig = () => {
  return {
    email: process.env.BREVO_SENDER_EMAIL || "no-reply@obrive.in",
    name: process.env.BREVO_SENDER_NAME || "Obrive System",
  };
};

export const getNotificationConfig = () => {
  return {
    email: process.env.CONTACT_EMAIL || process.env.PAYMENT_NOTIFICATION_EMAIL || "account@obrive.com",
    name: "Obrive Admin",
  };
};
