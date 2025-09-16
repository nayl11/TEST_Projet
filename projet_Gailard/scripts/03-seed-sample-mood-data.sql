-- Insert sample mood data for testing
INSERT INTO mood_entries (employee_name, entry_type, predicted_mood, energy_level, mood_color, entry_date) VALUES
('Marie Dupont', 'morning', 'Optimiste', 4, '#10B981', CURRENT_DATE),
('Jean Martin', 'morning', 'Motivé', 5, '#3B82F6', CURRENT_DATE),
('Sophie Bernard', 'morning', 'Calme', 3, '#8B5CF6', CURRENT_DATE - INTERVAL '1 day');

INSERT INTO mood_entries (employee_name, entry_type, actual_feeling, satisfaction_rating, comment, entry_date) VALUES
('Marie Dupont', 'evening', 'Satisfaite', 4, 'Bonne journée productive avec quelques défis intéressants.', CURRENT_DATE - INTERVAL '1 day'),
('Jean Martin', 'evening', 'Épuisé mais content', 3, 'Journée chargée mais les objectifs ont été atteints.', CURRENT_DATE - INTERVAL '1 day');
