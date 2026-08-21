# TalentSphere AI — Backend Memory & State Tracking

**Last Updated:** August 21, 2026  
**Status:** ALL CORE MODULES IMPLEMENTED & VERIFIED  

---

## 1. Current Backend Status
- **Runtime:** OpenJDK 21 (Eclipse Temurin) on port `8080`.
- **Database:** PostgreSQL 17 on port `5432` (`talentsphere` database).
- **Migration Tool:** Flyway (`V1__Init_Schema.sql`, `V2__Seed_Data.sql`, `V3__Add_Interviews_Table.sql`).
- **Security:** Spring Security 6, JJWT (`0.12.6`), BCrypt hashing, role-based authorization (`RECRUITER`, `CANDIDATE`, `ADMIN`).
- **AI Engine:** Google Gemini REST API client with model configurability via `GEMINI_MODEL` (fallback `gemini-1.5-flash`).
- **Directory Structure:** Clean separation into `backend/` and `frontend/` directories at the workspace root.
- **Frontend:** React 18 + TypeScript + Vite running inside `frontend/` on port `3001` (`http://localhost:3001/`).
- **Backend:** Java 21 + Spring Boot 3.3.4 running inside `backend/` on port `8080` (`http://localhost:8080/`).

---

## 2. Completed Modules & Audited Capabilities

| Module | Status | Key Features |
| :--- | :--- | :--- |
| **Auth & Security** | `COMPLETE` | Registration, login, profile inspection, JWT extraction, role checks |
| **Job Requisitions** | `COMPLETE` | CRUD jobs, scoring weight recalibration, JD parsing via Gemini AI & Apache PDFBox/POI |
| **Candidate Management** | `COMPLETE` | Multidimensional fit scoring, ranking, profile views, side-by-side comparison |
| **Online Assessments (OA)** | `COMPLETE` | Question bank CRUD, test case runners, OA assignment, submission evaluation, AI question generator |
| **Decision Intelligence** | `COMPLETE` | Explainable AI reasoning, factor breakdown, strengths/risks analysis, human-in-the-loop recruiter overrides |
| **Professional Evidence** | `COMPLETE` | Multi-source evidence verification (GitHub, LeetCode, LinkedIn), resume claim consistency checking |
| **Interviews** | `COMPLETE` | Interview scheduling, candidate interviews list, AI interview brief generation |
| **AI Copilot** | `COMPLETE` | Context-aware talent copilot with role/candidate synthesis |
| **Audit Log & Trail** | `COMPLETE` | Recruiter decision records, override notes, timestamped actions |
| **Notifications** | `COMPLETE` | Event-driven alert pipeline (OA submissions, ranking updates, verification flags) |

---

## 3. Important Architectural Decisions
- **AI as Decision Support (Non-Autonomous Hiring):** AI analyzes evidence, predicts fit score, and generates explainable reasoning. Final decision resides with the human recruiter.
- **Explainable Reasoning:** Every recommendation outputs fit score, confidence score, key strengths, risk flags, and recommended next steps.
- **Evidence Consistency (Verification Flagging):** Discrepancies between resume claims and external evidence are flagged as `NEEDS_VERIFICATION` rather than fraud accusations.
- **Configurable AI Models:** Zero hardcoded AI models. Configured via `GEMINI_MODEL` environment variable.

---

## 4. Next Actions
- Verify production deployment pipelines.
- Expand proctoring analytics if live webcam monitoring is enabled.
