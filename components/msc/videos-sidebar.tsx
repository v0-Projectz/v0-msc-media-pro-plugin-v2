"use client"

import { CheckCircle2, Circle, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { VideoData } from "./video-card"

interface VideosSidebarProps {
  videos: VideoData[]
  categories: { id: string; label: string }[]
  activeCategory: string
  onCategoryChange: (id: string) => void
  activeVideoId: string | null
}

export function VideosSidebar({
  videos,
  categories,
  activeCategory,
  onCategoryChange,
  activeVideoId,
}: VideosSidebarProps) {
  const totalCount = videos.length

  return (
    <div className="flex flex-col gap-6">
      {/* Category filters */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? totalCount
                : videos.filter((v) => v.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  activeCategory === cat.id
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] font-mono">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Video Manager */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Manage Videos
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Add, edit, or remove videos from your library. Update YouTube links and custom thumbnails.
        </p>
        <Link
          href="/settings?section=video-manager"
          className="flex items-center justify-center gap-2 w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Settings className="h-3.5 w-3.5" />
          Open Video Manager
        </Link>
      </div>
    </div>
  )
}
