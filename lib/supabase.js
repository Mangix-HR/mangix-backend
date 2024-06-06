const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SB_URL;
const serviceRole = process.env.SB_SERVICE_ROLE;

const supabase = createClient(supabaseUrl, serviceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const adminAuthClient = supabase.auth.admin;

module.exports = {
  supabase,
  adminAuthClient,
};
