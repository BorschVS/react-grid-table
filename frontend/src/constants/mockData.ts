export const MOCK_ASSIGNEES = [
  'Alexander Johnson',
  'Maria Williams',
  'David Brown',
  'Anna Davis',
  'Sergey Miller',
  'Elena Wilson',
  'Ivan Moore',
  'Olga Taylor',
] as const

export const MOCK_REPORTERS = [
  'Product Owner',
  'Scrum Master',
  'Tech Lead',
  'Project Manager',
] as const

export const MOCK_LABELS = [
  'frontend',
  'backend',
  'api',
  'database',
  'security',
  'performance',
  'ui/ux',
  'testing',
  'documentation',
  'refactoring',
] as const

export const MOCK_COMPONENTS = [
  'Authentication',
  'Dashboard',
  'API Gateway',
  'Payment System',
  'Notification Service',
  'Analytics',
  'Reports',
  'User Management',
] as const

export const MOCK_TASK_TITLES = [
  'Implement OAuth2 authentication',
  'Optimize database queries',
  'Add form validation',
  'Fix caching bug',
  'Create data table component',
  'Setup CI/CD pipeline',
  'Add unit tests',
  'Implement report export',
  'Improve API performance',
  'Add dark theme',
  'Implement task search',
  'Create analytics dashboard',
  'Fix security issues',
  'Add mobile device support',
  'Optimize image loading',
  'Implement notification system',
  'Add filters and sorting',
  'Create API documentation',
  'Fix bugs in payment system',
  'Implement integration with external services',
] as const

export const MOCK_MONTHS = [
  'January 2024',
  'February 2024',
  'March 2024',
  'April 2024',
  'May 2024',
  'June 2024',
  'July 2024',
  'August 2024',
  'September 2024',
  'October 2024',
  'November 2024',
  'December 2024',
] as const

export const MOCK_SPRINTS = [
  'Sprint 1',
  'Sprint 2',
  'Sprint 3',
  'Sprint 4',
  'Sprint 5',
  'Sprint 6',
] as const

export const TASKS_PER_MONTH_MIN = 15
export const TASKS_PER_MONTH_MAX = 45
export const YEAR = 2024
export const STORY_POINTS_NULL_CHANCE = 0.3
export const STORY_POINTS_MAX = 13
export const TIME_ESTIMATED_MIN = 4
export const TIME_ESTIMATED_MAX = 40
export const LABELS_COUNT_MIN = 1
export const LABELS_COUNT_MAX = 4
export const COMPONENTS_COUNT_MIN = 1
export const COMPONENTS_COUNT_MAX = 3

export const STATUS_WEIGHTS = {
  Done: 3,
  'In Progress': 2,
  'To Do': 1,
  Blocked: 1,
  Review: 1,
} as const

export const MOCK_PRIORITIES = ['Critical', 'High', 'Medium', 'Low'] as const

export const MOCK_TASK_TYPES = ['Bug', 'Story', 'Task', 'Epic', 'Subtask'] as const
