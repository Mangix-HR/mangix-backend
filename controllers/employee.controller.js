const { AuthError } = require("@supabase/supabase-js");
const { ApiError } = require("../handlers/error.handler");
const {
  employeeList,
  getEmployee,
  createEmployee,
  updateEmployee,
  updateEmployeeAccount,
  deleteUser,
} = require("../services/employee.service");

class EmployeeController {
  static async list(req, res) {
    try {
      const { data, error } = await employeeList();

      if (error) {
        throw new ApiError(500, error.message);
      }

      return res.status(200).json({
        data,
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
        error: true,
      });
    }
  }

  static async read(req, res) {
    try {
      const employeeId = req.params?.id ?? req?.user.id;

      const { data, error } = await getEmployee(employeeId);

      if (error || data.length < 1) {
        throw new ApiError(500, error?.message ?? "No Employee Found");
      }

      return res.status(200).json({
        data,
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
        error: true,
      });
    }
  }

  static async create(req, res) {
    try {
      console.log(typeof req.body.pin);
      const { data, error } = await createEmployee(req.body);

      if (error) {
        console.log(error);
        throw new ApiError(error.status, error.message);
      }

      return res.status(200).json({
        data,
        message: "User Created Successfully",
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
      const employeeId = req.params?.id ?? req?.user.id;
      const { full_name, role, pin, cpf } = req.body;

      const { data, error } = await updateEmployee(employeeId, {
        full_name,
        role,
        pin,
        cpf,
      });

      if (error) {
        throw new ApiError(500, error.message);
      }

      return res.status(200).json({
        data,
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
        error: true,
      });
    }
  }

  static async updateAccount(req, res) {
    try {
      const employeeId = req.params?.id ?? req?.user.id;

      const {
        data: { user },
        error,
      } = await updateEmployeeAccount(employeeId, req.body);

      if (error) {
        throw new ApiError(error.status, error.message);
      }

      return res.status(200).json({
        user,
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
      const { error } = await deleteUser(id);

      if (error) {
        throw new ApiError(error.status, error.message);
      }

      return res.status(200).json({
        message: `User Deleted Successfully`,
      });
    } catch ({ status, message }) {
      return res.status(status).json({
        message,
        error: true,
      });
    }
  }
}

module.exports = EmployeeController;
