const { ApiError } = require("../handlers/error.handler");
const { supabase } = require("../lib/supabase");

exports.employeeList = async function () {
  return await supabase.from("profiles").select("*").eq("role", "COLABORADOR");
};

exports.getEmployee = async function (userId) {
  const {
    data: {
      user: { email, phone },
    },
  } = await supabase.auth.admin.getUserById(userId);
  const userProfile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // console.log(userAccount);
  return {
    data: {
      ...userProfile.data,
      email,
      phone,
    },
  };
};

exports.createEmployee = async function ({
  email,
  password,
  phone,
  ...user_data
}) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    phone,
    phone_confirm: true,
    user_metadata: {
      ...user_data,
    },
  });

  return {
    data,
    error,
  };
};

exports.updateEmployee = async function (id, updateProperties) {
  return await supabase
    .from("profiles")
    .update({
      ...updateProperties,
    })
    .eq("id", id)
    .select();
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

exports.deleteUser = async function (id) {
  return await supabase.auth.admin.deleteUser(id);
};

/*

begin
  INSERT INTO public.profiles (id, full_name, role, function, pin, cpf)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'role',
    NEW.raw_user_meta_data->>'function',
    NEW.raw_user_meta_data->>'pin',
    NEW.raw_user_meta_data->>'cpf'
  );
  RETURN NEW;
end;

*/
