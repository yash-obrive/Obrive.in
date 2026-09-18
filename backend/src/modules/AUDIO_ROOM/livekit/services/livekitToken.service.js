const { prisma } = require("../../../../../db");
const { createLiveKitToken } = require("../token/create-token");
const { resolveConfiguredRoomRole } = require("../../roomRolePolicy");

const assertRoomAccess = async (roomId, userId) => {
  const room = await prisma.room_configs.findUnique({
    where: {
      id: Number(roomId),
    },
    include: {
      joinPermissions: true,
      roleAssignments: true,
    },
  });

  if (!room) {
    const error = new Error("Room not found");
    error.status = 404;
    throw error;
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

  const user = await prisma.users.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const configuredRoomRole = resolveConfiguredRoomRole({ room, user });

  if (configuredRoomRole) {
    return {
      room,
      user,
      roomRole: configuredRoomRole,
    };
  }

  const participant = await prisma.room_participants.findFirst({
    where: {
      roomId: Number(roomId),
      userId: Number(userId),
      leftAt: null,
    },
  });

  if (participant) {
    return {
      room,
      user,
      roomRole: participant.roomRole,
    };
  }

  const error = new Error("You are not allowed to join this room");
  error.status = 403;
  throw error;
};

const createLiveKitTokenForRoom = async ({ roomId, userId }) => {
  const { room, user, roomRole } = await assertRoomAccess(roomId, userId);

  const token = await createLiveKitToken({
    roomName: room.id.toString(),
    participantId: user.id.toString(),
    participantName: user.name || `user-${user.id}`,
    role: roomRole,
  });

  return {
    token,
    roomRole,
    roomId: room.id,
  };
};

module.exports = {
  assertRoomAccess,
  createLiveKitTokenForRoom,
};
