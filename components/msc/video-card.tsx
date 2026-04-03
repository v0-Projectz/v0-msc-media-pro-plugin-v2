"use client"

import Image from "next/image"
import { Play, CheckCircle2, Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export interface VideoData {
  id: string
  title: string
  category: string
  youtubeId: string
  thumbnail: string
  duration: string
  completed: boolean
  views?: number
  description?: string
}

interface VideoCardProps {
  video: VideoData
  onPlay: (video: VideoData) => void
  variant?: "grid" | "list"
}

export function VideoCard({ video, onPlay, variant = "grid" }: VideoCardProps) {
  if (variant === "list") {
    return (
      <button
        onClick={() => onPlay(video)}
        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:bg-secondary"
      >
        {/* Thumbnail */}
        <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-md bg-muted">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
              <Play className="h-3.5 w-3.5 text-foreground ml-0.5" />
            </div>
          </div>
          {/* Duration badge */}
          <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-white backdrop-blur-sm">
            {video.duration}
          </div>
          {video.completed && (
            <div className="absolute top-1 right-1">
              <CheckCircle2 className="h-4 w-4 text-primary drop-shadow" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
            {video.title}
          </p>
          {video.description && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {video.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <Clock className="h-3 w-3" />
              {video.duration}
            </span>
            {video.views !== undefined && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                <Eye className="h-3 w-3" />
                {video.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => onPlay(video)}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/40 bg-background/60 backdrop-blur-md transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 text-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white backdrop-blur-sm">
          {video.duration}
        </div>

        {/* Completed badge */}
        {video.completed && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="h-5 w-5 text-primary drop-shadow-md" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2 rounded bg-accent/90 px-2 py-0.5 text-[9px] font-bold text-accent-foreground uppercase tracking-wider backdrop-blur-sm">
          {video.category.replace("-", " ")}
        </div>
      </div>

      {/* Title + meta */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-sm font-medium text-card-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
        {video.description && (
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {video.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-1">
          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
          {video.views !== undefined && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <Eye className="h-3 w-3" />
              {video.views.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
