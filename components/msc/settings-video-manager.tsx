"use client"

import { useState, useEffect } from "react"
import { Video, Save, RotateCcw, ExternalLink, Play, Pencil, Check, X, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface VideoEntry {
  id: string
  title: string
  description: string
  category: string
  youtubeId: string
  thumbnail: string
  duration: string
  customThumbnail?: string
  useCustomThumbnail?: boolean
  thumbnailSource?: "url" | "library"
  customVideoUrl?: string
}

// Default videos from config
const DEFAULT_VIDEOS: VideoEntry[] = [
  {
    id: "1",
    title: "Adding a New Blog Post",
    description: "Learn how to create and publish a new blog post in WordPress using the Divi builder.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/adding-blog-post.jpg",
    duration: "4:32",
  },
  {
    id: "2",
    title: "Uploading Images & Galleries",
    description: "Master the WordPress media library and create stunning image galleries with Divi.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/uploading-images.jpg",
    duration: "6:15",
  },
  {
    id: "3",
    title: "Embedding YouTube Videos",
    description: "Embed and manage YouTube videos on your pages using Presto Player integration.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/embedding-youtube.jpg",
    duration: "3:48",
  },
  {
    id: "4",
    title: "Updating Your SEO Meta",
    description: "Optimize your page titles, descriptions, and Open Graph tags for search engines.",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/seo-meta.jpg",
    duration: "5:22",
  },
  {
    id: "5",
    title: "Changing Fonts in Divi",
    description: "Customize typography across your site using Divi Theme Options and Google Fonts.",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/changing-fonts.jpg",
    duration: "3:10",
  },
  {
    id: "6",
    title: "Connecting Your Email Optin",
    description: "Set up Mailchimp, ConvertKit, or ActiveCampaign email opt-in forms on your site.",
    category: "site-basics",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/email-optin.jpg",
    duration: "7:45",
  },
  {
    id: "7",
    title: "Setting Up Google Analytics",
    description: "Install and configure Google Analytics 4 tracking on your WordPress site.",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/google-analytics.jpg",
    duration: "4:58",
  },
  {
    id: "8",
    title: "Creating a Backup Strategy",
    description: "Configure automated backups with WPvivid and learn manual backup best practices.",
    category: "support",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/backup-strategy.jpg",
    duration: "8:12",
  },
  {
    id: "9",
    title: "Troubleshooting Video Issues",
    description: "Fix common video playback problems including Bunny.net and Presto Player errors.",
    category: "support",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/thumbnails/troubleshooting-video.jpg",
    duration: "5:30",
  },
]

const STORAGE_KEY = "msc-video-config"

export function SettingsVideoManager() {
  const [videos, setVideos] = useState<VideoEntry[]>(DEFAULT_VIDEOS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<VideoEntry>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Load saved videos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setVideos(parsed)
      } catch (e) {
        console.error("Failed to load saved video config")
      }
    }
  }, [])

  const startEditing = (video: VideoEntry) => {
    setEditingId(video.id)
    setEditValues({
      title: video.title,
      description: video.description,
      youtubeId: video.youtubeId,
      duration: video.duration,
      customThumbnail: video.customThumbnail || "",
      useCustomThumbnail: video.useCustomThumbnail || false,
    })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditValues({})
  }

  const saveEditing = (id: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id !== id) return v
      const updatedThumbnail = editValues.useCustomThumbnail && editValues.customThumbnail
        ? editValues.customThumbnail
        : v.thumbnail
      return { ...v, ...editValues, thumbnail: updatedThumbnail }
    }))
    setEditingId(null)
    setEditValues({})
    setHasChanges(true)
    toast.success("Video updated")
  }

  const handleSaveAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    // Dispatch custom event so other components can update
    window.dispatchEvent(new CustomEvent("msc-videos-updated"))
    setHasChanges(false)
    toast.success("All video settings saved!")
  }

  const handleReset = () => {
    setVideos(DEFAULT_VIDEOS)
    localStorage.removeItem(STORAGE_KEY)
    // Dispatch custom event so other components can update
    window.dispatchEvent(new CustomEvent("msc-videos-updated"))
    setHasChanges(false)
    toast.info("Reset to default videos")
  }

  const handleAddVideo = () => {
    const newVideo: VideoEntry = {
      id: `${Date.now()}`,
      title: "New Video",
      description: "Add your video description here",
      category: "content",
      youtubeId: "",
      thumbnail: "/thumbnails/adding-blog-post.jpg",
      duration: "0:00",
    }
    setVideos(prev => [...prev, newVideo])
    setHasChanges(true)
    toast.success("New video added. Edit it to set the YouTube ID.")
    // Auto-scroll to new video (optional - you can remove if not needed)
    setTimeout(() => {
      startEditing(newVideo)
    }, 100)
  }

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id))
    setHasChanges(true)
    toast.success("Video removed")
  }

  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
  }

  const categoryLabels: Record<string, string> = {
    "content": "Content Updates",
    "seo": "SEO",
    "site-basics": "Site Basics",
    "support": "Support",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Video Manager</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage YouTube video links for your tutorial library
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddVideo}
            className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <Plus className="h-4 w-4" />
            Add Video
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            Save All
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex gap-3">
          <Video className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How to get a YouTube Video ID</p>
            <p>
              The YouTube ID is the code after <code className="bg-secondary px-1 py-0.5 rounded text-xs">v=</code> in the URL. 
              For example, in <code className="bg-secondary px-1 py-0.5 rounded text-xs">youtube.com/watch?v=dQw4w9WgXcQ</code>, 
              the ID is <code className="bg-secondary px-1 py-0.5 rounded text-xs text-primary">dQw4w9WgXcQ</code>
            </p>
          </div>
        </div>
      </div>

      {/* Video list */}
      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-border/80"
          >
            {editingId === video.id ? (
              // Edit mode
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Editing Video #{video.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEditing(video.id)}
                      className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Check className="h-3 w-3" />
                      Save
                    </button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={editValues.title || ""}
                      onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      YouTube Video ID
                    </label>
                    <input
                      type="text"
                      value={editValues.youtubeId || ""}
                      onChange={(e) => setEditValues(prev => ({ ...prev, youtubeId: e.target.value }))}
                      placeholder="e.g. dQw4w9WgXcQ"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={editValues.description || ""}
                    onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <div className="w-32">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editValues.duration || ""}
                    onChange={(e) => setEditValues(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g. 4:32"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Thumbnail source */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Thumbnail Source
                  </label>

                  {/* Toggle */}
                  <div className="flex rounded-md border border-border overflow-hidden w-fit">
                    <button
                      type="button"
                      onClick={() => setEditValues(prev => ({ ...prev, useCustomThumbnail: false }))}
                      className={`px-4 py-2 text-xs font-medium transition-colors ${
                        !editValues.useCustomThumbnail
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Auto from YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditValues(prev => ({ ...prev, useCustomThumbnail: true, thumbnailSource: "url" }))}
                      className={`px-4 py-2 text-xs font-medium transition-colors border-l border-border ${
                        editValues.useCustomThumbnail && editValues.thumbnailSource === "url"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Custom URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditValues(prev => ({ ...prev, useCustomThumbnail: true, thumbnailSource: "library" }))}
                      className={`px-4 py-2 text-xs font-medium transition-colors border-l border-border ${
                        editValues.useCustomThumbnail && editValues.thumbnailSource === "library"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Media Library
                    </button>
                  </div>

                  {/* Custom URL input */}
                  {editValues.useCustomThumbnail && editValues.thumbnailSource === "url" ? (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={editValues.customThumbnail || ""}
                        onChange={(e) => setEditValues(prev => ({ ...prev, customThumbnail: e.target.value }))}
                        placeholder="https://example.com/thumbnail.jpg"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {editValues.customThumbnail && (
                        <div className="relative aspect-video w-48 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={editValues.customThumbnail}
                            alt="Custom thumbnail preview"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/thumbnails/adding-blog-post.jpg"
                            }}
                          />
                          <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                            Custom
                          </div>
                        </div>
                      )}
                    </div>
                  ) : editValues.useCustomThumbnail && editValues.thumbnailSource === "library" ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground mb-2">
                        Select an image from your Media Library
                      </p>
                      <div className="rounded-md border border-dashed border-border bg-secondary/30 p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                          Media Library integration coming soon
                        </p>
                        <button
                          type="button"
                          className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          Browse Media Library
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Auto YouTube thumbnail preview */
                    editValues.youtubeId && (
                      <div className="space-y-1">
                        <div className="relative aspect-video w-48 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={getYouTubeThumbnail(editValues.youtubeId)}
                            alt="YouTube thumbnail preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                            YouTube
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Auto-pulled from your YouTube video
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Custom Video URL */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Custom Video URL
                </label>
                <p className="text-xs text-muted-foreground">
                  Override the YouTube ID above with a full video link — YouTube, Vimeo, or any other platform.
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <input
                      type="url"
                      value={editValues.customVideoUrl || ""}
                      onChange={(e) => setEditValues(prev => ({ ...prev, customVideoUrl: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                      className="w-full rounded-md border border-border bg-secondary pl-9 pr-3 py-2 text-sm text-foreground font-sans placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>
                  {editValues.customVideoUrl && (
                    <button
                      type="button"
                      onClick={() => setEditValues(prev => ({ ...prev, customVideoUrl: "" }))}
                      className="rounded-md border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {editValues.customVideoUrl && (
                  <p className="text-xs text-primary">
                    This link will be used for playback instead of the YouTube ID.
                  </p>
                )}
              </div>
            ) : (
              /* View mode */
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-foreground truncate">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {video.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => startEditing(video)}
                        className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 hover:border-primary/30"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="flex items-center gap-1 rounded-md border border-border/50 bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 hover:border-destructive/50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded bg-secondary px-1.5 py-0.5">
                      {categoryLabels[video.category] || video.category}
                    </span>
                    <span>{video.duration}</span>
                    <span className="font-sans text-primary">
                      ID: {video.youtubeId}
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new video section */}
      <div className="border-t border-border pt-6">
        <button
          onClick={handleAddVideo}
          className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Add a new video to your library
          </span>
        </button>
      </div>
    </div>
  )
}
