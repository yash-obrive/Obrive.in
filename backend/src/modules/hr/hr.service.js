// backend/src/modules/hr/hr.service.js
const { prisma } = require('../../../db');

class HRService {

  // Get HR dashboard statistics (FIXED - removed leave_requests)
  async getDashboardStats() {
    // Total employees
    const totalEmployees = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM users WHERE role = 'employee'
    `;

    // Active employees
    const activeEmployees = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM users WHERE role = 'employee' AND status = 'online'
    `;

    // New hires this month
    const newHires = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM users 
      WHERE role = 'employee' AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;

    // Get unique departments count
    const departments = await prisma.$queryRaw`
      SELECT DISTINCT department FROM users WHERE role = 'employee' AND department IS NOT NULL
    `;

    return {
      totalEmployees: Number(totalEmployees[0].count),
      activeEmployees: Number(activeEmployees[0].count),
      newHiresThisMonth: Number(newHires[0].count),
      totalDepartments: departments.length
    };
  }

  // Get all employees
  async getAllEmployees() {
    return await prisma.$queryRaw`
      SELECT id, userid, email, name, role, status, department, job_title, phone_number, created_at
      FROM users 
      WHERE role = 'employee'
      ORDER BY created_at DESC
    `;
  }

  // Get employee by ID
  async getEmployeeById(employeeId) {
    const result = await prisma.$queryRaw`
      SELECT id, userid, email, name, role, status, department, job_title, phone_number, date_of_birth, bio, created_at
      FROM users 
      WHERE id = ${employeeId} AND role = 'employee'
      LIMIT 1
    `;

    if (!result[0]) {
      throw new Error('Employee not found');
    }
    return result[0];
  }

  // Get HR profile
  async getHRProfile(userId) {
    const result = await prisma.$queryRaw`
      SELECT id, userid, email, name, role, status, created_at
      FROM users 
      WHERE id = ${userId} AND role = 'hr'
      LIMIT 1
    `;

    if (!result[0]) {
      throw new Error('HR profile not found');
    }
    return result[0];
  }

  // Update HR profile
  async updateHRProfile(userId, data) {
    const { name, bio, dateOfBirth, phone } = data;

    await prisma.$executeRaw`
      UPDATE users 
      SET name = COALESCE(${name}, name),
          bio = COALESCE(${bio}, bio),
          date_of_birth = COALESCE(${dateOfBirth ? new Date(dateOfBirth) : null}, date_of_birth),
          phone_number = COALESCE(${phone}, phone_number),
          updated_at = NOW()
      WHERE id = ${userId} AND role = 'hr'
    `;

    return this.getHRProfile(userId);
  }

  // Update employee
  async updateEmployee(employeeId, data) {
    const { name, department, jobTitle, phone, status } = data;

    await prisma.$executeRaw`
      UPDATE users 
      SET name = COALESCE(${name}, name),
          department = COALESCE(${department}, department),
          job_title = COALESCE(${jobTitle}, job_title),
          phone_number = COALESCE(${phone}, phone_number),
          status = COALESCE(${status}, status),
          updated_at = NOW()
      WHERE id = ${employeeId} AND role = 'employee'
    `;

    return this.getEmployeeById(employeeId);
  }

  // Delete employee
  async deleteEmployee(employeeId) {
    await prisma.$executeRaw`
      DELETE FROM users WHERE id = ${employeeId} AND role = 'employee'
    `;
    return { message: 'Employee deleted successfully' };
  }

  // Search employees
  async searchEmployees(searchTerm) {
    return await prisma.$queryRaw`
      SELECT id, userid, email, name, role, status, department, job_title
      FROM users 
      WHERE role = 'employee' 
      AND (name ILIKE ${`%${searchTerm}%`} OR email ILIKE ${`%${searchTerm}%`} OR department ILIKE ${`%${searchTerm}%`})
      LIMIT 20
    `;
  }

  // Toggle employee location tracking
  async toggleEmployeeLocationTracking(employeeId, enabled) {
    const user = await prisma.users.findUnique({
      where: { id: employeeId },
    });
    if (!user || user.role !== 'employee') {
      const err = new Error('Employee not found');
      err.status = 404;
      throw err;
    }

    const updated = await prisma.users.update({
      where: { id: employeeId },
      data: { is_location_tracking_enabled: Boolean(enabled) },
      select: {
        id: true,
        name: true,
        email: true,
        is_location_tracking_enabled: true,
      },
    });
    return updated;
  }

  // Get employee locations overview (with 30-day auto-purge)
  async getEmployeesLocationOverview() {
    // 30-day auto purge routine
    await prisma.$executeRaw`
      DELETE FROM employee_locations 
      WHERE "recordedAt" < NOW() - INTERVAL '30 days'
    `;

    const employees = await prisma.$queryRaw`
      SELECT 
        u.id, 
        u.userid, 
        u.email, 
        u.name, 
        u.department, 
        u.job_title, 
        u.status, 
        u.avatar_url,
        u.is_location_tracking_enabled,
        ws.status as session_status,
        loc.latitude,
        loc.longitude,
        loc.accuracy,
        loc.source,
        loc."recordedAt" as last_ping_at,
        CASE 
          WHEN (
            (ws.status = 'active' AND loc."recordedAt" >= NOW() - INTERVAL '45 minutes')
            OR loc."recordedAt" >= NOW() - INTERVAL '30 minutes'
          ) AND u.is_location_tracking_enabled = true
          THEN true 
          ELSE false 
        END as is_live
      FROM users u
      LEFT JOIN LATERAL (
        SELECT status, "startedAt", "lastHeartbeat"
        FROM work_sessions
        WHERE "userId" = u.id AND status = 'active'
        ORDER BY created_at DESC
        LIMIT 1
      ) ws ON true
      LEFT JOIN LATERAL (
        SELECT latitude, longitude, accuracy, source, "recordedAt"
        FROM employee_locations
        WHERE "userId" = u.id
        ORDER BY "recordedAt" DESC
        LIMIT 1
      ) loc ON true
      WHERE u.role = 'employee'
      ORDER BY u.name ASC
    `;

    return employees;
  }

  // Get employee location history with flexible filters (preset, date, days, timezone)
  async getEmployeeLocationHistory(employeeId, options = {}) {
    const opts = typeof options === 'number' || typeof options === 'string'
      ? { days: options }
      : (options || {});
    const { filter, days, date, timezoneOffset = 0 } = opts;

    const safeId = parseInt(employeeId, 10);
    const safeOffset = Math.min(Math.max(Number(timezoneOffset) || 0, -840), 840);
    const localTimeExpr = `("recordedAt" - (${safeOffset} || ' minutes')::INTERVAL)`;
    const localNowExpr = `(NOW() - (${safeOffset} || ' minutes')::INTERVAL)`;

    let dateCondition;
    if (date) {
      const match = String(date).trim().match(/^\d{4}-\d{2}-\d{2}$/);
      if (match) {
        const sanitizedDate = match[0];
        dateCondition = `${localTimeExpr}::date = '${sanitizedDate}'::date`;
      }
    }

    if (!dateCondition) {
      const activeFilter = String(filter || '').toLowerCase();
      if (activeFilter === 'today' || days === 1 || days === '1') {
        dateCondition = `${localTimeExpr}::date = ${localNowExpr}::date`;
      } else if (activeFilter === 'yesterday') {
        dateCondition = `${localTimeExpr}::date = (${localNowExpr}::date - INTERVAL '1 day')::date`;
      } else if (activeFilter === '3d' || days === 3 || days === '3') {
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '2 days')::date`;
      } else if (activeFilter === '7d' || days === 7 || days === '7') {
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '6 days')::date`;
      } else if (activeFilter === '14d' || days === 14 || days === '14') {
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '13 days')::date`;
      } else if (activeFilter === '30d' || days === 30 || days === '30') {
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '29 days')::date`;
      } else if (activeFilter === 'all') {
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '60 days')::date`;
      } else {
        const numDays = Math.min(Math.max(Number(days) || 7, 1), 60);
        dateCondition = `${localTimeExpr}::date >= (${localNowExpr}::date - INTERVAL '${numDays - 1} days')::date`;
      }
    }

    const query = `
      SELECT id, latitude, longitude, accuracy, source, "recordedAt"
      FROM employee_locations
      WHERE "userId" = ${safeId}
        AND ${dateCondition}
      ORDER BY "recordedAt" DESC
      LIMIT 500
    `;

    return await prisma.$queryRawUnsafe(query);
  }
}

module.exports = new HRService();