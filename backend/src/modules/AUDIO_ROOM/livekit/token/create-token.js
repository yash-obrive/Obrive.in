const { AccessToken } = require("livekit-server-sdk");
const { canPublishAudio, normalizeRole } = require("../../roomRolePolicy");

const createLiveKitToken = async ({
  roomName,
  participantId,
  participantName,
  role,
}) => {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    const error = new Error("LiveKit credentials are not configured");
    error.status = 500;
    throw error;
  }

  const normalizedRole = normalizeRole(role) || "listener";
  const canPublish = canPublishAudio(normalizedRole);

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantId.toString(),
    name: participantName,
    metadata: JSON.stringify({ role: normalizedRole }), 
  });

  token.addGrant({
    room: roomName.toString(),
    roomJoin: true,
    canPublish: canPublish,       
    canPublishData: true,         
    canSubscribe: true,           
  });

  // Safe logging: No secret keys or JWT strings printed
  console.log(`[LiveKit Token] Generated initial token for Room: ${roomName} | User ID: ${participantId} | Role: ${normalizedRole} | Can Publish: ${canPublish}`);

  return await token.toJwt();
};

module.exports = {
  createLiveKitToken,
};
