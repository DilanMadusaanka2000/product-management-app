import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/dashboard'];
const GUEST_ONLY = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (PROTECTED.some((r) => pathname.startsWith(r)) && !token)
    return NextResponse.redirect(new URL('/auth/login', request.url));

  if (GUEST_ONLY.some((r) => pathname.startsWith(r)) && token)
    return NextResponse.redirect(new URL('/', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
