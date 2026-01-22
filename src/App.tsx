import JiraStatsTable from './components/JiraStatsTable'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Jira Statistics Dashboard</h1>
        <p className="subtitle">Completed tasks statistics for the year</p>
      </header>
      <main className="app-main">
        <JiraStatsTable />
      </main>
    </div>
  )
}

export default App
