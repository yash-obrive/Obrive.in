// backend/src/modules/client/client.controller.js
const service = require("./client.service");
const profileService = require("./client.profile.service");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// ========== LOGIN CONTROLLER ==========
exports.login = async (req, res, _next) => {
  try {
    const { clientId } = req.body;
    if (!clientId) {
      return errorResponse(res, "Client ID is required", 400);
    }

    const result = await service.clientLogin(clientId);
    successResponse(res, result, "Login successful");
  } catch (err) {
    errorResponse(res, err.message || "Login failed", err.status || 401);
  }
};

// ========== DASHBOARD CONTROLLER (NEW) ==========
exports.getDashboard = async (req, res, _next) => {
  //here next means next middleware function which in this case is error handling middleware provided by express and default error handler of express will be used if next is not called with an error. wherever next is called with an error it will be passed to the error handling middleware and it will handle the error and send the response to the client.
  try {
    const clientId = req.user.clientId;

    // Get profile
    const profile = await profileService.getProfile(clientId);

    successResponse(res, { profile }, "Dashboard data retrieved");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error fetching dashboard",
      err.status || 500,
    );
  }
};

// ========== PROFILE CONTROLLERS (NEW) ==========
exports.getProfile = async (req, res, _next) => {
  try {
    const clientId = req.user.clientId;
    const profile = await profileService.getProfile(clientId);
    successResponse(res, profile, "Profile retrieved successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error fetching profile",
      err.status || 500,
    );
  }
};

exports.updateProfile = async (req, res, _next) => {
  try {
    const clientId = req.user.clientId;
    const { name, dateOfBirth } = req.body;

    const updatedProfile = await profileService.updateProfile(clientId, {
      name,
      dateOfBirth,
    });

    successResponse(res, updatedProfile, "Profile updated successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error updating profile",
      err.status || 500,
    );
  }
};

exports.getMyProfile = async (req, res, _next) => {
  try {
    const data = await service.getMyProfile(req.user.id);
    successResponse(res, data, "Profile retrieved successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error fetching profile",
      err.status || 500,
    );
  }
};

exports.getMyProjects = async (req, res, _next) => {
  try {
    const data = await service.getMyProjects(req.user.id);
    successResponse(res, data, "Projects retrieved successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error fetching projects",
      err.status || 500,
    );
  }
};

exports.getProjectById = async (req, res, _next) => {
  try {
    const data = await service.getProjectById(req.user.id, req.params.id);
    successResponse(res, data, "Project retrieved successfully");
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error fetching project",
      err.status || 500,
    );
  }
};

exports.requestProject = async (req, res, _next) => {
  try {
    const data = await service.requestProject(req.user.id, req.body);
    successResponse(res, data, "Project requested successfully", 201);
  } catch (err) {
    errorResponse(
      res,
      err.message || "Error requesting project",
      err.status || 500,
    );
  }
};
