import { createClient } from "@supabase/supabase-js"

export const getSupabaseClient = () => {
    const supabaseUrl:any = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey:any = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    return supabase
  }