import { NextRequest, NextResponse } from 'next/server'

import { getSession } from './utils/auth-server'

const protectedRoutes = ['/dashboard']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  const session = await getSession()

  if (isProtectedRoute && !session?.user.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isProtectedRoute && session?.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
