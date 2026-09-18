import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerData,
      packageData,
      amount
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 503 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Payment is verified — Send Emails using Brevo
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey && customerData && packageData) {
      const contactEmail = process.env.CONTACT_EMAIL || "account@obrive.com";
      const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@obrive.in";
      
      const brevo = new BrevoClient({ apiKey: brevoApiKey });
      const fullName = `${customerData.firstName} ${customerData.lastName}`;
      const amountInRupees = (amount / 100).toFixed(2);

      // 1. Email to Admin (New Payment Received)
      await brevo.transactionalEmails.sendTransacEmail({
        subject: `New Payment Received: ₹${amountInRupees} - ${fullName}`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f9fd; padding: 20px; border-radius: 8px;">
            <div style="background-color: #073933; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-weight: 600; letter-spacing: 1px;">NEW PAYMENT VERIFIED</h2>
            </div>
            <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Name</span><br/>
                    <strong style="color: #073933; font-size: 16px;">${fullName}</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</span><br/>
                    <strong style="color: #073933; font-size: 16px;">${customerData.company || 'N/A'}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span><br/>
                    <a href="mailto:${customerData.email}" style="color: #0066cc; font-size: 16px; text-decoration: none;"><strong>${customerData.email}</strong></a>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span><br/>
                    <strong style="color: #073933; font-size: 16px;">${customerData.phone || 'N/A'}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service / Plan</span><br/>
                    <strong style="color: #073933; font-size: 16px;">${packageData.name}</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Amount Paid</span><br/>
                    <strong style="color: #073933; font-size: 16px;">₹${amountInRupees}</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                    <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Payment ID</span><br/>
                    <span style="color: #4a5568; font-size: 14px; font-family: monospace;">${razorpay_payment_id}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `,
        sender: { name: "Obrive Payments", email: senderEmail },
        to: [{ email: contactEmail, name: "Obrive Admin" }],
        replyTo: { email: customerData.email, name: fullName },
      });

      // 2. Email to User (Beautiful Payment Receipt)
      await brevo.transactionalEmails.sendTransacEmail({
        subject: `Payment Receipt: ${packageData.name} - Obrive`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
            
            <div style="background-color: #073933; padding: 40px 20px; text-align: center;">
              <img src="https://files.catbox.moe/s3esp5.png" alt="Obrive Logo" width="120" style="display: block; margin: 0 auto; margin-bottom: 12px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">OBRIVE</h1>
              <p style="color: #a3c4c0; margin-top: 8px; font-size: 15px; font-weight: 400;">Payment Successful.</p>
            </div>
            
            <div style="padding: 40px 30px;">
              <h2 style="color: #073933; margin-top: 0; font-size: 22px;">Hello ${customerData.firstName},</h2>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for choosing <strong>Obrive</strong>. Your payment for <strong>${packageData.name}</strong> has been successfully processed. 
              </p>
              
              <div style="margin: 30px 0; background-color: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #073933;">
                <h3 style="color: #073933; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Receipt Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Amount Paid</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #073933;">₹${amountInRupees}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Service</td>
                    <td style="padding: 8px 0; text-align: right; color: #333333;">${packageData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Payment ID</td>
                    <td style="padding: 8px 0; text-align: right; font-family: monospace; color: #333333;">${razorpay_payment_id}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                Our team will be in touch with you shortly to proceed with the next steps of your project.
              </p>
              
              <div style="margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 30px;">
              <p style="margin: 0 0 5px 0; color: #073933; font-weight: 700; font-size: 15px;">Thank You</p>
              <p style="margin: 0 0 5px 0; color: #333333; font-size: 15px;">Warm Regards</p>
              <p style="margin: 0 0 5px 0; color: #000000; font-weight: 700; font-size: 15px;">HON II DR. MALAKH JIBRAIL</p>
              <p style="margin: 0 0 20px 0; color: #000000; font-weight: 700; font-size: 15px;">CHIEF EXECUTIVE OFFICER</p>
              
              <img src="https://files.catbox.moe/e9cw54.png" alt="Obrive Industries Private Limited" style="max-width: 250px; display: block; margin-bottom: 15px;" />
              
              <p style="margin: 0 0 15px 0; color: #000000; font-weight: 700; font-size: 15px;">SREE GURURAYA MANSION</p>
              
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px;">3<sup>rd</sup> Floor, No 759, 8<sup>th</sup> Main Road</p>
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px;">KSRTC Layout, 3<sup>rd</sup> Phase</p>
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px;">JP Nagar, Bengaluru, Karnataka – 560078</p>
              
              <p style="margin: 0 0 5px 0; color: #333333; font-size: 15px;">Connect Me : <a href="tel:+919886944447" style="color: #0056b3; text-decoration: underline;">+91 988-6944-447</a></p>
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px;">Connect Us : <a href="tel:+918884774300" style="color: #0056b3; text-decoration: underline;">+91 888-4774-300</a></p>
              
              <p style="margin: 0 0 15px 0; color: #000000; font-weight: 700; font-size: 15px;">Visit Us at : <a href="http://www.obrive.com" style="color: #0056b3; text-decoration: underline; font-weight: 700;">www.obrive.com</a> / <a href="http://www.obrive.in" style="color: #0056b3; text-decoration: underline; font-weight: 700;">www.obrive.in</a></p>
              
              <p style="margin: 0 0 0 0; color: #000000; font-weight: 700; font-size: 15px;">Our Brands : <a href="http://www.obnov.in" style="color: #0056b3; text-decoration: underline; font-weight: 700;">www.obnov.in</a> / <a href="http://www.obzor.in" style="color: #0056b3; text-decoration: underline; font-weight: 700;">www.obzor.in</a></p>
            </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #eaeaea;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Obrive Industries Private Limited.<br/>
                Bangalore, Karnataka, India
              </p>
            </div>
          </div>
        `,
        sender: { name: "Obrive Billing", email: senderEmail },
        to: [{ email: customerData.email, name: fullName }],
        replyTo: { email: contactEmail, name: "Obrive Admin" },
      });
    }

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
