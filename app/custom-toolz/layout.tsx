import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Toolz | MSC Media Pro v2',
  description: 'Configure display elements and layout settings for your DiviGear CPT Filterable Module.',
}

export default function CustomToolzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
