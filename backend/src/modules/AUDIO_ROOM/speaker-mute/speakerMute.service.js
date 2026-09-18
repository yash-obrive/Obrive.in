const { prisma } = require("../../../../db");
const { RoomServiceClient } = require("livekit-server-sdk");
const { canPublishAudio, normalizeRole } = require("../roomRolePolicy");
const { canModerateTarget } = require("../audioRoomAuthz");

const livekitHost = process.env.LIVEKIT_URL || "http://localhost:7880";
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const muteUnmuteService = async (payload) => {
  const { roomId, userId, isMuted, actorUserId } = payload;

  if (actorUserId && !(await canModerateTarget(roomId, actorUserId, userId))) {
    throw new Error("You cannot moderate this participant");
  }

  // ==========================
  // VALIDATE PARTICIPANT
  // ==========================
  const participant = await prisma.room_participants.findFirst({
    where: {
      roomId: Number(roomId),
      userId: Number(userId),
      leftAt: null,
    },
  });

  if (!participant) {
    throw new Error("Participant not found in room");
  }

  const currentRole = normalizeRole(participant.roomRole) || "listener";

  if (currentRole === "admin") {
    throw new Error("Cannot mute or unmute admin");
  }

  if (!canPublishAudio(currentRole)) {
    throw new Error("Only hosts, moderators, admins, or speakers can be muted");
  }

  // ==========================
  // UPDATE MUTE STATUS
  // ==========================
  const updated = await prisma.room_participants.update({
    where: {
      id: participant.id,
    },
    data: {
      isMuted: Boolean(isMuted),
    },
  });

  // ============================================
  // SYNC MEDIA ROUTER PERMISSIONS LIVE
  // ============================================
  // Replace the LiveKit sync try-catch block inside speakerMute.service.js with this:
  // Replace the LiveKit sync try-catch block inside speakerMute.service.js with this:
  try {
    await roomService.updateParticipant(
      roomId.toString(),
      userId.toString(),
      JSON.stringify({ role: currentRole, isMuted: Boolean(isMuted) }), // 3rd argument
      {
        canPublish: canPublishAudio(currentRole),                       // 4th argument
        canPublishData: true,
        canSubscribe: true,
      }
    );

    console.log(`[LiveKit Sync] Mute pushed. Room: ${roomId} | User: ${userId} | Muted: ${isMuted}`);
  } catch (lkError) {
    console.error(`[LiveKit Error] Failed to sync dynamic mute permissions: ${lkError.message}`);
  }

  return {
    success: true,
    data: updated,
    message: isMuted ? "Speaker muted" : "Speaker unmuted",
  };
};

module.exports = {
  muteUnmuteService,
};
