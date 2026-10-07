const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getBoss } = require("../workers/queue");
const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = process.env.CREDENTIAL_SECRET_KEY || crypto.randomBytes(32); // In prod, this must be 32 bytes from env

/**
 * Security utilities for OBLINK AI.
 * Handles credential encryption/decryption at rest.
 */
class ObriveSecurity {
  /**
   * Encrypts plaintext credentials before storing in the database.
   */
  static encryptCredential(text) {
    if (!text) return null;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(SECRET_KEY, "hex"),
      iv,
    );

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    // Format: iv:authTag:encryptedData
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts credentials retrieved from the database.
   */
  static decryptCredential(encryptedData) {
    if (!encryptedData) return null;

    const parts = encryptedData.split(":");
    if (parts.length !== 3) throw new Error("Invalid encrypted data format");

    const iv = Buffer.from(parts[0], "hex");
    const authTag = Buffer.from(parts[1], "hex");
    const encryptedText = parts[2];

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(SECRET_KEY, "hex"),
      iv,
    );
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

module.exports = ObriveSecurity;
