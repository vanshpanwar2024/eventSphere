import { supabase } from './src/lib/supabase';
export default async function () {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  console.log(data, error);
}
