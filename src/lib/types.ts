
export interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  timeSpent?: number
  createdAt: number
}