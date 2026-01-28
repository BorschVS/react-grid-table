# 📊 Jira Statistics Dashboard

A full-stack educational project demonstrating:
- **Frontend**: React + TypeScript + Vite with @tanstack/react-table
- **Backend**: Nest.js + TypeORM + SQLite
- **Architecture**: Monorepo with shared types

## 🎯 Project Features

### Frontend Features

- ✅ **Sorting** - sort by any column (ascending/descending)
- ✅ **Filtering** - filter by status, priority, and global search
- ✅ **Grouping** - group data by selected columns
- ✅ **Pagination** - split data into pages with customizable size
- ✅ **Search** - global search across all columns
- ✅ **Data Export** - export filtered data to CSV
- ✅ **Responsive Design** - proper display on different screen sizes
- ✅ **Real API Integration** - connected to Nest.js backend

### Backend Features

- ✅ **REST API** - Full CRUD operations for tasks
- ✅ **Database** - SQLite with TypeORM
- ✅ **CORS** - Configured for frontend access
- ✅ **Auto-seeding** - Database seeded with sample data on startup

## 🏗️ Monorepo Structure

```
react-grid-table/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API service
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # Type re-exports from shared
│   └── package.json
├── backend/               # Nest.js API
│   ├── src/
│   │   ├── tasks/         # Tasks module (entity, service, controller)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── shared/                # Shared types
│   └── types/
│       └── jira.ts       # Common TypeScript types
└── package.json          # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install all dependencies (root, frontend, backend, shared)
npm install

# Or install individually
npm install --workspace=frontend
npm install --workspace=backend
```

### Development

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

Or run them separately:

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Build

```bash
# Build both frontend and backend
npm run build

# Or build individually
npm run build:frontend
npm run build:backend
```

## 📦 Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **@tanstack/react-table** - Table library
- **date-fns** - Date utilities
- **lucide-react** - Icons

### Backend
- **Nest.js** - Node.js framework
- **TypeORM** - ORM
- **SQLite** - Database
- **TypeScript** - Type safety

## 🔌 API Endpoints

All endpoints are prefixed with `/api`

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗄️ Database

The project uses SQLite database (`jira-tasks.db`) which is automatically created and seeded with sample data on first backend startup.

## 🎨 Demo Data

The backend automatically seeds the database with:
- Tasks for 12 months (January - December 2024)
- Various statuses (Done, In Progress, To Do, Blocked, Review)
- Different priorities (Critical, High, Medium, Low)
- Task types (Bug, Story, Task, Epic, Subtask)
- Story Points, time tracking, sprints
- Labels and components

## 💡 Educational Goals

This project demonstrates:
1. Monorepo architecture with npm workspaces
2. Full-stack TypeScript development
3. REST API design with Nest.js
4. Database integration with TypeORM
5. Frontend-backend integration
6. Shared types between frontend and backend
7. Modern React patterns (hooks, custom hooks)
8. Table functionality with @tanstack/react-table

## 📝 License

This project is created for educational purposes.
