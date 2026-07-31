import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Exclude internal paths, static files, and the main landing page
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get subdomain (e.g., 'greenwood' from 'greenwood.localhost:3000')
  const currentHost = hostname
    .replace(`.localhost:3000`, '')
    .replace(`.edupulse.com`, '');

  // If there's a subdomain and it's not 'www' or the main site
  if (currentHost && currentHost !== 'www' && currentHost !== 'localhost:3000') {
    // Logic: Rewrite the URL to include the school subdomain context
    // In a real app, you might prefix all dashboard routes or use it to filter data
    // For now, we'll just set a header that the app can read
    const response = NextResponse.next();
    response.headers.set('x-school-subdomain', currentHost);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
