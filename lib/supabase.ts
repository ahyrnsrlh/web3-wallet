import { createClient } from "@supabase/supabase-js";

// Pastikan URL dan key tersedia sebelum membuat client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi ketersediaan konfigurasi di runtime
console.log("Supabase URL:", supabaseUrl ? "Available" : "Missing");
console.log("Supabase Anon Key:", supabaseAnonKey ? "Available" : "Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Error: Supabase credentials are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
  );
}

// Buat client Supabase dengan opsi tambahan
export const supabase = createClient(
  supabaseUrl || "", // Fallback empty string to prevent runtime errors
  supabaseAnonKey || "", // Fallback empty string to prevent runtime errors
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
