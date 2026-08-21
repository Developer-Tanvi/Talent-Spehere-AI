-- V2__Seed_Data.sql - TalentSphere AI Initial Seed Data

-- 1. Initial Users (Passwords are BCrypt hash of 'password123': $2a$10$7EqJtq98hPqEX7fNZaFWoO.nflg1V7/WJ4fT0m018r2Q.xL0Oa.2C)
INSERT INTO users (id, name, email, password_hash, role, profile_image, enabled) VALUES
('usr-recruiter-01', 'Sarah Jenkins', 'sarah.jenkins@talentsphere.ai', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.nflg1V7/WJ4fT0m018r2Q.xL0Oa.2C', 'RECRUITER', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', true),
('usr-candidate-01', 'Elena Rodriguez', 'elena.rodriguez@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.nflg1V7/WJ4fT0m018r2Q.xL0Oa.2C', 'CANDIDATE', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', true),
('usr-candidate-02', 'Alex Chen', 'alex.chen@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.nflg1V7/WJ4fT0m018r2Q.xL0Oa.2C', 'CANDIDATE', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Initial Jobs
INSERT INTO jobs (id, req_code, title, department, location, type, seniority, salary_range, status, applicants_count, shortlisted_count, interviewing_count, hired_count, target_hire_date, min_experience_years, description, required_skills, nice_to_have_skills, responsibilities, weight_skills, weight_experience, weight_oa_score, weight_github_evidence, weight_education) VALUES
('job-1042', 'REQ-1042', 'Senior Java Developer', 'Backend Engineering', 'San Francisco, CA (Hybrid)', 'Full-time', 'Senior', '$165,000 - $195,000', 'Active', 450, 182, 38, 2, 'Nov 15, 2026', 5, 
'We are seeking an experienced Senior Java Developer to architect and build high-throughput distributed backend services powering our real-time analytics and transaction pipelines.',
'["Java 21", "Spring Boot 3", "Microservices", "Kafka", "PostgreSQL", "Distributed Systems"]',
'["Kubernetes", "AWS ECS", "GraphQL", "Redis", "gRPC"]',
'["Architect, develop, and scale mission-critical Java microservices capable of handling 50k+ QPS.", "Design resilient event-driven data streaming pipelines with Apache Kafka and RabbitMQ.", "Optimize complex PostgreSQL database schemas, indexing strategies, and connection pooling.", "Lead code reviews, mentor intermediate engineers, and champion automated testing best practices."]',
35, 25, 25, 10, 5),

('job-1043', 'REQ-1043', 'Staff Frontend Engineer', 'Product Experience', 'Remote (US/Canada)', 'Full-time', 'Staff', '$175,000 - $210,000', 'Active', 310, 114, 22, 1, 'Dec 01, 2026', 7,
'Lead the frontend technical direction of our core SaaS suite, driving micro-frontend architecture, sub-millisecond interaction latency, and high-standard design system adoption.',
'["React 19", "TypeScript", "Next.js", "Web Performance", "Design Systems", "State Architecture"]',
'["Web Workers", "Wasm", "Tailwind CSS", "GraphQL", "Cypress"]',
'["Define web performance benchmarks (Core Web Vitals) and eliminate rendering bottlenecks.", "Architect extensible UI component libraries and maintain strict accessibility (WCAG AAA).", "Collaborate closely with product designers and backend engineers on API contracts."]',
30, 30, 20, 15, 5),

('job-1044', 'REQ-1044', 'Cloud Infrastructure Architect', 'Platform & DevOps', 'New York, NY (Hybrid)', 'Full-time', 'Lead', '$185,000 - $225,000', 'Active', 180, 65, 12, 0, 'Nov 30, 2026', 6,
'Build enterprise-scale Kubernetes multi-region clusters, automate cloud infrastructure with Terraform, and guarantee 99.99% uptime for core production workloads.',
'["Kubernetes", "Terraform", "AWS / GCP", "CI/CD Pipelines", "Observability", "Security Hardening"]',
'["Istio Service Mesh", "Go", "Prometheus/Grafana", "SOC2 Compliance"]',
'["Architect zero-downtime deployment pipelines using ArgoCD and GitHub Actions.", "Implement unified observability with OpenTelemetry, Prometheus, and Grafana.", "Establish disaster recovery protocols and manage multi-cloud redundancy."]',
35, 25, 20, 15, 5)
ON CONFLICT (id) DO NOTHING;

-- 3. Initial Candidates
INSERT INTO candidates (id, user_id, name, avatar, email, phone, location, title, bio, experience_years, current_company, is_open_to_work, resume_file_name, resume_uploaded_at, degree, institution, graduation_year, gpa, job_id, job_title, applied_date, status, fit_score, confidence_score, recommendation, recommendation_reason, factor_core_skills, factor_experience_relevance, factor_oa_performance, factor_code_quality, factor_profile_consistency, top_matched_skills, skill_gaps, github_username, github_public_repos, github_total_stars, github_total_commits, github_consistency_rating, github_quality_rating, github_languages_json) VALUES
('cand-001', 'usr-candidate-01', 'Elena Rodriguez', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'elena.rodriguez@example.com', '+1 (415) 892-4109', 'San Francisco, CA', 'Senior Backend Engineer', 'Senior Backend Systems Architect with 6.5+ years building fault-tolerant distributed services, high-throughput Kafka pipelines, and low-latency microservices with Spring Boot and Java 21.', 6.5, 'FinTech Velocity Labs', true, 'Elena_Rodriguez_Senior_Backend_Engineer.pdf', 'Oct 22, 2026 · 11:20 AM', 'B.S. in Computer Science', 'University of California, Berkeley', '2019', '3.86', 'job-1042', 'Senior Java Developer', '2 days ago', 'oa_completed', 94, 96, 'PROCEED', 'Exceptional match for REQ-1042. Demonstrated strong architectural expertise in Java 21 & Spring Boot microservices with verified 88% OA score and high commit consistency on GitHub open-source repositories.', 96, 93, 88, 95, 98, '["Spring Boot 3", "Distributed Systems", "Kafka Streams", "PostgreSQL", "Java 21", "Microservices"]', '["Kubernetes Cluster Ops (Minor)", "GraphQL (Nice to have)"]', 'elenarodriguez', 24, 615, 842, 98, 94, '[{"lang": "Java", "percentage": 68}, {"lang": "SQL", "percentage": 16}, {"lang": "Python", "percentage": 11}, {"lang": "Shell", "percentage": 5}]'),

('cand-002', 'usr-candidate-02', 'Alex Chen', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'alex.chen@example.com', '+1 (510) 334-9021', 'San Jose, CA', 'Senior Software Engineer', 'Passionate Java and Cloud engineer with 5.5 years designing reactive APIs and caching strategies for scalable web platforms.', 5.5, 'ScaleFlow Dynamics', true, 'Alex_Chen_Java_Engineer.pdf', 'Oct 21, 2026 · 09:15 AM', 'B.S. in Software Engineering', 'San Jose State University', '2020', '3.78', 'job-1042', 'Senior Java Developer', '3 days ago', 'interview_scheduled', 91, 94, 'PROCEED', 'Solid technical background with 88% OA score, exceptional algorithmic proficiency, and strong full-lifecycle Java development experience. Highly recommended for technical interview round.', 92, 90, 88, 92, 96, '["Java 21", "Spring Boot", "PostgreSQL", "Docker", "REST APIs", "Redis"]', '["Kafka Streams (Basic)", "Large scale distributed tracing"]', 'alexchen_dev', 18, 230, 490, 91, 89, '[{"lang": "Java", "percentage": 75}, {"lang": "TypeScript", "percentage": 15}, {"lang": "Go", "percentage": 10}]')
ON CONFLICT (id) DO NOTHING;

-- 4. Initial Verified Skills for Elena Rodriguez
INSERT INTO verified_skills (id, candidate_id, name, level, score, evidence_source, evidence_snippet, verified) VALUES
('vsk-01', 'cand-001', 'Java 21 / JVM Internals', 'Expert', 96, 'Assessment', 'Scored in 98th percentile on JVM concurrency and memory leak troubleshooting module.', true),
('vsk-02', 'cand-001', 'Spring Boot 3 & Security', 'Expert', 94, 'GitHub', 'Maintained 4 production microservices with Spring Cloud, OAuth2, and resilience4j patterns.', true),
('vsk-03', 'cand-001', 'Apache Kafka & Event Streaming', 'Advanced', 92, 'Work History', 'Architected event pipeline ingesting 12M events/day at FinTech Velocity Labs.', true),
('vsk-04', 'cand-001', 'PostgreSQL Query Optimization', 'Advanced', 90, 'Assessment', 'Optimized complex query execution plans reducing latency from 450ms to 18ms.', true),
('vsk-05', 'cand-001', 'Kubernetes & Docker', 'Intermediate', 74, 'Work History', 'Basic Helm chart deployment experience; limited production cluster administration.', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Initial Assessment Questions
INSERT INTO assessment_questions (id, title, difficulty, type, category, time_limit_minutes, description, starter_code_json, examples_json, constraints_json, test_cases_json, tags_json) VALUES
(1, 'REST API Distributed Rate Limiter', 'Medium', 'coding', 'Distributed Systems & Concurrency', 25,
'Implement a high-throughput **RateLimiter** class that controls the rate of requests allowed for any given client ID based on a sliding window rate-limiting algorithm.\n\n### Requirements:\n1. `allowRequest(String clientId, long timestampMs)`: Returns `true` if the request is permitted within the configured `maxRequestsPerWindow`, or `false` if the limit has been exceeded.\n2. The rate limiter must support arbitrary time windows (e.g. 100 requests per 60,000 milliseconds).\n3. Ensure thread-safety and constant memory overhead per active client.',
'{"java": "import java.util.*;\nimport java.util.concurrent.ConcurrentHashMap;\n\npublic class RateLimiter {\n    private final int maxRequests;\n    private final long windowSizeMs;\n    private final Map<String, Deque<Long>> clientWindows;\n\n    public RateLimiter(int maxRequests, long windowSizeMs) {\n        this.maxRequests = maxRequests;\n        this.windowSizeMs = windowSizeMs;\n        this.clientWindows = new ConcurrentHashMap<>();\n    }\n\n    public synchronized boolean allowRequest(String clientId, long timestampMs) {\n        // TODO: Implement sliding window rate limiting\n        Deque<Long> timestamps = clientWindows.computeIfAbsent(clientId, k -> new ArrayDeque<>());\n        while (!timestamps.isEmpty() && (timestampMs - timestamps.peekFirst() >= windowSizeMs)) {\n            timestamps.pollFirst();\n        }\n        if (timestamps.size() < maxRequests) {\n            timestamps.addLast(timestampMs);\n            return true;\n        }\n        return false;\n    }\n}", "typescript": "export class RateLimiter {\n  private maxRequests: number;\n  private windowSizeMs: number;\n  private clientWindows: Map<string, number[]>;\n\n  constructor(maxRequests: number, windowSizeMs: number) {\n    this.maxRequests = maxRequests;\n    this.windowSizeMs = windowSizeMs;\n    this.clientWindows = new Map();\n  }\n\n  public allowRequest(clientId: string, timestampMs: number): boolean {\n    // Implementation\n    return true;\n  }\n}"}',
'[{"input": "limiter = RateLimiter(maxRequests=3, windowSizeMs=1000)\\nallowRequest(\"user_1\", 100)\\nallowRequest(\"user_1\", 200)\\nallowRequest(\"user_1\", 300)\\nallowRequest(\"user_1\", 400)", "output": "true, true, true, false", "explanation": "The 4th request at timestamp 400ms exceeds the 3-request limit for the 1000ms window."}]',
'["1 <= maxRequests <= 100,000", "100 <= windowSizeMs <= 86,400,000 (24h)", "1 <= clientId length <= 64", "Timestamps are monotonically non-decreasing"]',
'[{"id": "tc-1", "input": "3 requests in 1000ms window", "expectedOutput": "Passed: 3 allowed, 4th throttled", "isHidden": false}, {"id": "tc-2", "input": "Sliding window expiration after 1100ms", "expectedOutput": "Passed: Old token evicted, new request allowed", "isHidden": false}]',
'["Algorithms", "Concurrency", "Sliding Window", "REST API"]')
ON CONFLICT (id) DO NOTHING;

-- 6. Initial Audit Logs
INSERT INTO audit_logs (id, timestamp, candidate_id, candidate_name, candidate_avatar, job_id, job_title, ai_recommendation, ai_fit_score, recruiter_action, recruiter_name, is_override, notes) VALUES
('log-101', '2026-10-24 16:42:10 PST', 'cand-001', 'Elena Rodriguez', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'job-1042', 'Senior Java Developer (REQ-1042)', 'PROCEED', 94, 'Approved for Interview', 'David Sterling (Lead Tech Recruiter)', false, 'Agreed with AI recommendation. Candidate demonstrated stellar microservice architecture in OA and verified GitHub repositories.'),
('log-102', '2026-10-24 14:15:33 PST', 'cand-002', 'Alex Chen', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'job-1042', 'Senior Java Developer (REQ-1042)', 'PROCEED', 91, 'Approved for Interview', 'David Sterling (Lead Tech Recruiter)', false, 'Strong OA results (88%) and clean coding conventions. Scheduled for Round 2 technical panel.')
ON CONFLICT (id) DO NOTHING;

-- 7. Initial Notifications
INSERT INTO notifications (id, user_id, title, message, timestamp_label, type, read, target_tab, candidate_id) VALUES
('notif-1', 'usr-recruiter-01', 'Elena Rodriguez submitted OA', 'Scored 88% on Senior Java Backend OA with 99% proctor trust score.', '10m ago', 'oa_completed', false, 'profile', 'cand-001'),
('notif-2', 'usr-recruiter-01', 'Candidate Ranking Updated', 'AI decision engine synthesized GitHub evidence for 4 new applicants.', '1h ago', 'new_ranking', false, 'candidates', null),
('notif-3', 'usr-recruiter-01', 'Verification Flag on Docker Skills', 'Marcus Johnson has moderate GitHub project proof for Kubernetes cluster administration.', '3h ago', 'skill_verification', true, 'evidence', 'cand-002')
ON CONFLICT (id) DO NOTHING;
