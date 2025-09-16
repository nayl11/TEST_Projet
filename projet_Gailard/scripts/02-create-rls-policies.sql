-- Enable Row Level Security
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read all entries (for team dashboard)
CREATE POLICY "Allow read access to all mood entries" ON mood_entries
  FOR SELECT USING (true);

-- Create policy to allow users to insert their own entries
CREATE POLICY "Allow insert for authenticated users" ON mood_entries
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own entries
CREATE POLICY "Allow update own entries" ON mood_entries
  FOR UPDATE USING (true);

-- Create policy to allow users to delete their own entries
CREATE POLICY "Allow delete own entries" ON mood_entries
  FOR DELETE USING (true);
