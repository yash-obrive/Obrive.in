import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  projectRequirement: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "account@obrive.com";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@obrive.in"; // Must be verified in Brevo

    if (!brevoApiKey) {
      console.log("New Contact Form Submission (Mock DB save):", data);
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Enquiry saved successfully. (Brevo API Key not configured, email was skipped.)" 
        },
        { status: 200 }
      );
    }

    const brevo = new BrevoClient({
      apiKey: brevoApiKey,
    });

    // 1. Email to Admin (Beautiful layout for Lead Data)
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `New Enquiry: ${data.name} - ${data.company || 'N/A'}`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f9fd; padding: 20px; border-radius: 8px;">
          <div style="background-color: #073933; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-weight: 600; letter-spacing: 1px;">NEW ENQUIRY RECEIVED</h2>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span><br/>
                  <strong style="color: #073933; font-size: 16px;">${data.name}</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</span><br/>
                  <strong style="color: #073933; font-size: 16px;">${data.company || 'N/A'}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span><br/>
                  <a href="mailto:${data.email}" style="color: #0066cc; font-size: 16px; text-decoration: none;"><strong>${data.email}</strong></a>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span><br/>
                  <strong style="color: #073933; font-size: 16px;">${data.phone || 'N/A'}</strong>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service of Interest</span><br/>
                  <strong style="color: #073933; font-size: 16px;">${data.service}</strong>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eef7ff;">
                  <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Project / Requirement</span><br/>
                  <strong style="color: #073933; font-size: 16px;">${data.projectRequirement || 'N/A'}</strong>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-left: 4px solid #073933; border-radius: 4px;">
              <span style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span><br/>
              <p style="color: #333333; font-size: 15px; line-height: 1.6; margin-top: 8px;">
                ${data.message.replace(/\n/g, '<br/>')}
              </p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888888; font-size: 12px;">
            This is an automated message from the Obrive Website.
          </div>
        </div>
      `,
      sender: { name: "Obrive System", email: senderEmail },
      to: [{ email: contactEmail, name: "Obrive Admin" }],
      replyTo: { email: data.email, name: data.name },
    });

    // 2. Auto-responder Email to User (Branded and Welcoming)
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `We've received your enquiry, ${data.name}!`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
          
          <div style="background-color: #073933; padding: 40px 20px; text-align: center;">
            <img src="https://files.catbox.moe/s3esp5.png" alt="Obrive Logo" width="120" style="display: block; margin: 0 auto; margin-bottom: 12px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">OBRIVE</h1>
            <p style="color: #a3c4c0; margin-top: 8px; font-size: 15px; font-weight: 400;">Innovation, Immersed.</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #073933; margin-top: 0; font-size: 22px;">Hello ${data.name},</h2>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to <strong>Obrive</strong>! We have successfully received your enquiry regarding <strong>${data.service}</strong>.
            </p>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Our team is currently reviewing your project requirements and will get back to you shortly to discuss how we can help bring your vision to life.
            </p>
            
            <div style="margin: 35px 0; text-align: center;">
              <a href="https://obrive.com" style="background-color: #073933; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
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
      sender: { name: "Obrive Support", email: senderEmail },
      to: [{ email: data.email, name: data.name }],
      replyTo: { email: contactEmail, name: "Obrive Admin" },
    });

    return NextResponse.json(
      { success: true, message: "Enquiry submitted and email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
