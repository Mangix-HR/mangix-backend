const { AuthError, AuthApiError } = require("@supabase/supabase-js");
const {
  registerUser,
  loginUser,
  logoutUser,
  validateSession,
  getUserProfile,
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
      const {
        data: { session },
        error,
      } = await loginUser(email, password);

      const { data: profile, error: profileError } = await getUserProfile(
        session?.user.id
      );

      if (error || profileError) {
        throw new ApiError(
          error?.status ?? 403,
          error?.message ?? profileError.message
        );
      }

      res.cookie("sb-access-token", session.access_token, {
        httpOnly: true,
      });
      res.cookie("sb-refresh-token", session.refresh_token, {
        httpOnly: true,
      });

      return res.status(200).json({
        session,
        profile,
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
      // const session = await validateSession();
      const user = req.user;
      if (!user) {
        throw new ApiError(401, "User is not logged in");
      }

      return res.status(200).json({
        user,
        message: "User Session found",
      });
    } catch ({ status, message }) {
      return res.status(status ?? 500).json({
        message,
        error: true,
      });
    }
  }
}

module.exports = AuthController;
