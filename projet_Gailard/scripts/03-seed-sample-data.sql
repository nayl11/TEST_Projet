-- Insert sample data for demonstration
INSERT INTO mood_entries (first_name, entry_date, entry_type, predicted_mood, energy_level, mood_color) VALUES
  ('Marie', '2024-01-15', 'morning', '😊', 4, '#22c55e'),
  ('Pierre', '2024-01-15', 'morning', '🙂', 3, '#3b82f6'),
  ('Sophie', '2024-01-15', 'morning', '😐', 2, '#eab308'),
  ('Thomas', '2024-01-15', 'morning', '😊', 5, '#22c55e');

INSERT INTO mood_entries (first_name, entry_date, entry_type, actual_mood, satisfaction_rating, comment) VALUES
  ('Marie', '2024-01-14', 'evening', '😊', 5, 'Excellente journée, très productive !'),
  ('Pierre', '2024-01-14', 'evening', '🙂', 4, 'Bonne journée dans l''ensemble'),
  ('Sophie', '2024-01-14', 'evening', '😔', 2, 'Journée difficile avec beaucoup de stress'),
  ('Thomas', '2024-01-14', 'evening', '😊', 5, 'Super journée, équipe au top !');

-- Add some historical data for trends
INSERT INTO mood_entries (first_name, entry_date, entry_type, predicted_mood, energy_level, mood_color) VALUES
  ('Marie', '2024-01-14', 'morning', '🙂', 3, '#3b82f6'),
  ('Marie', '2024-01-13', 'morning', '😐', 2, '#eab308'),
  ('Marie', '2024-01-12', 'morning', '😊', 4, '#22c55e'),
  ('Marie', '2024-01-11', 'morning', '🙂', 3, '#3b82f6');

INSERT INTO mood_entries (first_name, entry_date, entry_type, actual_mood, satisfaction_rating, comment) VALUES
  ('Marie', '2024-01-13', 'evening', '😔', 2, 'Journée compliquée'),
  ('Marie', '2024-01-12', 'evening', '😊', 4, 'Bonne journée'),
  ('Marie', '2024-01-11', 'evening', '🙂', 3, 'Journée correcte');
