import { Badge } from "@/components/ui/badge"

export function StudioHeartbeat() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-bold text-card-foreground uppercase tracking-wider">
        Studio Heartbeat
      </h2>

      <div className="flex flex-col gap-3">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">
            System Status: Online
          </span>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-2 rounded-md border border-border bg-secondary p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">SSL</span>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary text-[10px] font-sans"
            >
              SECURE
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">WordPress</span>
            <span className="text-xs font-sans text-card-foreground">v6.9</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Divi</span>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary text-[10px] font-sans"
            >
              ACTIVE
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Backup</span>
            <span className="text-xs font-sans text-card-foreground">4 hrs ago</span>
          </div>
        </div>

        {/* Build info */}
        <div className="rounded-md border border-border bg-secondary p-3">
          <p className="text-[10px] font-sans text-muted-foreground">
            Build: MSC PRO PLUGIN v1.0.1
          </p>
          <p className="text-[10px] font-sans text-muted-foreground">
            System: MSC Media Pro
          </p>
        </div>
      </div>
    </div>
  )
}
