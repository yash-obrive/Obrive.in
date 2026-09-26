/**
 * calculation.ts
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
 * Formula (standard):
 *   serviceGst     = round(baseAmount × 1800 / 10000)
 *   gatewayFee     = round(baseAmount × 200  / 10000)
 *   gatewayFeeGst  = round(gatewayFee × 1800 / 10000)
 *   gatewayCharges = gatewayFee + gatewayFeeGst
 *   totalAmount    = baseAmount + serviceGst + gatewayCharges
 *
 * ─────────────────────────────────────────────────────────────────
 * TAX DISCLAIMER — CONFIRM BEFORE PRODUCTION ACTIVATION
 * ─────────────────────────────────────────────────────────────────
 *
 * SERVICE_GST_RATE_BP (default 1800 = 18%):
 *   Must be confirmed against GST registration, SAC code, and
 *   applicable tax treatment. Not legal or tax advice.
 *
 * exemptServiceGst option:
 *   Setting this to true results in serviceGst = 0.
 *   This MUST only be used when Obrive's tax advisor has confirmed
 *   that the specific transaction qualifies for GST exemption or
 *   zero-rated treatment. Presence of a valid GSTIN alone does NOT
 *   determine eligibility. This option is server-controlled only
 *   and is governed by the GSTIN_SERVICE_GST_EXEMPTION_ENABLED
 *   environment flag in create-order.
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
// Types
// ---------------------------------------------------------------------------

export interface PaymentBreakdown {
  baseAmount: number;
  serviceGst: number;
  gatewayFee: number;
  gatewayFeeGst: number;
  gatewayCharges: number;
  totalAmount: number;
  /** Whether service GST was exempted for this calculation. */
  serviceGstExempt: boolean;
}

export interface PaymentBreakdownOptions {
  /**
   * When true, serviceGst is set to 0.
   * Must only be set by server-side code after confirming eligibility
   * per Obrive's configured tax policy (GSTIN_SERVICE_GST_EXEMPTION_ENABLED).
   * Never trust this value from the client.
   * Default: false.
   */
  exemptServiceGst?: boolean;
}

// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the full payment breakdown for a given base amount.
 *
 * @param baseAmountPaise - Base service price in INTEGER PAISE.
 * @param options - Optional server-controlled overrides.
 * @returns PaymentBreakdown — all values in integer paise.
 * @throws {Error} if baseAmountPaise is not a positive integer.
 */
export function calculatePaymentBreakdown(
  baseAmountPaise: number,
  options: PaymentBreakdownOptions = {}
): PaymentBreakdown {
  if (
    typeof baseAmountPaise !== "number" ||
    !Number.isInteger(baseAmountPaise) ||
    baseAmountPaise <= 0
  ) {
    throw new Error(
      `calculatePaymentBreakdown: baseAmountPaise must be a positive integer (got ${baseAmountPaise})`
    );
  }

  const serviceGstExempt = options.exemptServiceGst === true;

  const serviceGst = serviceGstExempt
    ? 0
    : Math.round((baseAmountPaise * SERVICE_GST_RATE_BP) / 10000);

  const gatewayFee = Math.round(
    (baseAmountPaise * PAYMENT_GATEWAY_FEE_RATE_BP) / 10000
  );
  const gatewayFeeGst = Math.round(
    (gatewayFee * PAYMENT_GATEWAY_FEE_GST_RATE_BP) / 10000
  );
  const gatewayCharges = gatewayFee + gatewayFeeGst;
  const totalAmount = baseAmountPaise + serviceGst + gatewayCharges;

  return {
    baseAmount: baseAmountPaise,
    serviceGst,
    gatewayFee,
    gatewayFeeGst,
    gatewayCharges,
    totalAmount,
    serviceGstExempt,
  };
}

// Expose rate config read-only for display/documentation purposes
export const RATE_CONFIG = Object.freeze({
  serviceGstRateBp: SERVICE_GST_RATE_BP,
  gatewayFeeRateBp: PAYMENT_GATEWAY_FEE_RATE_BP,
  gatewayFeeGstRateBp: PAYMENT_GATEWAY_FEE_GST_RATE_BP,
  serviceGstPct: SERVICE_GST_RATE_BP / 100,
  gatewayFeePct: PAYMENT_GATEWAY_FEE_RATE_BP / 100,
  gatewayFeeGstPct: PAYMENT_GATEWAY_FEE_GST_RATE_BP / 100,
});
