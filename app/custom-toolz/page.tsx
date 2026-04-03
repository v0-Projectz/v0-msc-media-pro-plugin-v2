import { SidebarNav } from "@/components/msc/sidebar-nav"
import { SettingsCustomToolz } from "@/components/msc/settings-custom-toolz"

export default function CustomToolzPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <main className="ml-56 flex-1 px-6 py-8 lg:px-10">
        {/* Top bar accent line */}
        <div className="mb-8 h-px w-full bg-border" />

        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-sans uppercase tracking-widest text-primary mb-1">
            DiviGear CPT Module
          </p>
          <h1 className="text-3xl font-bold text-foreground tracking-tight lg:text-4xl">
            Custom Toolz
          </h1>
          <p className="mt-2 text-muted-foreground">
            Configure display elements and layout settings for your filterable content.
          </p>
        </header>

        {/* Custom Toolz Settings */}
        <SettingsCustomToolz />

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
