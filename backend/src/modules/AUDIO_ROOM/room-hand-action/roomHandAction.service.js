const { prisma } = require("../../../../db");
const { getIO } = require("../../../socket");
const { getPendingHandRequestsService } = require("../room-hand-requests/roomHandRequests.service");
const { getRoomDetailsService } = require("../room-details/roomDetails.service");
const { RoomServiceClient } = require("livekit-server-sdk");
const { persistSpecificUserRoomRole } = require("../roomRolePolicy");

const livekitHost = process.env.LIVEKIT_URL || "http://localhost:7880";
const roomService = new RoomServiceClient(
  livekitHost,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const emitHandRaiseUpdated = async (roomId) => {
  const pendingHandRaises = await getPendingHandRequestsService(roomId);
  const io = getIO();

  io.to(`audio-room:${roomId}`).emit("hand_raise_updated", {
    roomId: Number(roomId),
    pendingHandRaises,
  });

  return pendingHandRaises;
};

const handleHandRequestActionService = async (payload) => {
  const { requestId, roomId, action } = payload;

  if (action !== "approve" && action !== "reject") {
    throw new Error("Invalid hand request action");
  }

  const request = await prisma.room_hand_raises.findFirst({
    where: {
      id: Number(requestId),
      roomId: Number(roomId),
      status: "pending",
    },
  });

  if (!request) {
    throw new Error("Pending hand request not found");
  }

  const status = action === "approve" ? "approved" : "rejected";

  const result = await prisma.$transaction(async (tx) => {
    const updatedRequest = await tx.room_hand_raises.update({
      where: { id: request.id },
      data: {
        status,
        respondedAt: new Date(),
      },
    });

    if (action === "approve") {
      await tx.room_participants.updateMany({
        where: {
          roomId: Number(roomId),
          userId: request.userId,
          leftAt: null,
        },
        data: {
          roomRole: "speaker", // Lowercase to match your database conventions
          isMuted: true,       // Approved speakers start muted to protect overall room levels
          isSpeaking: false,
        },
      });

      await persistSpecificUserRoomRole({
        tx,
        roomId,
        userId: request.userId,
        roomRole: "speaker",
      });
    }

    return updatedRequest;
  });

  const pendingHandRaises = await emitHandRaiseUpdated(roomId);

  if (action === "approve") {
    // ========================================================
    // ELEVATE LIVEKIT MEDIA ROUTER PERMISSIONS LIVE
    // ========================================================
    // Replace the LiveKit sync try-catch block inside roomHandAction.service.js with this:
    try {
      await roomService.updateParticipant(
        roomId.toString(),
        request.userId.toString(),
        JSON.stringify({ role: "speaker", isMuted: true }), // 3rd argument: metadata string
        {
          canPublish: true,      // 4th argument: permissions object
          canPublishData: true,
          canSubscribe: true,
        }
      );

      console.log(`[LiveKit Sync] Hand Request Approved. Room: ${roomId} | Promoted Speaker Identity: ${request.userId}`);
    } catch (lkError) {
      console.error(`[LiveKit Error] Failed to elevate streaming track rules: ${lkError.message}`);
    }

    const roomDetails = await getRoomDetailsService(roomId, request.userId);
    const io = getIO();

    io.to(`audio-room:${roomId}`).emit("participant_updated", {
      roomId: Number(roomId),
      participants: roomDetails.participants,
    });
  } else {
    console.log(`[Hand Request] Action complete. Room: ${roomId} | Request ${requestId} was: ${status}`);
  }

  return {
    request: result,
    pendingHandRaises,
  };
};

module.exports = {
  emitHandRaiseUpdated,
  handleHandRequestActionService,
};
