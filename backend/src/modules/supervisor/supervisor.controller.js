const supervisorService = require("./supervisor.service");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { getIO } = require("../../socket/index");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await supervisorService.getAllEmployees(req.user.id);
    successResponse(res, employees, "Employees retrieved successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.getEmployeeStatus = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await supervisorService.getEmployeeStatus(
      parseInt(employeeId, 10),
    );

    if (!employee) {
      return errorResponse(res, "Employee not found", 404);
    }

    successResponse(res, employee, "Employee status retrieved successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.getEmployeeProjects = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const projects = await supervisorService.getEmployeeProjects(
      parseInt(employeeId, 10),
    );
    successResponse(res, projects, "Employee projects retrieved successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.blockEmployeeAccess = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await supervisorService.blockEmployeeAccess(
      parseInt(employeeId, 10),
    );
    successResponse(res, employee, "Employee access blocked successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await supervisorService.deleteEmployee(
      parseInt(employeeId, 10),
    );
    successResponse(res, result, "Employee deleted successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.getSupervisorProjects = async (req, res) => {
  try {
    const projects = await supervisorService.getSupervisorProjects(req.user.id);
    successResponse(
      res,
      projects,
      "Supervisor projects retrieved successfully",
    );
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.getAllLeaveRequests = async (_req, res) => {
  try {
    const leaves = await supervisorService.getAllLeaveRequests();
    successResponse(res, leaves, "Leave requests retrieved successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await supervisorService.updateLeaveStatus(
      parseInt(id, 10),
      status,
    );

    try {
      const userId = leave.users?.id || leave.user_id;
      if (userId) {
        getIO().to(`user:${userId}`).emit("notification", {
          title: "Leave Status Updated",
          message: `Your leave request has been ${status}.`,
          type: status === "approved" ? "success" : status === "rejected" ? "error" : "info"
        });
      }
    } catch (err) {
      console.error("Socket emit failed", err);
    }

    successResponse(res, leave, "Leave status updated successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await supervisorService.deleteLeaveRequest(parseInt(id, 10));
    successResponse(res, result, "Leave request deleted successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email, password, role, name, userid } = req.body;
    const newUser = await supervisorService.addUser({
      email,
      password,
      role,
      name,
      userid,
    });
    successResponse(res, newUser, "User added successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.impersonateEmployee = async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return errorResponse(res, "High Privilege Operation: Only Super Admin can impersonate employees", 403);
    }
    const { employeeId } = req.params;
    const result = await supervisorService.impersonateEmployee(
      req.user.id,
      parseInt(employeeId, 10)
    );
    
    const authCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };
    
    // Set the new impersonated token
    res.cookie("accessToken", result.accessToken, authCookieOptions);
    successResponse(res, result, "Impersonation started successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};

exports.exitImpersonation = async (req, res) => {
  try {
    if (!req.user.originalAdminId) {
      return errorResponse(res, "Not currently impersonating", 400);
    }
    const result = await supervisorService.exitImpersonation(
      req.user.originalAdminId,
      req.user.id
    );

    const authCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("accessToken", result.accessToken, authCookieOptions);
    successResponse(res, null, "Exited impersonation successfully");
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
};
