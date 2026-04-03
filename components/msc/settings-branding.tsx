"use client"

import { useState } from "react"
import { Upload, RotateCcw } from "lucide-react"

interface BrandingSettings {
  pluginName: string
  tagline: string
  welcomeMessage: string
  footerCredit: string
  footerPoweredBy: string
  logoUrl: string
}

const defaults: BrandingSettings = {
  pluginName: "MSC Media Pro",
  tagline: "CONTROL CENTER",
  welcomeMessage: "Welcome to the Studio. Your site is healthy.",
  footerCredit: "Created by JonBeatz",
  footerPoweredBy: "MyStudioChannel",
  logoUrl: "",
}

export function SettingsBranding() {
  const [settings, setSettings] = useState<BrandingSettings>(defaults)
  const [saved, setSaved] = useState(false)

  function handleChange(key: keyof BrandingSettings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
  }

  function handleReset() {
    setSettings(defaults)
    setSaved(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div>
        <h2 className="text-lg font-bold text-foreground">Branding</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Customize the plugin name, logo, and messaging shown across the Control Center.
        </p>
      </div>

      {/* Logo upload */}
      <div className="rounded-lg border border-border bg-card p-5">
        <label className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider">
          Custom Logo
        </label>
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
          Replace the default MSC bolt icon in the sidebar. Recommended: 64x64 PNG with transparency.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="Custom logo"
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <Upload className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
              Upload Logo
            </button>
            <span className="text-[10px] text-muted-foreground font-mono">PNG, SVG, or ICO &middot; Max 512 KB</span>
          </div>
        </div>
      </div>

      {/* Text fields */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Plugin Name */}
        <div className="rounded-lg border border-border bg-card p-5">
          <label
            htmlFor="pluginName"
            className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider"
          >
            Plugin Name
          </label>
          <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
            Displayed in the sidebar header and page titles.
          </p>
          <input
            id="pluginName"
            type="text"
            value={settings.pluginName}
            onChange={(e) => handleChange("pluginName", e.target.value)}
            className="w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        {/* Tagline */}
        <div className="rounded-lg border border-border bg-card p-5">
          <label
            htmlFor="tagline"
            className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider"
          >
            Tagline
          </label>
          <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
            Sub-text below the plugin name in the sidebar.
          </p>
          <input
            id="tagline"
            type="text"
            value={settings.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            className="w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Welcome message */}
      <div className="rounded-lg border border-border bg-card p-5">
        <label
          htmlFor="welcomeMessage"
          className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider"
        >
          Welcome Message
        </label>
        <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
          The greeting shown to clients on the main Dashboard.
        </p>
        <input
          id="welcomeMessage"
          type="text"
          value={settings.welcomeMessage}
          onChange={(e) => handleChange("welcomeMessage", e.target.value)}
          className="w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Footer row */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <label
            htmlFor="footerCredit"
            className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider"
          >
            Footer Credit
          </label>
          <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
            Attribution line at the bottom of every page.
          </p>
          <input
            id="footerCredit"
            type="text"
            value={settings.footerCredit}
            onChange={(e) => handleChange("footerCredit", e.target.value)}
            className="w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <label
            htmlFor="footerPoweredBy"
            className="mb-2 block text-xs font-bold text-card-foreground uppercase tracking-wider"
          >
            Powered By Label
          </label>
          <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
            Brand reference in the footer area.
          </p>
          <input
            id="footerPoweredBy"
            type="text"
            value={settings.footerPoweredBy}
            onChange={(e) => handleChange("footerPoweredBy", e.target.value)}
            className="w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Live preview */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Live Preview
        </h3>
        <div className="rounded-md border border-border bg-secondary p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">
                {settings.pluginName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{settings.pluginName}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{settings.tagline}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{settings.welcomeMessage}</p>
          <div className="mt-3 border-t border-border pt-3">
            <p className="text-[10px] font-mono text-muted-foreground">
              {settings.footerCredit} | Powered by{" "}
              <span className="text-accent">{settings.footerPoweredBy}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Save / reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {saved ? "Saved" : "Save Branding"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Defaults
        </button>
        {saved && (
          <span className="text-xs font-mono text-primary animate-in fade-in">
            Changes saved successfully.
          </span>
        )}
      </div>
    </div>
  )
}
