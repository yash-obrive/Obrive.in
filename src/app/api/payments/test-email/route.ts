import { type NextRequest, NextResponse } from "next/server";
import { sendPaymentConfirmationEmails, type OrderData } from "@/lib/email/payment-email";

export async function GET(req: NextRequest) {
  try {
    const orderData: OrderData = {
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
      customerEmail: "yashveer@obrive.com", 
      customerPhone: "8873394750",
    };

    await sendPaymentConfirmationEmails(orderData);
    
    return NextResponse.json(
      { success: true, message: "Test email triggered successfully natively from Vercel!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
