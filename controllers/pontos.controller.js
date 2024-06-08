const { ApiError } = require("../handlers/error.handler");
const { createPonto, getTodaysPontos } = require("../services/ponto.service");

class PontosController {
  static async create(req, res) {
    try {
      console.log(req.user.id);
      // const { id } = req.user;

      const { data, error } = await createPonto(req.user.id, req.body);

      if (error) throw new ApiError(500, error.message);

      return res.status(201).json({
        data,
        message: "Ponto Created Successfully",
      });
    } catch ({ status, message }) {
      return res.status(status ?? 500).json({
        message,
        error: true,
      });
    }
  }

  static async today(req, res) {
    try {
      const { data, error } = await getTodaysPontos(req.user.id);

      if (error) throw new ApiError(500, error.message);

      return res.status(200).json({
        data,
      });
    } catch ({ status, message }) {
      return res.status(status ?? 500).json({
        message,
        error: true,
      });
    }
  }
}

module.exports = PontosController;
