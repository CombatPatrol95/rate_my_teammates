-- Database schema for Rate My Teammates application
-- Compatible with PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- Teammate ratings table
CREATE TABLE IF NOT EXISTS teammate_ratings (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    social_score INTEGER NOT NULL CHECK (social_score BETWEEN 1 AND 10),
    group_collaboration_score INTEGER NOT NULL CHECK (group_collaboration_score BETWEEN 1 AND 10),
    course_number VARCHAR(20) NOT NULL,
    submission_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    comments TEXT
); 