
import { Task } from "@/lib/types"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Trash2, GripVertical } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

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
    <motion.div 
      className="group relative flex items-center gap-3 bg-card hover:bg-card/80 p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40">
        <GripVertical className="h-4 w-4" />
      </div>
      
      <div className="ml-4">
        <Checkbox 
          checked={task.completed}
          onCheckedChange={handleCompletedChange}
          className="transition-transform duration-200 data-[state=checked]:scale-110"
        />
      </div>
      
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
          className={`flex-1 truncate cursor-text transition-opacity duration-200 ${
            task.completed ? "line-through text-muted-foreground" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setIsEditing(true)
          }}
        >
          {task.title || "Untitled Task"}
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.id)
        }}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}