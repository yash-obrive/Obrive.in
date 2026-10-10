// backend/src/modules/auth/auth.service.js
const { prisma } = require("../../../db");
const bcrypt = require("bcrypt");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");

// Employee / HR / Admin / Supervisor login
exports.loginUser = async ({ email, password, ip, userAgent }) => {
  //ip and userAgent are optional parameters for logging purposes
  // Use raw query to find user by email
  const result = await prisma.$queryRaw`
    SELECT id, userid, email, name, role, password, status, is_active
    FROM users 
    WHERE email = ${email} AND (role = 'employee' OR role = 'hr' OR role = 'admin' OR role = 'supervisor')
    LIMIT 1
  `;

  const user = result[0];

  if (!user) {
    throw { status: 401, message: "Invalid credentials or inactive account" };
  }

  if (user.is_active === false || user.status === "inactive") {
    throw {
      status: 403,
      message: "Account blocked. Contact admin or supervisor",
    };
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw { status: 401, message: "Invalid credentials" };
  }

  // Log login
  let log = null;
  try {
    const logResult = await prisma.login_logs.create({
      data: {
        userId: user.id,
        ipAddress: ip,
        userAgent: userAgent,
        loginTime: new Date()
      }
    });
    log = logResult;
  } catch (_err) {
    console.log("Login log not recorded - table might not exist");
  }

  const payload = { id: user.id, role: user.role, logId: log?.id };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ id: user.id });

  return {
    accessToken,
    refreshToken,
    logId: log?.id,
    user: {
      id: user.id,
      userid: user.userid,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

exports.loginClient = async ({ clientId, password }) => {
  const result = await prisma.$queryRaw`
    SELECT id, userid, email, name, role, password, status 
    FROM users 
    WHERE (email = ${clientId} OR userid = ${clientId}) AND role = 'client'
    LIMIT 1
  `;

  const client = result[0];

  if (!client || client.status === "inactive") {
    throw { status: 401, message: "Invalid client credentials" };
  }

  const isValid = await bcrypt.compare(password, client.password);

  if (!isValid) {
    throw { status: 401, message: "Invalid client credentials" };
  }

  const payload = { id: client.id, role: "client", clientId: client.userid };
  const accessToken = signAccessToken(payload);

  return {
    accessToken,
    client: {
      id: client.id,
      clientId: client.userid,
      name: client.name,
      email: client.email,
    },
  };
};

// Logout
exports.logout = async ({ userId, logId }) => {
  try {
    const log = await prisma.login_logs.findFirst({
      where: {
        userId,
        id: logId,
        logoutTime: null,
      },
    });

    if (!log) throw { status: 404, message: "Active session not found" };

    const logoutTime = new Date();
    const sessionDuration = Math.floor((logoutTime - log.loginTime) / 1000);

    await prisma.login_logs.update({
      where: { id: logId },
      data: {
        logoutTime,
        sessionDuration,
      },
    });

    return { sessionDuration, message: "Logged out successfully" };
  } catch (_err) {
    throw { status: 404, message: "Active session not found" };
  }
};

// Get current user with full details (used by /auth/me endpoint)
exports.getCurrentUserDetails = async (userId) => {
  try {
    const user = await prisma.$queryRaw`
      SELECT id, userid, email, name, role, status, is_active, avatar_url, is_location_tracking_enabled
      FROM users 
      WHERE id = ${userId}
      LIMIT 1
    `;

    if (!user[0]) {
      throw { status: 401, message: "User not found" };
    }

    return {
      id: user[0].id,
      userid: user[0].userid,
      email: user[0].email,
      name: user[0].name,
      role: user[0].role,
      status: user[0].status,
      is_active: user[0].is_active,
      avatar_url: user[0].avatar_url,
      is_location_tracking_enabled: Boolean(
        user[0].is_location_tracking_enabled,
      ),
    };
  } catch (_err) {
    throw { status: 401, message: "Failed to fetch user details" };
  }
};

// Refresh token
exports.refreshToken = async (token) => {
  try {
    const payload = verifyRefreshToken(token);
    const user = await prisma.$queryRaw`
      SELECT id, role, status, is_active FROM users WHERE id = ${payload.id} LIMIT 1
    `;

    if (!user[0]) throw { status: 401, message: "User not found" };
    if (user[0].is_active === false || user[0].status === "inactive") {
      throw { status: 403, message: "Account blocked" };
    }

    const newAccess = signAccessToken({ id: user[0].id, role: user[0].role });
    return { accessToken: newAccess };
  } catch {
    throw { status: 403, message: "Invalid or expired refresh token" };
  }
};

// Get all users for admin/HR (FIXED)
exports.getAllUsers = async () => {
  const result = await prisma.$queryRaw`
    SELECT 
      id,
      userid,
      email,
      name,
      role,
      status,
      job_title,
      department,
      date_of_birth,
      bio,
      phone_number,
      created_at,
      avatar_url
    FROM users
    ORDER BY created_at DESC
  `;

  return result;
};

exports.forgotPassword = async (email) => {
  if (!email) return;
  const userResult = await prisma.$queryRaw`SELECT id, email, name FROM users WHERE email = ${email} LIMIT 1`;
  const user = userResult[0];
  if (!user) return; // Prevent email enumeration

  // Rate limiting check
  const recentRequests = await prisma.password_resets.count({
    where: {
      userId: user.id,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) } // Last 15 mins
    }
  });

  if (recentRequests >= 3) {
    throw { status: 429, message: "Too many requests. Please try again later." };
  }

  // Invalidate older OTPs for this user
  await prisma.password_resets.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true, used_at: new Date() }
  });

  const crypto = require("crypto");
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otp_hash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.password_resets.create({
    data: {
      otp_hash,
      userId: user.id,
      expiresAt,
      attempt_count: 0
    }
  });

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (brevoApiKey) {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Obrive Security", email: process.env.BREVO_SENDER_EMAIL || "account@obrive.in" },
        to: [{ email: user.email, name: user.name || "User" }],
        subject: "Your Password Reset OTP",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #074139;">Obrive Password Reset</h2>
            <p>You requested to reset your password. Use the following One-Time Password (OTP) to proceed:</p>
            <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #334155; margin: 20px 0; border-radius: 4px;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p style="color: #64748b; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `
      })
    });
  }
};

exports.verifyOtp = async (email, otp) => {
  if (!email || !otp) throw { status: 400, message: "Email and OTP are required" };
  
  const userResult = await prisma.$queryRaw`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
  const user = userResult[0];
  if (!user) throw { status: 400, message: "Invalid email or OTP" };

  const resetRecord = await prisma.password_resets.findFirst({
    where: { userId: user.id, used: false },
    orderBy: { createdAt: 'desc' }
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    throw { status: 400, message: "OTP expired or invalid" };
  }

  if (resetRecord.attempt_count >= 5) {
    // Invalidate
    await prisma.password_resets.update({ where: { id: resetRecord.id }, data: { used: true, used_at: new Date() } });
    throw { status: 429, message: "Too many failed attempts. Please request a new OTP." };
  }

  const isValid = await bcrypt.compare(otp, resetRecord.otp_hash);

  if (!isValid) {
    await prisma.password_resets.update({
      where: { id: resetRecord.id },
      data: { attempt_count: { increment: 1 } }
    });
    throw { status: 400, message: "Invalid email or OTP" };
  }

  // Return a temporary token (optional) or just success if they are verified.
  return { success: true, message: "OTP verified" };
};

exports.resetPassword = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) throw { status: 400, message: "Missing required fields" };

  const userResult = await prisma.$queryRaw`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
  const user = userResult[0];
  if (!user) throw { status: 400, message: "Invalid request" };

  const resetRecord = await prisma.password_resets.findFirst({
    where: { userId: user.id, used: false },
    orderBy: { createdAt: 'desc' }
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    throw { status: 400, message: "OTP expired or invalid" };
  }

  if (resetRecord.attempt_count >= 5) {
    throw { status: 429, message: "Too many failed attempts. Please request a new OTP." };
  }

  const isValid = await bcrypt.compare(otp, resetRecord.otp_hash);
  if (!isValid) {
    await prisma.password_resets.update({
      where: { id: resetRecord.id },
      data: { attempt_count: { increment: 1 } }
    });
    throw { status: 400, message: "Invalid email or OTP" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.users.update({
      where: { id: user.id },
      data: { password: hashedPassword, updated_at: new Date() }
    }),
    prisma.password_resets.update({
      where: { id: resetRecord.id },
      data: { used: true, used_at: new Date() }
    })
  ]);
  
  return { success: true, message: "Password reset successfully" };
};
