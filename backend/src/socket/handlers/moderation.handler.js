const {
  getRoomDetailsService,
} = require("../../modules/AUDIO_ROOM/room-details/roomDetails.service");
const {
  canModerateTarget,
  canModerateRoom,
} = require("../../modules/AUDIO_ROOM/audioRoomAuthz");
const {
  muteUnmuteService,
} = require("../../modules/AUDIO_ROOM/speaker-mute/speakerMute.service");
const {
  downgradeToListenerService,
} = require("../../modules/AUDIO_ROOM/speaker-downgrade/speakerDowngrade.service");
const {
  removeParticipantService,
} = require("../../modules/AUDIO_ROOM/participant-remove/participantRemove.service");

exports.registerModerationHandler = (io, socket) => {
  const emitParticipantUpdate = async (roomId, userId) => {
    const roomDetails = await getRoomDetailsService(roomId, userId);

    io.to(`audio-room:${roomId}`).emit("participant_updated", {
      roomId: Number(roomId),
      participants: roomDetails.participants,
    });
  };

  // ==========================
  // MUTE SPEAKER
  // ==========================

  socket.on("mute_speaker", async (data) => {
    const { roomId, userId } = data;

    if (!roomId || !userId) {
      console.error("❌ Missing roomId or userId for mute_speaker");
      return;
    }

    try {
      if (!(await canModerateRoom(roomId, socket.user?.id))) {
        socket.emit("audio_room_error", {
          message: "Only hosts or moderators can mute speakers",
        });
        return;
      }

      if (!(await canModerateTarget(roomId, socket.user?.id, userId))) {
        socket.emit("audio_room_error", {
          message: "You cannot moderate this participant",
        });
        return;
      }

      await muteUnmuteService({
        roomId,
        userId,
        isMuted: true,
        actorUserId: socket.user?.id,
      });

      console.log(
        `✅ User ${userId} muted in room ${roomId}`
      );

      io.to(`audio-room:${roomId}`).emit(
        "speaker_muted",
        {
          userId: Number(userId),
          isMuted: true,
          roomId: Number(roomId),
        }
      );

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error("❌ Mute speaker error:", error);
    }
  });

  // ==========================
  // UNMUTE SPEAKER
  // ==========================

  socket.on("unmute_speaker", async (data) => {
    const { roomId, userId } = data;

    if (!roomId || !userId) {
      console.error("❌ Missing roomId or userId for unmute_speaker");
      return;
    }

    try {
      if (!(await canModerateRoom(roomId, socket.user?.id))) {
        socket.emit("audio_room_error", {
          message: "Only hosts or moderators can unmute speakers",
        });
        return;
      }

      if (!(await canModerateTarget(roomId, socket.user?.id, userId))) {
        socket.emit("audio_room_error", {
          message: "You cannot moderate this participant",
        });
        return;
      }

      await muteUnmuteService({
        roomId,
        userId,
        isMuted: false,
        actorUserId: socket.user?.id,
      });

      console.log(
        `✅ User ${userId} unmuted in room ${roomId}`
      );

      io.to(`audio-room:${roomId}`).emit(
        "speaker_unmuted",
        {
          userId: Number(userId),
          isMuted: false,
          roomId: Number(roomId),
        }
      );

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error("❌ Unmute speaker error:", error);
    }
  });

  // ==========================
  // DOWNGRADE SPEAKER TO LISTENER
  // ==========================

  socket.on("downgrade_to_listener", async (data) => {
    const { roomId, userId } = data;

    if (!roomId || !userId) {
      console.error("❌ Missing roomId or userId for downgrade_to_listener");
      return;
    }

    try {
      if (!(await canModerateRoom(roomId, socket.user?.id))) {
        socket.emit("audio_room_error", {
          message: "Only hosts or moderators can change participant roles",
        });
        return;
      }

      if (!(await canModerateTarget(roomId, socket.user?.id, userId))) {
        socket.emit("audio_room_error", {
          message: "You cannot moderate this participant",
        });
        return;
      }

      await downgradeToListenerService({
        roomId,
        userId,
        actorUserId: socket.user?.id,
      });

      console.log(
        `✅ User ${userId} downgraded to listener in room ${roomId}`
      );

      io.to(`audio-room:${roomId}`).emit(
        "role_changed",
        {
          userId: Number(userId),
          roomId: Number(roomId),
          newRole: "listener",
        }
      );

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error("❌ Downgrade speaker error:", error);
    }
  });

  // ==========================
  // REMOVE PARTICIPANT FROM ROOM
  // ==========================

  socket.on("remove_participant", async (data) => {
    const { roomId, userId } = data;

    if (!roomId || !userId) {
      console.error("❌ Missing roomId or userId for remove_participant");
      return;
    }

    try {
      if (!(await canModerateRoom(roomId, socket.user?.id))) {
        socket.emit("audio_room_error", {
          message: "Only hosts or moderators can remove participants",
        });
        return;
      }

      if (!(await canModerateTarget(roomId, socket.user?.id, userId))) {
        socket.emit("audio_room_error", {
          message: "You cannot moderate this participant",
        });
        return;
      }

      await removeParticipantService({
        roomId,
        userId,
        actorUserId: socket.user?.id,
      });

      console.log(
        `✅ User ${userId} removed from room ${roomId}`
      );

      io.to(`audio-room:${roomId}`).emit(
        "participant_removed",
        {
          userId: Number(userId),
          roomId: Number(roomId),
        }
      );

      await emitParticipantUpdate(roomId, userId);
    } catch (error) {
      console.error("❌ Remove participant error:", error);
    }
  });
};
