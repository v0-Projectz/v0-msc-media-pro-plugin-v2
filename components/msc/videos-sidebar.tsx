"use client"

import { CheckCircle2, Circle, Video } from "lucide-react"
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
  const completedCount = videos.filter((v) => v.completed).length
  const totalCount = videos.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Card */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Learning Progress
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-secondary"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${percentage * 1.76} 176`}
                strokeLinecap="round"
                className="text-primary transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-bold text-foreground">{percentage}%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {completedCount} of {totalCount}
            </p>
            <p className="text-[11px] text-muted-foreground">tutorials completed</p>
          </div>
        </div>
      </div>

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

      {/* Recent / Up Next */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Up Next
        </h3>
        <div className="flex flex-col gap-2">
          {videos
            .filter((v) => !v.completed)
            .slice(0, 4)
            .map((video) => (
              <div
                key={video.id}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-colors",
                  activeVideoId === video.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Circle className="h-3 w-3 shrink-0" />
                <span className="truncate">{video.title}</span>
              </div>
            ))}
          {videos.filter((v) => !v.completed).length === 0 && (
            <div className="flex items-center gap-2 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>All tutorials completed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Library Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border bg-secondary p-3 text-center">
            <p className="text-lg font-bold text-foreground">{totalCount}</p>
            <p className="text-[10px] font-mono text-muted-foreground">Total Videos</p>
          </div>
          <div className="rounded-md border border-border bg-secondary p-3 text-center">
            <p className="text-lg font-bold text-primary">{completedCount}</p>
            <p className="text-[10px] font-mono text-muted-foreground">Watched</p>
          </div>
          <div className="rounded-md border border-border bg-secondary p-3 text-center">
            <p className="text-lg font-bold text-accent">{totalCount - completedCount}</p>
            <p className="text-[10px] font-mono text-muted-foreground">Remaining</p>
          </div>
          <div className="rounded-md border border-border bg-secondary p-3 text-center">
            <Video className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-1 text-[10px] font-mono text-muted-foreground">YouTube</p>
          </div>
        </div>
      </div>
    </div>
  )
}
