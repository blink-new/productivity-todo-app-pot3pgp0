
export interface Task {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface TimerState {
  duration: number;
  timeLeft: number;
  isRunning: boolean;
}