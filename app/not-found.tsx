import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { storageUrl } from '@/lib/constants'

// Root-level not-found for requests that don't match any locale (e.g. /xx/something)
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased bg-white text-[#1a1a1a]">
        {/* Minimal header */}
        <header className="border-b bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={storageUrl('branding/logo.png')}
                alt="LENGOLF"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </header>

        {/* 404 content */}
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#005a32' }}>
            Error 404
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl" style={{ color: '#005a32' }}>
            Page Not Found
          </h1>
          <p className="mt-4 max-w-md text-lg text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#005a32' }}
            >
              Go Home
            </Link>
            <Link
              href="/blog/"
              className="rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
              style={{ borderColor: '#005a32', color: '#005a32' }}
            >
              Read Our Blog
            </Link>
          </div>
        </main>

        {/* Minimal footer */}
        <footer className="border-t py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} LENGOLF. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
