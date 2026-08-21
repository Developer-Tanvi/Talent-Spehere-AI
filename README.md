# TalentSphere AI — Enterprise Recruitment Decision Support Platform

TalentSphere AI is an AI-powered recruitment decision support platform that combines multi-source professional evidence, standardized online assessments (OA), explainable AI reasoning, and human-in-the-loop recruiter controls.

---

## 📁 Repository Structure

```
Talent-Sphere-AI/
│
├── backend/                  # Java 21 + Spring Boot 3.x Backend
│   ├── pom.xml               # Maven configuration
│   ├── mvnw / mvnw.cmd       # Maven Wrapper
│   ├── src/main/java/        # Controllers, Services, Repositories, Entities, Security
│   ├── src/main/resources/   # application.yml, Flyway migrations (db/migration/)
│   └── src/test/             # Automated JUnit 5 integration tests
│
├── frontend/                 # React 18 + TypeScript + Vite Frontend
│   ├── package.json          # Frontend dependencies & scripts
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── index.html            # Single page application entrypoint
│   └── src/                  # Components, Types, State, Services (api.ts)
│
├── docs/                     # Comprehensive Architecture & API Documentation
│   ├── MEMORY.md             # Implementation state tracking
│   ├── CONTEXT.md            # Platform background
│   ├── REQUIREMENTS.md       # Functional & non-functional requirements
│   ├── ARCHITECTURE.md       # System design & package layout
│   ├── API_CONTRACT.md       # REST API endpoints & payloads
│   ├── DATABASE.md           # PostgreSQL schema & relations
│   ├── BUSINESS_RULES.md     # Scoring algorithms & verification rules
│   ├── SECURITY.md           # JWT & secret policies
│   ├── DECISIONS.md          # Architecture Decision Records (ADRs)
│   ├── CHANGELOG.md          # Version history
│   └── TODO.md               # Roadmap items
│
├── .env.example              # Root environment template
└── README.md                 # Project guide
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **JDK 21** (Eclipse Temurin)
- **PostgreSQL 17** running on port `5432` (database `talentsphere`)
- **Node.js 18+** & **npm**

---

### 1. Running the Backend (`backend/`)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure environment variables (or copy `.env.example`):
   ```bash
   export DATABASE_URL="jdbc:postgresql://localhost:5432/talentsphere"
   export DATABASE_USERNAME="postgres"
   export DATABASE_PASSWORD="your_password"
   export GEMINI_API_KEY="your_gemini_api_key"
   export GEMINI_MODEL="gemini-1.5-flash"
   ```
3. Run automated tests:
   ```bash
   ./mvnw clean test        # Linux/macOS
   .\mvnw.cmd clean test    # Windows
   ```
4. Start the Spring Boot application on port `8080`:
   ```bash
   ./mvnw spring-boot:run   # Linux/macOS
   .\mvnw.cmd spring-boot:run # Windows
   ```
5. Explore Swagger UI documentation:
   - URL: `http://localhost:8080/swagger-ui.html`
   - OpenAPI Docs: `http://localhost:8080/v3/api-docs`

---

### 2. Running the Frontend (`frontend/`)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   - URL: `http://localhost:3000` (or `http://localhost:3001`)

---

## 🔒 Security & Secrets
- Never commit `.env` or API keys.
- Server-side Gemini API calls ensure API keys are protected and never exposed to the client browser.
