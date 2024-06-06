const { AuthError } = require("@supabase/supabase-js");
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

exports.createEmployee = async function ({
  full_name,
  email,
  password,
  phone,
  cpf,
  pin,
  role,
}) {
  const { data: newUser, error: newUserError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      phone,
      phone_confirm: true,
      user_metadata: {
        full_name,
        cpf,
      },
    });

  if (newUserError) {
    return {
      error: newUserError,
      data: null,
    };
  }

  return await supabase
    .from("profiles")
    .update({
      full_name,
      cpf,
      pin,
      role,
    })
    .eq("id", newUser.user.id)
    .select()
    .single();
};

exports.updateEmployee = async function (id, updateProperties) {
  return await supabase
    .from("profiles")
    .update(updateProperties)
    .eq("id", id)
    .select()
    .single();
};

exports.updateEmployeeAccount = async function (
  id,
  { email, phone, password }
) {
  return await supabase.auth.admin.updateUserById(id, {
    email,
    email_confirm: true,
    phone,
    phone_confirm: true,
    password,
  });
};
