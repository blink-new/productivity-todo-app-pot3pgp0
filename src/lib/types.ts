
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt: number;
  subtasks: Subtask[];
  timeSpent?: number;
}

export interface TimerState {
  duration: number;
  timeLeft: number;
  isRunning: boolean;
}