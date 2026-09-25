import { type NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { sendPaymentConfirmationEmails, type OrderData } from "@/lib/email/payment-email";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Webhook error: RAZORPAY_WEBHOOK_SECRET missing");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
    }

    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // In Next.js App Router, we get the raw text directly from the request
    const rawBody = await req.text();

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;
    const payload = body.payload;

    if (!event || !payload) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const paymentEntity = payload.payment?.entity;
    const orderEntity = payload.order?.entity;

    const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
    const razorpayPaymentId = paymentEntity?.id;

    if (!razorpayOrderId) {
      return NextResponse.json({ success: true, message: "Irrelevant event" }, { status: 200 });
    }

    if (event === "payment.captured" || event === "order.paid") {
      // Extract data from Razorpay notes instead of database!
      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      
      const orderData: OrderData = {
        razorpayOrderId: razorpayOrderId,
        razorpayPaymentId: razorpayPaymentId,
        amount: paymentEntity?.amount || orderEntity?.amount,
        currency: paymentEntity?.currency || orderEntity?.currency || "INR",
        packageId: notes.packageId || "unknown",
        packageName: notes.packageName || "Unknown Package",
        customerName: notes.customerName || "Customer",
        customerEmail: notes.customerEmail || "",
        customerPhone: notes.customerPhone || "",
        baseAmount: Number(notes.baseAmount) || 0,
        serviceGst: Number(notes.serviceGst) || 0,
        gatewayFee: Number(notes.gatewayFee) || 0,
        gatewayFeeGst: Number(notes.gatewayFeeGst) || 0,
        gatewayCharges: Number(notes.gatewayCharges) || 0,
        totalAmount: Number(notes.totalAmount) || (paymentEntity?.amount || orderEntity?.amount),
      };

      if (orderData.customerEmail) {
        await sendPaymentConfirmationEmails(orderData);
        console.log(`Webhook sent confirmation email for order: ${razorpayOrderId}`);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
