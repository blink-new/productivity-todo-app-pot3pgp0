
import { useState, useEffect } from 'react'
import { Task } from './lib/types'
import { TaskList } from './components/TaskList'
import { FocusMode } from './components/FocusMode'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  
  const [focusedTask, setFocusedTask] = useState<Task | null>(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleTaskAdd = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    if (focusedTask?.id === updatedTask.id) {
      setFocusedTask(updatedTask)
    }
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    if (focusedTask?.id === taskId) {
      setFocusedTask(null)
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Focus Todo</h1>
          <p className="text-muted-foreground">
            Stay focused and get things done.
          </p>
        </div>
        
        {focusedTask ? (
          <FocusMode
            task={focusedTask}
            onClose={() => setFocusedTask(null)}
            onTaskUpdate={handleTaskUpdate}
          />
        ) : (
          <TaskList
            tasks={tasks}
            onTaskAdd={handleTaskAdd}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onFocusTask={setFocusedTask}
          />
        )}
      </div>
    </main>
  )
}