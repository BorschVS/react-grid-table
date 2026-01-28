# Setup Instructions

## Initial Setup

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Install workspace dependencies:**
   ```bash
   npm install --workspace=frontend
   npm install --workspace=backend
   ```

## Development

### Run both frontend and backend:
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

### Run separately:

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

## First Run

On first backend startup, the database will be automatically seeded with sample data (300+ tasks).

## Troubleshooting

### If shared types are not found:

1. Make sure shared package is installed:
   ```bash
   npm install --workspace=shared
   ```

2. Rebuild TypeScript:
   ```bash
   cd frontend && npm run build
   cd ../backend && npm run build
   ```

### If API calls fail:

1. Make sure backend is running on port 3000
2. Check CORS settings in `backend/src/main.ts`
3. Verify proxy settings in `frontend/vite.config.ts`
