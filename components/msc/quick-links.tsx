import { ExternalLink, Mail, CreditCard, UserCircle } from "lucide-react"

const links = [
  { icon: Mail, label: "Access Webmail", href: "https://webmail.mystudiochannel.com", external: true },
  { icon: UserCircle, label: "Client Portal", href: "https://mystudiochannel.com/portal", external: true },
  { icon: CreditCard, label: "Stripe Login", href: "https://dashboard.stripe.com", external: true },
]

export function QuickLinks() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-bold text-card-foreground uppercase tracking-wider">
        Quick Links
      </h2>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-md border border-border bg-secondary px-4 py-3 text-sm text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span>{link.label}</span>
            <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  )
}
