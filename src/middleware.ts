// src/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  COUNTRIES,
  type CountryCode,
  DEFAULT_COUNTRY,
  isValidCountryCode,
} from "@/config/countries";

// Exclude static assets, internal endpoints, and global portal routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml
     * - public asset extensions (svg, png, jpg, jpeg, webp, mp4, etc.)
     * - /api routes
     * - Portal routes: client-login, employee-login, dashboard, audio-room, client, community-forum, profile, apply.career.obrive.com
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/|client-login|employee-login|dashboard|audio-room|client/|community-forum|profile|apply\\.career\\.obrive\\.com|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff|woff2|ttf|css|js)$).*)",
  ],
};

function mapGeoCountryToSupported(
  geoCountry?: string | null,
): CountryCode | null {
  if (!geoCountry) return null;
  const upper = geoCountry.toUpperCase();
  if (upper === "GB" || upper === "UK") return "uk";
  const lower = geoCountry.toLowerCase();
  if (isValidCountryCode(lower)) {
    return lower as CountryCode;
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // 1. Check if the path already starts with a supported country code
  if (isValidCountryCode(firstSegment)) {
    const countryConfig = COUNTRIES[firstSegment];

    // If country is not production ready (and not in preview mode), fallback to default
    if (
      !countryConfig.isProductionReady &&
      process.env.NODE_ENV === "production"
    ) {
      const fallbackUrl = req.nextUrl.clone();
      fallbackUrl.pathname = `/${DEFAULT_COUNTRY}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
      return NextResponse.redirect(fallbackUrl);
    }

    // Pass the country in custom headers for server components
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-obrive-country", firstSegment);

    // Pass geo-detected country as suggested country if different
    const rawGeo =
      req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
    const detected = mapGeoCountryToSupported(rawGeo);
    if (detected && detected !== firstSegment) {
      requestHeaders.set("x-obrive-suggested-country", detected);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Ensure cookie is synced with the explicit URL country
    const existingCookie = req.cookies.get("preferred_country")?.value;
    if (existingCookie !== firstSegment) {
      response.cookies.set("preferred_country", firstSegment, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }

    return response;
  }

  // 2. Path does NOT have a country prefix (e.g., '/', '/products/obpark', '/contact')
  // Check user's preferred cookie first
  const cookieCountry = req.cookies.get("preferred_country")?.value;
  let targetCountry: CountryCode = DEFAULT_COUNTRY;

  if (isValidCountryCode(cookieCountry)) {
    targetCountry = cookieCountry;
  } else {
    // Detect country from edge geo IP header
    const rawGeo =
      req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
    const detected = mapGeoCountryToSupported(rawGeo);
    if (detected && COUNTRIES[detected]?.isProductionReady) {
      targetCountry = detected;
    }
  }

  // Redirect to localized subpath
  const redirectUrl = req.nextUrl.clone();
  const subpath = pathname === "/" ? "" : pathname;
  redirectUrl.pathname = `/${targetCountry}${subpath}`;
  redirectUrl.search = search;

  const response = NextResponse.redirect(redirectUrl, { status: 307 });

  // Set preferred_country cookie on initial redirect
  if (!cookieCountry) {
    response.cookies.set("preferred_country", targetCountry, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}
