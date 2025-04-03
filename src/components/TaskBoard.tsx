
import { Task } from "@/lib/types"
import { TaskItem } from "./TaskItem"
import { motion } from "framer-motion"

interface TaskBoardProps {
  tasks: Task[]
  onTaskUpdate: (task: Task) => void
  onTaskDelete: (taskId: string) => void
  onTaskFocus: (task: Task) => void
}

export function TaskBoard({ tasks, onTaskUpdate, onTaskDelete, onTaskFocus }: TaskBoardProps) {
  const todoTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">To Do</h2>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm font-medium">
            {todoTasks.length}
          </span>
        </div>
        <motion.div 
          className="grid gap-3"
          layout
        >
          {todoTasks.map((task) => (
            <motion.div 
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="cursor-pointer group"
              onClick={() => onTaskFocus(task)}
            >
              <TaskItem
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            </motion.div>
          ))}
          {todoTasks.length === 0 && (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No tasks to do</p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Completed</h2>
          <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-sm font-medium">
            {completedTasks.length}
          </span>
        </div>
        <motion.div 
          className="grid gap-3"
          layout
        >
          {completedTasks.map((task) => (
            <motion.div 
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="cursor-pointer group opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => onTaskFocus(task)}
            >
              <TaskItem
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            </motion.div>
          ))}
          {completedTasks.length === 0 && (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No completed tasks</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}