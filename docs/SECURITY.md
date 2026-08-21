# TalentSphere AI — Security & Authentication Policy

## 1. Authentication & Tokens
- **Stateless JWT**: JJWT 0.12.6 HMAC-SHA256 signature algorithm.
- Token lifetime: 24 hours.
- Passwords hashed using Spring Security `BCryptPasswordEncoder` with strength 12.

## 2. Secrets Management
- All secrets are injected through environment variables:
  - `DATABASE_URL`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`
  - `JWT_SECRET`
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL`
- `.env` is strictly excluded from version control via `.gitignore`.
- Reference template maintained in `.env.example`.

## 3. Input Validation & Error Handling
- Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`) on all ingress DTOs.
- `GlobalExceptionHandler` converts exceptions into standardized `ApiResponse` errors without exposing internal stack traces or database connection strings.
- CORS configured for designated frontend origins (`http://localhost:3000`, `http://localhost:3001`, `http://localhost:5173`).
