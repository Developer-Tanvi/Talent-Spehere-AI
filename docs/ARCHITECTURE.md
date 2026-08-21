# TalentSphere AI — Architecture Document

## System Architecture

```mermaid
graph TD
    Client["React + Vite Frontend (Port 3001)"] -->|REST / JSON (JWT)| API["Spring Boot REST API (Port 8080)"]
    
    subgraph Spring Boot Backend
        Security["Spring Security + JWT Filter"] --> Controller["REST Controllers (/api/v1/*)"]
        Controller --> Service["Domain Services"]
        Service --> AI["GeminiService (Google Generative AI)"]
        Service --> Repo["Spring Data JPA Repositories"]
    end
    
    subgraph Data & Persistence
        Repo --> DB[("PostgreSQL 17 (Port 5432)")]
        Flyway["Flyway Migrations (V1, V2, V3)"] --> DB
    end
```

## Repository Structure
```
Talent-Sphere-AI/
│
├── backend/                  # Java 21 + Spring Boot 3.x Backend
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   ├── src/main/java/com/talentsphere/ai/
│   │   ├── config/           # SecurityConfig, CorsConfig, OpenApiConfig, AppConfig
│   │   ├── controller/       # Auth, Job, Candidate, Assessment, Decision, Evidence, Interview, AI, Notification, AuditLog
│   │   ├── dto/              # Request & Response Data Transfer Objects
│   │   ├── entity/           # JPA Entities (15 tables)
│   │   ├── exception/        # GlobalExceptionHandler, ResourceNotFoundException
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   ├── security/         # JwtTokenProvider, JwtAuthenticationFilter
│   │   └── service/          # Domain Services & Gemini AI integration
│   ├── src/main/resources/   # application.yml, db/migration (Flyway V1, V2, V3)
│   └── src/test/             # JUnit 5 & MockMvc integration tests
│
├── frontend/                 # React 18 + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── components/       # UI Components & Views
│   │   ├── services/         # API Service (api.ts)
│   │   ├── types.ts          # Domain Type Definitions
│   │   └── App.tsx           # Main Application Container
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── docs/                     # Full Documentation Suite
```
