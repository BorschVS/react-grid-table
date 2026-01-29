import { JiraTask, TaskStatus } from '@react-grid-table/shared/types'
import {
  MOCK_ASSIGNEES,
  MOCK_REPORTERS,
  MOCK_LABELS,
  MOCK_COMPONENTS,
  MOCK_TASK_TITLES,
  MOCK_MONTHS,
  MOCK_SPRINTS,
  TASKS_PER_MONTH_MIN,
  TASKS_PER_MONTH_MAX,
  YEAR,
  STORY_POINTS_NULL_CHANCE,
  STORY_POINTS_MAX,
  TIME_ESTIMATED_MIN,
  TIME_ESTIMATED_MAX,
  LABELS_COUNT_MIN,
  LABELS_COUNT_MAX,
  COMPONENTS_COUNT_MIN,
  COMPONENTS_COUNT_MAX,
  STATUS_WEIGHTS,
  MOCK_PRIORITIES,
  MOCK_TASK_TYPES,
} from '../constants/mockData'
import {
  randomElement,
  randomElements,
  randomDate,
  randomInt,
  weightedRandom,
} from '../utils/random'

function generateTask(monthIndex: number): JiraTask {
  const month = MOCK_MONTHS[monthIndex]

  const createdDate = randomDate(
    new Date(YEAR, monthIndex, 1),
    new Date(YEAR, monthIndex, 15),
  )

  const status: TaskStatus = weightedRandom(STATUS_WEIGHTS)

  const resolvedDate =
    status === 'Done'
      ? randomDate(createdDate, new Date(YEAR, monthIndex, 28))
      : null

  const storyPoints =
    Math.random() > STORY_POINTS_NULL_CHANCE
      ? randomInt(1, STORY_POINTS_MAX)
      : null
  const timeEstimated = randomInt(TIME_ESTIMATED_MIN, TIME_ESTIMATED_MAX)
  const timeSpent =
    status === 'Done'
      ? Math.floor(timeEstimated * (0.7 + Math.random() * 0.6))
      : status === 'In Progress'
      ? Math.floor(timeEstimated * (0.2 + Math.random() * 0.5))
      : 0

  const taskId = `TASK-${String(monthIndex + 1).padStart(2, '0')}-${String(
    randomInt(1, 999),
  ).padStart(3, '0')}`

  return {
    id: `${monthIndex}-${Math.random().toString(36).substr(2, 9)}`,
    key: taskId,
    title: randomElement(MOCK_TASK_TITLES),
    status,
    priority: randomElement(MOCK_PRIORITIES),
    type: randomElement(MOCK_TASK_TYPES),
    assignee: randomElement(MOCK_ASSIGNEES),
    reporter: randomElement(MOCK_REPORTERS),
    createdDate,
    resolvedDate,
    storyPoints,
    timeSpent,
    timeEstimated,
    month,
    sprint: randomElement(MOCK_SPRINTS),
    labels: randomElements(
      MOCK_LABELS,
      randomInt(LABELS_COUNT_MIN, LABELS_COUNT_MAX),
    ),
    components: randomElements(
      MOCK_COMPONENTS,
      randomInt(COMPONENTS_COUNT_MIN, COMPONENTS_COUNT_MAX),
    ),
  }
}

export function generateMockData(): JiraTask[] {
  const tasks: JiraTask[] = []

  MOCK_MONTHS.forEach((_, monthIndex) => {
    const tasksPerMonth = randomInt(TASKS_PER_MONTH_MIN, TASKS_PER_MONTH_MAX)
    for (let i = 0; i < tasksPerMonth; i++) {
      tasks.push(generateTask(monthIndex))
    }
  })

  return tasks.sort(
    (a, b) => a.createdDate.getTime() - b.createdDate.getTime(),
  )
}
