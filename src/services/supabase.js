import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.supabaseUrl

const supabaseKey = import.meta.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
export { supabaseUrl }