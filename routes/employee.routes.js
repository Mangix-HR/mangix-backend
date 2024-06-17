const express = require("express");
const { checkAdmin } = require("../middleware/checkAdmin.middleware");
const { buildRouter } = require("../utils/route-builder");
const EmployeeController = require("../controllers/employee.controller");
const { checkAuth } = require("../middleware/checkAuth.middleware");
const { checkUser } = require("../middleware/checkUser.middleware");

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
  },
  {
    path: "/employee/account/:id",
    method: "delete",
    action: "delete",
    middleware: [checkAdmin],
  },
  // {
  //   path: "/employees/create",
  //   method: "post",
  //   action: "create",
  //   middleware: [checkAdmin],
  // },
];

const Employee = buildRouter(employeeRoutes, EmployeeController, [checkAuth]);

module.exports = Employee;
