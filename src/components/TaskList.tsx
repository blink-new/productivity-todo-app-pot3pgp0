
import { useState } from 'react'
import { Task } from '../lib/types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Timer, Focus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface TaskListProps {
  tasks: Task[]
  onTaskAdd: (task: Task) => void
  onTaskUpdate: (task: Task) => void
  onTaskDelete: (taskId: string) => void
  onFocusTask: (task: Task) => void
}

export function TaskList({
  tasks,
  onTaskAdd,
  onTaskUpdate,
  onTaskDelete,
  onFocusTask,
}: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: Date.now(),
    }

    onTaskAdd(newTask)
    setNewTaskTitle('')
    toast.success('Task added!')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => {
                onTaskUpdate({ ...task, completed: checked as boolean })
              }}
            />
            <span
              className={`flex-1 ${
                task.completed ? 'text-muted-foreground line-through' : ''
              }`}
            >
              {task.title}
            </span>
            <div className="flex items-center gap-1">
              {task.timeSpent ? (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  {Math.round(task.timeSpent / 60)} min
                </div>
              ) : null}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFocusTask(task)}
              >
                <Focus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onTaskDelete(task.id)
                  toast.success('Task deleted')
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {tasks.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No tasks yet. Add one above!
          </div>
        ) : null}
      </div>
    </div>
  )
}