# TalentSphere AI — Database Schema & Relations

**Engine:** PostgreSQL 17 (Port 5432)  
**Database:** `talentsphere`  
**Migration Manager:** Flyway  

---

## Relational Tables (15 Tables)

1. `users` — Authentication accounts, BCrypt passwords, and roles (`RECRUITER`, `CANDIDATE`, `ADMIN`).
2. `jobs` — Requisition details, salary, requirements, and AI scoring weights.
3. `candidates` — Core candidate profile, fit scores, recommendation, and AI factor breakdown.
4. `verified_skills` — Skills with proficiency levels, verification flags, and project proofs.
5. `experience_items` — Candidate work history, company, role, highlights, and verified achievements.
6. `project_items` — Candidate portfolio projects, repo URLs, technologies, and metrics.
7. `professional_evidence` — External evidence sources (GitHub, LinkedIn, LeetCode, CodeChef) and statuses.
8. `candidate_applications` — Requisition applications, legal stages, and match score.
9. `application_stages` — Stage progression history and stage completion timestamps.
10. `oa_results` — Online assessment performance, code quality, proctor trust, and section scores.
11. `assessment_questions` — Coding challenges, time limits, test suites, constraints, and starter code.
12. `interview_focus_areas` — AI-generated interview questions, evaluation rubrics, and difficulty.
13. `interviews` — Scheduled interview sessions, interviewers, types, and notes.
14. `audit_logs` — Immutable decision log, AI recommendations vs recruiter actions, override reasons.
15. `notifications` — Alert feed, read states, and target application tabs.
