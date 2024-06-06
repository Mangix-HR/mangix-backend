const catchErrors = (cb) => {
  return function (req, res, next) {
    const response = cb(req, res, next);

    if (response instanceof Promise) {
      return response.catch(next);
    }

    return response;
  };
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Api url does not exist...",
  });
};

function developmentErrors(err, req, res, next) {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    ),
  };

  res.status(500).json({
    success: false,
    message: "Oops ! Error in Server",
  });
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  ApiError,
  notFoundHandler,
  catchErrors,
};
