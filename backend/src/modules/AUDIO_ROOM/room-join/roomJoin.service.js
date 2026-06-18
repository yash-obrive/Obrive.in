const { prisma } = require("../../../../prisma");
const { getRoomDetailsService,} = require("../room-details/roomDetails.service");
const { getIO,} = require( "../../../socket");
const { createLiveKitToken,} = require("../livekit/token/create-token");
const { canPublishAudio, resolveConfiguredRoomRole } = require("../roomRolePolicy");

const joinRoomService = async (payload) => {
  const {
    roomId,
    userId,
    passkey,
  } = payload;

  // ==================================
  // FIND ROOM
  // ==================================

  const room =
    await prisma.room_configs.findUnique({
      where: {
        id: Number(roomId),
      },

      include: {
        joinPermissions: true,
        roleAssignments: true,
        invites: true,
      },
    });

  if (!room) {
    throw new Error("Room not found");
  }

  const now = new Date();
  const startTime = room.startTime ? new Date(room.startTime) : null;
  const isFutureScheduledRoom =
    room.roomStatus === "scheduled" && (!startTime || startTime > now);

  // ==================================
  // CHECK ROOM STATUS
  // ==================================

  if (
    room.roomStatus !== "live" &&
    isFutureScheduledRoom
  ) {
    const error = new Error("Room is not available yet");
    error.status = 403;
    throw error;
  }

  if (
    room.roomStatus !== "live" &&
    room.roomStatus !== "scheduled"
  ) {
    const error = new Error("Room is not available");
    error.status = room.roomStatus === "ended" ? 410 : 403;
    throw error;
  }

  // ==================================
  // GET USER
  // ==================================

  const user =
    await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  console.log(
    "JOIN USER:",
    user.id,
    user.role
  );

// ==================================
// ADD PARTICIPANT
// ==================================

async function addParticipant(roomRole) {
    await prisma.$transaction(
      async (tx) => {
        const activeParticipants =
          await tx.room_participants.findMany(
            {
              where: {
                roomId:
                  Number(roomId),

                userId:
                  Number(userId),

                leftAt: null,
              },

              orderBy: {
                joinedAt:
                  "asc",
              },
            }
          );

        const [primaryParticipant,
          ...duplicateParticipants] =
          activeParticipants;

        if (
          duplicateParticipants.length
        ) {
          await tx.room_participants.updateMany(
            {
              where: {
                id: {
                  in:
                    duplicateParticipants.map(
                      (
                        participant
                      ) => participant.id
                    ),
                },
              },

              data: {
                leftAt:
                  new Date(),
              },
            }
          );
        }

        if (primaryParticipant) {
          await tx.room_participants.update({
            where: {
              id: primaryParticipant.id,
            },

            data: {
              roomRole,
              isMuted: primaryParticipant.isMuted ?? true,
              isSpeaking:
                canPublishAudio(roomRole) && !primaryParticipant.isMuted,
            },
          });
          return;
        }

        await tx.room_participants.create(
          {
            data: {
              roomId:
                Number(roomId),

              userId:
                Number(userId),

              roomRole,
            },
          }
        );
      }
    );

    const io =
      getIO();

    const roomDetails =
      await getRoomDetailsService(
        roomId,
        userId
      );

    io.to(
      `audio-room:${roomId}`
    ).emit(
      "participant_updated",
      {
        roomId:
          Number(
            roomId
          ),

        participants:
          roomDetails.participants,
      }
    );
}


  const roomRole = resolveConfiguredRoomRole({ room, user });

  if (roomRole) {
    await addParticipant(roomRole);

    const livekitToken =
      await createLiveKitToken({
        roomName:
          room.id.toString(),

        participantId:
          user.id.toString(),

        participantName:
          user.name ||
          user.username ||
          `user-${user.id}`,

        role:
          roomRole,
      });

    return {
      allowed: true,
      roomRole,
      room,
      livekitToken,
    };
  }

  // ==================================
  // ACCESS DENIED
  // ==================================

  const error = new Error(
    "You are not allowed to join this room"
  );
  error.status = 403;
  throw error;
};

module.exports = {
  joinRoomService,
};
