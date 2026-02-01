import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import JiraStatsTable from './components/JiraStatsTable'
import StatisticsPage from './components/StatisticsPage'
import './App.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="app-nav">
      <Link
        to="/"
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        📋 Table
      </Link>
      <Link
        to="/statistics"
        className={`nav-link ${location.pathname === '/statistics' ? 'active' : ''}`}
      >
        📊 Statistics
      </Link>
    </nav>
  )
}

function App() {
  const basename = import.meta.env.BASE_URL || '/'

  return (
    <BrowserRouter basename={basename}>
      <div className="app">
        <header className="app-header">
          <h1>📊 Jira Statistics Dashboard</h1>
          <p className="subtitle">Completed tasks statistics for the year</p>
          <Navigation />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<JiraStatsTable />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
