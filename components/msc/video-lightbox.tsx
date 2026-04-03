"use client"

import { useEffect, useCallback } from "react"
import { X } from "lucide-react"

interface VideoLightboxProps {
  youtubeId: string
  title: string
  onClose: () => void
}

export function VideoLightbox({ youtubeId, title, onClose }: VideoLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-4 px-4 animate-in zoom-in-95 fade-in duration-300">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-1 w-6 rounded-full bg-accent" />
            <h2 className="text-sm font-bold text-foreground tracking-wide">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video iframe */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/50">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Bottom hint */}
        <p className="text-center text-[10px] font-sans text-muted-foreground tracking-wider">
          PRESS ESC OR CLICK OUTSIDE TO CLOSE
        </p>
      </div>
    </div>
  )
}
