// Enums for validation (TypeScript enums are values, not just types)
export enum TaskStatus {
  Done = 'Done',
  InProgress = 'In Progress',
  ToDo = 'To Do',
  Blocked = 'Blocked',
  Review = 'Review',
}

export enum TaskPriority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskType {
  Bug = 'Bug',
  Story = 'Story',
  Task = 'Task',
  Epic = 'Epic',
  Subtask = 'Subtask',
}
