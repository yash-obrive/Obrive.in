const { prisma } = require("../../../db");
const {
  MODERATOR_ROOM_ROLES,
  isAdminCrmRole,
  normalizeRole,
  resolveConfiguredRoomRole,
} = require("./roomRolePolicy");

const getActiveParticipant = async (roomId, userId) =>
  prisma.room_participants.findFirst({
    where: {
      roomId: Number(roomId),
      userId: Number(userId),
      leftAt: null,
    },
  });

const getActorRoomRole = async (roomId, userId) => {
  const room = await prisma.room_configs.findUnique({
    where: {
      id: Number(roomId),
    },
    select: {
      id: true,
      createdBy: true,
      roleAssignments: true,
      joinPermissions: true,
      creator: {
        select: {
          role: true,
        },
      },
    },
  });

  if (!room) {
    const error = new Error("Room not found");
    error.status = 404;
    throw error;
  }

  const user = await prisma.users.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (isAdminCrmRole(user?.role)) {
    return "admin";
  }

  const configuredRole = resolveConfiguredRoomRole({
    room,
    user,
  });

  if (configuredRole) {
    return configuredRole;
  }

  const participant = await getActiveParticipant(roomId, userId);
  return participant?.roomRole || null;
};

const requireRoomRoles =
  (allowedRoles = MODERATOR_ROOM_ROLES) =>
    async (req, res, next) => {
      try {
        const roomId = req.body?.roomId || req.params?.roomId || req.query?.roomId;

        if (!roomId) {
          return res.status(400).json({
            success: false,
            message: "roomId is required",
          });
        }

        const role = await getActorRoomRole(roomId, req.user.id);

        if (!allowedRoles.map(normalizeRole).includes(normalizeRole(role))) {
          return res.status(403).json({
            success: false,
            message: "Only room hosts or moderators can perform this action",
          });
        }

        req.roomRole = role;
        next();
      } catch (error) {
        next(error);
      }
    };

const canModerateRoom = async (roomId, userId) => {
  const role = await getActorRoomRole(roomId, userId);
  return MODERATOR_ROOM_ROLES.includes(normalizeRole(role));
};

const canModerateTarget = async (roomId, actorUserId, targetUserId) => {
  const room = await prisma.room_configs.findUnique({
    where: {
      id: Number(roomId),
    },
    select: {
      createdBy: true,
    },
  });

  if (!room) {
    return false;
  }

  const actorRole = normalizeRole(await getActorRoomRole(roomId, actorUserId));
  const targetRole = normalizeRole(await getActorRoomRole(roomId, targetUserId));

  if (actorRole === "admin") {
    return true;
  }

  if (!MODERATOR_ROOM_ROLES.includes(actorRole)) {
    return false;
  }

  if (targetRole === "admin") {
    return false;
  }

  if (targetRole === "host") {
    return Number(room.createdBy) === Number(actorUserId);
  }

  return true;
};

module.exports = {
  MODERATOR_ROOM_ROLES,
  canModerateTarget,
  canModerateRoom,
  getActiveParticipant,
  getActorRoomRole,
  requireRoomRoles,
};
