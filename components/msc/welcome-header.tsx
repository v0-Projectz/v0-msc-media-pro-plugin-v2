"use client"

import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

export function WelcomeHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">MSC Media Pro Studio Control Center</p>
        </div>
      </div>
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
        PRO
      </Badge>
    </div>
  )
}
