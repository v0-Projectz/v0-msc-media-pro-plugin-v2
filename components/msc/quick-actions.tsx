"use client"

import { Plus, RotateCcw, Download, Shield } from "lucide-react"
import { toast } from "sonner"

const actions = [
  {
    icon: Plus,
    label: "Create New Video Entry",
    variant: "primary" as const,
  },
  {
    icon: RotateCcw,
    label: "Reset Engine & Purge Cache",
    variant: "destructive" as const,
  },
  {
    icon: Shield,
    label: "Initiate Safety Backup",
    variant: "secondary" as const,
  },
  {
    icon: Download,
    label: "Export ACF JSON",
    variant: "secondary" as const,
  },
]

export function QuickActions() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-bold text-card-foreground uppercase tracking-wider">
        Quick Actions
      </h2>
      <div className="flex flex-col gap-2">
        {actions.map((action) => {
          const colorClasses = {
            primary:
              "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20",
            destructive:
              "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20",
            secondary:
              "border-border bg-secondary text-secondary-foreground hover:border-muted-foreground/30 hover:bg-secondary/80",
          }
          return (
            <button
              key={action.label}
              onClick={() => {
                if (action.variant === "primary") {
                  toast.success("Ready to create new video entry")
                } else if (action.variant === "destructive") {
                  toast.info("Cache purge initiated...")
                } else {
                  toast.info(`${action.label} triggered`)
                }
              }}
              className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-colors ${colorClasses[action.variant]}`}
            >
              <action.icon className="h-4 w-4 shrink-0" />
              <span>{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
