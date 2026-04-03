/**
 * MSC Media Pro v2 - Video Configuration
 * 
 * Centralized place to manage all video YouTube IDs and metadata.
 * Update the youtubeId field for each video to change what plays.
 * 
 * To find a YouTube video ID:
 * - Go to the video on YouTube
 * - The ID is the part after "v=" in the URL
 * - Example: https://www.youtube.com/watch?v=ABC123xyz → ID is "ABC123xyz"
 */

export interface VideoConfig {
  id: string
  title: string
  description: string
  category: "site-basics" | "seo" | "content" | "support"
  youtubeId: string  // <-- UPDATE THIS WITH YOUR YOUTUBE VIDEO ID
  thumbnail: string
  duration: string
  completed: boolean
  views: number
}

export const VIDEO_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "site-basics", label: "Site Basics" },
  { id: "seo", label: "SEO" },
  { id: "content", label: "Content Updates" },
  { id: "support", label: "Support" },
] as const

/**
 * ============================================
 * VIDEO LIBRARY - UPDATE YOUTUBE IDs HERE
 * ============================================
 * 
 * Each video has a youtubeId field - replace the placeholder
 * with your actual YouTube video ID.
 * 
 * Current placeholder: "dQw4w9WgXcQ" (Rick Astley)
 */
export const ALL_VIDEOS: VideoConfig[] = [
  {
    id: "1",
    title: "Adding a New Blog Post",
    description: "Learn how to create and publish a new blog post in WordPress using the Divi builder.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
    thumbnail: "/thumbnails/adding-blog-post.jpg",
    duration: "4:32",
    completed: false,
    views: 128,
  },
  {
    id: "2",
    title: "Uploading Images & Galleries",
    description: "Master the WordPress media library and create stunning image galleries with Divi.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
    thumbnail: "/thumbnails/uploading-images.jpg",
    duration: "6:15",
    completed: false,
    views: 94,
  },
  {
    id: "3",
    title: "Embedding YouTube Videos",
    description: "Embed and manage YouTube videos on your pages using Presto Player integration.",
    category: "content",
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
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
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
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
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
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
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
    thumbnail: "/thumbnails/email-optin.jpg",
    duration: "7:45",
    completed: false,
    views: 89,
  },
  {
    id: "7",
    title: "Setting Up Google Analytics",
    description: "Install and configure Google Analytics 4 tracking on your WordPress site.",
    category: "seo",
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
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
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
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
    youtubeId: "dQw4w9WgXcQ",  // <-- REPLACE WITH YOUR VIDEO ID
    thumbnail: "/thumbnails/troubleshooting-video.jpg",
    duration: "5:30",
    completed: false,
    views: 55,
  },
]

/**
 * Storage key for localStorage
 */
export const VIDEO_STORAGE_KEY = "msc-video-config"

/**
 * Get videos from localStorage or fall back to defaults
 * This allows the Video Manager to persist changes
 */
export function getStoredVideos(): VideoConfig[] {
  if (typeof window === "undefined") return ALL_VIDEOS
  
  try {
    const stored = localStorage.getItem(VIDEO_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge stored data with defaults to ensure all fields exist
      return ALL_VIDEOS.map(defaultVideo => {
        const storedVideo = parsed.find((v: VideoConfig) => v.id === defaultVideo.id)
        return storedVideo ? { ...defaultVideo, ...storedVideo } : defaultVideo
      })
    }
  } catch (e) {
    console.error("Failed to load video config from storage")
  }
  return ALL_VIDEOS
}

/**
 * Helper function to get videos by category
 */
export function getVideosByCategory(category: string): VideoConfig[] {
  const videos = getStoredVideos()
  if (category === "all") return videos
  return videos.filter((v) => v.category === category)
}

/**
 * Helper function to get a single video by ID
 */
export function getVideoById(id: string): VideoConfig | undefined {
  const videos = getStoredVideos()
  return videos.find((v) => v.id === id)
}
