
import { Task } from "@/lib/types"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface TaskItemProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleTitleChange = (newTitle: string) => {
    onUpdate({
      ...task,
      title: newTitle
    })
  }

  const handleCompletedChange = (completed: boolean) => {
    onUpdate({
      ...task,
      completed
    })
  }

  return (
    <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
      <Checkbox 
        checked={task.completed}
        onCheckedChange={handleCompletedChange}
      />
      
      {isEditing ? (
        <Input
          value={task.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false)
            }
          }}
          autoFocus
          className="flex-1"
        />
      ) : (
        <div 
          className="flex-1 truncate cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {task.title || "Untitled Task"}
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}