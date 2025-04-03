
import { Task } from "@/lib/types"
import { TaskItem } from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  onTaskUpdate: (task: Task) => void
  onTaskDelete: (taskId: string) => void
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  )
}