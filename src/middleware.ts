// src/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  COUNTRIES,
  type CountryCode,
  DEFAULT_COUNTRY,
  isValidCountryCode,
  getCountryConfig,
} from "@/config/countries";
import { isValidLanguageCode, type LanguageCode } from "@/config/languages";

// Exclude static assets, internal endpoints, and global portal routes
export const config = {
  matcher: [
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
  const secondSegment = segments[1]?.toLowerCase();

  // Handle /location/[city] routes
  if (firstSegment === "location" && segments.length > 1) {
    const citySlug = segments[1];
    
    const cookieCountry = req.cookies.get("preferred_country")?.value;
    let targetCountry = DEFAULT_COUNTRY;
    if (isValidCountryCode(cookieCountry)) {
      targetCountry = cookieCountry as CountryCode;
    } else {
      const rawGeo = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
      const detected = mapGeoCountryToSupported(rawGeo);
      if (detected && COUNTRIES[detected]?.isProductionReady) {
        targetCountry = detected;
      }
    }

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

    if (!cookieCountry) {
      response.cookies.set("preferred_country", targetCountry, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }

    return response;
  }

  // 1. Check if the path starts with a supported country code (e.g. /in, /us/about, /ae/products/obpark)
  if (isValidCountryCode(firstSegment)) {
    const countryCode = firstSegment as CountryCode;
    const countryConfig = getCountryConfig(countryCode);

    // Canonicalize uppercase/mixed-case country in URL (e.g. /IN -> /in)
    if (segments[0] !== countryCode) {
      const canonicalUrl = req.nextUrl.clone();
      canonicalUrl.pathname = `/${countryCode}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
      return NextResponse.redirect(canonicalUrl, { status: 301 });
    }

    // If country is not production ready (and not in preview mode), fallback to default
    if (
      !countryConfig.isProductionReady &&
      process.env.NODE_ENV === "production"
    ) {
      const fallbackUrl = req.nextUrl.clone();
      fallbackUrl.pathname = `/${DEFAULT_COUNTRY}${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`;
      return NextResponse.redirect(fallbackUrl);
    }

    // Now check the language segment
    if (isValidLanguageCode(secondSegment)) {
      const languageCode = secondSegment as LanguageCode;
      
      // Canonicalize uppercase/mixed-case language in URL (e.g. /EN -> /en)
      if (segments[1] !== languageCode) {
        const canonicalUrl = req.nextUrl.clone();
        canonicalUrl.pathname = `/${countryCode}/${languageCode}${segments.length > 2 ? `/${segments.slice(2).join("/")}` : ""}`;
        return NextResponse.redirect(canonicalUrl, { status: 301 });
      }

      // Check if language is supported by this country
      if (!countryConfig.supportedLanguages.includes(languageCode)) {
        // Return 404 for invalid combinations (e.g., /in/ar/services)
        const notFoundUrl = req.nextUrl.clone();
        notFoundUrl.pathname = "/404";
        return NextResponse.rewrite(notFoundUrl);
      }

      // Valid Country + Language
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-obrive-country", countryCode);
      requestHeaders.set("x-obrive-language", languageCode);
      requestHeaders.set("x-obrive-pathname", req.nextUrl.pathname);

      // Pass geo-detected country as suggested country if different
      const rawGeo =
        req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
      const detected = mapGeoCountryToSupported(rawGeo);
      if (detected && detected !== countryCode) {
        requestHeaders.set("x-obrive-suggested-country", detected);
      }

      // Determine the internal underlying path (e.g. /in/en -> /, /in/en/about -> /about)
      const subpath = segments.slice(2).join("/");
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = subpath ? `/${subpath}` : "/";
      rewriteUrl.search = search;

      const response = NextResponse.rewrite(rewriteUrl, {
        request: {
          headers: requestHeaders,
        },
      });

      return response;
    } else {
      // 2. Path has a country prefix but NO language prefix (legacy URL like /in/services)
      // 301 Redirect to the country's default language to preserve SEO.
      const redirectUrl = req.nextUrl.clone();
      const restOfPath = segments.slice(1).join("/");
      redirectUrl.pathname = `/${countryCode}/${countryConfig.defaultLanguage}${restOfPath ? `/${restOfPath}` : ""}`;
      return NextResponse.redirect(redirectUrl, { status: 301 });
    }
  }

  // 3. Path does NOT have a country prefix (e.g., '/', '/about', '/products/obpark', '/global')
  // These are INTERNATIONAL pages — always served in English.
  // Country/language-specific pages live at /{country}/{language}/...
  // Geo-detection is only used for the CountrySwitcherBanner suggestion, not for content language.

  // Pass English as the language for all international routes
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-obrive-country", DEFAULT_COUNTRY);
  requestHeaders.set("x-obrive-language", "en");
  requestHeaders.set("x-obrive-pathname", req.nextUrl.pathname);

  // Still detect geo for the country-switcher banner suggestion
  const rawGeo2 =
    req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");
  const detectedGeo2 = mapGeoCountryToSupported(rawGeo2);
  if (detectedGeo2 && COUNTRIES[detectedGeo2]?.isProductionReady) {
    requestHeaders.set("x-obrive-suggested-country", detectedGeo2);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
