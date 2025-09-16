export type MoodEntry = {
  id: string
  first_name: string
  entry_date: string
  entry_type: "morning" | "evening"
  predicted_mood?: string
  energy_level?: number
  mood_color?: string
  actual_mood?: string
  satisfaction_rating?: number
  comment?: string
  created_at: string
  updated_at: string
}

const STORAGE_KEY = "mood_entries"

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0]
}

export function getCurrentDateTime(): string {
  return new Date().toISOString()
}

export function saveMoodEntry(entry: Omit<MoodEntry, "id" | "created_at" | "updated_at">): MoodEntry {
  const entries = getMoodEntries()
  const now = getCurrentDateTime()

  // Check if entry already exists for this date and type
  const existingIndex = entries.findIndex(
    (e) => e.first_name === entry.first_name && e.entry_date === entry.entry_date && e.entry_type === entry.entry_type,
  )

  if (existingIndex >= 0) {
    // Update existing entry
    const updatedEntry: MoodEntry = {
      ...entries[existingIndex],
      ...entry,
      updated_at: now,
    }
    entries[existingIndex] = updatedEntry
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    return updatedEntry
  } else {
    // Create new entry
    const newEntry: MoodEntry = {
      ...entry,
      id: generateId(),
      created_at: now,
      updated_at: now,
    }
    entries.push(newEntry)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    return newEntry
  }
}

export function getMoodEntries(): MoodEntry[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading mood entries:", error)
    return []
  }
}

export function getMoodEntriesByDate(date: string): MoodEntry[] {
  return getMoodEntries().filter((entry) => entry.entry_date === date)
}

export function getMoodEntriesByName(firstName: string): MoodEntry[] {
  return getMoodEntries().filter((entry) => entry.first_name.toLowerCase() === firstName.toLowerCase())
}

export function getRecentEntries(limit = 10): MoodEntry[] {
  return getMoodEntries()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}
