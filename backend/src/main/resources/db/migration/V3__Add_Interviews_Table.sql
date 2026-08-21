-- V3__Add_Interviews_Table.sql - TalentSphere AI Interview Scheduling Table

CREATE TABLE IF NOT EXISTS interviews (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    candidate_name VARCHAR(255),
    job_id VARCHAR(64) NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    job_title VARCHAR(255),
    scheduled_at VARCHAR(100) NOT NULL,
    interviewer VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed an initial scheduled interview for Elena Rodriguez
INSERT INTO interviews (id, candidate_id, candidate_name, job_id, job_title, scheduled_at, interviewer, type, status, notes)
VALUES ('int-101', 'cand-001', 'Elena Rodriguez', 'job-1042', 'Senior Java Developer (REQ-1042)', 'Nov 02, 2026 · 14:00 PST', 'David Sterling / Engineering Panel', 'Technical', 'SCHEDULED', 'Focus on microservices concurrency, Kafka streaming, and JVM garbage collection optimization.')
ON CONFLICT (id) DO NOTHING;
