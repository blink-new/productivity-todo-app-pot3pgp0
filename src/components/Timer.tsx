
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { TimerState } from '@/lib/types'

interface TimerProps {
  initialDuration?: number
  onComplete?: () => void
  onStateChange?: (state: TimerState) => void
}

export function Timer({ initialDuration = 25 * 60, onComplete, onStateChange }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialDuration)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: number
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1
          if (newTime === 0) {
            setIsRunning(false)
            onComplete?.()
          }
          onStateChange?.({ duration: initialDuration, timeLeft: newTime, isRunning })
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, initialDuration, onComplete, onStateChange])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const toggleTimer = () => setIsRunning(!isRunning)
  
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(initialDuration)
    onStateChange?.({ duration: initialDuration, timeLeft: initialDuration, isRunning: false })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleTimer} variant="outline" size="icon">
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}