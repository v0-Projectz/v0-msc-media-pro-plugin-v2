import { Settings, Wifi, Shield, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function StatusBadge({ status }: { status: "online" | "offline" | "active" }) {
  const styles = {
    online: "border-primary/30 bg-primary/10 text-primary",
    active: "border-primary/30 bg-primary/10 text-primary",
    offline: "border-accent/30 bg-accent/10 text-accent",
  }
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-sans uppercase ${styles[status]}`}
    >
      {status}
    </Badge>
  )
}

export function SystemStatus() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Engine Status */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-card-foreground">Engine Status</h3>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <div>
            <p className="text-sm text-card-foreground font-sans">MSC Core: v1.0.0</p>
            <div className="mt-1 flex gap-2">
              <StatusBadge status="online" />
            </div>
          </div>
        </div>
      </div>

      {/* Connectivity */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-card-foreground">Connectivity</h3>
          <Wifi className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <div>
            <p className="text-sm text-card-foreground">Presto Player</p>
            <div className="mt-1 flex gap-2">
              <StatusBadge status="active" />
            </div>
          </div>
        </div>
      </div>

      {/* SSL */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-card-foreground">SSL Status</h3>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <div>
            <p className="text-sm text-primary font-medium">SECURE</p>
            <p className="text-xs text-muted-foreground mt-0.5">Certificate Valid</p>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-card-foreground">Last Backup</h3>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <div>
            <p className="text-sm text-card-foreground">4 hours ago</p>
            <p className="text-xs text-muted-foreground mt-0.5">WP v6.9 Optimized</p>
          </div>
        </div>
      </div>
    </div>
  )
}
