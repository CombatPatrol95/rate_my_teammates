-- This script provides sample data for development and testing purposes
-- It will run automatically when Spring Boot starts with spring.sql.init.mode=always

-- Clear existing data
DELETE FROM teammate_ratings;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS teammate_ratings_id_seq RESTART WITH 1;

-- Insert admin user
-- Note: The password is 'admin123' encoded with BCrypt
INSERT INTO users (username, password, is_admin, enabled)
VALUES ('admin', '$2a$10$BLsUL1Vy1Xy3t.e7k5gmoeWkVX5hN1PyO1AOo/LAuLfEVH.p9U1fG', true, true);

-- Insert regular user
-- Note: The password is 'user123' encoded with BCrypt
INSERT INTO users (username, password, is_admin, enabled)
VALUES ('user', '$2a$10$bk9f0JoIxFVY.d6XfAz4lOBzJR.SxW6VLcQwZArMwz18l2RS0AvBK', false, true);

-- Insert sample teammate ratings (approved)
INSERT INTO teammate_ratings (last_name, social_score, group_collaboration_score, course_number, submission_date, approved, comments)
VALUES 
('Smith', 8, 9, 'CS101', CURRENT_TIMESTAMP, true, 'Great teammate, always on time'),
('Johnson', 7, 8, 'CS101', CURRENT_TIMESTAMP, true, 'Contributed well to the project'),
('Williams', 9, 10, 'CS101', CURRENT_TIMESTAMP, true, 'Exceptional leadership skills'),
('Brown', 6, 7, 'CS201', CURRENT_TIMESTAMP, true, 'Good technical skills but sometimes late'),
('Jones', 10, 9, 'CS201', CURRENT_TIMESTAMP, true, 'Excellent communication skills');

-- Insert sample teammate ratings (pending approval)
INSERT INTO teammate_ratings (last_name, social_score, group_collaboration_score, course_number, submission_date, approved, comments)
VALUES 
('Davis', 5, 6, 'CS101', CURRENT_TIMESTAMP, false, 'Often missed meetings'),
('Miller', 8, 7, 'CS201', CURRENT_TIMESTAMP, false, 'Good technical contribution'),
('Wilson', 9, 8, 'CS301', CURRENT_TIMESTAMP, false, 'Helped organize the team well'),
('Moore', 7, 8, 'CS301', CURRENT_TIMESTAMP, false, 'Consistently delivered on time'),
('Taylor', 6, 5, 'CS101', CURRENT_TIMESTAMP, false, 'Struggled with technical aspects'); 