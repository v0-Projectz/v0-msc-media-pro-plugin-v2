"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
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

          {/* Back to home */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-xs font-medium text-secondary-foreground uppercase tracking-wider transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-mono text-muted-foreground tracking-wider">
            MSC MEDIA PRO &middot; TROUBLESHOOTING &middot; v1.0.1 &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>
    </div>
  )
}
