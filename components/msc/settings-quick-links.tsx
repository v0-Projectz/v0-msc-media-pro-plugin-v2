"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, ExternalLink, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickLinkItem {
  id: string
  label: string
  url: string
  icon: string
  enabled: boolean
}

const defaultLinks: QuickLinkItem[] = [
  { id: "1", label: "Access Webmail", url: "https://webmail.example.com", icon: "mail", enabled: true },
  { id: "2", label: "Client Portal", url: "https://portal.example.com", icon: "user", enabled: true },
  { id: "3", label: "Stripe Login", url: "https://dashboard.stripe.com", icon: "credit-card", enabled: true },
]

const iconOptions = [
  { value: "mail", label: "Mail" },
  { value: "user", label: "User" },
  { value: "credit-card", label: "Credit Card" },
  { value: "globe", label: "Globe" },
  { value: "link", label: "Link" },
  { value: "phone", label: "Phone" },
  { value: "file", label: "File" },
  { value: "shield", label: "Shield" },
]

export function SettingsQuickLinks() {
  const [links, setLinks] = useState<QuickLinkItem[]>(defaultLinks)
  const [saved, setSaved] = useState(false)

  function addLink() {
    const newLink: QuickLinkItem = {
      id: Date.now().toString(),
      label: "",
      url: "",
      icon: "link",
      enabled: true,
    }
    setLinks((prev) => [...prev, newLink])
    setSaved(false)
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
    setSaved(false)
  }

  function updateLink(id: string, field: keyof QuickLinkItem, value: string | boolean) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
    setSaved(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Quick Links</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Configure the shortcut links shown on the Dashboard sidebar. Clients use these to access external portals.
        </p>
      </div>

      {/* Links list */}
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          <div
            key={link.id}
            className={cn(
              "rounded-lg border bg-card p-4 transition-colors",
              link.enabled ? "border-border" : "border-border/50 opacity-60"
            )}
          >
            <div className="flex items-start gap-3">
              <GripVertical className="mt-2.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-secondary text-[10px] font-mono text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-card-foreground uppercase tracking-wider">
                    Link {index + 1}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {/* Label */}
                  <div>
                    <label className="mb-1 block text-[10px] text-muted-foreground uppercase tracking-wider">
                      Label
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      placeholder="Link text"
                      onChange={(e) => updateLink(link.id, "label", e.target.value)}
                      className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-xs text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  {/* URL */}
                  <div>
                    <label className="mb-1 block text-[10px] text-muted-foreground uppercase tracking-wider">
                      URL
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      placeholder="https://..."
                      onChange={(e) => updateLink(link.id, "url", e.target.value)}
                      className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-xs text-foreground font-mono placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    />
                  </div>

                  {/* Icon select */}
                  <div>
                    <label className="mb-1 block text-[10px] text-muted-foreground uppercase tracking-wider">
                      Icon
                    </label>
                    <select
                      value={link.icon}
                      onChange={(e) => updateLink(link.id, "icon", e.target.value)}
                      className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-xs text-foreground font-mono focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                {link.url && (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Open link"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  onClick={() => removeLink(link.id)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Remove link"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add link */}
      <button
        onClick={addLink}
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Plus className="h-4 w-4" />
        Add Quick Link
      </button>

      {/* Save / reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {saved ? "Saved" : "Save Quick Links"}
        </button>
        <button
          onClick={() => {
            setLinks(defaultLinks)
            setSaved(false)
          }}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Defaults
        </button>
        {saved && (
          <span className="text-xs font-mono text-primary animate-in fade-in">
            Quick links updated.
          </span>
        )}
      </div>
    </div>
  )
}
