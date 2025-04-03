
import { useState } from "react"
import { Task } from "./lib/types"
import { TaskBoard } from "./components/TaskBoard"
import { TaskList } from "./components/TaskList"
import { ViewSwitcher, ViewType } from "./components/ViewSwitcher"
import { Button } from "./components/ui/button"
import { Plus } from "lucide-react"
import { FocusMode } from "./components/FocusMode"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { generateId } from "./lib/utils"

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [view, setView] = useLocalStorage<ViewType>("view", "board")
  const [focusedTask, setFocusedTask] = useState<Task | null>(null)

  const addTask = () => {
    const newTask: Task = {
      id: generateId(),
      title: "",
      completed: false,
      subtasks: [],
      notes: "",
      createdAt: Date.now(),
      timeSpent: 0
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    if (focusedTask?.id === updatedTask.id) {
      setFocusedTask(updatedTask)
    }
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
    if (focusedTask?.id === taskId) {
      setFocusedTask(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="flex items-center gap-4">
            <ViewSwitcher view={view} onChange={setView} />
            <Button onClick={addTask}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {view === "board" ? (
          <TaskBoard
            tasks={tasks}
            onTaskUpdate={updateTask}
            onTaskDelete={deleteTask}
            onTaskFocus={setFocusedTask}
          />
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdate={updateTask}
            onTaskDelete={deleteTask}
          />
        )}
      </div>

      {focusedTask && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-4 md:inset-10 overflow-y-auto">
            <FocusMode
              task={focusedTask}
              onClose={() => setFocusedTask(null)}
              onTaskUpdate={updateTask}
            />
          </div>
        </div>
      )}
    </div>
  )
}