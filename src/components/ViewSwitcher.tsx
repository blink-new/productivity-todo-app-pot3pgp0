
import { LayoutGrid, List } from "lucide-react"
import { Button } from "./ui/button"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export type ViewType = 'board' | 'list'

interface ViewSwitcherProps {
  view: ViewType
  onChange: (view: ViewType) => void
}

export function ViewSwitcher({ view, onChange }: ViewSwitcherProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => onChange(value as ViewType)}>
      <ToggleGroupItem value="board" aria-label="Board view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}