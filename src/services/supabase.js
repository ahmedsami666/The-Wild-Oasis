import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_supabaseUrl

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
export { supabaseUrl }