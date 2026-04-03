import { ChevronRight, Zap, Video, Settings, Wrench, Shield } from "lucide-react"

const overviewItems = [
  {
    icon: Zap,
    title: "MSC Media Pro Engine",
    description: "The core logic layer powering your studio website. Handles video delivery, API routing, and custom shortcode logic.",
  },
  {
    icon: Video,
    title: "Presto Player Integration",
    description: "Dynamic video assignment via shortcodes. Videos are streamed directly from your Bunny.net CDN for optimal performance.",
  },
  {
    icon: Settings,
    title: "Custom Lightbox System",
    description: "High-priority Presto API integration that provides a seamless, branded video viewing experience for your audience.",
  },
  {
    icon: Wrench,
    title: "ACF Mapping",
    description: "Advanced Custom Fields power the Featured Custom Video Integration, enabling dynamic content assignment across your site.",
  },
  {
    icon: Shield,
    title: "Vader Guide System",
    description: "Reduces support overhead by providing self-service troubleshooting, tutorials, and guided walkthroughs directly in the dashboard.",
  },
]

export function InstructionzOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Engine Overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          MSC Media Pro is a proprietary Studio Experience layer for WordPress. It replaces the native dashboard with a high-end Control Center designed for premium clients.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {overviewItems.map((item) => (
          <div
            key={item.title}
            className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
