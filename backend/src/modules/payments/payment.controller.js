const Razorpay = require("razorpay");
const crypto = require("crypto");
const { getPackageDetails } = require("../../utils/pricing");
const { calculatePaymentBreakdown } = require("../../utils/paymentCalculation");
const { sendPaymentConfirmationEmails } = require("./payment.email");
const { prisma } = require("../../../prisma");

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials not configured");
  }
  return new Razorpay({ key_id, key_secret });
};

exports.createOrder = async (req, res) => {
  try {
    // NOTE: Only packageId is trusted from the client.
    // All amounts are calculated server-side from the trusted pricing source.
    // Client-submitted amount/serviceGst/gatewayFee/totalAmount are IGNORED.
    const { packageId, customerName, customerEmail, customerPhone, company, gst, address } = req.body;

    if (!packageId) {
      return res.status(400).json({ success: false, error: "Package ID is required" });
    }

    const packageDetails = getPackageDetails(packageId);
    if (!packageDetails) {
      return res.status(400).json({ success: false, error: "Invalid package ID" });
    }

    // Server-side authoritative price calculation.
    // priceINR in pricing.js is INR; multiply by 100 for paise.
    const baseAmountPaise = packageDetails.priceINR * 100;
    const breakdown = calculatePaymentBreakdown(baseAmountPaise);
    // breakdown.totalAmount is what the customer actually pays.

    const currency = "INR";
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    let razorpay;
    try {
      razorpay = getRazorpayInstance();
    } catch (err) {
      console.error(err);
      return res.status(503).json({ success: false, error: "Payment service is temporarily unavailable." });
    }

    // Razorpay order uses totalAmount (base + GST + gateway charges)
    const order = await razorpay.orders.create({
      amount: breakdown.totalAmount,
      currency,
      receipt,
      notes: {
        packageId,
        packageName: packageDetails.name,
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        company: company || "",
      },
    });

    // Save full financial breakdown + customer info to DB
    try {
      await prisma.paymentOrder.create({
        data: {
          packageId,
          packageName: packageDetails.name,
          // Legacy field kept for backward compat — equals totalAmount for new records
          amount: breakdown.totalAmount,
          // Financial breakdown fields
          baseAmount:     breakdown.baseAmount,
          serviceGst:     breakdown.serviceGst,
          gatewayFee:     breakdown.gatewayFee,
          gatewayFeeGst:  breakdown.gatewayFeeGst,
          gatewayCharges: breakdown.gatewayCharges,
          totalAmount:    breakdown.totalAmount,
          currency,
          razorpayOrderId: order.id,
          status: "CREATED",
          customerName:  customerName  || "",
          customerEmail: customerEmail || "",
          customerPhone: customerPhone || "",
          company:       company       || "",
          gst:           gst           || "",
          address:       address       || "",
        }
      });
    } catch (dbError) {
      console.error("Failed to persist order to database:", dbError);
      return res.status(500).json({ success: false, error: "Internal database error" });
    }

    // Return server-calculated breakdown to frontend for display.
    // Secrets are never included. Client MUST use these values — not recalculate.
    return res.status(200).json({
      success:        true,
      orderId:        order.id,
      keyId:          process.env.RAZORPAY_KEY_ID,
      currency,
      packageId:      packageDetails.id,
      packageName:    packageDetails.name,
      baseAmount:     breakdown.baseAmount,
      serviceGst:     breakdown.serviceGst,
      gatewayFee:     breakdown.gatewayFee,
      gatewayFeeGst:  breakdown.gatewayFeeGst,
      gatewayCharges: breakdown.gatewayCharges,
      totalAmount:    breakdown.totalAmount,
    });
  } catch (error) {
    console.error("Payment create order error:", error);
    return res.status(500).json({ success: false, error: "Unable to create payment order." });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing verification parameters" });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return res.status(503).json({ success: false, error: "Payment service is temporarily unavailable." });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Payment verification failed." });
    }

    // Process payment in a transaction for idempotency
    const result = await prisma.$transaction(async (tx) => {
      const existingOrder = await tx.paymentOrder.findUnique({
        where: { razorpayOrderId: razorpay_order_id }
      });

      if (!existingOrder) {
        throw new Error("Order not found in database");
      }

      if (existingOrder.status === "AUTHORIZED" || existingOrder.status === "CAPTURED") {
        return { existingOrder, alreadyProcessed: true };
      }

      const updatedOrder = await tx.paymentOrder.update({
        where: { id: existingOrder.id },
        data: {
          status: "AUTHORIZED",
          razorpayPaymentId: razorpay_payment_id,
        }
      });

      return { existingOrder: updatedOrder, alreadyProcessed: false };
    });

    // Send emails if not processed yet and not previously sent
    if (!result.alreadyProcessed && !result.existingOrder.customerEmailSentAt) {
      try {
        const orderData = {
          razorpayOrderId: result.existingOrder.razorpayOrderId,
          razorpayPaymentId: razorpay_payment_id,
          amount: result.existingOrder.amount,
          currency: result.existingOrder.currency,
          packageId: result.existingOrder.packageId,
          packageName: result.existingOrder.packageName,
          customerName: result.existingOrder.customerName,
          customerEmail: result.existingOrder.customerEmail,
          customerPhone: result.existingOrder.customerPhone,
        };

        await sendPaymentConfirmationEmails(orderData);
        
        await prisma.paymentOrder.update({
          where: { id: result.existingOrder.id },
          data: {
            customerEmailSentAt: new Date(),
            adminEmailSentAt: new Date(),
          }
        });
      } catch (err) {
        console.error("Failed to send confirmation emails during verification:", err);
      }
    }

    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verify error:", error);
    return res.status(500).json({ success: false, error: "Payment verification failed." });
  }
};

exports.webhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Webhook error: RAZORPAY_WEBHOOK_SECRET missing");
      return res.status(503).json({ error: "Webhook not configured" });
    }

    const signature = req.headers["x-razorpay-signature"];
    if (!signature) {
      return res.status(400).json({ error: "Missing signature" });
    }

    const rawBody = req.rawBody || JSON.stringify(req.body);
    
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid webhook signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (!event || !payload) {
      return res.status(400).json({ error: "Invalid payload format" });
    }

    const paymentEntity = payload.payment?.entity;
    const orderEntity = payload.order?.entity;
    
    const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
    const razorpayPaymentId = paymentEntity?.id;

    if (!razorpayOrderId) {
      return res.status(200).json({ success: true, message: "Irrelevant event" });
    }

    if (event === "payment.captured" || event === "order.paid") {
      const result = await prisma.$transaction(async (tx) => {
        const existingOrder = await tx.paymentOrder.findUnique({
          where: { razorpayOrderId: razorpayOrderId }
        });

        if (!existingOrder) {
          throw new Error("Order not found in database");
        }

        if (existingOrder.status === "CAPTURED") {
          return { existingOrder, alreadyProcessed: true };
        }

        const updatedOrder = await tx.paymentOrder.update({
          where: { id: existingOrder.id },
          data: {
            status: "CAPTURED",
            razorpayPaymentId: razorpayPaymentId || existingOrder.razorpayPaymentId,
          }
        });

        return { existingOrder: updatedOrder, alreadyProcessed: false };
      });

      if (!result.existingOrder.customerEmailSentAt) {
        try {
          const orderData = {
            razorpayOrderId: result.existingOrder.razorpayOrderId,
            razorpayPaymentId: razorpayPaymentId,
            amount: result.existingOrder.amount,
            currency: result.existingOrder.currency,
            packageId: result.existingOrder.packageId,
            packageName: result.existingOrder.packageName,
            customerName: result.existingOrder.customerName,
            customerEmail: result.existingOrder.customerEmail,
            customerPhone: result.existingOrder.customerPhone,
          };

          await sendPaymentConfirmationEmails(orderData);
          
          await prisma.paymentOrder.update({
            where: { id: result.existingOrder.id },
            data: {
              customerEmailSentAt: new Date(),
              adminEmailSentAt: new Date(),
            }
          });
        } catch (err) {
          console.error("Failed to send emails from webhook:", err);
        }
      }
    } else if (event === "payment.failed") {
      await prisma.paymentOrder.updateMany({
        where: { 
          razorpayOrderId: razorpayOrderId,
          status: { notIn: ["CAPTURED", "AUTHORIZED", "FAILED"] } 
        },
        data: { 
          status: "FAILED",
          razorpayPaymentId: razorpayPaymentId 
        }
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
