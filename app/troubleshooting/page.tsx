"use client"

import { SidebarNav } from "@/components/msc/sidebar-nav"
import { InstructionzTroubleshooting } from "@/components/msc/instructionz-troubleshooting"

export default function TroubleshootingPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-6 h-px w-full bg-border" />

        {/* Page header */}
        <div className="mb-8">
        <p className="text-xs font-sans text-muted-foreground tracking-widest uppercase">
          Support Center
        </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground tracking-tight">
            Troubleshooting & Support
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Find solutions to common issues and get help with MSC Media Pro.
          </p>
        </div>

        {/* Content area */}
        <div className="max-w-4xl">
          <InstructionzTroubleshooting />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-sans text-muted-foreground tracking-wider">
            MSC MEDIA PRO v2 &middot; TROUBLESHOOTING &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>
    </div>
  )
}
