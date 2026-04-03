"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoLightbox } from "./video-lightbox"

const categories = [
  { id: "all", label: "All" },
  { id: "site-basics", label: "Site Basics" },
  { id: "seo", label: "SEO" },
  { id: "content", label: "Content Updates" },
  { id: "support", label: "Support" },
]

const tutorials = [
  {
    id: "1",
    title: "Adding a New Blog Post",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/adding-blog-post.jpg",
    duration: "4:32",
    completed: true,
  },
  {
    id: "2",
    title: "Uploading Images & Galleries",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/uploading-images.jpg",
    duration: "6:15",
    completed: true,
  },
  {
    id: "3",
    title: "Embedding YouTube Videos",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/embedding-youtube.jpg",
    duration: "3:48",
    completed: false,
  },
  {
    id: "4",
    title: "Updating Your SEO Meta",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/seo-meta.jpg",
    duration: "5:22",
    completed: false,
  },
  {
    id: "5",
    title: "Changing Fonts in Divi",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/changing-fonts.jpg",
    duration: "3:10",
    completed: false,
  },
  {
    id: "6",
    title: "Connecting Your Email Optin",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/email-optin.jpg",
    duration: "7:45",
    completed: true,
  },
]

export function VideoTutorials() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxVideo, setLightboxVideo] = useState<{
    youtubeId: string
    title: string
  } | null>(null)

  const filteredTutorials =
    activeCategory === "all"
      ? tutorials
      : tutorials.filter((t) => t.category === activeCategory)

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-5">
        {/* Section header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-card-foreground">
            Instructionz
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

        {/* Category filter tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/40 hover:text-secondary-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTutorials.map((video) => (
            <button
              key={video.id}
              onClick={() =>
                setLightboxVideo({
                  youtubeId: video.youtubeId,
                  title: video.title,
                })
              }
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-secondary text-left transition-all hover:border-primary/30"
            >
              {/* Video thumbnail */}
              <div className="relative aspect-video bg-muted">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-background/60 backdrop-blur-md transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white backdrop-blur-sm">
                  {video.duration}
                </div>

                {/* Completed badge */}
                {video.completed && (
                  <div className="absolute right-2 top-2">
                    <CheckCircle2 className="h-5 w-5 text-primary drop-shadow-md" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="px-3 py-3">
                <p className="text-sm font-medium text-secondary-foreground leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </p>
              </div>
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
