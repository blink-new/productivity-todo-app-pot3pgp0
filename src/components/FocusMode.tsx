
import { useState, useEffect } from 'react'
import { Task } from '../lib/types'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Timer, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface FocusModeProps {
  task: Task
  onClose: () => void
  onTaskUpdate: (task: Task) => void
}

export function FocusMode({ task, onClose, onTaskUpdate }: FocusModeProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(task.timeSpent || 0)
  const [notes, setNotes] = useState(task.notes || '')

  useEffect(() => {
    let interval: number
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const handleSave = () => {
    onTaskUpdate({
      ...task,
      notes,
      timeSpent: timeElapsed,
    })
    toast.success('Progress saved!')
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{task.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 rounded-lg bg-accent p-8">
        <Timer className="h-6 w-6" />
        <span className="text-3xl font-mono">{formatTime(timeElapsed)}</span>
        <Button
          variant={isTimerRunning ? 'destructive' : 'default'}
          onClick={() => setIsTimerRunning(!isTimerRunning)}
        >
          {isTimerRunning ? 'Stop' : 'Start'} Timer
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <Textarea
          placeholder="Take notes while you work..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSave}>Save Progress</Button>
      </div>
    </div>
  )
}