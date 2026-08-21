# TalentSphere AI — Functional & Technical Requirements

## 1. Non-Negotiable Technology Stack
- **Backend**: Java 21, Spring Boot 3.3.4, Spring Data JPA, Spring Security 6, Maven, JJWT 0.12.6.
- **Database**: PostgreSQL 17 on port 5432, Flyway migration management.
- **AI Service**: Google Gemini REST API client with model configurability (`GEMINI_MODEL`).
- **Frontend**: React 18 / TypeScript, Vite build tool, TailwindCSS + modern CSS tokens.

## 2. Role-Based Permissions
- **RECRUITER**:
  - Requisition creation, JD parsing, and scoring weight calibration.
  - Candidate ranking, candidate profiles, evidence inspection, and head-to-head comparison.
  - Online Assessment question management, OA assignment, and result analysis.
  - Decision Intelligence review, interview scheduling, and AI recommendation overrides.
  - Access to immutable decision audit logs and real-time alerts.
- **CANDIDATE**:
  - Profile management, verified skills, and external portfolio linking.
  - Requisition browsing, job application submissions.
  - Online Assessment IDE execution and submission.
  - Application progress and scheduled interview status.
- **ADMIN**:
  - User role provisioning, system performance metrics, and global audit review.

## 3. Human-in-the-Loop Constraint
- AI algorithms synthesize evidence, score candidates, and recommend actions (`PROCEED`, `HIGH_POTENTIAL`, `NEEDS_REVIEW`, `DO_NOT_PROCEED`).
- The system strictly requires human recruiter confirmation for progression to interviews, offers, or rejections.
- Recruiter overrides are recorded in the audit trail with recruiter identity, timestamp, and justification reason.
