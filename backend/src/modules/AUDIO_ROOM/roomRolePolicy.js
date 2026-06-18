const ROOM_ROLES = {
  ADMIN: "admin",
  HOST: "host",
  MODERATOR: "moderator",
  SPEAKER: "speaker",
  LISTENER: "listener",
};

const SPEAKING_ROOM_ROLES = [
  ROOM_ROLES.ADMIN,
  ROOM_ROLES.HOST,
  ROOM_ROLES.MODERATOR,
  ROOM_ROLES.SPEAKER,
];

const MODERATOR_ROOM_ROLES = [
  ROOM_ROLES.ADMIN,
  ROOM_ROLES.HOST,
  ROOM_ROLES.MODERATOR,
];

const normalizeRole = (role) => String(role || "").trim().toLowerCase();

const canPublishAudio = (roomRole) =>
  SPEAKING_ROOM_ROLES.includes(normalizeRole(roomRole));

const canModerate = (roomRole) =>
  MODERATOR_ROOM_ROLES.includes(normalizeRole(roomRole));

const isAdminCrmRole = (crmRole) => normalizeRole(crmRole) === "admin";

const getCreatorRoomRole = (creatorCrmRole) =>
  normalizeRole(creatorCrmRole) === "supervisor"
    ? ROOM_ROLES.MODERATOR
    : ROOM_ROLES.HOST;

const findAssignedRoomRole = ({ room, userId, crmRole }) => {
  const normalizedCrmRole = normalizeRole(crmRole);
  const assignments = room?.roleAssignments || [];

  const specificUserAssignment = assignments.find(
    (assignment) =>
      assignment.assignmentType === "specific-user" &&
      Number(assignment.userId) === Number(userId)
  );

  if (specificUserAssignment) {
    return normalizeRole(specificUserAssignment.assignedRoomRole);
  }

  const crmRoleAssignment = assignments.find(
    (assignment) =>
      assignment.assignmentType === "crm-role" &&
      normalizeRole(assignment.crmRole) === normalizedCrmRole
  );

  return crmRoleAssignment
    ? normalizeRole(crmRoleAssignment.assignedRoomRole)
    : null;
};

const hasJoinPermission = ({ room, crmRole }) => {
  const normalizedCrmRole = normalizeRole(crmRole);

  return (room?.joinPermissions || []).some(
    (permission) =>
      permission.permissionType === "crm-role" &&
      normalizeRole(permission.crmRole) === normalizedCrmRole
  );
};

const allowsGuestJoin = (room) =>
  Boolean(room?.allowGuestUsers) &&
  (room?.joinPermissions || []).some(
    (permission) => permission.permissionType === "guest"
  );

const resolveConfiguredRoomRole = ({ room, user }) => {
  if (isAdminCrmRole(user?.role)) {
    return ROOM_ROLES.ADMIN;
  }

  if (Number(room?.createdBy) === Number(user?.id)) {
    return getCreatorRoomRole(user?.role);
  }

  const assignedRole = findAssignedRoomRole({
    room,
    userId: user?.id,
    crmRole: user?.role,
  });

  if (assignedRole) {
    return assignedRole;
  }

  if (hasJoinPermission({ room, crmRole: user?.role }) || allowsGuestJoin(room)) {
    return ROOM_ROLES.LISTENER;
  }

  return null;
};

module.exports = {
  MODERATOR_ROOM_ROLES,
  ROOM_ROLES,
  SPEAKING_ROOM_ROLES,
  allowsGuestJoin,
  canModerate,
  canPublishAudio,
  findAssignedRoomRole,
  getCreatorRoomRole,
  hasJoinPermission,
  isAdminCrmRole,
  normalizeRole,
  resolveConfiguredRoomRole,
};
