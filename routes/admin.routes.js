const express = require("express");
const { buildRouter } = require("../utils/route-builder");
const AdminController = require("../controllers/admin.controller");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

const adminRoutes = [
  // { path: "/admin/read/:id", method: "get", action: "read" },
  // { path: "/admin/update/:id", method: "patch", action: "update" },
  // { path: "/admin/delete/:id", method: "delete", action: "delete" },
  // { path: "/admin/search", method: "get", action: "search" },
  { path: "/admin/list", method: "get", action: "list" },
];
const AdminRoutes = buildRouter(router, adminRoutes, AdminController, [
  checkAuth,
  checkAdmin,
]);

module.exports = AdminRoutes;
