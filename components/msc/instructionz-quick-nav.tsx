"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navSections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it Works" },
  { id: "setup-workflow", label: "Setup Workflow" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "detailed-logic", label: "Detailed Logic" },
]

interface QuickNavProps {
  activeSection: string
  onSectionChange: (id: string) => void
}

export function InstructionzQuickNav({ activeSection, onSectionChange }: QuickNavProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-bold text-card-foreground uppercase tracking-wider">
        Quick Navigation
      </h2>
      <nav>
        <ul className="flex flex-col gap-1">
          {navSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "w-full rounded-md px-4 py-2.5 text-left text-sm transition-all",
                  activeSection === section.id
                    ? "border border-accent bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* System status mini badge */}
      <div className="mt-6 rounded-md border border-border bg-secondary p-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">
            System Status: Online
          </span>
        </div>
        <div className="mt-2">
          <p className="text-[10px] font-sans text-muted-foreground">
            Build: MSC PRO PLUGIN v1.0.1
          </p>
          <p className="text-[10px] font-sans text-muted-foreground">
            System: MSC Media Pro
          </p>
        </div>
      </div>
    </div>
  )
}
