"use client"

import { useState } from "react"
import { Shield, Key, Users, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
        checked
          ? "border-primary/30 bg-primary/20"
          : "border-border bg-secondary"
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

interface RoleAccess {
  role: string
  label: string
  description: string
  canView: boolean
  canEdit: boolean
}

const defaultRoles: RoleAccess[] = [
  {
    role: "administrator",
    label: "Administrator",
    description: "Full access to all Control Center pages and settings.",
    canView: true,
    canEdit: true,
  },
  {
    role: "editor",
    label: "Editor",
    description: "Can view Dashboard and Instructionz. No access to Settings.",
    canView: true,
    canEdit: false,
  },
  {
    role: "author",
    label: "Author",
    description: "Dashboard view only. No sidebar navigation beyond home.",
    canView: true,
    canEdit: false,
  },
  {
    role: "subscriber",
    label: "Subscriber",
    description: "No access to MSC Media Pro Control Center.",
    canView: false,
    canEdit: false,
  },
]

export function SettingsAccess() {
  const [roles, setRoles] = useState(defaultRoles)
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [apiKey] = useState("msc_pro_sk_live_4x8k2m9nQ7pR3tY6wZ1")
  const [saved, setSaved] = useState(false)

  function updateRole(role: string, field: "canView" | "canEdit", value: boolean) {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.role !== role) return r
        if (field === "canView" && !value) {
          return { ...r, canView: false, canEdit: false }
        }
        return { ...r, [field]: value }
      })
    )
    setSaved(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Access Control</h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Manage which WordPress roles can access the Control Center and configure API credentials.
        </p>
      </div>

      {/* Role matrix */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            Role Permissions
          </h3>
        </div>

        {/* Table header */}
        <div className="mb-2 grid grid-cols-[1fr_80px_80px] gap-4 px-4">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Role
          </span>
          <span className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            View
          </span>
          <span className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Edit
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {roles.map((role) => (
            <div
              key={role.role}
              className="grid grid-cols-[1fr_80px_80px] items-center gap-4 rounded-md border border-border bg-secondary px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{role.label}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </div>
              <div className="flex justify-center">
                <Toggle
                  checked={role.canView}
                  onChange={(val) => updateRole(role.role, "canView", val)}
                />
              </div>
              <div className="flex justify-center">
                <Toggle
                  checked={role.canEdit}
                  onChange={(val) => updateRole(role.role, "canEdit", val)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Key */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Key className="h-4 w-4 text-accent" />
          <h3 className="text-xs font-bold text-card-foreground uppercase tracking-wider">
            API Credentials
          </h3>
        </div>

        <div className="rounded-md border border-border bg-secondary p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                MSC Pro License Key
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                Required for Bunny.net API access and Presto Player integration.
              </p>
            </div>
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <code className="flex-1 rounded-md border border-border bg-muted px-3 py-2 text-xs font-mono text-foreground">
              {apiKeyVisible ? apiKey : "msc_pro_sk_live_••••••••••••••••"}
            </code>
            <button
              onClick={() => setApiKeyVisible(!apiKeyVisible)}
              className="rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {apiKeyVisible ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(apiKey)}
              className="rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Security info */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-medium text-accent">Security Notice</p>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              Never share your API key publicly. It grants full access to Bunny.net CDN, Presto Player configuration, and MSC Media Pro settings. Rotate it immediately if compromised.
            </p>
          </div>
        </div>
      </div>

      {/* Save / reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaved(true)}
          className="rounded-md border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {saved ? "Saved" : "Save Access"}
        </button>
        <button
          onClick={() => {
            setRoles(defaultRoles)
            setSaved(false)
          }}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-secondary-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Defaults
        </button>
        {saved && (
          <span className="text-xs font-mono text-primary animate-in fade-in">
            Access updated.
          </span>
        )}
      </div>
    </div>
  )
}
