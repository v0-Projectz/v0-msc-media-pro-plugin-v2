"use client"

import { useState } from "react"
import {
  Type,
  Calendar,
  Image,
  FileText,
  MousePointer2,
  Maximize2,
  RotateCcw,
  Save,
  Layers,
  Settings2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ModuleToggle {
  id: string
  label: string
  description: string
  icon: React.ElementType
  enabled: boolean
}

const defaultModuleSettings: ModuleToggle[] = [
  {
    id: "title",
    label: "Title",
    description: "Display the post title in CPT module cards.",
    icon: Type,
    enabled: true,
  },
  {
    id: "date",
    label: "Date",
    description: "Show publish date on CPT module entries.",
    icon: Calendar,
    enabled: true,
  },
  {
    id: "image",
    label: "Featured Image",
    description: "Display featured image/thumbnail in module cards.",
    icon: Image,
    enabled: true,
  },
  {
    id: "excerpt",
    label: "Excerpt",
    description: "Show post excerpt or content preview text.",
    icon: FileText,
    enabled: true,
  },
  {
    id: "button",
    label: "Read More Button",
    description: "Display a call-to-action button linking to full post.",
    icon: MousePointer2,
    enabled: true,
  },
  {
    id: "lightbox",
    label: "Lightbox",
    description: "Enable lightbox popup for images and media content.",
    icon: Maximize2,
    enabled: false,
  },
]

interface LayoutOption {
  id: string
  label: string
  description: string
}

const layoutOptions: LayoutOption[] = [
  { id: "grid", label: "Grid", description: "Standard grid layout" },
  { id: "masonry", label: "Masonry", description: "Pinterest-style layout" },
  { id: "list", label: "List", description: "Vertical list layout" },
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

export function SettingsCustomToolz() {
  const [moduleSettings, setModuleSettings] = useState(defaultModuleSettings)
  const [selectedLayout, setSelectedLayout] = useState("grid")
  const [columnsDesktop, setColumnsDesktop] = useState(3)
  const [columnsMobile, setColumnsMobile] = useState(1)
  const [saved, setSaved] = useState(false)

  function toggleModule(id: string) {
    setModuleSettings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    )
    setSaved(false)
  }

  const enabledCount = moduleSettings.filter((m) => m.enabled).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Custom Toolz</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Configure your DiviGear CPT Filterable Module settings. Toggle display elements and customize the layout behavior.
        </p>
      </div>

      {/* DiviGear Module Header */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">DiviGear CPT Filterable Module</h3>
            <p className="text-xs text-muted-foreground">Control which elements display in your custom post type grids</p>
          </div>
        </div>
      </div>

      {/* Element Toggles */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            Display Elements
          </h3>
          <span className="text-[10px] font-sans text-muted-foreground">
            {enabledCount}/{moduleSettings.length} Active
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {moduleSettings.map((setting) => (
            <div
              key={setting.id}
              className={cn(
                "flex items-center gap-4 rounded-md border px-4 py-3 transition-colors",
                setting.enabled
                  ? "border-border bg-secondary"
                  : "border-border/50 bg-muted/50"
              )}
            >
              <setting.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  setting.enabled ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    setting.enabled ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {setting.label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {setting.description}
                </p>
              </div>
              <Toggle
                checked={setting.enabled}
                onChange={() => toggleModule(setting.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Layout Options */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            Layout Settings
          </h3>
        </div>

        {/* Layout Type */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Layout Type
          </label>
          <div className="flex gap-2">
            {layoutOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedLayout(option.id)
                  setSaved(false)
                }}
                className={cn(
                  "flex-1 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
                  selectedLayout === option.id
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Column Settings */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Desktop Columns
            </label>
            <div className="flex items-center gap-2">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setColumnsDesktop(num)
                    setSaved(false)
                  }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md border text-sm font-sans transition-colors",
                    columnsDesktop === num
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Mobile Columns
            </label>
            <div className="flex items-center gap-2">
              {[1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setColumnsMobile(num)
                    setSaved(false)
                  }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md border text-sm font-sans transition-colors",
                    columnsMobile === num
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Preview
        </h3>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <div className="flex flex-col gap-3">
            {moduleSettings.find((m) => m.id === "image")?.enabled && (
              <div className="h-32 rounded-md bg-secondary/80 flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground/50" />
              </div>
            )}
            {moduleSettings.find((m) => m.id === "title")?.enabled && (
              <div className="h-5 w-3/4 rounded bg-foreground/20" />
            )}
            {moduleSettings.find((m) => m.id === "date")?.enabled && (
              <div className="h-3 w-1/3 rounded bg-muted-foreground/30" />
            )}
            {moduleSettings.find((m) => m.id === "excerpt")?.enabled && (
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-muted-foreground/20" />
                <div className="h-3 w-5/6 rounded bg-muted-foreground/20" />
              </div>
            )}
            {moduleSettings.find((m) => m.id === "button")?.enabled && (
              <div className="mt-1 h-8 w-28 rounded bg-primary/30" />
            )}
          </div>
        </div>
        <p className="mt-3 text-[10px] font-sans text-muted-foreground text-center">
          Layout: {layoutOptions.find((l) => l.id === selectedLayout)?.label} | 
          Columns: {columnsDesktop} (Desktop) / {columnsMobile} (Mobile)
        </p>
      </div>

      {/* Save / Reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved" : "Save Settings"}
        </button>
        <button
          onClick={() => {
            setModuleSettings(defaultModuleSettings)
            setSelectedLayout("grid")
            setColumnsDesktop(3)
            setColumnsMobile(1)
            setSaved(false)
          }}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Defaults
        </button>
        {saved && (
          <span className="text-xs font-sans text-primary animate-in fade-in">
            Module settings updated.
          </span>
        )}
      </div>
    </div>
  )
}
