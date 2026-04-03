"use client"

import { Search, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideosToolbarProps {
  search: string
  onSearchChange: (val: string) => void
  view: "grid" | "list"
  onViewChange: (val: "grid" | "list") => void
  totalVideos: number
}

export function VideosToolbar({
  search,
  onSearchChange,
  view,
  onViewChange,
  totalVideos,
}: VideosToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative max-w-xs flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search videos..."
          className="w-full rounded-md border border-border bg-secondary py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* View toggle */}
      <div className="flex overflow-hidden rounded-md border border-border">
        <button
          onClick={() => onViewChange("grid")}
          className={cn(
            "flex items-center justify-center px-2.5 py-2 transition-colors",
            view === "grid"
              ? "bg-primary/10 text-primary"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewChange("list")}
          className={cn(
            "flex items-center justify-center border-l border-border px-2.5 py-2 transition-colors",
            view === "list"
              ? "bg-primary/10 text-primary"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
