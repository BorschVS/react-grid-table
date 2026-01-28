# 🚀 Quick Start Guide

## First Time Setup

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **That's it!** npm workspaces will automatically install dependencies for all workspaces.

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend together:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

### Run Separately

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

## What Happens on First Run

1. Backend starts and creates SQLite database (`jira-tasks.db`)
2. Database is automatically seeded with 300+ sample tasks
3. Frontend connects to backend API
4. Table displays real data from database

## Project Structure

```
react-grid-table/
├── frontend/          # React app (Vite)
├── backend/          # Nest.js API
├── shared/           # Shared TypeScript types
└── package.json     # Root workspace config
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Troubleshooting

**Problem**: Shared types not found
- **Solution**: Run `npm install` from root

**Problem**: Backend won't start
- **Solution**: Make sure port 3000 is available

**Problem**: Frontend can't connect to API
- **Solution**: Make sure backend is running first

**Problem**: Database errors
- **Solution**: Delete `backend/jira-tasks.db` and restart backend
