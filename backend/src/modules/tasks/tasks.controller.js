// backend/src/modules/tasks/tasks.controller.js
const taskService = require("./tasks.service");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { title, description, deadline, status, assigned_to } = req.body;

    if (!title) {
      return errorResponse(res, "Task title is required", 400);
    }

    const task = await taskService.createTask(
      parseInt(projectId, 10),
      {
        title,
        description,
        deadline,
        status,
        assigned_to: assigned_to ? parseInt(assigned_to, 10) : null,
      },
      userId,
    );

    successResponse(res, task, "Task created successfully", 201);
  } catch (err) {
    errorResponse(res, err.message, 400);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const { title, description, deadline, status, assigned_to } = req.body;

    const task = await taskService.updateTask(parseInt(taskId, 10), userId, {
      title,
      description,
      deadline,
      status,
      assigned_to: assigned_to ? parseInt(assigned_to, 10) : null,
    });

    successResponse(res, task, "Task updated successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message,
      err.message.includes("permission") ? 403 : 400,
    );
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const tasks = await taskService.getTasksByProject(
      parseInt(projectId, 10),
      userId,
    );

    successResponse(res, tasks, "Project tasks retrieved");
  } catch (err) {
    errorResponse(res, err.message, 400);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await taskService.getTaskById(parseInt(taskId, 10), userId);

    successResponse(res, task, "Task details retrieved");
  } catch (err) {
    errorResponse(
      res,
      err.message,
      err.message.includes("permission") ? 403 : 404,
    );
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    await taskService.deleteTask(parseInt(taskId, 10), userId);

    successResponse(res, null, "Task deleted successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message,
      err.message.includes("permission") ? 403 : 404,
    );
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await taskService.getMyTasks(userId);

    successResponse(res, tasks, "User tasks retrieved");
  } catch (err) {
    errorResponse(res, err.message, 400);
  }
};

exports.getProjectTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const members = await taskService.getProjectTeamMembers(
      parseInt(projectId, 10),
    );

    successResponse(res, members, "Project team members retrieved");
  } catch (err) {
    errorResponse(res, err.message, 400);
  }
};
