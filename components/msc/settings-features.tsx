"use client"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  LayoutDashboard,
  Video,
  Settings,
  Wrench,
  AlertTriangle,
  BookOpen,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureToggle {
  id: string
  label: string
  description: string
  icon: React.ElementType
  enabled: boolean
  locked?: boolean
}

const defaultFeatures: FeatureToggle[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Main welcome screen with system status, quick links, and video tutorials.",
    icon: LayoutDashboard,
    enabled: true,
    locked: true,
  },
  {
    id: "videos",
    label: "Videos Manager",
    description: "Video entry management page for Presto Player and Bunny.net integration.",
    icon: Video,
    enabled: true,
  },
  {
    id: "settings",
    label: "Settings Panel",
    description: "This whitelabel settings page. Always visible to administrators.",
    icon: Settings,
    enabled: true,
    locked: true,
  },
  {
    id: "custom-toolz",
    label: "Custom Toolz",
    description: "Maintenance mode, ACF JSON export, and custom tool utilities.",
    icon: Wrench,
    enabled: true,
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    description: "Common technical fixes section for client self-service support.",
    icon: AlertTriangle,
    enabled: true,
  },
  {
    id: "instructionz",
    label: "Instructionz",
    description: "Full documentation with overview, setup workflow, and detailed logic.",
    icon: BookOpen,
    enabled: true,
  },
]

interface DashboardWidget {
  id: string
  label: string
  description: string
  enabled: boolean
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: "system-status",
    label: "Vader System Status",
    description: "Engine, connectivity, SSL, and backup status cards.",
    enabled: true,
  },
  {
    id: "feature-list",
    label: "Engine Feature List",
    description: "MSC Media Pro Engine capabilities overview card.",
    enabled: true,
  },
  {
    id: "video-tutorials",
    label: "Video Tutorials Grid",
    description: "Instructionz video carousel with category filters.",
    enabled: true,
  },
  {
    id: "quick-links",
    label: "Quick Links",
    description: "Webmail, Client Portal, and Stripe Login shortcuts.",
    enabled: true,
  },
  {
    id: "quick-actions",
    label: "Quick Actions",
    description: "Create Video, Purge Cache, Safety Backup, and ACF Export buttons.",
    enabled: true,
  },
  {
    id: "studio-heartbeat",
    label: "Studio Heartbeat",
    description: "Live system heartbeat with SSL, WP version, Divi status, and backup info.",
    enabled: true,
  },
]

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
        checked
          ? "border-primary/30 bg-primary/20"
          : "border-border bg-secondary",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full transition-transform",
          checked
            ? "translate-x-5.5 bg-primary"
            : "translate-x-0.5 bg-muted-foreground"
        )}
      />
    </button>
  )
}

export function SettingsFeatures() {
  const [features, setFeatures] = useState(defaultFeatures)
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [saved, setSaved] = useState(false)

  function toggleFeature(id: string) {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id && !f.locked ? { ...f, enabled: !f.enabled } : f))
    )
    setSaved(false)
  }

  function toggleWidget(id: string) {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    )
    setSaved(false)
  }

  const enabledCount = features.filter((f) => f.enabled).length
  const widgetCount = widgets.filter((w) => w.enabled).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Feature Visibility</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Toggle which pages and widgets are visible to the client. Locked items cannot be disabled.
        </p>
      </div>

      {/* Sidebar pages */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            Sidebar Pages
          </h3>
          <span className="text-[10px] font-sans text-muted-foreground">
            {enabledCount}/{features.length} Active
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "flex items-center gap-4 rounded-md border px-4 py-3 transition-colors",
                feature.enabled
                  ? "border-border bg-secondary"
                  : "border-border/50 bg-muted/50"
              )}
            >
              <feature.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  feature.enabled ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      feature.enabled ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {feature.label}
                  </p>
                  {feature.locked && (
                    <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] font-sans text-muted-foreground uppercase">
                      Locked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <Toggle
                checked={feature.enabled}
                onChange={() => toggleFeature(feature.id)}
                disabled={feature.locked}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            Dashboard Widgets
          </h3>
          <span className="text-[10px] font-sans text-muted-foreground">
            {widgetCount}/{widgets.length} Active
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={cn(
                "flex items-start gap-3 rounded-md border px-4 py-3 transition-colors",
                widget.enabled
                  ? "border-border bg-secondary"
                  : "border-border/50 bg-muted/50"
              )}
            >
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  {widget.enabled ? (
                    <Eye className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <p
                    className={cn(
                      "text-sm font-medium",
                      widget.enabled ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {widget.label}
                  </p>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed pl-5.5">
                  {widget.description}
                </p>
              </div>
              <Toggle
                checked={widget.enabled}
                onChange={() => toggleWidget(widget.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save / reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {saved ? "Saved" : "Save Visibility"}
        </button>
        <button
          onClick={() => {
            setFeatures(defaultFeatures)
            setWidgets(defaultWidgets)
            setSaved(false)
          }}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </button>
        {saved && (
          <span className="text-xs font-sans text-primary animate-in fade-in">
            Visibility updated.
          </span>
        )}
      </div>
    </div>
  )
}
