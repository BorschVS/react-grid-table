# ✅ Deployment Checklist

## Pre-Deployment Checks

### ✅ Frontend Configuration
- [x] `frontend/vite.config.ts` has correct `base: '/react-grid-table/'`
- [x] `frontend/404.html` exists for SPA routing
- [x] `frontend/src/services/api.ts` supports environment variable `VITE_API_URL`
- [x] Frontend builds successfully: `npm run build:frontend`

### ✅ GitHub Actions Workflow
- [x] `.github/workflows/deploy.yml` exists
- [x] Workflow builds from `frontend/` directory
- [x] Workflow copies `404.html` to dist
- [x] Workflow uploads `frontend/dist` as artifact
- [x] Workflow supports `VITE_API_URL` secret for backend URL

### ✅ Repository Settings
- [ ] GitHub Pages enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Repository secret `VITE_API_URL` added (if backend deployed)

## Deployment Steps

1. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to Actions tab
   - Wait for "Deploy to GitHub Pages" workflow to complete
   - Check for any errors

3. **Verify deployment:**
   - Visit: `https://<username>.github.io/react-grid-table/`
   - Check browser console for errors
   - Test table functionality

## Backend Deployment (Optional but Recommended)

Since GitHub Pages only hosts static files, deploy backend separately:

### Option 1: Railway (Easiest)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository
4. Set root directory: `backend/`
5. Add environment variable: `PORT=3000`
6. Deploy
7. Copy backend URL and add to GitHub Secrets as `VITE_API_URL`

### Option 2: Render
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repository
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
5. Deploy and add URL to GitHub Secrets

## Post-Deployment

- [ ] Frontend loads correctly
- [ ] Table displays data (if backend connected)
- [ ] No console errors
- [ ] All features work (sorting, filtering, etc.)
- [ ] Mobile responsive design works

## Troubleshooting

**Problem**: Frontend shows "Error" or empty state
- **Solution**: Backend not deployed or `VITE_API_URL` not set

**Problem**: 404 errors on page refresh
- **Solution**: Check that `404.html` is in `frontend/dist/`

**Problem**: Assets not loading
- **Solution**: Check `base` path in `vite.config.ts` matches repository name

**Problem**: CORS errors
- **Solution**: Update backend CORS in `backend/src/main.ts` to include GitHub Pages domain
