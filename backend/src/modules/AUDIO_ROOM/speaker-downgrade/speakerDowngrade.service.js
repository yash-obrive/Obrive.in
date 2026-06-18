const { prisma } = require("../../../../prisma");
const { RoomServiceClient } = require("livekit-server-sdk");
const { normalizeRole } = require("../roomRolePolicy");

const livekitHost = process.env.LIVEKIT_URL || "http://localhost:7880";
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const downgradeToListenerService = async (payload) => {
  const { roomId, userId } = payload;

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

  // ==========================
  // VERIFY NOT HOST
  // ==========================
  const currentRole = normalizeRole(participant.roomRole);
  if (currentRole === "host" || currentRole === "admin") {
    throw new Error("Cannot downgrade host or admin");
  }

  // ==========================
  // UPDATE ROLE TO LISTENER
  // ==========================
  const updated = await prisma.room_participants.update({
    where: {
      id: participant.id,
    },
    data: {
      roomRole: "listener",
      isMuted: true,
    },
  });

  // ================================================
  // STRIP LIVEKIT PUBLISHING PRIVILEGES LIVE
  // ================================================
  // Replace the LiveKit sync try-catch block inside speakerDowngrade.service.js with this:
  try {
    await roomService.updateParticipant(
      roomId.toString(),
      userId.toString(),
      JSON.stringify({ role: "listener", isMuted: true }), // 3rd argument
      {
        canPublish: false,                                  // 4th argument
        canPublishData: true,
        canSubscribe: true,
      }
    );
    
    console.log(`[LiveKit Sync] Demoted to listener. Room: ${roomId} | User: ${userId}`);
  } catch (lkError) {
    console.error(`[LiveKit Error] Failed to execute track drop: ${lkError.message}`);
  }

  return {
    success: true,
    data: updated,
    message: "Speaker downgraded to listener",
  };
};

module.exports = {
  downgradeToListenerService,
};
