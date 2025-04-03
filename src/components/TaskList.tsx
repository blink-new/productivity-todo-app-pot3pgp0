
import { useState } from 'react'
import { Task, Subtask } from '../lib/types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Timer, Focus, Trash2, ChevronDown, ChevronRight, Plus } from 'lucide-react'
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
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})
  const [newSubtasks, setNewSubtasks] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: Date.now(),
      subtasks: [],
    }

    onTaskAdd(newTask)
    setNewTaskTitle('')
    toast.success('Task added!')
    // Auto expand the new task
    setExpandedTasks(prev => ({
      ...prev,
      [newTask.id]: true
    }))
  }

  const toggleExpanded = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const handleAddSubtask = (taskId: string) => {
    const subtaskTitle = newSubtasks[taskId]?.trim()
    if (!subtaskTitle) return

    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newSubtask: Subtask = {
      id: crypto.randomUUID(),
      title: subtaskTitle,
      completed: false
    }

    onTaskUpdate({
      ...task,
      subtasks: [...task.subtasks, newSubtask]
    })

    setNewSubtasks(prev => ({
      ...prev,
      [taskId]: ''
    }))
    toast.success('Subtask added!')
  }

  const updateSubtask = (task: Task, subtaskId: string, completed: boolean) => {
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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Add Task</Button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2 rounded-lg border bg-card">
            <div
              className="flex items-center gap-2 p-4 transition-colors hover:bg-accent"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleExpanded(task.id)}
              >
                {expandedTasks[task.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => {
                  const newTask = {
                    ...task,
                    completed: checked as boolean,
                    subtasks: task.subtasks.map(st => ({
                      ...st,
                      completed: checked as boolean
                    }))
                  }
                  onTaskUpdate(newTask)
                }}
              />
              <span
                className={`flex-1 ${
                  task.completed ? 'text-muted-foreground line-through' : ''
                }`}
              >
                {task.title}
                {task.subtasks.length > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                  </span>
                )}
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

            {expandedTasks[task.id] && (
              <div className="space-y-2 border-t bg-accent/50 p-4">
                <div className="pl-8 space-y-2">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-2 rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                    >
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={(checked) => {
                          updateSubtask(task, subtask.id, checked as boolean)
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
                
                <div className="flex gap-2 pl-8">
                  <Input
                    type="text"
                    placeholder="Add a subtask..."
                    value={newSubtasks[task.id] || ''}
                    onChange={(e) =>
                      setNewSubtasks(prev => ({
                        ...prev,
                        [task.id]: e.target.value
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddSubtask(task.id)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleAddSubtask(task.id)}
                    variant="secondary"
                  >
                    Add Subtask
                  </Button>
                </div>
              </div>
            )}
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