import { type NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRICING_STREAMS } from "@/constants/pages/pricingData";
import { calculatePaymentBreakdown } from "@/lib/payments/calculation";
import { validateGstin } from "@/lib/payments/gstin";

/**
 * GSTIN_SERVICE_GST_EXEMPTION_ENABLED
 *
 * Server-only environment flag that controls whether a structurally valid GSTIN
 * causes the service GST to be set to ₹0.
 *
 * DEFAULT: false (disabled)
 *
 * Set to "true" in your Vercel environment ONLY after Obrive's tax advisor has
 * confirmed that the specific transaction type/service qualifies for GST exemption
 * or zero-rated treatment for GSTIN holders.
 *
 * IMPORTANT:
 *  - Presence of a valid GSTIN alone does NOT automatically create a legal basis
 *    for GST exemption. Reverse charge applies to specific notified supplies only.
 *  - This flag must never be exposed to or controlled by the browser.
 */
const GSTIN_SERVICE_GST_EXEMPTION_ENABLED =
  process.env.GSTIN_SERVICE_GST_EXEMPTION_ENABLED === "true";

const getRazorpayInstance = () => {
  const key_id =
    process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials not configured");
  }

  return new Razorpay({ key_id, key_secret });
};

function getPackageDetails(packageId: string) {
  for (const stream of PRICING_STREAMS) {
    for (const pkg of stream.packages) {
      if (pkg.id === packageId) return pkg;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const {
      packageId,
      customerName,
      customerEmail,
      customerPhone,
      company,
      gst,
    } = await req.json();

    if (!packageId) {
      return NextResponse.json(
        { success: false, error: "Package ID is required" },
        { status: 400 }
      );
    }

    const packageDetails = getPackageDetails(packageId);
    if (!packageDetails) {
      return NextResponse.json(
        { success: false, error: "Invalid package ID" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // GSTIN server-side validation
    // The client may send a GSTIN. The server independently validates
    // it. We NEVER trust client-sent flags like gstVerified, serviceGst,
    // or totalAmount. Only packageId + gst string reach here from client.
    // ─────────────────────────────────────────────────────────────
    let validatedGstin: string | null = null;
    let gstinFormatValid = false;

    if (gst && typeof gst === "string" && gst.trim().length > 0) {
      const gstinResult = validateGstin(gst);
      if (gstinResult.valid) {
        validatedGstin = gstinResult.normalised;
        gstinFormatValid = true;
      }
      // If invalid GSTIN format, we simply ignore it (treat as no GSTIN provided).
      // We do not reject the order — GSTIN is optional.
    }

    // ─────────────────────────────────────────────────────────────
    // GST exemption policy
    // exemptServiceGst = true ONLY when:
    //   1. GSTIN_SERVICE_GST_EXEMPTION_ENABLED is "true" in env, AND
    //   2. The server-validated GSTIN is structurally valid.
    //
    // Presence of a valid GSTIN alone does NOT legally waive GST.
    // This flag must be confirmed by Obrive's tax advisor before enabling.
    // ─────────────────────────────────────────────────────────────
    const exemptServiceGst =
      GSTIN_SERVICE_GST_EXEMPTION_ENABLED && gstinFormatValid;

    // Server-side authoritative price calculation.
    // priceINR is in INR. Multiply by 100 for paise.
    const baseAmountPaise = packageDetails.priceINR * 100;

    // noCharges packages (e.g. live-testing-90k) skip ALL GST and gateway
    // fees — the customer pays only the base price.
    const breakdown = packageDetails.noCharges
      ? {
          baseAmount: baseAmountPaise,
          serviceGst: 0,
          gatewayFee: 0,
          gatewayFeeGst: 0,
          gatewayCharges: 0,
          totalAmount: baseAmountPaise,
          serviceGstExempt: true,
        }
      : calculatePaymentBreakdown(baseAmountPaise, { exemptServiceGst });

    const currency = "INR";
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    let razorpay;
    try {
      razorpay = getRazorpayInstance();
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { success: false, error: "Payment service is temporarily unavailable." },
        { status: 503 }
      );
    }

    // Embed all necessary data in Razorpay notes so we don't need a database.
    // The GSTIN (if valid) is stored in notes for the webhook → email flow.
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
        company: company || "",
        gstin: validatedGstin || "",
        serviceGstExempt: breakdown.serviceGstExempt ? "true" : "false",
        baseAmount: breakdown.baseAmount.toString(),
        serviceGst: breakdown.serviceGst.toString(),
        gatewayFee: breakdown.gatewayFee.toString(),
        gatewayFeeGst: breakdown.gatewayFeeGst.toString(),
        gatewayCharges: breakdown.gatewayCharges.toString(),
        totalAmount: breakdown.totalAmount.toString(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        keyId:
          process.env.RAZORPAY_KEY_ID ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        currency,
        packageId: packageDetails.id,
        packageName: packageDetails.name,
        // Financial breakdown — server-authoritative, never trust client values
        baseAmount: breakdown.baseAmount,
        serviceGst: breakdown.serviceGst,
        gatewayFee: breakdown.gatewayFee,
        gatewayFeeGst: breakdown.gatewayFeeGst,
        gatewayCharges: breakdown.gatewayCharges,
        totalAmount: breakdown.totalAmount,
        serviceGstExempt: breakdown.serviceGstExempt,
        gstinVerified: gstinFormatValid,
        gstin: validatedGstin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment create order error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to create payment order." },
      { status: 500 }
    );
  }
}
