import { useState, useEffect } from 'react'
import { JiraTask } from '../types/jira'
import { apiService } from '../services/api'
import { generateMockData } from '../data/mockData'

export function useTasks() {
  const [tasks, setTasks] = useState<JiraTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      setUsingMockData(false)
      
      // Try to fetch from API
      const data = await apiService.getTasks()
      setTasks(data)
    } catch (err) {
      // If API fails, fallback to mock data
      console.warn('API unavailable, using mock data:', err)
      setError(null) // Don't show error, just use mock data
      setUsingMockData(true)
      const mockData = generateMockData()
      setTasks(mockData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    usingMockData,
    refetch: fetchTasks,
  }
}
