const express = require("express");
// const { authHandler } = require("../controllers/auth.controller");
const { buildRouter } = require("../utils/route-builder");
const AuthController = require("../controllers/auth.controller");
const { checkAuth } = require("../middleware/checkAuth.middleware");

const router = express.Router();

const authRoutes = [
  { path: "/auth/login", method: "post", action: "login" },
  { path: "/auth/register", method: "post", action: "register" },
  { path: "/auth/logout", method: "get", action: "logout" },
  {
    path: "/auth/session",
    method: "get",
    action: "session",
    middleware: [checkAuth],
  },
];

const Auth = buildRouter(authRoutes, AuthController);

module.exports = Auth;
