"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isValidCountryCode, type CountryCode } from "@/config/countries";
import type { ComponentProps } from "react";
import React from "react";

/**
 * A wrapper around Next.js <Link> that automatically preserves the
 * current country prefix in the URL.
 *
 * If the user is currently browsing /ca/about and clicks a link to /contact,
 * this component automatically routes them to /ca/contact instead of dropping them
 * back to the global /contact route.
 */
export default function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  let finalHref = href;

  if (typeof href === "string" && pathname) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0) {
      const currentPrefix = segments[0] as CountryCode;

      if (isValidCountryCode(currentPrefix) && currentPrefix !== "global") {
        // User is currently inside a country-prefixed route.
        // Only prefix if href is an absolute path (starts with /) and doesn't already have a country prefix
        if (href.startsWith("/")) {
          const hrefSegments = href.split("/").filter(Boolean);
          if (hrefSegments.length > 0) {
            const hrefPrefix = hrefSegments[0] as CountryCode;
            if (!isValidCountryCode(hrefPrefix)) {
              finalHref = `/${currentPrefix}${href}`;
            }
          } else {
            // href is exactly "/"
            finalHref = `/${currentPrefix}`;
          }
        }
      }
    }
  }

  // Pass ref if needed, but since it's a simple function component, we just render Link
  return <Link href={finalHref} {...props} />;
}
