import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Library | MSC Media Pro v2',
  description: 'Watch step-by-step tutorials to help you navigate your website setup and management.',
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
