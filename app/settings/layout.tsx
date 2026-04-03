import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | MSC Media Pro v2',
  description: 'Customize branding, toggle features, adjust colors, and manage access for the Control Center.',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
