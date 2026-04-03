"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SidebarNav } from "@/components/msc/sidebar-nav"
import { SettingsNav } from "@/components/msc/settings-nav"
import { SettingsBranding } from "@/components/msc/settings-branding"
import { SettingsFeatures } from "@/components/msc/settings-features"
import { SettingsColors } from "@/components/msc/settings-colors"
import { SettingsQuickLinks } from "@/components/msc/settings-quick-links"
import { SettingsAccess } from "@/components/msc/settings-access"
import { SettingsCustomToolz } from "@/components/msc/settings-custom-toolz"
import { SettingsVideoManager } from "@/components/msc/settings-video-manager"

const sectionComponents: Record<string, React.FC> = {
  branding: SettingsBranding,
  features: SettingsFeatures,
  colors: SettingsColors,
  "quick-links": SettingsQuickLinks,
  access: SettingsAccess,
  "custom-toolz": SettingsCustomToolz,
  "video-manager": SettingsVideoManager,
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  const [activeSection, setActiveSection] = useState(
    sectionParam && sectionComponents[sectionParam] ? sectionParam : "branding"
  )

  // Update active section when URL query param changes
  useEffect(() => {
    if (sectionParam && sectionComponents[sectionParam]) {
      setActiveSection(sectionParam)
    }
  }, [sectionParam])

  const ActiveComponent = sectionComponents[activeSection] ?? SettingsBranding

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />

      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-6 h-px w-full bg-border" />

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            Whitelabel Configuration
          </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Customize branding, toggle features, adjust colors, and manage access for the Control Center.
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
            <SettingsNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-mono text-muted-foreground tracking-wider">
            MSC MEDIA PRO v2 &middot; SETTINGS &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>
    </div>
  )
}
