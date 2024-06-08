const express = require("express");
const { checkUser } = require("../middleware/checkUser.middleware");
const { buildRouter } = require("../utils/route-builder");
const PontosController = require("../controllers/pontos.controller");
const { checkAuth } = require("../middleware/checkAuth.middleware");
const { checkAdmin } = require("../middleware/checkAdmin.middleware");

const pontosRoutes = [
  {
    path: "/pontos",
    method: "post",
    action: "create",
    middleware: [checkUser],
  },
  {
    path: "/pontos/today",
    method: "get",
    action: "today",
    middleware: [checkUser],
  },
  {
    path: "/pontos",
    method: "get",
    action: "allUser",
    middleware: [checkUser],
  },
  {
    path: "/pontos/all",
    method: "get",
    action: "all",
    middleware: [checkAdmin],
  },
  {
    path: "/pontos/:id",
    method: "patch",
    action: "update",
    middleware: [checkAdmin],
  },
  {
    path: "/pontos/:id",
    method: "delete",
    action: "delete",
    middleware: [checkAdmin],
  },
];

const Pontos = buildRouter(pontosRoutes, PontosController, [checkAuth]);

module.exports = Pontos;
