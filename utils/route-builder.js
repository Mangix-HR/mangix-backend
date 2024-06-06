const { catchErrors } = require("../handlers/error.handler");

exports.buildRouter = function (
  RouterInstance,
  routes,
  controller,
  middlewareList = []
) {
  routes.forEach(({ method, path, action, middleware = [] }) => {
    RouterInstance[method](
      path,
      ...new Set([...middlewareList, ...middleware]),
      controller[action]
    );
  });

  return RouterInstance;
};
