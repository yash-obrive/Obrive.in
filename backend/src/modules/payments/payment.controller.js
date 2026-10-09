const Razorpay = require("razorpay");
const crypto = require("node:crypto");
const { getPackageDetails } = require("../../utils/pricing");
const { calculatePaymentBreakdown } = require("../../utils/paymentCalculation");
const { sendPaymentConfirmationEmails } = require("./payment.email");

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
    const {
      packageId,
      customerName,
      customerEmail,
      customerPhone,
      company,
      gst,
      address,
    } = req.body;

    if (!packageId) {
      return res
        .status(400)
        .json({ success: false, error: "Package ID is required" });
    }

    const packageDetails = getPackageDetails(packageId);
    if (!packageDetails) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid package ID" });
    }

    const baseAmountPaise = packageDetails.priceINR * 100;
    const breakdown = calculatePaymentBreakdown(baseAmountPaise);

    const currency = "INR";
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    let razorpay;
    try {
      razorpay = getRazorpayInstance();
    } catch (err) {
      console.error(err);
      return res.status(503).json({
        success: false,
        error: "Payment service is temporarily unavailable.",
      });
    }

    // Embed all necessary data in Razorpay notes so we don't need a database!
    const order = await razorpay.orders.create({
      amount: breakdown.totalAmount,
      currency,
      receipt,
      notes: {
        packageId,
        packageName: packageDetails.name,
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
        baseAmount: breakdown.baseAmount.toString(),
        serviceGst: breakdown.serviceGst.toString(),
        gatewayFee: breakdown.gatewayFee.toString(),
        gatewayFeeGst: breakdown.gatewayFeeGst.toString(),
        gatewayCharges: breakdown.gatewayCharges.toString(),
        totalAmount: breakdown.totalAmount.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      currency,
      packageId: packageDetails.id,
      packageName: packageDetails.name,
      baseAmount: breakdown.baseAmount,
      serviceGst: breakdown.serviceGst,
      gatewayFee: breakdown.gatewayFee,
      gatewayFeeGst: breakdown.gatewayFeeGst,
      gatewayCharges: breakdown.gatewayCharges,
      totalAmount: breakdown.totalAmount,
    });
  } catch (error) {
    console.error("Payment create order error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Unable to create payment order." });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, error: "Missing verification parameters" });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return res.status(503).json({
        success: false,
        error: "Payment service is temporarily unavailable.",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, error: "Payment verification failed." });
    }

    // Since we don't use DB, we trust verifyPayment to just return success.
    // The webhook will handle sending the email.
    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verify error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Payment verification failed." });
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
      return res
        .status(200)
        .json({ success: true, message: "Irrelevant event" });
    }

    if (event === "payment.captured" || event === "order.paid") {
      // Extract data from Razorpay notes instead of database!
      const notes = paymentEntity?.notes || orderEntity?.notes || {};
      
      const orderData = {
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.testEmail = async (req, res) => {
  try {
    const orderData = {
      razorpayOrderId: "order_test_12345",
      razorpayPaymentId: "pay_test_67890",
      amount: 12000,
      baseAmount: 10000,
      serviceGst: 1800,
      gatewayFee: 200,
      gatewayFeeGst: 36,
      gatewayCharges: 236,
      totalAmount: 12036,
      currency: "INR",
      packageId: "live-testing-100",
      packageName: "Live Testing Package",
      customerName: "Obrive Admin Test",
      customerEmail: "yashveer@obrive.in", 
      customerPhone: "8873394750",
    };

    await sendPaymentConfirmationEmails(orderData);
    
    return res.status(200).json({ success: true, message: "Test email triggered successfully!" });
  } catch (error) {
    console.error("Test email error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
