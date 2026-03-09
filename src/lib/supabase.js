import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
// from https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── Auth helpers ────────────────────────────────────────────────────────────

export async function signInWithPassword(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

// ─── Content helpers ─────────────────────────────────────────────────────────
// Table: site_content  { id, section, key, value }

export async function fetchSiteContent() {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
  if (error) throw error
  // Convert rows to nested object: { section: { key: value } }
  return data.reduce((acc, row) => {
    if (!acc[row.section]) acc[row.section] = {}
    acc[row.section][row.key] = row.value
    return acc
  }, {})
}

export async function updateSiteContent(section, key, value) {
  const { error } = await supabase
    .from('site_content')
    .upsert({ section, key, value }, { onConflict: 'section,key' })
  if (error) throw error
}
