const { catchErrors } = require("../handlers/error.handler");

exports.buildRouter = function (
  RouterInstance,
  routes,
  controller,
  middleware = []
) {
  routes.forEach(({ method, path, action }) => {
    RouterInstance[method](path, ...middleware, controller[action]);
  });

  return RouterInstance;
};
