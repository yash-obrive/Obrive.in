/**
 * gstin.ts
 * ─────────────────────────────────────────────────────────────────
 * GSTIN structural format + checksum validation.
 *
 * IMPORTANT: This validates the FORMAT and CHECKSUM of a GSTIN only.
 * It does NOT:
 *  - verify active GST registration with the government portal
 *  - confirm the taxpayer's identity or legal name
 *  - validate against the GSTN database
 *
 * This is purely a client-supplied string format check.
 *
 * GSTIN format (15 characters):
 *   - Positions 1–2  : State code (01–37, numeric)
 *   - Positions 3–12 : PAN of the taxpayer (AAAAA9999A — 5 alpha, 4 numeric, 1 alpha)
 *   - Position 13    : Entity number (1–9 or A–Z)
 *   - Position 14    : Always 'Z'
 *   - Position 15    : Checksum digit (0–9 or A–Z)
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * Valid state codes per GST council as of this implementation.
 * Includes special economic zones (96, 97, 99).
 */
const VALID_STATE_CODES = new Set([
  "01","02","03","04","05","06","07","08","09","10",
  "11","12","13","14","15","16","17","18","19","20",
  "21","22","23","24","25","26","27","28","29","30",
  "31","32","33","34","35","36","37","38",
  "97","99",
]);

/**
 * GSTIN structural regex.
 * Two-digit state code + 5 alpha + 4 digit + 1 alpha + 1 alphanumeric + Z + 1 alphanumeric.
 */
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

/** The character set used for checksum calculation (Luhn-like, base-36). */
const GSTIN_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Validate the GSTIN check digit using the algorithm specified in the GST documentation.
 * This is a Luhn-like checksum over the 15-character GSTIN.
 *
 * @param gstin - Normalised uppercase 15-char GSTIN string.
 * @returns true if checksum is valid.
 */
function validateGstinChecksum(gstin: string): boolean {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const charIndex = GSTIN_CHARS.indexOf(gstin[i]);
    if (charIndex === -1) return false;
    const product = charIndex * ((i % 2 === 0) ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }
  const expectedCheckCharIndex = (36 - (sum % 36)) % 36;
  const expectedCheckChar = GSTIN_CHARS[expectedCheckCharIndex];
  return gstin[14] === expectedCheckChar;
}

export interface GstinValidationResult {
  /** Whether the GSTIN passes structural format + checksum validation. */
  valid: boolean;
  /** Normalised (uppercase, trimmed) GSTIN, or null if empty input. */
  normalised: string | null;
  /** Human-readable message — never claims government/portal verification. */
  message: string;
}

/**
 * Validate a GSTIN string for structural format and checksum.
 *
 * This function:
 *  1. Normalises: trims whitespace, converts to uppercase.
 *  2. Validates length (must be 15 characters).
 *  3. Validates structural regex (state code + PAN + entity + Z + check digit).
 *  4. Validates that the state code is a known value.
 *  5. Validates the checksum digit.
 *
 * It does NOT contact any external API or government portal.
 *
 * @param rawGstin - Raw user-supplied GSTIN string.
 * @returns GstinValidationResult
 */
export function validateGstin(rawGstin: string): GstinValidationResult {
  if (!rawGstin || rawGstin.trim().length === 0) {
    return { valid: false, normalised: null, message: "GSTIN is required" };
  }

  const normalised = rawGstin.trim().toUpperCase();

  if (normalised.length !== 15) {
    return {
      valid: false,
      normalised,
      message: `GSTIN must be 15 characters (got ${normalised.length})`,
    };
  }

  if (!GSTIN_REGEX.test(normalised)) {
    return {
      valid: false,
      normalised,
      message: "Invalid GSTIN format",
    };
  }

  const stateCode = normalised.substring(0, 2);
  if (!VALID_STATE_CODES.has(stateCode)) {
    return {
      valid: false,
      normalised,
      message: `Invalid state code: ${stateCode}`,
    };
  }

  if (!validateGstinChecksum(normalised)) {
    return {
      valid: false,
      normalised,
      message: "Invalid GSTIN — checksum verification failed",
    };
  }

  return {
    valid: true,
    normalised,
    message: "GSTIN format verified",
  };
}
