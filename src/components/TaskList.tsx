
import { useState } from 'react'
import { Task } from '@/lib/types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'
import { Timer, Focus, Trash2 } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onTaskAdd: (task: Task) => void
  onTaskUpdate: (task: Task) => void
  onTaskDelete: (taskId: string) => void
  onFocusTask: (task: Task) => void
}

export function TaskList({ tasks, onTaskAdd, onTaskUpdate, onTaskDelete, onFocusTask }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      notes: '',
      completed: false,
      priority: 'medium',
      createdAt: Date.now(),
    }

    onTaskAdd(newTask)
    setNewTaskTitle('')
  }

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit">Add Task</Button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 transition-colors",
              task.completed && "bg-muted"
            )}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => 
                onTaskUpdate({ ...task, completed: checked as boolean })
              }
            />
            <span className={cn(
              "flex-1",
              task.completed && "text-muted-foreground line-through"
            )}>
              {task.title}
            </span>
            <Badge variant="secondary" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
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
              onClick={() => onTaskDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}