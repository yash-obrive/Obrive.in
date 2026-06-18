const { prisma } =
  require("../../../../prisma");
const { RoomServiceClient } = require("livekit-server-sdk");
const { normalizeRole } = require("../roomRolePolicy");

const livekitHost = process.env.LIVEKIT_URL || "http://localhost:7880";
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const removeParticipantService =
  async (payload) => {
    const {
      roomId,
      userId,
    } = payload;

    // ==========================
    // VALIDATE PARTICIPANT
    // ==========================

    const participant =
      await prisma.room_participants.findFirst(
        {
          where: {
            roomId:
              Number(roomId),

            userId:
              Number(userId),

            leftAt: null,
          },
        }
      );

    if (!participant) {
      throw new Error(
        "Participant not found in room"
      );
    }

    if (normalizeRole(participant.roomRole) === "admin") {
      throw new Error(
        "Cannot remove admin from room"
      );
    }

    // ==========================
    // REMOVE FROM ROOM
    // ==========================

    const updated =
      await prisma.room_participants.update(
        {
          where: {
            id: participant.id,
          },

          data: {
            leftAt: new Date(),
          },
        }
      );

    try {
      await roomService.removeParticipant(
        roomId.toString(),
        userId.toString()
      );
    } catch (lkError) {
      console.error(
        `[LiveKit Error] Failed to remove participant from media room: ${lkError.message}`
      );
    }

    return {
      success: true,
      data: updated,
      message:
        "User removed from room",
    };
  };

module.exports = {
  removeParticipantService,
};
