import type { ReactNode } from 'react'

// Root layout is a thin passthrough — the real layout lives in [locale]/layout.tsx
// This is required by next-intl so the [locale] segment can set <html lang>
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
