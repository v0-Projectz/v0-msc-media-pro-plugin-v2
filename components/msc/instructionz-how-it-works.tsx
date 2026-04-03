const steps = [
  {
    number: "01",
    title: "Content Creation",
    description: "Upload your video content to Bunny.net CDN. The platform handles encoding, delivery, and optimization automatically.",
  },
  {
    number: "02",
    title: "Presto Player Assignment",
    description: "Assign videos to Presto Player via shortcodes or ACF fields. The MSC engine maps each video ID to its proper display context.",
  },
  {
    number: "03",
    title: "Custom Lightbox Rendering",
    description: "When a viewer clicks a video, the Custom Lightbox system activates the Presto API and delivers a branded, fullscreen experience.",
  },
  {
    number: "04",
    title: "ACF Dynamic Mapping",
    description: "Advanced Custom Fields power the featured video integration, pulling dynamic video data into page layouts without manual shortcode entry.",
  },
  {
    number: "05",
    title: "Engine Optimization",
    description: "The MSC-Media-Scriptz engine handles cache management, lazy loading, and CDN routing to keep page speed scores high.",
  },
]

export function InstructionzHowItWorks() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          How it Works
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Understand the end-to-end flow from content upload to viewer experience.
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Vertical timeline line */}
        <div className="absolute left-5 top-6 bottom-6 w-px bg-border" />

        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex items-start gap-4 rounded-lg border border-border bg-card p-4 pl-14 transition-all hover:border-primary/30"
          >
            {/* Step number circle */}
            <div className="absolute left-3 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <span className="text-[9px] font-bold text-primary-foreground font-mono">
                {step.number}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
