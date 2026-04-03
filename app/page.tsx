import { SidebarNav } from "@/components/msc/sidebar-nav"
import { WelcomeHeader } from "@/components/msc/welcome-header"
import { SystemStatus } from "@/components/msc/system-status"
import { QuickLinks } from "@/components/msc/quick-links"
import { QuickActions } from "@/components/msc/quick-actions"
import { VideoTutorials } from "@/components/msc/video-tutorials"
import { StudioHeartbeat } from "@/components/msc/studio-heartbeat"
import { FeatureList } from "@/components/msc/feature-list"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-8 h-px w-full bg-border" />

        {/* Welcome + Badge */}
        <WelcomeHeader />

        {/* Vader System Status cards */}
        <section className="mt-8" aria-label="System status">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Vader System Status
          </h2>
          <SystemStatus />
        </section>

        {/* Main content grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Feature list card */}
            <FeatureList />

            {/* Tutorial videos */}
            <VideoTutorials />
          </div>

          {/* Right column — sticky sidebar widgets */}
          <div className="flex flex-col gap-6">
            <QuickLinks />
            <QuickActions />
            <StudioHeartbeat />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-center text-[10px] font-sans text-muted-foreground tracking-wider">
            MSC MEDIA PRO v2 &middot; CONTROL CENTER &middot; Powered by MyStudioChannel
          </p>
        </footer>
      </main>
    </div>
  )
}
