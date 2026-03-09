import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  // Protected routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isCustomerRoute = pathname.startsWith('/mein-bereich');

  if ((isAdminRoute || isCustomerRoute) && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role check via decoded session (base64 userId)
  if (session) {
    try {
      const userId = Buffer.from(session, 'base64').toString('utf-8');
      if (isAdminRoute && !userId.startsWith('admin')) {
        return NextResponse.redirect(new URL('/mein-bereich', request.url));
      }
      if (isCustomerRoute && !userId.startsWith('customer')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/mein-bereich/:path*'],
};
