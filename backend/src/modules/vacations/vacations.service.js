const { prisma } = require("../../../prisma");
class VacationsService {
  async getAllEmployeesWithLeaves(role, userId) {
    const query = { role: "employee" };
    
    // Authorization: As per user request, all authenticated roles (employee, supervisor, etc.)
    // should be able to see everyone's vacation calendar so they know who is on leave.
    // We do not filter query.id by userId.

    const users = await prisma.users.findMany({
      where: query,
      select: {
        id: true,
        name: true,
        email: true,
        userid: true,
        department: true,
        job_title: true,
        leaves: {
          select: {
            id: true,
            user_id: true,
            leave_type: true,
            start_date: true,
            end_date: true,
            status: true,
            reason: true,
          },
        },
      },
    });

    return users.map(user => {
      let daysUsed = 0;
      if (user.leaves) {
        const approvedVacations = user.leaves.filter(l => l.status === 'approved' && l.leave_type === 'vacation');
        for (const v of approvedVacations) {
          const start = new Date(v.start_date);
          const end = new Date(v.end_date);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          daysUsed += diffDays;
        }
      }
      return {
        ...user,
        remaining_vacation_days: Math.max(0, 21 - daysUsed)
      };
    });
  }

  async requestLeave(userId, data) {
    return await prisma.leaves.create({
      data: {
        user_id: userId,
        leave_type: data.leave_type,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        reason: data.reason,
        status: "pending", // As per request, user can only request holiday
      },
    });
  }
}

module.exports = new VacationsService();
