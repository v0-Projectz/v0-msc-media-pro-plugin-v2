import { Badge } from "@/components/ui/badge"

export function WelcomeHeader() {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Studio Mode
        </p>
        <h1 className="text-3xl font-bold text-foreground tracking-tight lg:text-4xl">
          MSC Media Pro
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Welcome to the Studio. Your site is healthy.
        </p>
      </div>
      <Badge className="mt-2 w-fit border border-primary/30 bg-primary/10 text-primary md:mt-0">
        SYSTEM ACTIVE
      </Badge>
    </div>
  )
}
