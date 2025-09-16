-- Create the mood_entries table to store both morning and evening entries
CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  entry_date DATE NOT NULL,
  entry_type VARCHAR(10) NOT NULL CHECK (entry_type IN ('morning', 'evening')),
  
  -- Morning fields
  predicted_mood VARCHAR(10), -- emoji
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  mood_color VARCHAR(7), -- hex color code
  
  -- Evening fields
  actual_mood VARCHAR(10), -- emoji
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  comment TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries by date and user
CREATE INDEX IF NOT EXISTS idx_mood_entries_date_name ON mood_entries(entry_date, first_name);

-- Create an index for entry type queries
CREATE INDEX IF NOT EXISTS idx_mood_entries_type ON mood_entries(entry_type);

-- Create a unique constraint to prevent duplicate entries for the same person on the same day and type
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_daily_entry ON mood_entries(first_name, entry_date, entry_type);
