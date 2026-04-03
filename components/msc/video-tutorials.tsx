"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, ArrowRight, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoLightbox } from "./video-lightbox"
import { VIDEO_CATEGORIES } from "@/lib/video-config"
import { useVideos } from "@/hooks/use-videos"

// Use centralized video config - editable via Settings > Video Manager
const categories = VIDEO_CATEGORIES

export function VideoTutorials() {
  const allVideos = useVideos()
  const tutorials = allVideos.slice(0, 6) // Show first 6 on dashboard
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightboxVideo, setLightboxVideo] = useState<{
    youtubeId: string
    title: string
  } | null>(null)

  const filteredTutorials = tutorials
    .filter(t => activeCategory === "all" || t.category === activeCategory)
    .filter(t => 
      searchQuery === "" ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-5">
        {/* Section header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-card-foreground">
            Video Tutorials
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground font-mono">
              {tutorials.filter((t) => t.completed).length}/{tutorials.length} Completed
            </p>
            <Link
              href="/videos"
              className="flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent/80"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 relative max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-xs rounded-md border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category filter tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-md border px-4 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/40 hover:text-secondary-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video list */}
        <div className="flex flex-col divide-y divide-border">
          {filteredTutorials.map((video, index) => (
            <button
              key={video.id}
              onClick={() =>
                setLightboxVideo({
                  youtubeId: video.youtubeId,
                  title: video.title,
                })
              }
              className="group flex items-center gap-4 py-3 text-left transition-colors hover:bg-secondary/40 first:pt-0 last:pb-0 px-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm">
                    <Play className="h-3.5 w-3.5 text-white ml-0.5" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-white">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <p className="text-sm font-medium text-secondary-foreground leading-snug group-hover:text-primary transition-colors truncate">
                  {video.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {video.description}
                </p>
              </div>

              {/* Completed indicator */}
              {video.completed && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxVideo && (
        <VideoLightbox
          youtubeId={lightboxVideo.youtubeId}
          title={lightboxVideo.title}
          onClose={() => setLightboxVideo(null)}
        />
      )}
    </>
  )
}
