import { TaskStatus, TaskPriority } from '@react-grid-table/shared/types'

export const STATUS_OPTIONS: TaskStatus[] = [
  'Done',
  'In Progress',
  'To Do',
  'Blocked',
  'Review',
]

export const PRIORITY_OPTIONS: TaskPriority[] = [
  'Critical',
  'High',
  'Medium',
  'Low',
]

export const STATUS_COLORS: Record<TaskStatus, string> = {
  Done: 'var(--success)',
  'In Progress': 'var(--info)',
  'To Do': 'var(--text-tertiary)',
  Blocked: 'var(--error)',
  Review: 'var(--warning)',
}

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  Critical: 'var(--error)',
  High: 'var(--warning)',
  Medium: 'var(--info)',
  Low: 'var(--text-tertiary)',
}

export const DEFAULT_STATUS = 'To Do' as TaskStatus
export const DEFAULT_PRIORITY = 'Low' as TaskPriority
