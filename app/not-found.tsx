import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Root-level not-found for requests that don't match any locale (e.g. /xx/something)
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl font-bold" style={{ color: '#005a32' }}>404</h1>
          <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </body>
    </html>
  )
}
