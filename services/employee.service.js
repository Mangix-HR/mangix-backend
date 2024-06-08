const { ApiError } = require("../handlers/error.handler");
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

  // const { error } = await supabase.rpc("handle_create_register", {
  //   id: newUser.user.id,
  // });

  // if (error) throw new ApiError(500, error.message);

  // await supabase
  //   .from("profiles")
  //   .update({
  //     cpf,
  //     pin,
  //     role,
  //   })
  //   .eq("id", data.user.id);

  return {
    data,
    error,
  };
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
