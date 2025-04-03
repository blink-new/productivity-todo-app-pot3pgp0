
import { Task } from "@/lib/types"
import { TaskItem } from "./TaskItem"

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground/80">To Do</h2>
        <div className="grid gap-3">
          {todoTasks.map((task) => (
            <div 
              key={task.id} 
              className="cursor-pointer"
              onClick={() => onTaskFocus(task)}
            >
              <TaskItem
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground/80">Completed</h2>
        <div className="grid gap-3">
          {completedTasks.map((task) => (
            <div 
              key={task.id} 
              className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => onTaskFocus(task)}
            >
              <TaskItem
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}