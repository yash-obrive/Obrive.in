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
     * - public assets and media folders (animations, audio, images, videos, certificates, ai)
     * - public asset extensions (svg, png, jpg, jpeg, webp, avif, ico, mp4, webm, ogg, mp3, wav, riv, woff, woff2, ttf, otf, eot, css, js, json, pdf, txt, xml)
     * - /api routes
     * - Portal and global routes: client-login, employee-login, dashboard, audio-room, client, community-forum, profile, apply.career.obrive.com, legal, security, support
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|animations/|audio/|images/|videos/|certificates/|ai/|api/|client-login|employee-login|dashboard|audio-room|client/|community-forum|profile|legal|security|support|apply\\.career\\.obrive\\.com|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm|ogg|mp3|wav|riv|woff|woff2|ttf|otf|eot|css|js|json|pdf|txt|xml)$).*)",
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

  // 1. Check if the path starts with a supported country code (e.g. /in, /us/about, /ae/products/obpark)
  if (isValidCountryCode(firstSegment)) {
    const countryCode = firstSegment;

    // Canonicalize uppercase/mixed-case country in URL (e.g. /IN -> /in)
    if (segments[0] !== countryCode) {
      const canonicalUrl = req.nextUrl.clone();
      canonicalUrl.pathname = `/${countryCode}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
      return NextResponse.redirect(canonicalUrl, { status: 301 });
    }

    const countryConfig = COUNTRIES[countryCode];

    // If country is not production ready (and not in preview mode), fallback to default
    if (
      !countryConfig.isProductionReady &&
      process.env.NODE_ENV === "production"
    ) {
      const fallbackUrl = req.nextUrl.clone();
      fallbackUrl.pathname = `/${DEFAULT_COUNTRY}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
      return NextResponse.redirect(fallbackUrl);
    }

    // Pass the country in custom headers for server components and layout
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-obrive-country", countryCode);

    // Pass geo-detected country as suggested country if different
    const rawGeo =
      req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
    const detected = mapGeoCountryToSupported(rawGeo);
    if (detected && detected !== countryCode) {
      requestHeaders.set("x-obrive-suggested-country", detected);
    }

    // Determine the internal underlying path (e.g. /in -> /, /in/about -> /about, /in/global -> /global)
    const subpath = segments.slice(1).join("/");
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = subpath ? `/${subpath}` : "/";
    rewriteUrl.search = search;

    // Rewrite internally to the public route while keeping the country prefix in the browser URL
    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    // Ensure cookie is synced with the active URL country
    const existingCookie = req.cookies.get("preferred_country")?.value;
    if (existingCookie !== countryCode) {
      response.cookies.set("preferred_country", countryCode, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }

    return response;
  }

  // 2. Path does NOT have a country prefix (e.g., '/', '/about', '/products/obpark', '/global')
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

  // Redirect to localized subpath (e.g. / -> /in, /about -> /in/about)
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
