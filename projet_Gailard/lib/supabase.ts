import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export type MoodEntry = {
  id?: string
  first_name: string
  entry_date: string
  entry_type: "morning" | "evening"
  predicted_mood?: string
  energy_level?: number
  mood_color?: string
  actual_mood?: string
  satisfaction_rating?: number
  comment?: string
  created_at?: string
  updated_at?: string
}
