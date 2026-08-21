-- TalentSphere AI Database Migration V1__Init_Schema.sql

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    profile_image TEXT,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(64) PRIMARY KEY,
    req_code VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    seniority VARCHAR(50) NOT NULL,
    salary_range VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    applicants_count INT DEFAULT 0,
    shortlisted_count INT DEFAULT 0,
    interviewing_count INT DEFAULT 0,
    hired_count INT DEFAULT 0,
    target_hire_date VARCHAR(100),
    min_experience_years INT DEFAULT 0,
    description TEXT,
    required_skills TEXT,
    nice_to_have_skills TEXT,
    responsibilities TEXT,
    weight_skills INT DEFAULT 35,
    weight_experience INT DEFAULT 25,
    weight_oa_score INT DEFAULT 25,
    weight_github_evidence INT DEFAULT 10,
    weight_education INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    avatar TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    location VARCHAR(255),
    title VARCHAR(255),
    bio TEXT,
    experience_years DOUBLE PRECISION DEFAULT 0.0,
    current_company VARCHAR(255),
    is_open_to_work BOOLEAN DEFAULT TRUE,
    resume_file_name VARCHAR(255),
    resume_uploaded_at VARCHAR(100),
    degree VARCHAR(255),
    institution VARCHAR(255),
    graduation_year VARCHAR(50),
    gpa VARCHAR(50),
    job_id VARCHAR(64) REFERENCES jobs(id) ON DELETE SET NULL,
    job_title VARCHAR(255),
    applied_date VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'applied',
    fit_score INT DEFAULT 0,
    confidence_score INT DEFAULT 0,
    recommendation VARCHAR(50) DEFAULT 'NEEDS_REVIEW',
    recommendation_reason TEXT,
    factor_core_skills INT DEFAULT 0,
    factor_experience_relevance INT DEFAULT 0,
    factor_oa_performance INT DEFAULT 0,
    factor_code_quality INT DEFAULT 0,
    factor_profile_consistency INT DEFAULT 0,
    top_matched_skills TEXT,
    skill_gaps TEXT,
    github_username VARCHAR(255),
    github_public_repos INT DEFAULT 0,
    github_total_stars INT DEFAULT 0,
    github_total_commits INT DEFAULT 0,
    github_consistency_rating INT DEFAULT 0,
    github_quality_rating INT DEFAULT 0,
    github_languages_json TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Verified Skills Table
CREATE TABLE IF NOT EXISTS verified_skills (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    score INT DEFAULT 0,
    evidence_source VARCHAR(100),
    evidence_snippet TEXT,
    verified BOOLEAN DEFAULT FALSE
);

-- 5. Experience Items Table
CREATE TABLE IF NOT EXISTS experience_items (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    period VARCHAR(100),
    location VARCHAR(255),
    description_json TEXT,
    key_deliverables_json TEXT,
    skills_used_json TEXT,
    relevance_score INT DEFAULT 0
);

-- 6. Project Items Table
CREATE TABLE IF NOT EXISTS project_items (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    repo_url TEXT,
    live_url TEXT,
    stars INT DEFAULT 0,
    commits INT DEFAULT 0,
    tech_stack_json TEXT,
    highlights_json TEXT,
    complexity_score INT DEFAULT 0
);

-- 7. Professional Evidence Table
CREATE TABLE IF NOT EXISTS professional_evidence (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    handle VARCHAR(255),
    url TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    verification_status VARCHAR(50) DEFAULT 'PENDING',
    connected_at VARCHAR(100),
    stats TEXT,
    badge VARCHAR(255),
    evidence_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Candidate Applications Table
CREATE TABLE IF NOT EXISTS candidate_applications (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    job_id VARCHAR(64) NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    job_title VARCHAR(255),
    req_code VARCHAR(64),
    department VARCHAR(255),
    company_name VARCHAR(255),
    applied_date VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'applied',
    fit_score INT DEFAULT 0,
    resume_file_name VARCHAR(255),
    cover_note TEXT,
    oa_required BOOLEAN DEFAULT FALSE,
    oa_completed BOOLEAN DEFAULT FALSE,
    oa_score INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Application Stages Table
CREATE TABLE IF NOT EXISTS application_stages (
    id VARCHAR(64) PRIMARY KEY,
    application_id VARCHAR(64) NOT NULL REFERENCES candidate_applications(id) ON DELETE CASCADE,
    stage VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    current BOOLEAN DEFAULT FALSE,
    date_info VARCHAR(100),
    display_order INT DEFAULT 0
);

-- 10. OA Results Table
CREATE TABLE IF NOT EXISTS oa_results (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    assessment_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_score INT NOT NULL,
    completed_at VARCHAR(100),
    time_spent_minutes INT DEFAULT 0,
    code_quality_score INT DEFAULT 0,
    algorithmic_score INT DEFAULT 0,
    system_design_score INT DEFAULT 0,
    proctor_trust_score INT DEFAULT 100,
    plagiarism_index DOUBLE PRECISION DEFAULT 0.0,
    sections_json TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Assessment Questions Table
CREATE TABLE IF NOT EXISTS assessment_questions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    time_limit_minutes INT DEFAULT 25,
    description TEXT NOT NULL,
    starter_code_json TEXT NOT NULL,
    examples_json TEXT,
    constraints_json TEXT,
    test_cases_json TEXT,
    tags_json TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Interview Focus Areas Table
CREATE TABLE IF NOT EXISTS interview_focus_areas (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    rationale TEXT NOT NULL,
    suggested_question TEXT NOT NULL,
    expected_answer_rubric TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL
);

-- 13. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp VARCHAR(100) NOT NULL,
    candidate_id VARCHAR(64),
    candidate_name VARCHAR(255),
    candidate_avatar TEXT,
    job_id VARCHAR(64),
    job_title VARCHAR(255),
    ai_recommendation VARCHAR(50),
    ai_fit_score INT,
    recruiter_action VARCHAR(255) NOT NULL,
    recruiter_name VARCHAR(255) NOT NULL,
    is_override BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(36),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp_label VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    target_tab VARCHAR(50),
    candidate_id VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
