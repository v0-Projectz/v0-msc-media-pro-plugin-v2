import { FileCode, Database, Cpu, Globe, Layers } from "lucide-react"

const logicBlocks = [
  {
    icon: FileCode,
    title: "MSC-Media-Scriptz Engine",
    file: "msc-media-scriptz.php",
    description: "The core script handler. Manages shortcode registration, video ID resolution, and dynamic iframe injection for Presto Player embeds.",
    tags: ["PHP", "Shortcodes", "Core"],
  },
  {
    icon: Database,
    title: "ACF Field Mapping",
    file: "acf-fields.json",
    description: "JSON schema defining all custom fields for video assignment. Includes featured video, gallery grid, and category taxonomy bindings.",
    tags: ["ACF", "JSON", "Fields"],
  },
  {
    icon: Cpu,
    title: "Cache Management Layer",
    file: "msc-cache-handler.php",
    description: "Handles static CSS generation, Divi cache integration, and Bunny.net CDN purge triggers. Ensures page speed scores remain optimized after content changes.",
    tags: ["Cache", "CDN", "Performance"],
  },
  {
    icon: Globe,
    title: "Bunny.net API Router",
    file: "bunny-api-bridge.php",
    description: "Bridges the Bunny.net Streaming API with WordPress. Manages authentication tokens, video library sync, and pull zone configuration.",
    tags: ["API", "Bunny.net", "Streaming"],
  },
  {
    icon: Layers,
    title: "Lightbox Controller",
    file: "custom-lightbox.js",
    description: "Front-end JavaScript handling the custom lightbox overlay. Intercepts click events, initializes the Presto API player instance, and manages fullscreen transitions.",
    tags: ["JavaScript", "Frontend", "UX"],
  },
]

export function InstructionzDetailedLogic() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Detailed Logic
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          A breakdown of the core files and systems that power MSC Media Pro under the hood.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {logicBlocks.map((block) => (
          <div
            key={block.title}
            className="rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/20"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                <block.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-card-foreground">
                    {block.title}
                  </h3>
                  <code className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {block.file}
                  </code>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {block.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
