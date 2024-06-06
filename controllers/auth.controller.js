const { AuthError, AuthApiError } = require("@supabase/supabase-js");
const {
  registerUser,
  loginUser,
  logoutUser,
  validateSession,
} = require("../services/auth.service");
const { ApiError } = require("../handlers/error.handler");

class AuthController {
  static async register(req, res) {
    try {
      const { data, error } = await registerUser();

      if (error) {
        throw new AuthApiError(...error);
      }

      return res.status(200).json({
        data,
        message: "Login Successful",
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
        status,
        data: null,
        error: true,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { data, error } = await loginUser(email, password);

      if (error) {
        throw new AuthApiError(...error);
      }

      res.cookie("sb-access-token", data.session.access_token, {
        httpOnly: true,
      });
      res.cookie("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
      });

      return res.status(200).json({
        data,
        message: "User Created succesfully",
      });
    } catch ({ status, message }) {
      return res.status(status ?? 500).json({
        message,
        status,
        data: null,
        error: true,
      });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.cookies["sb-access-token"];

      if (!token) {
        throw new ApiError(401, "Not Logged in");
      }

      const { error } = await logoutUser();

      if (error) {
        throw new AuthError(...error);
      }

      res.clearCookie("sb-access-token");
      res.clearCookie("sb-refresh-token");

      return res.status(200).json({
        message: "logout success",
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
      });
    }
  }

  static async session(req, res) {
    try {
      const session = await validateSession();

      if (!session.data) {
        throw new ApiError(402, "User is not logged in");
      }

      if (error) {
        throw new AuthError(...error);
      }

      return res.status(200).json({
        ...session,
        message: "User Session found",
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
      });
    }
  }
}

module.exports = AuthController;
