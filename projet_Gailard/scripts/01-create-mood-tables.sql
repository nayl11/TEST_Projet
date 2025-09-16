-- Create mood_entries table for storing employee mood data
CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_name TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('morning', 'evening')),
  
  -- Morning entry fields
  predicted_mood TEXT,
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  mood_color TEXT,
  
  -- Evening entry fields
  actual_feeling TEXT,
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  comment TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  entry_date DATE DEFAULT CURRENT_DATE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_mood_entries_employee_date ON mood_entries(employee_name, entry_date);
CREATE INDEX IF NOT EXISTS idx_mood_entries_type ON mood_entries(entry_type);
CREATE INDEX IF NOT EXISTS idx_mood_entries_date ON mood_entries(entry_date);

-- Enable Row Level Security (RLS)
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an internal employee tool)
-- In a production environment, you might want to restrict this further
CREATE POLICY "Allow all operations on mood_entries" ON mood_entries
  FOR ALL USING (true) WITH CHECK (true);
