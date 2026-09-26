// src/config/translations.ts
import { CountryCode, getCountryConfig } from "./countries";
import { LanguageCode } from "./languages";

export type TranslationStatus = "ready" | "pending";

/**
 * Returns the translation readiness status for a specific route.
 * 
 * If a combination is "pending", it will be excluded from:
 * - sitemap.xml
 * - hreflang tags
 * - language selectors
 * - and it will emit a <meta name="robots" content="noindex" />
 * 
 * @param country The active country code
 * @param language The active language code
 * @param route The internal route path (e.g., "/services/ai-consulting")
 */
export function getTranslationStatus(
  country: CountryCode,
  language: LanguageCode,
  route: string,
): TranslationStatus {
  const config = getCountryConfig(country);

  // If the language is in the country's supported languages, it is ready.
  if (config.supportedLanguages.includes(language)) {
    return "ready";
  }

  // Otherwise, unsupported language for the country (invalid)
  return "pending";
}
