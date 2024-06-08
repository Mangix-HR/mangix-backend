const { ApiError } = require("../handlers/error.handler");
const {
  createPonto,
  getTodaysPontos,
  getAllUserPontos,
  getAllPontos,
  editUserPonto,
  deletePonto,
} = require("../services/ponto.service");

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

  static async allUser(req, res) {
    try {
      const { data, error } = await getAllUserPontos(req.user.id);
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

  static async all(req, res) {
    try {
      const { data, error } = await getAllPontos();

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

  static async update(req, res) {
    try {
      const { id } = req.params;

      const { data, error } = await editUserPonto(id);

      if (error) throw new ApiError(500, error.message);

      return res.status(202).json({
        data,
      });
    } catch ({ status, message }) {
      return res.status(status ?? 500).json({
        message,
        error: true,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const { data, error } = await deletePonto(id);
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
