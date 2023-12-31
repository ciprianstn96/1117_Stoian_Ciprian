CREATE DATABASE notes;

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    project_description TEXT
);

CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    note_content TEXT NOT NULL,
    project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);