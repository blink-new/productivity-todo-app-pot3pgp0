
import { useState } from "react"
import { Task } from "./lib/types"
import { TaskBoard } from "./components/TaskBoard"
import { TaskList } from "./components/TaskList"
import { ViewSwitcher, ViewType } from "./components/ViewSwitcher"
import { Button } from "./components/ui/button"
import { Plus, ListTodo } from "lucide-react"
import { FocusMode } from "./components/FocusMode"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { generateId } from "./lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Tasks
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ViewSwitcher view={view} onChange={setView} />
            <Button 
              onClick={addTask}
              size="lg"
              className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <ListTodo className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first task to get started
                </p>
                <Button onClick={addTask} size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Task
                </Button>
              </div>
            ) : view === "board" ? (
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
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {focusedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 md:inset-10 overflow-y-auto"
            >
              <FocusMode
                task={focusedTask}
                onClose={() => setFocusedTask(null)}
                onTaskUpdate={updateTask}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}