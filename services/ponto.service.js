/*

Entrada 1 - Date
Saida 1 - Date

Entrada 2 - Date
Saida 2 - Date

*/

const { ApiError } = require("../handlers/error.handler");
const { supabase } = require("../lib/supabase");

async function getUserRegister(profileId) {
  return await supabase
    .from("registros")
    .select("id")
    .eq("profile_id", profileId)
    .single();
}

exports.createPonto = async function (profileId, { tipo, obs }) {
  const { data, error } = await getUserRegister(profileId);
  console.log(data);

  if (error) throw new ApiError(500, error.message);

  return await supabase.from("pontos").insert({
    tipo,
    obs,
    registroId: data.id,
  });
};

exports.getTodaysPontos = async function (profileId) {
  const { data, error } = await getUserRegister(profileId);
  if (error) throw new ApiError(500, error.message);

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  return await supabase
    .from("pontos")
    .select("*")
    .eq("registroId", data.id)
    .gte("ponto", startOfDay)
    .lte("ponto", endOfDay)
    .order("ponto", { ascending: true });
};
