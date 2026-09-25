import { getBrevoClient, getSenderConfig, getNotificationConfig } from "./brevo";
import { RATE_CONFIG } from "../payments/calculation";

export interface OrderData {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount?: number;
  currency: string;
  packageId: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  baseAmount?: number;
  serviceGst?: number;
  gatewayFee?: number;
  gatewayFeeGst?: number;
  gatewayCharges?: number;
  totalAmount?: number;
}

function formatINR(paise?: number) {
  const rupees = (paise || 0) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(rupees);
}

function buildBreakdownRows(orderData: OrderData) {
  const hasBreakdown =
    orderData.baseAmount != null &&
    orderData.serviceGst != null &&
    orderData.gatewayFee != null &&
    orderData.gatewayFeeGst != null &&
    orderData.gatewayCharges != null &&
    orderData.totalAmount != null;

  if (!hasBreakdown) {
    return `
      <tr>
        <td style="padding:10px;border:1px solid #eef7ff;"><strong>Total Paid:</strong></td>
        <td style="padding:10px;border:1px solid #eef7ff;">${formatINR(orderData.amount)}</td>
      </tr>`;
  }

  return `
    <tr>
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>Service Price:</strong></td>
      <td style="padding:10px;border:1px solid #eef7ff;">${formatINR(orderData.baseAmount)}</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>GST on Service (${RATE_CONFIG.serviceGstPct}%):</strong></td>
      <td style="padding:10px;border:1px solid #eef7ff;">${formatINR(orderData.serviceGst)}</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>Payment Gateway Fee (${RATE_CONFIG.gatewayFeePct}%):</strong></td>
      <td style="padding:10px;border:1px solid #eef7ff;">${formatINR(orderData.gatewayFee)}</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>GST on Gateway Fee (${RATE_CONFIG.gatewayFeeGstPct}%):</strong></td>
      <td style="padding:10px;border:1px solid #eef7ff;">${formatINR(orderData.gatewayFeeGst)}</td>
    </tr>
    <tr style="background:#f4f9fd;">
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>Total Gateway Charges:</strong></td>
      <td style="padding:10px;border:1px solid #eef7ff;"><strong>${formatINR(orderData.gatewayCharges)}</strong></td>
    </tr>
    <tr style="background:#073933;color:#fff;">
      <td style="padding:12px;"><strong>Total Paid:</strong></td>
      <td style="padding:12px;"><strong>${formatINR(orderData.totalAmount)}</strong></td>
    </tr>`;
}

const TAX_DISCLAIMER_NOTE = `
  <p style="margin-top:16px;font-size:11px;color:#aaa;line-height:1.5;">
    <em>
      Service GST at 18% and payment gateway convenience fee at 2% (plus 18% GST on fee)
      are applied per current configuration. Tax treatment requires confirmation with a
      qualified advisor. Refund treatment of these charges is subject to applicable
      Razorpay and business policies.
    </em>
  </p>`;

export const sendPaymentConfirmationEmails = async (orderData: OrderData) => {
  const brevo = getBrevoClient();
  const sender = getSenderConfig();
  const notification = getNotificationConfig();

  const breakdownRows = buildBreakdownRows(orderData);

  try {
    // 1. Customer confirmation email
    if (orderData.customerEmail) {
      await brevo.transactionalEmails.sendTransacEmail({
        subject: `Payment Confirmation: ${orderData.packageName}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eaeaea;border-radius:8px;">
            <h2 style="color:#073933;text-align:center;">Payment Successful</h2>
            <p>Dear ${orderData.customerName || "Customer"},</p>
            <p>Thank you for your payment. Your transaction has been successfully processed.</p>

            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:10px;border:1px solid #eef7ff;"><strong>Package:</strong></td>
                <td style="padding:10px;border:1px solid #eef7ff;">${orderData.packageName}</td>
              </tr>
              ${breakdownRows}
              <tr>
                <td style="padding:10px;border:1px solid #eef7ff;"><strong>Order ID:</strong></td>
                <td style="padding:10px;border:1px solid #eef7ff;">${orderData.razorpayOrderId}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #eef7ff;"><strong>Payment ID:</strong></td>
                <td style="padding:10px;border:1px solid #eef7ff;">${orderData.razorpayPaymentId}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #eef7ff;"><strong>Payment Date:</strong></td>
                <td style="padding:10px;border:1px solid #eef7ff;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
            </table>

            ${TAX_DISCLAIMER_NOTE}

            <p style="margin-top:30px;">If you have any questions, please contact us at <a href="mailto:${notification.email}">${notification.email}</a>.</p>
            <p style="font-size:12px;color:#888;text-align:center;margin-top:20px;">Obrive Industries Private Limited</p>
          </div>`,
        sender: { name: sender.name, email: sender.email },
        to: [
          {
            email: orderData.customerEmail,
            name: orderData.customerName || "Customer",
          },
        ],
        replyTo: { email: notification.email, name: "Obrive Support" },
      });
      console.log(`Payment confirmation email sent to ${orderData.customerEmail}`);
    }

    // 2. Admin notification email
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `New Payment Received: ${orderData.packageName}`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#f4f9fd;border-radius:8px;">
          <h2 style="color:#073933;text-align:center;">New Payment Notification</h2>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Customer Name:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.customerName || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Customer Email:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.customerEmail || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Customer Phone:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.customerPhone || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Package:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.packageName}</td>
            </tr>
            ${breakdownRows}
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Order ID:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.razorpayOrderId}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;"><strong>Payment ID:</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eef7ff;">${orderData.razorpayPaymentId}</td>
            </tr>
            <tr>
              <td style="padding:10px;"><strong>Date:</strong></td>
              <td style="padding:10px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            </tr>
          </table>
          ${TAX_DISCLAIMER_NOTE}
        </div>`,
      sender: { name: "Obrive System", email: sender.email },
      to: [notification],
      replyTo: orderData.customerEmail
        ? {
            email: orderData.customerEmail,
            name: orderData.customerName || "Customer",
          }
        : undefined,
    });
    console.log(`Admin payment notification sent to ${notification.email}`);
  } catch (error) {
    console.error("Error sending payment confirmation emails via Brevo:", error);
  }
};
