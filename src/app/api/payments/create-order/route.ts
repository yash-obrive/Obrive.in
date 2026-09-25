import { type NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { PRICING_STREAMS } from "@/constants/pages/pricingData";
import { calculatePaymentBreakdown } from "@/lib/payments/calculation";

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
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

    // Server-side authoritative price calculation.
    // priceINR is typically INR. Multiply by 100 for paise.
    const priceINR = packageDetails.priceINR;
    const baseAmountPaise = priceINR * 100;
    const breakdown = calculatePaymentBreakdown(baseAmountPaise);

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
        company: company || "",
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
        keyId: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        currency,
        packageId: packageDetails.id,
        packageName: packageDetails.name,
        baseAmount: breakdown.baseAmount,
        serviceGst: breakdown.serviceGst,
        gatewayFee: breakdown.gatewayFee,
        gatewayFeeGst: breakdown.gatewayFeeGst,
        gatewayCharges: breakdown.gatewayCharges,
        totalAmount: breakdown.totalAmount,
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
