import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { JiraTask } from '@react-grid-table/shared/types'
import { STATUS_OPTIONS, STATUS_COLORS_HEX } from '../constants/filters'
import { useTasks } from '../hooks/useTasks'
import './StatisticsPage.css'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
)

/**
 * Calculates task distribution by status
 */
function calculateStatusDistribution(tasks: JiraTask[]) {
  const distribution: Record<string, number> = {}
  
  STATUS_OPTIONS.forEach((status) => {
    distribution[status] = tasks.filter((task) => task.status === status).length
  })
  
  return distribution
}

/**
 * Calculates employee productivity metrics
 */
function calculateEmployeeProductivity(tasks: JiraTask[]) {
  const employeeStats: Record<
    string,
    { completedTasks: number; completedStoryPoints: number }
  > = {}

  tasks.forEach((task) => {
    if (!employeeStats[task.assignee]) {
      employeeStats[task.assignee] = {
        completedTasks: 0,
        completedStoryPoints: 0,
      }
    }

    if (task.status === 'Done') {
      employeeStats[task.assignee].completedTasks++
      if (task.storyPoints) {
        employeeStats[task.assignee].completedStoryPoints += task.storyPoints
      }
    }
  })

  return employeeStats
}

export default function StatisticsPage() {
  const { tasks, loading } = useTasks()

  const statusDistribution = useMemo(
    () => calculateStatusDistribution(tasks),
    [tasks],
  )

  const employeeProductivity = useMemo(
    () => calculateEmployeeProductivity(tasks),
    [tasks],
  )

  const pieChartData = {
    labels: STATUS_OPTIONS,
    datasets: [
      {
        label: 'Tasks',
        data: STATUS_OPTIONS.map((status) => statusDistribution[status]),
        backgroundColor: STATUS_OPTIONS.map((status) => STATUS_COLORS_HEX[status]),
        borderColor: '#0f1419',
        borderWidth: 2,
      },
    ],
  }

  const employees = Object.keys(employeeProductivity)
  const maxCompletedTasks = Math.max(
    ...employees.map((emp) => employeeProductivity[emp].completedTasks),
    1,
  )
  const maxStoryPoints = Math.max(
    ...employees.map((emp) => employeeProductivity[emp].completedStoryPoints),
    1,
  )

  const radarChartData = {
    labels: employees,
    datasets: [
      {
        label: 'Completed Tasks',
        data: employees.map(
          (emp) =>
            (employeeProductivity[emp].completedTasks / maxCompletedTasks) * 100,
        ),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
      {
        label: 'Completed Story Points',
        data: employees.map(
          (emp) =>
            (employeeProductivity[emp].completedStoryPoints / maxStoryPoints) *
            100,
        ),
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(236, 72, 153, 1)',
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'var(--text-primary)',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border)',
        borderWidth: 1,
      },
    },
  }

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: 'var(--text-secondary)',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'var(--border)',
        },
        pointLabels: {
          color: 'var(--text-primary)',
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--text-primary)',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border)',
        borderWidth: 1,
      },
    },
  }

  if (loading) {
    return (
      <div className="statistics-page">
        <div className="statistics-loading">Loading statistics...</div>
      </div>
    )
  }

  return (
    <div className="statistics-page">
      <div className="statistics-header">
        <h2>Task Status Distribution</h2>
        <p className="statistics-subtitle">
          Overview of tasks by their current status
        </p>
      </div>

      <div className="chart-container">
        <div className="chart-wrapper">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>

      <div className="statistics-header">
        <h2>Employee Productivity</h2>
        <p className="statistics-subtitle">
          Performance metrics based on completed tasks and story points
        </p>
      </div>

      <div className="chart-container">
        <div className="chart-wrapper chart-wrapper-radar">
          <Radar data={radarChartData} options={radarChartOptions} />
        </div>
      </div>

      <div className="statistics-summary">
        <div className="summary-card">
          <div className="summary-label">Total Tasks</div>
          <div className="summary-value">{tasks.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Completed</div>
          <div className="summary-value">{statusDistribution['Done']}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">In Progress</div>
          <div className="summary-value">
            {statusDistribution['In Progress']}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Active Employees</div>
          <div className="summary-value">{employees.length}</div>
        </div>
      </div>
    </div>
  )
}
