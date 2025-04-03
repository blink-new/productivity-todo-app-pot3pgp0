
import { Task, TimerState } from '@/lib/types'
import { Button } from './ui/button'
import { Timer } from './Timer'
import { TaskEditor } from './TaskEditor'
import { X, ChevronRight } from 'lucide-react'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'

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

  const updateSubtask = (subtaskId: string, completed: boolean) => {
    const updatedSubtasks = task.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed } : st
    )
    
    const allSubtasksCompleted = updatedSubtasks.every(st => st.completed)
    
    onTaskUpdate({
      ...task,
      subtasks: updatedSubtasks,
      completed: allSubtasksCompleted
    })
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
        <div className="flex items-center gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => {
              onTaskUpdate({
                ...task,
                completed: checked as boolean,
                subtasks: task.subtasks.map(st => ({
                  ...st,
                  completed: checked as boolean
                }))
              })
            }}
          />
          <h3 className={`text-xl ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
            {task.title}
          </h3>
        </div>

        <Timer
          onComplete={handleTimerComplete}
          onStateChange={handleTimerStateChange}
        />

        {task.subtasks.length > 0 && (
          <div className="space-y-2 rounded-lg border bg-accent/50 p-4">
            <h4 className="flex items-center gap-1 font-medium">
              <ChevronRight className="h-4 w-4" />
              Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
            </h4>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                >
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={(checked) => {
                      updateSubtask(subtask.id, checked as boolean)
                    }}
                  />
                  <span
                    className={`flex-1 ${
                      subtask.completed ? 'text-muted-foreground line-through' : ''
                    }`}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <TaskEditor
          content={task.notes || ''}
          onChange={(content) => onTaskUpdate({ ...task, notes: content })}
        />
      </div>
    </Card>
  )
}