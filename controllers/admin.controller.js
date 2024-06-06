const { ApiError } = require("../handlers/error.handler");
const { findAll } = require("../services/admin.service");

class AdminController {
  static async list(req, res) {
    try {
      const { data, error } = await findAll();

      if (error) {
        throw new ApiError(500, error.message);
      }

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

module.exports = AdminController;
