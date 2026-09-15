// backend/src/modules/hr/hr.routes.js
const router = require("express").Router();
const ctrl = require("./hr.controller");
const authenticate = require("../../middleware/auth");
const { authorize } = require("../../middleware/rbac");
const zodValidate = require("../../middleware/zodValidate");
const {
  EmployeeIdParamSchema,
  SearchEmployeesQuerySchema,
  UpdateEmployeeBodySchema,
  UpdateHrProfileBodySchema,
  ToggleLocationTrackingBodySchema,
} = require("./hr.validation");

// All HR routes require authentication and HR or Admin role
router.use(authenticate);
router.use(authorize("hr", "admin"));

// Dashboard
router.get("/dashboard", ctrl.getDashboard);

// Location Overview (for interactive map and tracking table)
router.get("/locations", ctrl.getLocationOverview);

// Profile
router.get("/profile", ctrl.getProfile);
router.put(
  "/profile",
  zodValidate({ part: "body", schema: UpdateHrProfileBodySchema }),
  ctrl.updateProfile,
);

// Employee Management
router.get("/employees", ctrl.getAllEmployees);
router.get(
  "/employees/search",
  zodValidate({ part: "query", schema: SearchEmployeesQuerySchema }),
  ctrl.searchEmployees,
);
router.get(
  "/employees/:id",
  zodValidate({ part: "params", schema: EmployeeIdParamSchema }),
  ctrl.getEmployeeById,
);
router.put(
  "/employees/:id",
  zodValidate({ part: "params", schema: EmployeeIdParamSchema }),
  zodValidate({ part: "body", schema: UpdateEmployeeBodySchema }),
  ctrl.updateEmployee,
);
router.delete(
  "/employees/:id",
  zodValidate({ part: "params", schema: EmployeeIdParamSchema }),
  ctrl.deleteEmployee,
);

// Employee Location Tracking Controls
router.patch(
  "/employees/:id/location-tracking",
  zodValidate({ part: "params", schema: EmployeeIdParamSchema }),
  zodValidate({ part: "body", schema: ToggleLocationTrackingBodySchema }),
  ctrl.toggleLocationTracking,
);
router.get(
  "/employees/:id/location-history",
  zodValidate({ part: "params", schema: EmployeeIdParamSchema }),
  ctrl.getLocationHistory,
);

module.exports = router;
