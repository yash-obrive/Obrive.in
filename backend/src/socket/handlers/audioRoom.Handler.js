// backend/src/socket/handlers/audioRoom.Handler.js
const { prisma } = require("../../../prisma");
const {
  getRoomDetailsService,
} = require("../../modules/AUDIO_ROOM/room-details/roomDetails.service");

exports.registerAudioRoomHandler = (io, socket) => {
  const emitParticipantUpdate = async (roomId, userId) => {
    try {
      const roomDetails = await getRoomDetailsService(roomId, userId);

      io.to(`audio-room:${roomId}`).emit("participant_updated", {
        roomId: Number(roomId),
        participants: roomDetails.participants,
      });
    } catch (error) {
      console.error(`[Socket Participant Update Error]: ${error.message}`);
      socket.emit("room_error", {
        message: error.message,
        status: error.status || 500,
      });
    }
  };

  const hasOtherActiveSocketInRoom = (roomId, userId) =>
    Array.from(io.sockets.sockets.values()).some(
      (connectedSocket) =>
        connectedSocket.id !== socket.id &&
        Number(connectedSocket.user?.id) === Number(userId) &&
        Number(connectedSocket.currentRoomId) === Number(roomId),
    );

  // ==========================
  // JOIN AUDIO ROOM
  // ==========================
  socket.on("join_audio_room", async (payload, legacyUserId) => {
    try {
      const roomId = typeof payload === "object" ? payload.roomId : payload;
      const userId = Number(socket.user?.id);

      if (!roomId || !userId) {
        return;
      }

      socket.join(`audio-room:${roomId}`);
      socket.currentRoomId = Number(roomId);

      console.log(`User ${userId} joined room ${roomId}`);

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error(`Error processing join_audio_room: ${error.message}`);
      socket.emit("room_error", { message: error.message });
    }
  });

  // ==========================
  // LEAVE AUDIO ROOM
  // ==========================
  socket.on("leave_audio_room", async (payload, legacyUserId) => {
    try {
      const roomId = typeof payload === "object" ? payload.roomId : payload;
      const userId = Number(socket.user?.id);

      if (!roomId || !userId) {
        return;
      }

      await prisma.room_participants.updateMany({
        where: {
          roomId: Number(roomId),
          userId: userId,
          leftAt: null,
        },
        data: {
          leftAt: new Date(),
        },
      });

      socket.leave(`audio-room:${roomId}`);

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error(`Error processing leave_audio_room: ${error.message}`);
    }
  });

  // ==========================
  // MIC TOGGLE
  // ==========================
  socket.on("audio_mic_toggle", async (payload) => {
    try {
      const roomId = Number(payload?.roomId);
      const userId = Number(socket.user?.id);
      const isMuted = Boolean(payload?.isMuted);

      if (!roomId || !userId) {
        return;
      }

      await prisma.room_participants.updateMany({
        where: {
          roomId,
          userId,
          leftAt: null,
          roomRole: {
            in: ["admin", "host", "moderator", "speaker"],
          },
        },
        data: {
          isMuted,
          isSpeaking: !isMuted,
        },
      });

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error(`Error processing audio_mic_toggle: ${error.message}`);
    }
  });

  // ==========================
  // SPEAKING UPDATE
  // ==========================
  socket.on("audio_speaking_update", async (payload) => {
    try {
      const roomId = Number(payload?.roomId);
      const userId = Number(socket.user?.id);
      const isSpeaking = Boolean(payload?.isSpeaking);

      if (!roomId || !userId) {
        return;
      }

      await prisma.room_participants.updateMany({
        where: {
          roomId,
          userId,
          leftAt: null,
        },
        data: {
          isSpeaking,
        },
      });

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error(`Error processing audio_speaking_update: ${error.message}`);
    }
  });

  // ==========================
  // MODERATOR MUTE
  // ==========================
  socket.on("audio_moderator_mute", async (payload) => {
    try {
      const roomId = Number(payload?.roomId);
      const targetUserId = Number(payload?.targetUserId);

      if (!roomId || !targetUserId) {
        return;
      }

      const moderator = await prisma.room_participants.findFirst({
        where: {
          roomId,
          userId: Number(socket.user?.id),
          leftAt: null,
          roomRole: {
            in: ["host", "moderator", "admin"],
          },
        },
      });

      if (!moderator) {
        return;
      }

      await prisma.room_participants.updateMany({
        where: {
          roomId,
          userId: targetUserId,
          leftAt: null,
        },
        data: {
          isMuted: true,
          isSpeaking: false,
        },
      });

      await emitParticipantUpdate(roomId, targetUserId);
    } catch (error) {
      console.error(`Error processing audio_moderator_mute: ${error.message}`);
    }
  });

  // ==========================
  // DISCONNECT
  // ==========================
  socket.on("disconnect", async () => {
    try {
      const roomId = socket.currentRoomId;
      if (!roomId || !socket.user?.id) return;

      if (hasOtherActiveSocketInRoom(roomId, socket.user.id)) {
        return;
      }

      await prisma.room_participants.updateMany({
        where: {
          roomId,
          userId: Number(socket.user.id),
          leftAt: null,
        },
        data: {
          leftAt: new Date(),
        },
      });

      await emitParticipantUpdate(roomId, socket.user.id);
      console.log(`User ${socket.user.id} disconnected from room ${roomId}`);
    } catch (error) {
      console.error(`Error processing disconnect: ${error.message}`);
    }
  });
};
