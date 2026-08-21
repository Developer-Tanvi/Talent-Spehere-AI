# TalentSphere AI — Architecture Decision Records (ADRs)

## ADR-001: Java 21 + Spring Boot 3.3.4 Backend
- **Context:** High throughput, enterprise security, and strong typed ecosystem needed for recruitment analytics.
- **Decision:** Use Java 21 LTS with Spring Boot 3.x, Spring Data JPA, and Spring Security.
- **Consequences:** Provides fast compilation, virtual threads readiness, robust ORM, and comprehensive testing framework.

## ADR-002: PostgreSQL 17 + Flyway Versioned Migrations
- **Context:** Complex relational models (15 tables) require relational consistency, foreign key cascades, and automated schema evolution.
- **Decision:** PostgreSQL 17 with Flyway versioned migrations (`V1`, `V2`, `V3`).
- **Consequences:** Reproducible schema state across development, testing, and production environments.

## ADR-003: Configurable Google Gemini AI Model
- **Context:** Generative AI models evolve rapidly; hardcoding model strings causes deprecation breakage.
- **Decision:** Inject `GEMINI_MODEL` via environment variable with runtime fallback.
- **Consequences:** Seamless model upgrades without recompiling Java source code.

## ADR-004: Evidence Discrepancy as "Needs Verification"
- **Context:** Automated systems that accuse candidates of fraud generate high false-positive rates and legal liability.
- **Decision:** Flag discrepancies as `NEEDS_VERIFICATION` and feed into AI interview briefs for human review.
- **Consequences:** Fair, defensible, and constructive recruitment process.
