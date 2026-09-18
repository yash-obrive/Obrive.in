const cron = require("node-cron");
const { prisma } = require("../../db");
const { getIO } = require("../socket");

function startAudioRoomCron() {
  console.log("Audio room cron initialized");

  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();

    try {
      const result = await prisma.room_configs.updateMany({
        where: {
          roomStatus: "scheduled",
          startTime: {
            not: null,
            lte: now,
          },
        },
        data: {
          roomStatus: "live",
        },
      });

      if (result.count > 0) {
        console.log(`Promoted ${result.count} scheduled room(s) to live`);
      }

      const io = getIO();
      const activeParticipants = await prisma.room_participants.findMany({
        where: {
          leftAt: null,
          room: {
            roomStatus: "live",
          },
        },
        select: {
          id: true,
          roomId: true,
          userId: true,
        },
      });

      const staleParticipantIds = activeParticipants
        .filter((participant) => {
          const socketsInRoom =
            io.sockets.adapter.rooms.get(`audio-room:${participant.roomId}`) ||
            new Set();

          return !Array.from(socketsInRoom).some((socketId) => {
            const socket = io.sockets.sockets.get(socketId);
            return Number(socket?.user?.id) === Number(participant.userId);
          });
        })
        .map((participant) => participant.id);

      if (staleParticipantIds.length) {
        await prisma.room_participants.updateMany({
          where: {
            id: {
              in: staleParticipantIds,
            },
          },
          data: {
            leftAt: new Date(),
            isSpeaking: false,
          },
        });

        console.log(`Cleaned ${staleParticipantIds.length} stale audio participant(s)`);
      }
    } catch (error) {
      console.error("Audio room cron failed:", error);
    }
  });
}

module.exports = startAudioRoomCron;
