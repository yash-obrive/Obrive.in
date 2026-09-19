import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidCountryCode, type CountryCode } from "@/config/countries";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0) {
    const firstSegment = segments[0] as CountryCode;

    // Only rewrite if it's a valid country code (and not "global", since "global" isn't a URL prefix)
    if (isValidCountryCode(firstSegment) && firstSegment !== "global") {
      const restOfPath = segments.slice(1).join('/');

      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/${restOfPath}`;

      return NextResponse.rewrite(newUrl);
    }
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
     * - .*\\.(.*) (matches any static file with an extension)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
