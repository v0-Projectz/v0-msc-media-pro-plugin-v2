"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/msc/sidebar-nav"
import { InstructionzQuickNav } from "@/components/msc/instructionz-quick-nav"
import { InstructionzOverview } from "@/components/msc/instructionz-overview"
import { InstructionzHowItWorks } from "@/components/msc/instructionz-how-it-works"
import { InstructionzSetupWorkflow } from "@/components/msc/instructionz-setup-workflow"
import { InstructionzTroubleshooting } from "@/components/msc/instructionz-troubleshooting"
import { InstructionzDetailedLogic } from "@/components/msc/instructionz-detailed-logic"

const sectionComponents: Record<string, React.FC> = {
  overview: InstructionzOverview,
  "how-it-works": InstructionzHowItWorks,
  "setup-workflow": InstructionzSetupWorkflow,
  troubleshooting: InstructionzTroubleshooting,
  "detailed-logic": InstructionzDetailedLogic,
}

export default function InstructionzPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const ActiveComponent = sectionComponents[activeSection] ?? InstructionzOverview

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-6 h-px w-full bg-border" />

        {/* Page header */}
        <div className="mb-8">
        <p className="text-xs font-sans text-muted-foreground tracking-widest uppercase">
          MSC Engine
        </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground tracking-tight">
            Engine Instructionz
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Complete documentation for the MSC Media Pro engine, setup guides, and troubleshooting.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          {/* Main content area */}
          <div className="min-w-0">
            <ActiveComponent />
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-6">
            <InstructionzQuickNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-sans text-muted-foreground tracking-wider">
            MSC MEDIA PRO v2 &middot; ENGINE INSTRUCTIONZ &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>
    </div>
  )
}
