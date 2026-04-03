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
