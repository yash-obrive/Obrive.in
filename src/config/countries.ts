import type { LanguageCode } from "./languages";
// src/config/countries.ts

export type CountryCode = "in";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  region: "Americas" | "Middle East" | "Europe" | "APAC" | "Africa";
  currency: string;
  currencySymbol: string;
  calendlyUrl?: string;
  hreflang: string;
  defaultLanguage: LanguageCode;
  supportedLanguages: LanguageCode[];
  isProductionReady: boolean;
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  in: {
    code: "in",
    name: "India",
    flag: "🇮🇳",
    region: "APAC",
    currency: "INR",
    currencySymbol: "₹",
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=in",
    hreflang: "en-IN",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
};

export const DEFAULT_COUNTRY: CountryCode = "in";

export const SUPPORTED_COUNTRIES: CountryCode[] = Object.keys(
  COUNTRIES,
) as CountryCode[];

export function isValidCountryCode(code?: string | null): code is CountryCode {
  if (!code) return false;
  return Object.hasOwn(COUNTRIES, code.toLowerCase());
}

export function getCountryConfig(code?: string | null): CountryConfig {
  if (code && isValidCountryCode(code)) {
    return COUNTRIES[code.toLowerCase() as CountryCode];
  }
  return COUNTRIES[DEFAULT_COUNTRY];
}
