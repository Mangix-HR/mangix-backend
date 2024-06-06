const { supabase } = require("../lib/supabase");

exports.employeeList = async function () {
  return await supabase.from("profiles").select("*").eq("role", "COLABORADOR");
};

exports.getEmployee = async function (userId) {
  return await supabase
    .from("profiles")
    .select("*")
    .neq("role", "ADMIN")
    .eq("id", userId);
};
