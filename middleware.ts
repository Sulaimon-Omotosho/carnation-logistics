import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token) {
    const userId = token.id

    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL(`/${userId}/home`, request.url))
    }

    if (token.role === 'ADMIN') {
      return NextResponse.next()
    }

    if (
      request.nextUrl.pathname.includes('/analytics') &&
      token.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL(`/`, request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/[userId]/:path*', '/analytics/:path*', '/login'],
}
