/**
 * Centralized API Endpoints
 * Use these constants to ensure consistent route strings across the application.
 */

export const API_ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  
  // Work Sessions & Timers
  WORK_SESSIONS: {
    HEARTBEAT: "/work-sessions/heartbeat",
    CURRENT: "/work-sessions/current",
  },

  // Supervisor Dashboard
  SUPERVISOR: {
    EMPLOYEES: "/supervisor/employees",
    LEAVES: "/supervisor/leaves",
    TASKS: "/supervisor/tasks",
  },

  // Projects
  PROJECTS: {
    LIST: "/projects",
    CREATE: "/projects",
    CLIENTS: "/projects/clients/list",
  },

  // Vacations & Leaves
  VACATIONS: {
    LIST: "/vacations",
    DASHBOARD: (date: string) => `/leaves/dashboard?date=${date}`,
    REQUEST: "/vacations/request",
  },

  // Tasks
  TASKS: {
    MY_PROJECTS: "/tasks/my-project-tasks",
    CREATE: "/tasks",
    UPDATE_STATUS: (id: string | number) => `/tasks/${id}/status`,
  },
} as const;
