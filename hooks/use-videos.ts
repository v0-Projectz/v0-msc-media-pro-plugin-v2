"use client"

import { useState, useEffect } from "react"
import { ALL_VIDEOS, VIDEO_STORAGE_KEY, type VideoConfig } from "@/lib/video-config"

/**
 * Hook to get videos from localStorage with real-time updates
 * Re-renders when videos are updated in the Video Manager
 */
export function useVideos() {
  const [videos, setVideos] = useState<VideoConfig[]>(ALL_VIDEOS)

  useEffect(() => {
    // Load from localStorage on mount
    const loadVideos = () => {
      try {
        const stored = localStorage.getItem(VIDEO_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          // Merge with defaults to ensure all fields
          const merged = ALL_VIDEOS.map(defaultVideo => {
            const storedVideo = parsed.find((v: VideoConfig) => v.id === defaultVideo.id)
            return storedVideo ? { ...defaultVideo, ...storedVideo } : defaultVideo
          })
          setVideos(merged)
        }
      } catch (e) {
        console.error("Failed to load videos from storage")
      }
    }

    loadVideos()

    // Listen for storage changes (from other tabs or Video Manager)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === VIDEO_STORAGE_KEY) {
        loadVideos()
      }
    }

    // Custom event for same-tab updates
    const handleCustomUpdate = () => {
      loadVideos()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("msc-videos-updated", handleCustomUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("msc-videos-updated", handleCustomUpdate)
    }
  }, [])

  return videos
}

/**
 * Get videos by category using the hook
 */
export function useVideosByCategory(category: string) {
  const videos = useVideos()
  if (category === "all") return videos
  return videos.filter((v) => v.category === category)
}
