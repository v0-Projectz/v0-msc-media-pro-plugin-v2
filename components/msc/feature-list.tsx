import { ChevronRight } from "lucide-react"

const features = [
  {
    label: "Custom Lightbox",
    description: "High-priority Presto API integration.",
  },
  {
    label: "Presto Player",
    description: "Dynamic video assignment via shortcodes.",
  },
  {
    label: "Streaming Video",
    description: "Videos streamed from Bunny.net API.",
  },
  {
    label: "MSC-Grade Logic",
    description: "Using MSC-Media-Scriptz engine.",
  },
  {
    label: "Advanced Custom Fields",
    description: "Featured Custom Video Integration.",
  },
]

export function FeatureList() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-1 text-lg font-bold text-card-foreground">
        MSC Media Pro Engine
      </h2>
      <p className="mb-4 text-xs text-muted-foreground">
        Mission-critical logic for your studio website.
      </p>

      <div className="flex flex-col gap-2">
        {features.map((f) => (
          <div
            key={f.label}
            className="flex items-start gap-3 rounded-md px-1 py-1.5"
          >
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <span className="text-sm font-semibold text-accent">{f.label}:</span>{" "}
              <span className="text-sm text-card-foreground">{f.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-md border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary">
          Manage Videos
        </button>
        <button className="rounded-md border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary">
          Engine Settings
        </button>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-border pt-3">
        <p className="text-[10px] text-muted-foreground">
          Created by JonBeatz | Logic 1.0.0 | Powered by{" "}
          <span className="text-accent">MyStudioChannel</span>
        </p>
      </div>
    </div>
  )
}
