const { ApiError } = require("../handlers/error.handler");
const { supabase } = require("../lib/supabase");
const { validateSession } = require("../services/auth.service");

exports.checkAuth = async function (req, res, next) {
  try {
    const accessToken = req.cookies["sb-access-token"];
    const refreshToken = req.cookies["sb-refresh-token"];

    if (!accessToken) {
      throw new ApiError(401, "User is not signed in");
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error) {
      if (!refreshToken) {
        throw new ApiError(401, "User not signed in");
      }

      const { data, error: refreshError } = await supabase.auth.refreshSession(
        refreshToken
      );

      if (refreshError) {
        throw new ApiError(401, "Session expired. Please sign in again.");
      }

      res.cookie("sb-access-token", data.session.access_token, {
        httpOnly: true,
      });
      res.cookie("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
      });

      req.user = data.user;
      next();
    }

    req.user = user;
    next();
  } catch ({ status, message }) {
    return res.status(status ?? 500).json({
      error: true,
      message,
    });
  }
};
