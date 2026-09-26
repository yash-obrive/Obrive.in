const { prisma } = require("../../../../prisma");
const { resolveConfiguredRoomRole } = require("../roomRolePolicy");

const getRoomDetailsService = async (roomId, userId) => {
  // ==========================
  // GET ROOM
  // ==========================

  const room = await prisma.room_configs.findUnique({
    where: {
      id: Number(roomId),
    },

    include: {
      roleAssignments: true,

      joinPermissions: true,
    },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const now = new Date();
  const startTime = room.startTime ? new Date(room.startTime) : null;
  const isFutureScheduledRoom =
    room.roomStatus === "scheduled" && (!startTime || startTime > now);

  if (room.roomStatus !== "live" && isFutureScheduledRoom) {
    const error = new Error("Room is not available yet");
    error.status = 403;
    throw error;
  }

  if (room.roomStatus !== "live" && room.roomStatus !== "scheduled") {
    const error = new Error("Room is not available");
    error.status = room.roomStatus === "ended" ? 410 : 403;
    throw error;
  }

  const currentUser = await prisma.users.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!currentUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // ==========================
  // FIND CURRENT USER ROLE
  // ==========================

  let myRole = "listener";

  const configuredCurrentUserRole = resolveConfiguredRoomRole({
    room,
    user: currentUser,
  });

  const specificUserRole = room.roleAssignments.find(
    (assignment) => assignment.userId === Number(userId),
  );

  if (specificUserRole) {
    myRole = specificUserRole.assignedRoomRole;
  }

  // ==========================
  // GET PARTICIPANTS
  // ==========================

  const roomParticipants = await prisma.room_participants.findMany({
    where: {
      roomId: Number(roomId),

      leftAt: null,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          userid: true,
          role: true,
        },
      },
    },
  });

  const uniqueRoomParticipants = Array.from(
    roomParticipants
      .reduce((map, participant) => {
        const existingParticipant = map.get(participant.userId);

        if (
          !existingParticipant ||
          participant.joinedAt > existingParticipant.joinedAt
        ) {
          map.set(participant.userId, participant);
        }

        return map;
      }, new Map())
      .values(),
  );

  const currentParticipant = uniqueRoomParticipants.find(
    (participant) => participant.userId === Number(userId),
  );

  if (currentParticipant) {
    myRole = configuredCurrentUserRole || currentParticipant.roomRole;
  } else {
    if (!configuredCurrentUserRole) {
      const error = new Error("You are not allowed to join this room");
      error.status = 403;
      throw error;
    }

    myRole = configuredCurrentUserRole;
  }

  // ==========================
  // GROUP PARTICIPANTS
  // ==========================

  const participants = {
    hostAndSpeakers: [],

    moderators: [],

    listeners: [],
  };

  uniqueRoomParticipants.forEach((participant) => {
    const user = participant.user;

    const effectiveRoomRole =
      resolveConfiguredRoomRole({
        room,
        user,
      }) || participant.roomRole;

    const formattedUser = {
      id: user.id,

      name: user.name,

      userid: user.userid,

      role: effectiveRoomRole,

      isMuted: participant.isMuted,

      isSpeaking: participant.isSpeaking,
    };

    if (effectiveRoomRole === "host" || effectiveRoomRole === "speaker") {
      participants.hostAndSpeakers.push(formattedUser);
    } else if (
      effectiveRoomRole === "moderator" ||
      effectiveRoomRole === "admin"
    ) {
      participants.moderators.push(formattedUser);
    } else {
      participants.listeners.push(formattedUser);
    }
  });

  return {
    room,
    myRole,
    participants,
  };
};

module.exports = {
  getRoomDetailsService,
};
