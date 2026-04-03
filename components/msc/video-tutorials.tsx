"use client"

import { Card } from "@/components/ui/card"
import { VideoCard } from "./video-card"

const tutorials = [
  {
    id: 1,
    title: "Getting Started with MSC Media Pro",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    duration: "5:23",
    views: 1200,
  },
  {
    id: 2,
    title: "Setting Up Your First Project",
    thumbnail: "https://images.unsplash.com/photo-1533132954824-e8c7347dc49e?w=400&h=300&fit=crop",
    duration: "8:15",
    views: 890,
  },
  {
    id: 3,
    title: "Advanced Features & Workflows",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
    duration: "12:45",
    views: 650,
  },
]

export function VideoTutorials() {
  return (
    <Card className="p-6 border-border bg-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Video Tutorials</h2>
          <p className="text-xs text-muted-foreground">Learn at your own pace</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            views={video.views}
          />
        ))}
      </div>
    </Card>
  )
}
