const { supabase } = require("../lib/supabase");

exports.loginUser = async function (email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

exports.registerUser = async function (email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

exports.logoutUser = async function () {
  return await supabase.auth.signOut();
};

exports.validateSession = async function () {
  return await supabase.auth.getSession();
};
