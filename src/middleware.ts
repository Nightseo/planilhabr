import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware to protect admin routes in production
 * Returns 404 for /keywords and /api routes when not on localhost
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected admin routes
  const protectedRoutes = [
    '/keywords',
    '/api/generator',
    '/excel-generator'
  ]

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Check if running on localhost
    const isLocalHost = request.nextUrl.hostname === 'localhost' ||
                       request.nextUrl.hostname === '127.0.0.1' ||
                       request.nextUrl.hostname.startsWith('192.168.') ||
                       request.nextUrl.hostname.endsWith('.local')

    // Block access in production (not localhost)
    if (!isLocalHost) {
      // Return proper 404 response
      return new NextResponse(null, {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
          'Cache-Control': 'no-store, must-revalidate'
        }
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/keywords/:path*',
    '/api/generator/:path*',
    '/excel-generator/:path*'
  ]
}