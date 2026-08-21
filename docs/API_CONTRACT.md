# TalentSphere AI — REST API Contract

**Base URL:** `http://localhost:8080/api/v1`

---

## 1. Authentication (`/auth`)
- `POST /auth/register` — Create new user account (`RECRUITER`, `CANDIDATE`, `ADMIN`).
- `POST /auth/login` — Authenticate and receive JWT access token.
- `GET /auth/me` — Retrieve current authenticated user profile.

## 2. Job Requisitions (`/jobs`)
- `GET /jobs` — Retrieve all active and draft requisitions.
- `GET /jobs/{id}` — Get single requisition details with scoring weights.
- `POST /jobs` — Create new job requisition.
- `PATCH /jobs/{id}/weights` — Update multidimensional AI scoring weights.
- `POST /jobs/analyze-jd` — Upload JD file (PDF/DOCX) and extract structured requirements via Gemini AI.

## 3. Candidate Intelligence (`/candidates`)
- `GET /candidates` — Retrieve all candidates (optional filter `?jobId=...`).
- `GET /candidates/{id}` — Full candidate intelligence profile with factor breakdown and evidence.
- `POST /candidates` — Ingest new candidate into recruitment pipeline.
- `PATCH /candidates/{id}/status` — Advance candidate through recruitment stages.
- `GET /candidates/compare` — Compare two candidates head-to-head (`?candidateA=...&candidateB=...`).

## 4. Online Assessments (`/assessments`)
- `GET /assessments/questions` — List question bank items.
- `GET /assessments/questions/{id}` — Single question details, examples, and test cases.
- `POST /assessments/questions` — Create new assessment coding challenge.
- `PUT /assessments/questions/{id}` — Update question metadata and test suites.
- `DELETE /assessments/questions/{id}` — Remove question from bank.
- `POST /assessments/submit` — Submit candidate OA attempt with code and time spent.
- `POST /assessments/{id}/assign` — Assign OA challenge to shortlisted candidate(s).
- `POST /assessments/generate-questions` — AI generation of candidate questions for recruiter review.

## 5. Interviews (`/interviews`)
- `GET /interviews` — List all scheduled panel interviews.
- `GET /interviews/candidate/{candidateId}` — Candidate interview history.
- `POST /interviews` — Schedule new panel interview.
- `GET /interviews/brief/{candidateId}` — AI generated technical interview brief with focus areas and rubrics.

## 6. Decision Intelligence & Overrides (`/decisions`)
- `GET /decisions/candidate/{candidateId}` — Full explainable AI decision intelligence synthesis.
- `POST /decisions/override` — Human recruiter override with mandatory rationale and audit log creation.

## 7. Professional Evidence & Consistency (`/evidence`)
- `GET /evidence/consistency/{candidateId}` — Resume claim vs verified evidence discrepancy analysis.
- `POST /evidence/candidate/{candidateId}` — Connect external evidence URL/profile.

## 8. AI Copilot (`/ai`)
- `POST /ai/copilot` — Multi-context talent copilot assistant.
- `POST /ai/candidates/{id}/evaluate` — On-demand candidate AI scoring and reasoning.

## 9. Audit Logs & Notifications (`/audit-logs`, `/notifications`)
- `GET /audit-logs` — Recruiter actions and override history.
- `POST /audit-logs` — Record recruiter action into immutable audit trail.
- `GET /notifications` — Retrieve alerts.
- `PATCH /notifications/{id}/read` — Mark notification read.
- `PATCH /notifications/read-all` — Mark all notifications read.
