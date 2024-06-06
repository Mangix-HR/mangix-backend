const express = require("express");
const { checkAdmin } = require("../middleware/checkAdmin");
const { buildRouter } = require("../utils/route-builder");
const EmployeeController = require("../controllers/employee.controller");
const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

const employeeRoutes = [
  {
    path: "/employees",
    method: "get",
    action: "list",
    middleware: [checkAdmin],
  },
  { path: "/employee/:id?", method: "get", action: "read" },
  {
    path: "/employee",
    method: "post",
    action: "create",
    middleware: [checkAdmin],
  },
  {
    path: "/employee/:id?",
    method: "patch",
    action: "update",
  },
  {
    path: "/employee/account/:id",
    method: "patch",
    action: "updateAccount",
    middleware: [checkAdmin],
  },
  // {
  //   path: "/employees/create",
  //   method: "post",
  //   action: "create",
  //   middleware: [checkAdmin],
  // },
];

const Employee = buildRouter(router, employeeRoutes, EmployeeController, [
  checkAuth,
]);

module.exports = Employee;
