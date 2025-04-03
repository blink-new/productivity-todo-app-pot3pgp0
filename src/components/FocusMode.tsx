
import { Task, TimerState } from '@/lib/types'
import { Button } from './ui/button'
import { Timer } from './Timer'
import { TaskEditor } from './TaskEditor'
import { X } from 'lucide-react'
import { Card } from './ui/card'

interface FocusModeProps {
  task: Task
  onClose: () => void
  onTaskUpdate: (task: Task) => void
}

export function FocusMode({ task, onClose, onTaskUpdate }: FocusModeProps) {
  const handleTimerComplete = () => {
    // You could add a notification here
  }

  const handleTimerStateChange = (state: TimerState) => {
    // You could persist timer state here
  }

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Focus Mode</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl">{task.title}</h3>
        <Timer
          onComplete={handleTimerComplete}
          onStateChange={handleTimerStateChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <TaskEditor
          content={task.notes}
          onChange={(content) => onTaskUpdate({ ...task, notes: content })}
        />
      </div>
    </Card>
  )
}