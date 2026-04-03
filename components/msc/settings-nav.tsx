"use client"

import { Paintbrush, Eye, Palette, Link2, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const sections = [
  { id: "branding", label: "Branding", icon: Paintbrush },
  { id: "features", label: "Feature Visibility", icon: Eye },
  { id: "colors", label: "Color Palette", icon: Palette },
  { id: "quick-links", label: "Quick Links", icon: Link2 },
  { id: "access", label: "Access Control", icon: Shield },
]

interface SettingsNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-card-foreground uppercase tracking-wider">
          Settings
        </h2>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary text-[10px] font-mono"
        >
          ADMIN
        </Badge>
      </div>

      <nav className="flex flex-col gap-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors text-left",
              activeSection === section.id
                ? "bg-accent/10 text-accent font-medium border border-accent/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
            )}
          >
            <section.icon className="h-4 w-4 shrink-0" />
            <span>{section.label}</span>
          </button>
        ))}
      </nav>

      {/* System info */}
      <div className="mt-5 rounded-md border border-border bg-secondary p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            System Status: Online
          </span>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground">
          Build: MSC PRO PLUGIN v1.0.1
        </p>
        <p className="text-[10px] font-mono text-muted-foreground">
          System: MSC Media Pro
        </p>
      </div>
    </div>
  )
}
