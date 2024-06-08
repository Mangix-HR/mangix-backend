const { ApiError } = require("../handlers/error.handler");
const { supabase } = require("../lib/supabase");

exports.checkUser = async function (req, res, next) {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error || !data) {
      throw new ApiError(500, error.message);
    }

    if (data.role !== "COLABORADOR") {
      throw new ApiError(403, "Access Denied. Colaborators Only");
    }

    next();
  } catch ({ status, message }) {
    return res.status(401).json({
      error: true,
      message,
    });
  }
};
