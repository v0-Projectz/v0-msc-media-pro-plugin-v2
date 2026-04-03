import { CheckCircle2, Circle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const workflowSteps = [
  {
    title: "Connect Bunny.net CDN",
    description: "Log in to your Bunny.net dashboard. Navigate to Account Settings > API Key. Copy the Account API Key and paste it into the Presto Player settings in WordPress.",
    completed: true,
    link: { label: "BUNNY.NET", href: "#" },
  },
  {
    title: "Configure Presto Player",
    description: "Go to Presto Player > Settings in your WordPress admin. Enter the Bunny.net API key and configure your default player branding and behavior settings.",
    completed: true,
    link: null,
  },
  {
    title: "Set Up ACF Fields",
    description: "Import the ACF JSON field groups provided with MSC Media Pro. These define the video assignment fields used across your site layouts.",
    completed: true,
    link: null,
  },
  {
    title: "Assign Videos to Pages",
    description: "Edit any page or post and use the MSC Video Fields to assign Presto Player videos. The engine will handle shortcode generation and CDN routing automatically.",
    completed: false,
    link: null,
  },
  {
    title: "Verify Lightbox & Playback",
    description: "Test your video pages to confirm the Custom Lightbox activates properly. Check that videos stream from Bunny.net and the player branding matches your settings.",
    completed: false,
    link: null,
  },
]

export function InstructionzSetupWorkflow() {
  const completedCount = workflowSteps.filter((s) => s.completed).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Setup Workflow
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Follow these steps to get your studio site fully operational.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit border-primary/30 bg-primary/10 text-primary text-xs font-mono"
        >
          {completedCount}/{workflowSteps.length} Complete
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(completedCount / workflowSteps.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {workflowSteps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/20"
          >
            <div className="flex items-start gap-3">
              {step.completed ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="mt-0.5 text-sm font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.link && (
                  <a
                    href={step.link.href}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/80"
                  >
                    {step.link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
