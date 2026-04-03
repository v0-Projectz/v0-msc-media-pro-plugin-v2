"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorSetting {
  id: string
  label: string
  description: string
  value: string
  defaultValue: string
}

const defaultColors: ColorSetting[] = [
  {
    id: "primary",
    label: "Primary / Active",
    description: "Used for active indicators, status badges, and CTA highlights.",
    value: "#4ade80",
    defaultValue: "#4ade80",
  },
  {
    id: "accent",
    label: "Accent / Alert",
    description: "Used for warning labels, destructive actions, and feature highlights.",
    value: "#ef4444",
    defaultValue: "#ef4444",
  },
  {
    id: "background",
    label: "Background",
    description: "Main surface behind all cards and content areas.",
    value: "#121212",
    defaultValue: "#121212",
  },
  {
    id: "card",
    label: "Card Surface",
    description: "Background for Bento-style cards and panels.",
    value: "#1a1a1a",
    defaultValue: "#1a1a1a",
  },
  {
    id: "border",
    label: "Border",
    description: "Card edges, dividers, and input outlines.",
    value: "#2a2a2a",
    defaultValue: "#2a2a2a",
  },
]

export function SettingsColors() {
  const [colors, setColors] = useState(defaultColors)
  const [saved, setSaved] = useState(false)

  function handleChange(id: string, value: string) {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c))
    )
    setSaved(false)
  }

  function handleReset() {
    setColors(defaultColors)
    setSaved(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Color Palette</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Override the default MSC dark theme colors. Changes apply to all Control Center pages.
        </p>
      </div>

      {/* Color pickers */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <div
            key={color.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <label
              htmlFor={`color-${color.id}`}
              className="mb-1 block text-xs font-bold text-card-foreground uppercase tracking-wider"
            >
              {color.label}
            </label>
            <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
              {color.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  id={`color-${color.id}`}
                  type="color"
                  value={color.value}
                  onChange={(e) => handleChange(color.id, e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent"
                />
              </div>
              <input
                type="text"
                value={color.value}
                onChange={(e) => handleChange(color.id, e.target.value)}
                className="flex-1 rounded-md border border-border bg-secondary px-3 py-2 text-xs text-foreground font-sans uppercase placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              {color.value !== color.defaultValue && (
                <button
                  onClick={() => handleChange(color.id, color.defaultValue)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Reset ${color.label} to default`}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview bar */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-xs font-bold text-card-foreground uppercase tracking-wider">
          Theme Preview
        </h3>
        <div
          className="flex gap-3 rounded-md border p-4"
          style={{ backgroundColor: colors.find((c) => c.id === "background")?.value, borderColor: colors.find((c) => c.id === "border")?.value }}
        >
          <div
            className="flex-1 rounded-md border p-4"
            style={{ backgroundColor: colors.find((c) => c.id === "card")?.value, borderColor: colors.find((c) => c.id === "border")?.value }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors.find((c) => c.id === "primary")?.value }}
              />
              <span className="text-xs font-sans text-foreground">SYSTEM ACTIVE</span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Card content preview</p>
          </div>
          <div
            className="flex-1 rounded-md border p-4"
            style={{ backgroundColor: colors.find((c) => c.id === "card")?.value, borderColor: colors.find((c) => c.id === "border")?.value }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors.find((c) => c.id === "accent")?.value }}
              />
              <span className="text-xs font-sans text-foreground">ALERT LABEL</span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Accent color preview</p>
          </div>
        </div>
      </div>

      {/* Save / reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {saved ? "Saved" : "Save Colors"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Defaults
        </button>
        {saved && (
          <span className="text-xs font-sans text-primary animate-in fade-in">
            Color palette updated.
          </span>
        )}
      </div>
    </div>
  )
}
