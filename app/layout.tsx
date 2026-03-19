import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'mark — Visual Bookmark Library',
  description: 'Save and browse your favourite sites visually.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
