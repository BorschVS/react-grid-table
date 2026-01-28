import { DataSource } from 'typeorm'
import { TaskEntity } from './tasks/tasks.entity'
import { TaskStatus, TaskPriority, TaskType } from '@react-grid-table/shared/types'

const assignees = [
  'Alexander Johnson',
  'Maria Williams',
  'David Brown',
  'Anna Davis',
  'Sergey Miller',
  'Elena Wilson',
  'Ivan Moore',
  'Olga Taylor',
]

const reporters = [
  'Product Owner',
  'Scrum Master',
  'Tech Lead',
  'Project Manager',
]

const labels = [
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
]

const components = [
  'Authentication',
  'Dashboard',
  'API Gateway',
  'Payment System',
  'Notification Service',
  'Analytics',
  'Reports',
  'User Management',
]

const taskTitles = [
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
]

const months = [
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
]

const sprints = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6']

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

export async function seedDatabase(dataSource: DataSource) {
  const taskRepository = dataSource.getRepository(TaskEntity)

  // Check if tasks already exist
  const existingTasks = await taskRepository.count()
  if (existingTasks > 0) {
    console.log('Database already seeded')
    return
  }

  console.log('Seeding database...')

  const tasks: Partial<TaskEntity>[] = []

  months.forEach((month, monthIndex) => {
    const year = 2024
    const tasksPerMonth = Math.floor(Math.random() * 30) + 15 // 15-45 tasks per month

    for (let i = 0; i < tasksPerMonth; i++) {
      const createdDate = randomDate(
        new Date(year, monthIndex, 1),
        new Date(year, monthIndex, 15),
      )

      const status: TaskStatus = randomElement([
        'Done',
        'Done',
        'Done',
        'In Progress',
        'In Progress',
        'To Do',
        'Blocked',
        'Review',
      ])

      const resolvedDate =
        status === 'Done'
          ? randomDate(createdDate, new Date(year, monthIndex, 28))
          : null

      const storyPoints = Math.random() > 0.3 ? Math.floor(Math.random() * 13) + 1 : null
      const timeEstimated = Math.floor(Math.random() * 40) + 4
      const timeSpent =
        status === 'Done'
          ? Math.floor(timeEstimated * (0.7 + Math.random() * 0.6))
          : status === 'In Progress'
          ? Math.floor(timeEstimated * (0.2 + Math.random() * 0.5))
          : 0

      const taskKey = `TASK-${String(monthIndex + 1).padStart(2, '0')}-${String(
        i + 1,
      ).padStart(3, '0')}`

      tasks.push({
        key: taskKey,
        title: randomElement(taskTitles),
        status,
        priority: randomElement(['Critical', 'High', 'Medium', 'Low']),
        type: randomElement(['Bug', 'Story', 'Task', 'Epic', 'Subtask']),
        assignee: randomElement(assignees),
        reporter: randomElement(reporters),
        createdDate,
        resolvedDate,
        storyPoints,
        timeSpent,
        timeEstimated,
        month,
        sprint: randomElement(sprints),
        labels: randomElements(labels, Math.floor(Math.random() * 4) + 1),
        components: randomElements(components, Math.floor(Math.random() * 3) + 1),
      })
    }
  })

  await taskRepository.save(tasks)
  console.log(`✅ Seeded ${tasks.length} tasks`)
}
