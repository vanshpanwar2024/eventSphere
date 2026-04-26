import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing. Database features will be unavailable.');
    return null;
  }

  _supabase = createClient(supabaseUrl, supabaseKey);
  return _supabase;
}

export const supabase = getSupabase();