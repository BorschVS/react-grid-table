# 🚀 Deployment Guide

## Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages via GitHub Actions.

### How it works:

1. **Automatic deployment** - On every push to `main` branch
2. **Manual deployment** - Can be triggered from Actions tab

### Current Setup:

- ✅ GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
- ✅ Builds only frontend (backend is separate)
- ✅ Correct base path for GitHub Pages (`/react-grid-table/`)
- ✅ SPA routing support (404.html)

### Important Notes:

⚠️ **Backend is NOT deployed to GitHub Pages** - GitHub Pages only hosts static files.

For the frontend to work with backend API, you need to:

1. **Option 1: Deploy backend separately** (Recommended)
   - Deploy Nest.js backend to Railway, Render, Heroku, etc.
   - Set `VITE_API_URL` environment variable in GitHub Actions
   - Or update `frontend/src/services/api.ts` with your backend URL

2. **Option 2: Use mock data** (For demo)
   - Frontend can work without backend using fallback
   - Table will show "Error" or empty state

### Setting Backend URL for Production:

1. Go to repository Settings → Secrets and variables → Actions
2. Add new repository secret: `VITE_API_URL`
3. Set value to your backend URL (e.g., `https://your-backend.railway.app/api`)
4. Update workflow to use the secret:

```yaml
- name: Build frontend
  run: npm run build:frontend
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

## Backend Deployment

### Recommended Platforms:

1. **Railway** (Easiest)
   - Connect GitHub repo
   - Set root directory to `backend/`
   - Auto-deploys on push

2. **Render**
   - Connect GitHub repo
   - Set build command: `cd backend && npm install && npm run build`
   - Set start command: `cd backend && npm run start:prod`

3. **Heroku**
   - Similar to Render setup

### Environment Variables for Backend:

- `PORT` - Server port (usually auto-set by platform)
- `DATABASE_URL` - If using PostgreSQL instead of SQLite

### Database:

- Currently uses SQLite (file-based)
- For production, consider PostgreSQL
- Update `backend/src/app.module.ts` TypeORM config

## Full Stack Deployment Checklist

- [ ] Backend deployed to Railway/Render/Heroku
- [ ] Backend URL added to GitHub Secrets as `VITE_API_URL`
- [ ] GitHub Actions workflow updated to use secret
- [ ] CORS configured in backend for GitHub Pages domain
- [ ] Test frontend connects to backend API
- [ ] Test all features work in production
