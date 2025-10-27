# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

ExportIQ 360 is an AI-powered SaaS platform that analyzes Turkish companies' e-commerce and e-export competence. It provides comprehensive assessments with GPT-powered analysis, interactive dashboards, and automated invoicing through Paraşüt integration.

**Tech Stack:**
- **Frontend**: React 19 + Vite + TailwindCSS + Recharts
- **Backend**: FastAPI (Python 3.11+) + PostgreSQL + OpenAI GPT
- **Architecture**: Monorepo with separate frontend and backend services

**Languages**: Turkish and English (bilingual support required per user rules)

## Common Development Commands

### Backend (Python/FastAPI)
```powershell
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload --port 8000

# Run with specific host/port
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Test commands (if tests exist)
python -m pytest

# Linting
python -m flake8 .
```

### Frontend (React/Vite)
```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Docker (Recommended for full stack)
```powershell
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs frontend
```

## Environment Configuration

### Backend (.env)
Required environment variables:
- `OPENAI_API_KEY`: OpenAI API key for GPT analysis
- `ENV`: development/production
- `API_HOST`: Default 0.0.0.0
- `API_PORT`: Default 8000
- `PARASUT_CLIENT_ID`, `PARASUT_CLIENT_SECRET`, `PARASUT_USERNAME`, `PARASUT_PASSWORD`, `PARASUT_COMPANY_ID`: Paraşüt API credentials
- `WEBHOOK_SECRET`: Optional webhook security
- Database connection string (PostgreSQL) for production

### Frontend (.env.local)
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)
- `VITE_OPENAI_API_KEY`: OpenAI API key (if needed on frontend)

## Architecture & Key Concepts

### Backend Architecture

**Main Entry Point**: `backend/main.py`
- FastAPI application with CORS middleware
- Core endpoints: `/analyze`, `/invoice/create`, `/payment/webhook`
- Response storage endpoints: `/responses/save`
- Report generation endpoints for comprehensive AI analysis

**Key Modules**:
1. **models.py**: Pydantic models for request/response validation
   - `AssessmentScores`: User competence scores (1-5 scale)
   - `InvoiceRequest/Response`: Paraşüt invoice models
   - `ComprehensiveReport`: Full AI analysis report structure
   - `UserResponse`: Individual question responses

2. **gpt_engine.py**: OpenAI GPT integration
   - `GPTAnalyzer` class handles AI analysis
   - Bilingual prompts (Turkish/English)
   - Returns structured JSON: competence_level, gap_analysis, swot_analysis, action_plan, training_recommendations

3. **report_service.py**: Comprehensive AI report generation
   - Generates per-question AI comments
   - Calculates channel scores (e-commerce, e-export, combined)
   - Category scoring (strategy, tech, marketing, logistics, analytics)
   - Strategic insights: strengths, weaknesses, recommendations

4. **parasut_service.py**: Paraşüt accounting integration
   - Creates invoices with Turkish tax compliance
   - Automatic customer creation
   - Email delivery
   - 20% VAT calculation

5. **database_service.py**: In-memory storage (replace with PostgreSQL in production)
   - Currently stores responses in memory
   - Production: Use `db_models.py` with SQLAlchemy

6. **db_models.py**: SQLAlchemy ORM models
   - `User`: Authentication, subscriptions, roles (free_trial, user, admin)
   - `Question`: Assessment questions with channel/category filtering
   - `Assessment`: Assessment sessions with progress tracking
   - `UserResponse`: Individual answers with AI comments
   - `Subscription`: Payment and subscription tracking

### Frontend Architecture

**Entry Point**: `frontend/src/main.jsx` → `App.jsx`

**Routing Structure** (React Router):
- `/` - Landing page
- `/login`, `/register` - Authentication
- `/pricing` - Pricing plans
- `/dashboard` - User dashboard (protected)
- `/assessment-type` - Choose assessment type (protected)
- `/assessment/{e-commerce|e-export|combined}` - Assessment flows (protected)
- `/report/:assessmentId` - Comprehensive reports (protected)
- `/admin/*` - Admin panel (admin role required)

**Key Directories**:
- `components/`: Reusable UI components
  - `components/assessment/`: Assessment-specific components
  - `components/common/`: Shared UI elements
  - `components/report/`: Report visualization components
  - `components/routes/`: Route protection (ProtectedRoute, AdminRoute)
- `contexts/`: React contexts (AuthContext, ToastContext)
- `pages/`: Route-level page components
- `services/`: API integration and business logic
- `utils/`: Utility functions and helpers

**Component Pattern**:
- Use `.jsx` for React components
- Use `.tsx` for TypeScript components (mixed project)
- TailwindCSS for styling

### Data Flow

1. **Assessment Flow**:
   - User selects package type (free_trial, e-commerce, e-export, combined)
   - Frontend sends scores to `/analyze` endpoint
   - GPT analyzes scores and returns structured report
   - Frontend displays results with Recharts visualizations

2. **Comprehensive Report Flow**:
   - User completes assessment questions (1-5 ratings)
   - Responses saved via `/responses/save`
   - Backend generates AI analysis via `report_service.py`
   - Per-question AI comments + strategic insights
   - Report accessible at `/report/:assessmentId`

3. **Invoice Flow**:
   - Admin creates invoice via `/invoice/create`
   - Paraşüt API generates invoice with Turkish compliance
   - Email sent to customer
   - Webhook endpoint `/payment/webhook` for automated invoice creation

### Important Implementation Notes

**Authentication**:
- JWT-based authentication (see `db_models.py` User model)
- Three roles: free_trial, user, admin
- Protected routes use `ProtectedRoute` and `AdminRoute` components

**Bilingual Support** (per user rules):
- All text must support Turkish (tr) and English (en)
- Questions stored as: `{text: {tr: "...", en: "..."}}`
- GPT prompts generate language-specific responses
- Frontend uses language context for UI

**Assessment Categories**:
- Strategy (Strateji)
- Technology (Teknoloji)
- Marketing (Pazarlama)
- Logistics (Lojistik)
- Analytics (Analitik)

**Assessment Channels**:
- E-commerce (e-ticaret yurtiçi)
- E-export (e-ihracat uluslararası)
- Combined (kapsamlı paket)

**Scoring System**:
- Questions rated 1-5
- Competence levels:
  - < 2.6: Basic/Temel
  - 2.6-4.0: Intermediate/Orta
  - > 4.0: Advanced/İleri
  - Additional: Expert/Uzman (80%+)

### Database Migration Notes

**Current State**: In-memory storage via `database_service.py`

**Production Migration**:
1. Use PostgreSQL with SQLAlchemy models from `db_models.py`
2. Set up Alembic migrations (already in requirements.txt)
3. Update connection in `database.py`
4. Replace in-memory calls with ORM queries

## Development Best Practices

1. **API Keys**: Never commit to repository. Use environment variables exclusively.

2. **CORS Configuration**: Update `main.py` CORS origins when deploying to new domains.

3. **OpenAI API Usage**: Fallback responses implemented in `gpt_engine.py` if API fails.

4. **Paraşüt Integration**: Test with sandbox credentials before production.

5. **Frontend State**: Use React contexts for global state (auth, toast notifications).

6. **Error Handling**: All endpoints have try-catch with HTTPException responses.

7. **Bilingual Content**: Always provide both Turkish and English translations.

## Port Configuration

- **Backend**: Port 8000 (configurable in `main.py` or via `API_PORT` env var)
- **Frontend**: Port 5173 (Vite default, configurable in `vite.config.js`)

## Testing

Tests are not currently implemented. When adding tests:
- Backend: Use `pytest` with test files in `backend/tests/`
- Frontend: Use testing framework defined in package.json
- Check README.md for any test commands before assuming

## Deployment

- **Frontend**: Can deploy to Netlify (see `netlify.toml`)
- **Backend**: Can deploy to Heroku (see `Procfile`)
- **Docker**: Use `docker-compose.yml` for containerized deployment
