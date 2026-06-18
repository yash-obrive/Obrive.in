const { prisma } = require("../../../../prisma");
const { getCreatorRoomRole } = require("../roomRolePolicy");

const createRoomConfigService =
  async (payload, userId) => { 
    
    // payload comes from the request body, userId comes from the authenticated user 
    //payload data from the request body was created in the frontend and sent to the backend. It contains all the necessary information to create a room configuration, including room details, role assignments, join permissions, notifications, and invites.

    const { roomConfig, roleAssignments, joinPermissions, notifications, invites,} = payload;

    return await prisma.$transaction(
      async (tx) => { // tx is generally used to represent a transaction object that allows you to perform multiple database operations as a single unit of work. In this case, it is used to ensure that all the database operations related to creating a room configuration are executed atomically, meaning either all of them succeed or none of them are applied.
        const creator =
          await tx.users.findUnique({
            where: {
              id: Number(userId),
            },
            select: {
              id: true,
              role: true,
            },
          });

        if (!creator) {
          throw new Error(
            "Creator not found"
          );
        }

        const creatorRoomRole = getCreatorRoomRole(creator.role);

        // ==================================
        // CREATE ROOM CONFIG
        // ==================================

        const createdRoom =
          await tx.room_configs.create(
            {
              data: {
                roomName:
                  roomConfig.roomName,

                roomDescription:
                  roomConfig.roomDescription,

                roomType:
                  roomConfig.roomType,

                roomStatus:
                  roomConfig.roomStatus,

                startTime:
                  roomConfig.startTime
                    ? new Date(
                        roomConfig.startTime
                      )
                    : null,

                endTime:
                  roomConfig.endTime
                    ? new Date(
                        roomConfig.endTime
                      )
                    : null,

                participantLimit:
                  roomConfig.participantLimit,

                visibility:
                  roomConfig.visibility,

                allowGuestUsers:
                  roomConfig.allowGuestUsers,

                redirectAfterRoomEnd:
                  roomConfig.redirectAfterRoomEnd,

                createdBy: userId,
              },
            }
          );

        await tx.room_participants.create(
          {
            data: {
              roomId: createdRoom.id,
              userId,
              roomRole: creatorRoomRole,
            },
          }
        );

        // ==================================
        // ROLE ASSIGNMENTS
        // ==================================

        const normalizedRoleAssignments =
          roleAssignments?.map( ( role ) => ({

              roomConfigId: createdRoom.id,
              assignmentType: role.assignmentType,
              crmRole: role.assignmentType === "crm-role" ? role.crmRole : null,
              assignedRoomRole: role.assignedRoomRole,
              userId: role.userId ? Number(role.userId) : null,
            })
          ) || [];

        const creatorHasExplicitAssignment =
          normalizedRoleAssignments.some(
            (role) =>
              role.assignmentType === "specific-user" &&
              Number(role.userId) === Number(userId)
          );

        const creatorExplicitAssignment =
          normalizedRoleAssignments.find(
            (role) =>
              role.assignmentType === "specific-user" &&
              Number(role.userId) === Number(userId)
          );

        if (creatorExplicitAssignment) {
          await tx.room_participants.updateMany(
            {
              where: {
                roomId: createdRoom.id,
                userId: Number(userId),
                leftAt: null,
              },
              data: {
                roomRole: creatorExplicitAssignment.assignedRoomRole,
              },
            }
          );
        }

        const allRoleAssignments = [
          ...normalizedRoleAssignments,
          ...(
            creatorHasExplicitAssignment
              ? []
              : [
                  {
                    roomConfigId: createdRoom.id,
                    assignmentType: "specific-user",
                    crmRole: null,
                    assignedRoomRole: creatorRoomRole,
                    userId: userId,
                  },
                ]
          ),
        ];

        if (allRoleAssignments.length) {
          await tx.room_role_assignments.createMany(
            {
              data: allRoleAssignments,
            }
          );
        }

        // ==================================
        // JOIN PERMISSIONS
        // ==================================

        if (
          joinPermissions?.length
        ) {
          await tx.room_join_permissions.createMany(
            {
              data:
                joinPermissions.map(
                  (
                    permission
                  ) => ({
                    roomConfigId:
                      createdRoom.id,

                    permissionType:
                      permission.permissionType,

                    crmRole:
                      permission.crmRole ||
                      null,
                  })
                ),
            }
          );
        }

        // ==================================
        // NOTIFICATIONS
        // ==================================

        if (
          notifications?.length
        ) {
          await tx.room_notifications.createMany(
            {
              data:
                notifications.map(
                  (
                    notification
                  ) => ({
                    roomConfigId:
                      createdRoom.id,

                    notificationType:
                      notification.notificationType,

                    scheduledTime:
                      new Date(),
                  })
                ),
            }
          );
        }

console.log(
  "✅ Room Created:",
  createdRoom
);

console.table(
  roleAssignments || []
);

console.table(
  joinPermissions || []
);

console.table(
  notifications || []
);

console.table(
  invites || []
);


        // ==================================
        // INVITES (LATER)
        // ==================================

        return createdRoom;
      }
    );
  };




        // ==================================
        // Get list of users
        // ==================================


        const getAllUsers = async () => {
          try {
            const users = await prisma.users.findMany({
              select: {
                id: true,
                userid: true,
                name: true,
                role: true,
              },
              orderBy: {
                name: "asc",
              },
            });

            return users;
          } catch (error) {
            throw new Error(error.message);
          }
        };


  module.exports = {
  createRoomConfigService,
  getAllUsers,
};
