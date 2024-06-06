const { supabase } = require("../lib/supabase");

exports.findAll = async function () {
  return await supabase.from("profiles").select("*");
};
