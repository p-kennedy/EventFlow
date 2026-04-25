# EventFlow

B2G SaaS platform providing dynamic public transport scheduling and taxi route planning based on event data in a city.

## Stack

- **Backend**: FastAPI + asyncpg (PostgreSQL) + Anthropic Claude
- **Frontend**: Vite + React + react-router-dom
- **DB**: PostgreSQL

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in real values
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

```bash
psql -U postgres -d eventflow -f db/schema.sql
```

## Environment Variables

See `backend/.env.example` for all required variables.
