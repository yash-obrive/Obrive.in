/**
 * paymentCalculation.js
 * ─────────────────────────────────────────────────────────────────
 * SINGLE server-side source of truth for Obrive payment breakdown.
 *
 * ALL input and output values are INTEGER PAISE (₹1 = 100 paise).
 * baseAmount passed in MUST already be in paise — do NOT multiply by 100.
 *
 * Rounding policy: Math.round() (round-half-up) applied to each
 * component individually — standard for INR invoicing.
 *
 * Rate representation: rates stored as integer BASIS POINTS
 * (1 bp = 0.01%) applied via integer division to eliminate
 * floating-point monetary errors.
 *
 *   18%  →  1800 bp
 *    2%  →   200 bp
 *
 * Formula:
 *   serviceGst     = round(baseAmount × 1800 / 10000)
 *   gatewayFee     = round(baseAmount × 200  / 10000)
 *   gatewayFeeGst  = round(gatewayFee × 1800 / 10000)
 *   gatewayCharges = gatewayFee + gatewayFeeGst
 *   totalAmount    = baseAmount + serviceGst + gatewayCharges
 *
 * ─────────────────────────────────────────────────────────────────
 * BUSINESS / TAX DISCLAIMER — CONFIRM BEFORE PRODUCTION ACTIVATION
 * ─────────────────────────────────────────────────────────────────
 *
 * SERVICE_GST_RATE_BP (default 1800 = 18%):
 *   CONFIGURED rate assumed for applicable Obrive services.
 *   Must be confirmed against GST registration, SAC code, and
 *   applicable tax treatment. Not legal or tax advice.
 *
 * PAYMENT_GATEWAY_FEE_RATE_BP (default 200 = 2%):
 *   Razorpay's published platform fee is ~2% but varies by
 *   payment instrument, account tier, and commercial arrangement.
 *   Confirm from Razorpay dashboard / merchant agreement.
 *
 * PAYMENT_GATEWAY_FEE_GST_RATE_BP (default 1800 = 18%):
 *   Models a customer-facing payment convenience fee.
 *   GST treatment must be confirmed with a qualified tax advisor.
 *   Do not assume it mirrors Razorpay's own merchant GST invoicing.
 *
 * REFUNDS:
 *   Treatment of serviceGst, gatewayFee, and gatewayFeeGst during
 *   refunds requires separate business/account/tax confirmation.
 *   Do NOT implement automatic refund calculations based on this
 *   breakdown without that confirmation.
 * ─────────────────────────────────────────────────────────────────
 */

// ---------------------------------------------------------------------------
// Rate configuration in BASIS POINTS (10000 bp = 100%)
// ---------------------------------------------------------------------------

/** Service GST rate in basis points. Default: 1800 = 18%. */
const SERVICE_GST_RATE_BP = 1800;

/**
 * Payment gateway / convenience fee rate in basis points.
 * Default: 200 = 2%. Confirm actual rate from Razorpay account.
 */
const PAYMENT_GATEWAY_FEE_RATE_BP = 200;

/**
 * GST rate on customer-facing gateway convenience fee in basis points.
 * Default: 1800 = 18%. Requires tax advisor confirmation.
 */
const PAYMENT_GATEWAY_FEE_GST_RATE_BP = 1800;

// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the full payment breakdown for a given base amount.
 *
 * @param {number} baseAmountPaise - Base service price in INTEGER PAISE.
 *   Comes from pricing.js (already × 100). Do NOT multiply again.
 * @returns {{
 *   baseAmount: number,
 *   serviceGst: number,
 *   gatewayFee: number,
 *   gatewayFeeGst: number,
 *   gatewayCharges: number,
 *   totalAmount: number
 * }} All values in integer paise.
 * @throws {Error} if baseAmountPaise is not a positive integer.
 */
function calculatePaymentBreakdown(baseAmountPaise) {
  if (
    typeof baseAmountPaise !== "number" ||
    !Number.isInteger(baseAmountPaise) ||
    baseAmountPaise <= 0
  ) {
    throw new Error(
      `calculatePaymentBreakdown: baseAmountPaise must be a positive integer (got ${baseAmountPaise})`
    );
  }

  const serviceGst    = Math.round((baseAmountPaise * SERVICE_GST_RATE_BP) / 10000);
  const gatewayFee    = Math.round((baseAmountPaise * PAYMENT_GATEWAY_FEE_RATE_BP) / 10000);
  const gatewayFeeGst = Math.round((gatewayFee * PAYMENT_GATEWAY_FEE_GST_RATE_BP) / 10000);
  const gatewayCharges = gatewayFee + gatewayFeeGst;
  const totalAmount   = baseAmountPaise + serviceGst + gatewayCharges;

  return {
    baseAmount: baseAmountPaise,
    serviceGst,
    gatewayFee,
    gatewayFeeGst,
    gatewayCharges,
    totalAmount,
  };
}

// Expose rate config read-only for display/documentation purposes
const RATE_CONFIG = Object.freeze({
  serviceGstRateBp:    SERVICE_GST_RATE_BP,
  gatewayFeeRateBp:    PAYMENT_GATEWAY_FEE_RATE_BP,
  gatewayFeeGstRateBp: PAYMENT_GATEWAY_FEE_GST_RATE_BP,
  serviceGstPct:       SERVICE_GST_RATE_BP / 100,
  gatewayFeePct:       PAYMENT_GATEWAY_FEE_RATE_BP / 100,
  gatewayFeeGstPct:    PAYMENT_GATEWAY_FEE_GST_RATE_BP / 100,
});

module.exports = { calculatePaymentBreakdown, RATE_CONFIG };
