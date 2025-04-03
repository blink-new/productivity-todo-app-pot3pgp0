
import { Task, TimerState } from '@/lib/types'
import { Button } from './ui/button'
import { Timer } from './Timer'
import { TaskEditor } from './TaskEditor'
import { X, ListTodo } from 'lucide-react'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Separator } from './ui/separator'

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
    onTaskUpdate({
      ...task,
      subtasks: updatedSubtasks,
    })
  }

  const completedSubtasks = task.subtasks.filter(st => st.completed).length
  const totalSubtasks = task.subtasks.length
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0

  return (
    <Card className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => {
              onTaskUpdate({
                ...task,
                completed: checked as boolean,
              })
            }}
            className="h-5 w-5"
          />
          <h2 className={`text-2xl font-bold ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
            {task.title}
          </h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Timer
        onComplete={handleTimerComplete}
        onStateChange={handleTimerStateChange}
        className="mx-auto"
      />

      {task.subtasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Subtasks</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedSubtasks} of {totalSubtasks} completed
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-2 mt-4">
            {task.subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm"
              >
                <Checkbox
                  checked={subtask.completed}
                  onCheckedChange={(checked) => {
                    updateSubtask(subtask.id, checked as boolean)
                  }}
                  className="h-4 w-4"
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

      <Separator />

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          Notes
          <span className="text-xs text-muted-foreground font-normal">
            (click to edit)
          </span>
        </label>
        <TaskEditor
          content={task.notes || ''}
          onChange={(content) => onTaskUpdate({ ...task, notes: content })}
          className="min-h-[100px] bg-accent/50 rounded-lg"
        />
      </div>
    </Card>
  )
}