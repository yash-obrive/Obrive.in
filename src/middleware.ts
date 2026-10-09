// src/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_COUNTRY } from "@/config/countries";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|animations/|audio/|images/|videos/|certificates/|ai/|api/|client-login|employee-login|dashboard|audio-room|client/|community-forum|profile|legal|security|support|apply\\.career\\.obrive\\.com|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm|ogg|mp3|wav|riv|woff|woff2|ttf|otf|eot|css|js|json|pdf|txt|xml)$).*)",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // Handle /location/[city] routes for Pan India
  if (firstSegment === "location" && segments.length > 1) {
    const citySlug = segments[1];
    
    // Default country is "in"
    const targetCountry = DEFAULT_COUNTRY;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-obrive-country", targetCountry);
    requestHeaders.set("x-obrive-city", citySlug);

    const subpath = segments.slice(2).join("/");
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = subpath ? `/${subpath}` : "/";
    rewriteUrl.search = search;

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    const cookieCountry = req.cookies.get("preferred_country")?.value;
    if (!cookieCountry) {
      response.cookies.set("preferred_country", targetCountry, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }

    return response;
  }

  // Path does NOT have a location prefix (e.g., '/', '/about', '/products/obpark')
  // These are standard pages — always served in English and assumed to be for India.

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-obrive-country", DEFAULT_COUNTRY);
  requestHeaders.set("x-obrive-language", "en");
  requestHeaders.set("x-obrive-pathname", req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
