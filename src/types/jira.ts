export type TaskStatus = 'Done' | 'In Progress' | 'To Do' | 'Blocked' | 'Review'

export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low'

export type TaskType = 'Bug' | 'Story' | 'Task' | 'Epic' | 'Subtask'

export interface JiraTask {
  id: string
  key: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  type: TaskType
  assignee: string
  reporter: string
  createdDate: Date
  resolvedDate: Date | null
  storyPoints: number | null
  timeSpent: number // in hours
  timeEstimated: number // in hours
  month: string
  sprint: string
  labels: string[]
  components: string[]
}

export interface MonthlyStats {
  month: string
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  blockedTasks: number
  totalStoryPoints: number
  completedStoryPoints: number
  totalTimeSpent: number
  averageResolutionTime: number // in days
}
