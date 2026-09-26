import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmails, type ContactData } from "@/lib/email/contact-email";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  projectRequirement: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters long"),
});

// Simple rate limiter implementation using a Map
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 },
      );
    }

    const data = result.data as ContactData;
    
    // Check if BREVO_API_KEY exists without exposing it to the client
    if (!process.env.BREVO_API_KEY) {
      if (process.env.NODE_ENV === "production") {
        console.error("Contact Form Submission Error: BREVO_API_KEY is missing in production.");
        return NextResponse.json(
          { success: false, error: "Contact service is not configured." },
          { status: 500 },
        );
      }
      
      console.log("New Contact Form Submission (Mock mode):", data);
      return NextResponse.json(
        { success: true, message: "Enquiry saved successfully. (Brevo API Key not configured, email was skipped.)" },
        { status: 200 },
      );
    }

    // Send emails using the shared server-side utility
    await sendContactEmails(data);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted and email sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again later." },
      { status: 500 },
    );
  }
}

