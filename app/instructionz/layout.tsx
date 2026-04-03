import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Engine Instructionz | MSC Media Pro v2',
  description: 'Complete documentation for the MSC Media Pro engine, setup guides, and troubleshooting.',
}

export default function InstructionzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
