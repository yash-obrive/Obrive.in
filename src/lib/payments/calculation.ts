/**
 * calculation.ts
 * ─────────────────────────────────────────────────────────────────
 * SINGLE server-side source of truth for Obrive payment breakdown.
 *
 * ALL input and output values are INTEGER PAISE (₹1 = 100 paise).
 * baseAmount passed in MUST already be in paise — do NOT multiply by 100.
 */

// Rate configuration in BASIS POINTS (10000 bp = 100%)
const SERVICE_GST_RATE_BP = 1800; // 18%
const PAYMENT_GATEWAY_FEE_RATE_BP = 200; // 2%
const PAYMENT_GATEWAY_FEE_GST_RATE_BP = 1800; // 18%

export interface PaymentBreakdown {
  baseAmount: number;
  serviceGst: number;
  gatewayFee: number;
  gatewayFeeGst: number;
  gatewayCharges: number;
  totalAmount: number;
}

export function calculatePaymentBreakdown(baseAmountPaise: number): PaymentBreakdown {
  if (
    typeof baseAmountPaise !== "number" ||
    !Number.isInteger(baseAmountPaise) ||
    baseAmountPaise <= 0
  ) {
    throw new Error(
      `calculatePaymentBreakdown: baseAmountPaise must be a positive integer (got ${baseAmountPaise})`,
    );
  }

  const serviceGst = Math.round((baseAmountPaise * SERVICE_GST_RATE_BP) / 10000);
  const gatewayFee = Math.round((baseAmountPaise * PAYMENT_GATEWAY_FEE_RATE_BP) / 10000);
  const gatewayFeeGst = Math.round((gatewayFee * PAYMENT_GATEWAY_FEE_GST_RATE_BP) / 10000);
  const gatewayCharges = gatewayFee + gatewayFeeGst;
  const totalAmount = baseAmountPaise + serviceGst + gatewayCharges;

  return {
    baseAmount: baseAmountPaise,
    serviceGst,
    gatewayFee,
    gatewayFeeGst,
    gatewayCharges,
    totalAmount,
  };
}

export const RATE_CONFIG = Object.freeze({
  serviceGstRateBp: SERVICE_GST_RATE_BP,
  gatewayFeeRateBp: PAYMENT_GATEWAY_FEE_RATE_BP,
  gatewayFeeGstRateBp: PAYMENT_GATEWAY_FEE_GST_RATE_BP,
  serviceGstPct: SERVICE_GST_RATE_BP / 100,
  gatewayFeePct: PAYMENT_GATEWAY_FEE_RATE_BP / 100,
  gatewayFeeGstPct: PAYMENT_GATEWAY_FEE_GST_RATE_BP / 100,
});
