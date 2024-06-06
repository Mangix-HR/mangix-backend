const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://vapaogswduoocyvhxfno.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcGFvZ3N3ZHVvb2N5dmh4Zm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjk4ODMsImV4cCI6MjAyODg0NTg4M30.hp09Vh94KCA7YCywh3UZyNHmyjerqqe2XfRPI2PMO6M";

const serviceRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcGFvZ3N3ZHVvb2N5dmh4Zm5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzI2OTg4MywiZXhwIjoyMDI4ODQ1ODgzfQ.Aw46j_Bj-dqzgOnZPgNwguwLgRTflBFgACEct4o7aOM";

// export const supabase = createClient(supabaseUrl, supabaseKey);

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
