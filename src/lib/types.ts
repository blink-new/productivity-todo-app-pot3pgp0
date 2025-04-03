
export interface Task {
  id: string
  title: string
  completed: boolean
  notes?: string
  timeSpent?: number
  createdAt: number
  subtasks: Subtask[]
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
}