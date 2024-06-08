const express = require("express");
const { checkUser } = require("../middleware/checkUser.middleware");
const { buildRouter } = require("../utils/route-builder");
const PontosController = require("../controllers/pontos.controller");
const { checkAuth } = require("../middleware/checkAuth.middleware");

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
];

const Pontos = buildRouter(pontosRoutes, PontosController, [checkAuth]);

module.exports = Pontos;
