"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SidebarNav } from "@/components/msc/sidebar-nav"
import { VideoCard } from "@/components/msc/video-card"
import { VideoLightbox } from "@/components/msc/video-lightbox"
import { VideosToolbar } from "@/components/msc/videos-toolbar"
import { VideosSidebar } from "@/components/msc/videos-sidebar"
import type { VideoData } from "@/components/msc/video-card"

const categories = [
  { id: "all", label: "All" },
  { id: "site-basics", label: "Site Basics" },
  { id: "seo", label: "SEO" },
  { id: "content", label: "Content Updates" },
  { id: "support", label: "Support" },
]

const allVideos: VideoData[] = [
  {
    id: "1",
    title: "Adding a New Blog Post",
    description: "Learn how to create and publish a new blog post in WordPress using the Divi builder.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/adding-blog-post.jpg",
    duration: "4:32",
    completed: true,
    views: 128,
  },
  {
    id: "2",
    title: "Uploading Images & Galleries",
    description: "Master the WordPress media library and create stunning image galleries with Divi.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/uploading-images.jpg",
    duration: "6:15",
    completed: true,
    views: 94,
  },
  {
    id: "3",
    title: "Embedding YouTube Videos",
    description: "Embed and manage YouTube videos on your pages using Presto Player integration.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/embedding-youtube.jpg",
    duration: "3:48",
    completed: false,
    views: 76,
  },
  {
    id: "4",
    title: "Updating Your SEO Meta",
    description: "Optimize your page titles, descriptions, and Open Graph tags for search engines.",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/seo-meta.jpg",
    duration: "5:22",
    completed: false,
    views: 61,
  },
  {
    id: "5",
    title: "Changing Fonts in Divi",
    description: "Customize typography across your site using Divi Theme Options and Google Fonts.",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/changing-fonts.jpg",
    duration: "3:10",
    completed: false,
    views: 112,
  },
  {
    id: "6",
    title: "Connecting Your Email Optin",
    description: "Set up Mailchimp, ConvertKit, or ActiveCampaign email opt-in forms on your site.",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/email-optin.jpg",
    duration: "7:45",
    completed: true,
    views: 89,
  },
  {
    id: "7",
    title: "Setting Up Google Analytics",
    description: "Install and configure Google Analytics 4 tracking on your WordPress site.",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/google-analytics.jpg",
    duration: "4:58",
    completed: false,
    views: 143,
  },
  {
    id: "8",
    title: "Creating a Backup Strategy",
    description: "Configure automated backups with WPvivid and learn manual backup best practices.",
    category: "support",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/backup-strategy.jpg",
    duration: "8:12",
    completed: false,
    views: 67,
  },
  {
    id: "9",
    title: "Troubleshooting Video Issues",
    description: "Fix common video playback problems including Bunny.net and Presto Player errors.",
    category: "support",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/troubleshooting-video.jpg",
    duration: "5:30",
    completed: false,
    views: 55,
  },
]

function parseDuration(d: string): number {
  const parts = d.split(":").map(Number)
  return (parts[0] || 0) * 60 + (parts[1] || 0)
}

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [lightboxVideo, setLightboxVideo] = useState<VideoData | null>(null)
  const [videos, setVideos] = useState(allVideos)

  const filteredVideos = useMemo(() => {
    let result = activeCategory === "all" ? videos : videos.filter((v) => v.category === activeCategory)

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.description && v.description.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case "title":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
      case "duration":
        result = [...result].sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))
        break
      case "incomplete":
        result = [...result].sort((a, b) => Number(a.completed) - Number(b.completed))
        break
      default:
        break
    }

    return result
  }, [videos, activeCategory, search, sortBy])

  function handlePlay(video: VideoData) {
    setLightboxVideo(video)
    // Mark as completed when watched
    setVideos((prev) =>
      prev.map((v) => (v.id === video.id ? { ...v, completed: true } : v))
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-6 h-px w-full bg-border" />

        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            Tutorial Library
          </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground tracking-tight">
            Videos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Watch step-by-step tutorials to help you navigate your website setup. Videos open in a lightbox — no need to leave.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6">
          <VideosToolbar
            search={search}
            onSearchChange={setSearch}
            view={view}
            onViewChange={setView}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalVideos={videos.length}
            completedCount={videos.filter((v) => v.completed).length}
          />
        </div>

        {/* Content grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          {/* Main video grid / list */}
          <div>
            {/* Category pills — inline for quick switching */}
            <div className="mb-5 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? videos.length
                    : videos.filter((v) => v.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={
                      activeCategory === cat.id
                        ? "rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent transition-colors"
                        : "rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
                    }
                  >
                    {cat.label}
                    <span className="ml-1.5 text-[10px] font-mono opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Videos */}
            {filteredVideos.length > 0 ? (
              view === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={handlePlay}
                      variant="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={handlePlay}
                      variant="list"
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16">
                <p className="text-sm text-muted-foreground">No videos found.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different category or search term.
                </p>
              </div>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-xs font-medium text-secondary-foreground uppercase tracking-wider transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <VideosSidebar
            videos={videos}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeVideoId={lightboxVideo?.id ?? null}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-mono text-muted-foreground tracking-wider">
            MSC MEDIA PRO &middot; VIDEO LIBRARY &middot; v1.0.1 &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>

      {/* Lightbox */}
      {lightboxVideo && (
        <VideoLightbox
          youtubeId={lightboxVideo.youtubeId}
          title={lightboxVideo.title}
          onClose={() => setLightboxVideo(null)}
        />
      )}
    </div>
  )
}
