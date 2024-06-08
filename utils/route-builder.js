const express = require("express");
const { catchErrors } = require("../handlers/error.handler");

exports.buildRouter = function (routes, controller, middlewareList = []) {
  const RouterInstance = express.Router();

  routes.forEach(({ method, path, action, middleware = [] }) => {
    RouterInstance[method](
      path,
      ...new Set([...middlewareList, ...middleware]),
      controller[action]
    );
  });

  return RouterInstance;
};
