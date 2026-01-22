# 📊 Jira Statistics Dashboard

An educational project demonstrating the capabilities of the **@tanstack/react-table** library (formerly react-table) for creating powerful and functional data tables.

## 🎯 Project Features

### Table Functionality

- ✅ **Sorting** - sort by any column (ascending/descending)
- ✅ **Filtering** - filter by status, priority, and global search
- ✅ **Grouping** - group data by selected columns
- ✅ **Pagination** - split data into pages with customizable size
- ✅ **Search** - global search across all columns
- ✅ **Data Export** - export filtered data to CSV
- ✅ **Responsive Design** - proper display on different screen sizes

### Column Types

The project demonstrates various column types:

- **Text** - regular text fields (title, assignee)
- **Numbers** - numeric values (Story Points)
- **Dates** - formatted dates (created, resolved)
- **Statuses** - colored badges (task status)
- **Priorities** - colored badges (task priority)
- **Progress Bars** - progress visualization
- **Tags/Labels** - multiple values as tags
- **Keys** - monospace task keys

### Dark Theme

The project uses a modern dark color scheme with:
- Gradient headers
- Smooth transitions and animations
- Styled scrollbars
- Hover effects

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

1. Make sure GitHub Pages is enabled in your repository settings:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. Push changes to the `main` branch - the workflow will automatically build and deploy

3. Your site will be available at: `https://<username>.github.io/react-grid-table/`

The deployment workflow (`.github/workflows/deploy.yml`) will:
- Build the project with the correct base path
- Deploy to GitHub Pages automatically

## 📦 Technologies Used

- **React 18** - library for building user interfaces
- **TypeScript** - typed JavaScript
- **Vite** - fast build tool and dev server
- **@tanstack/react-table** - powerful library for working with tables
- **date-fns** - utilities for working with dates
- **lucide-react** - icon set

## 📚 Project Structure

```
react-grid-table/
├── src/
│   ├── components/
│   │   ├── JiraStatsTable.tsx    # Main table component
│   │   └── JiraStatsTable.css    # Table styles
│   ├── data/
│   │   └── mockData.ts           # Mock data generation
│   ├── types/
│   │   └── jira.ts               # TypeScript types
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Demo Data

The project uses mock data simulating Jira task statistics for a year:
- Tasks by months (12 months)
- Various statuses (Done, In Progress, To Do, Blocked, Review)
- Different priorities (Critical, High, Medium, Low)
- Task types (Bug, Story, Task, Epic, Subtask)
- Story Points, time spent, sprints
- Labels and components

## 💡 Educational Goals

This project was created to learn:
1. Working with the @tanstack/react-table library
2. Creating complex tables with multiple features
3. TypeScript typing
4. Component styling
5. State management in React
6. Creating responsive interfaces

## 📝 License

This project is created for educational purposes.
