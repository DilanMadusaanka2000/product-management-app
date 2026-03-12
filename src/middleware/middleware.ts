import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//authentication
const PROTECTED_ROUTES = ['/dashboard'];


export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  // Not logged 
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
