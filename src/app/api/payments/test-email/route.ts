import { type NextRequest, NextResponse } from "next/server";
import { sendPaymentConfirmationEmails, type OrderData } from "@/lib/email/payment-email";

/**
 * GET /api/payments/test-email
 *
 * Sends a test payment confirmation email with ₹90,000 base price values.
 *
 * SECURITY:
 *   - Requires PAYMENT_TEST_SECRET to be set as a server-only environment variable.
 *     If it is not set, this endpoint returns 403 and is fully disabled.
 *   - The caller must supply the matching secret in the request header:
 *       x-api-key: <PAYMENT_TEST_SECRET>
 *   - The secret must NOT be passed as a query parameter.
 *     Query parameters appear in Vercel access logs, browser history, and
 *     server-side request logs — making them unsuitable for secrets.
 *   - The secret value is never logged or included in any response body.
 *
 * This endpoint is intended for development/staging use only.
 * Remove or leave PAYMENT_TEST_SECRET unset in production environments
 * where the test route is not needed.
 *
 * Test values (₹90,000 base price, normal 18% GST applied):
 *   baseAmount    = 9,000,000 paise = ₹90,000
 *   serviceGst    = 1,620,000 paise = ₹16,200  (18% of base)
 *   gatewayFee    =   180,000 paise = ₹1,800   (2% of base)
 *   gatewayFeeGst =    32,400 paise = ₹324     (18% of gateway fee)
 *   gatewayCharges=   212,400 paise = ₹2,124   (gatewayFee + gatewayFeeGst)
 *   totalAmount   =10,832,400 paise = ₹1,08,324
 */
export async function GET(req: NextRequest) {
  // ─────────────────────────────────────────────────────────────────
  // Authentication guard: require matching server-only secret.
  // The secret must be supplied via the x-api-key request header.
  // Query parameters are explicitly NOT accepted — they leak into
  // Vercel access logs, browser history, and CDN logs.
  // ─────────────────────────────────────────────────────────────────
  const testSecret = process.env.PAYMENT_TEST_SECRET;

  if (!testSecret) {
    // Endpoint is administratively disabled — PAYMENT_TEST_SECRET not configured.
    return NextResponse.json(
      {
        success: false,
        error: "Test email endpoint is disabled.",
      },
      { status: 403 }
    );
  }

  const suppliedKey = req.headers.get("x-api-key");
  // Constant-time comparison is not available in edge/node for strings directly,
  // but since this endpoint is non-production only and secrets are high-entropy,
  // a direct string comparison is acceptable here.
  if (!suppliedKey || suppliedKey !== testSecret) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // ₹90,000 test data (gateway charges removed)
  // Verified calculation:
  //   baseAmount    = 9,000,000  paise (₹90,000)
  //   serviceGst    =         0  paise (₹0   — removed for test)
  //   gatewayFee    =         0  paise (₹0   — removed for test)
  //   gatewayFeeGst =         0  paise (₹0   — removed for test)
  //   gatewayCharges=         0  paise (₹0   — removed for test)
  //   totalAmount   = 9,000,000  paise (₹90,000)
  // ─────────────────────────────────────────────────────────────────
  try {
    const orderData: OrderData = {
      razorpayOrderId: "order_test_90k_12345",
      razorpayPaymentId: "pay_test_90k_67890",
      amount: 9000000,
      baseAmount: 9000000,
      serviceGst: 0,
      gatewayFee: 0,
      gatewayFeeGst: 0,
      gatewayCharges: 0,
      totalAmount: 9000000,
      currency: "INR",
      packageId: "live-testing-90k",
      packageName: "Live Testing Package (₹90,000)",
      customerName: "Obrive Admin Test",
      customerEmail: "yashveer@obrive.in",
      customerPhone: "8873394750",
      // No GSTIN for this test — normal GST applies
      gstin: undefined,
      serviceGstExempt: false,
    };

    await sendPaymentConfirmationEmails(orderData);

    return NextResponse.json(
      {
        success: true,
        message: "Test email triggered successfully from Vercel.",
        testValues: {
          baseAmount_paise: orderData.baseAmount,
          serviceGst_paise: orderData.serviceGst,
          gatewayFee_paise: orderData.gatewayFee,
          gatewayFeeGst_paise: orderData.gatewayFeeGst,
          gatewayCharges_paise: orderData.gatewayCharges,
          totalAmount_paise: orderData.totalAmount,
          baseAmount_inr: "₹90,000",
          serviceGst_inr: "₹0",
          gatewayFee_inr: "₹0",
          gatewayFeeGst_inr: "₹0",
          gatewayCharges_inr: "₹0",
          totalAmount_inr: "₹90,000",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Test email error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
