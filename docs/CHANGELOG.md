# TalentSphere AI — Changelog

## [1.1.0] - 2026-08-21
### Added
- Created `interviews` schema and entity (`V3__Add_Interviews_Table.sql`).
- Added `InterviewService` and `InterviewController` (`/api/v1/interviews`) for interview scheduling and AI interview briefs.
- Added `DecisionIntelligenceService` and `DecisionController` (`/api/v1/decisions`) for explainable AI reasoning and recruiter overrides.
- Added `EvidenceService` and `EvidenceController` (`/api/v1/evidence`) for resume claim consistency checks.
- Enhanced `AssessmentService` and `AssessmentController` with OA candidate submissions (`/api/v1/assessments/submit`), OA assignment, and AI question generation.
- Added integration tests: `InterviewControllerTest`, `DecisionControllerTest`, `EvidenceControllerTest`.
- Expanded frontend API client `src/services/api.ts` to support all extended endpoints.
- Added complete `/docs/` technical documentation suite.

## [1.0.0] - 2026-08-21
### Added
- Initial Java 21 + Spring Boot 3.3.4 project skeleton.
- PostgreSQL 17 database initialization and Flyway migrations `V1` & `V2`.
- Spring Security 6 with stateless JWT authentication and BCrypt password encryption.
- Core controllers: Auth, Jobs, Candidates, Assessments, Notifications, Audit Logs, AI Copilot.
- Apache PDFBox and Apache POI for resume and JD parsing.
- Google Gemini API integration with model configurability.
- Initial frontend-to-backend API wiring in React.
