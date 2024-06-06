const { ApiError } = require("../handlers/error.handler");
const { employeeList, getEmployee } = require("../services/employee.service");

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
}

module.exports = EmployeeController;
