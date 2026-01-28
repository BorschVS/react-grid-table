import { JiraTask, CreateTaskDto, UpdateTaskDto } from '../types/jira'

// Use environment variable for API URL
// For production: set VITE_API_URL in GitHub Actions secrets
// For development: uses proxy from vite.config.ts (/api -> localhost:3000)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async getTasks(): Promise<JiraTask[]> {
    const tasks = await this.request<JiraTask[]>('/tasks')
    // Convert date strings to Date objects
    return tasks.map((task) => ({
      ...task,
      createdDate: new Date(task.createdDate),
      resolvedDate: task.resolvedDate ? new Date(task.resolvedDate) : null,
    }))
  }

  async getTask(id: string): Promise<JiraTask> {
    const task = await this.request<JiraTask>(`/tasks/${id}`)
    return {
      ...task,
      createdDate: new Date(task.createdDate),
      resolvedDate: task.resolvedDate ? new Date(task.resolvedDate) : null,
    }
  }

  async createTask(data: CreateTaskDto): Promise<JiraTask> {
    const task = await this.request<JiraTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return {
      ...task,
      createdDate: new Date(task.createdDate),
      resolvedDate: task.resolvedDate ? new Date(task.resolvedDate) : null,
    }
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<JiraTask> {
    const task = await this.request<JiraTask>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    return {
      ...task,
      createdDate: new Date(task.createdDate),
      resolvedDate: task.resolvedDate ? new Date(task.resolvedDate) : null,
    }
  }

  async deleteTask(id: string): Promise<void> {
    await this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()
