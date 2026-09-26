import { type NextRequest, NextResponse } from "next/server";
import { validateGstin } from "@/lib/payments/gstin";

/**
 * POST /api/payments/verify-gst
 *
 * Validates a GSTIN for structural format and checksum.
 *
 * IMPORTANT: This endpoint performs format + checksum validation ONLY.
 * It does NOT:
 *  - verify active registration against the GSTN portal
 *  - confirm taxpayer identity, legal name, or filing status
 *  - guarantee GST exemption or reverse-charge eligibility
 *
 * Request body: { gstin: string }
 *
 * Response (valid):
 *   { valid: true, message: "GSTIN format verified" }
 *
 * Response (invalid):
 *   { valid: false, message: "Invalid GSTIN format" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawGstin: string = body?.gstin ?? "";

    if (typeof rawGstin !== "string") {
      return NextResponse.json(
        { valid: false, message: "gstin must be a string" },
        { status: 400 }
      );
    }

    const result = validateGstin(rawGstin);

    return NextResponse.json(
      { valid: result.valid, message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error("verify-gst error:", error);
    return NextResponse.json(
      { valid: false, message: "Validation request failed" },
      { status: 500 }
    );
  }
}
