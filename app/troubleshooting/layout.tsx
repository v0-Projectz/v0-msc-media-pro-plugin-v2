import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Troubleshooting | MSC Media Pro v2',
  description: 'Find solutions to common issues and get help with MSC Media Pro.',
}

export default function TroubleshootingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
