
import { Button } from "./ui/button"
import { LayoutGrid, List } from "lucide-react"

export type ViewType = "board" | "list"

interface ViewSwitcherProps {
  view: ViewType
  onChange: (view: ViewType) => void
}

export function ViewSwitcher({ view, onChange }: ViewSwitcherProps) {
  return (
    <div className="bg-muted p-1 rounded-lg flex gap-1">
      <Button
        variant={view === "board" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("board")}
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        Board
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="gap-2"
      >
        <List className="h-4 w-4" />
        List
      </Button>
    </div>
  )
}