import type { LanguageCode } from "./languages";
// src/config/countries.ts

export type CountryCode =
  | "us"
  | "ca"
  | "mx"
  | "br"
  | "uae"
  | "cn"
  | "sa"
  | "qa"
  | "bh"
  | "uk"
  | "de"
  | "fr"
  | "nl"
  | "ch"
  | "se"
  | "es"
  | "it"
  | "sg"
  | "au"
  | "nz"
  | "jp"
  | "kr"
  | "my"
  | "id"
  | "th"
  | "za"
  | "ru";

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
  // --- AMERICAS ---
  us: {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    currency: "USD",
    currencySymbol: "$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=us",
    hreflang: "en-US",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  ca: {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    region: "Americas",
    currency: "CAD",
    currencySymbol: "C$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ca",
    hreflang: "en-CA",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  mx: {
    code: "mx",
    name: "Mexico",
    flag: "🇲🇽",
    region: "Americas",
    currency: "MXN",
    currencySymbol: "$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=mx",
    hreflang: "es-MX",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  br: {
    code: "br",
    name: "Brazil",
    flag: "🇧🇷",
    region: "Americas",
    currency: "BRL",
    currencySymbol: "R$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=br",
    hreflang: "pt-BR",
    defaultLanguage: "pt",
    supportedLanguages: ["pt", "en"],
    isProductionReady: true,
  },

  // --- MIDDLE EAST ---
  uae: {
    code: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    currency: "AED",
    currencySymbol: "AED",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=uae",
    hreflang: "en-AE",
    defaultLanguage: "ar",
    supportedLanguages: ["ar", "en"],
    isProductionReady: true,
  },
  sa: {
    code: "sa",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    currency: "SAR",
    currencySymbol: "SAR",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=sa",
    hreflang: "ar-SA",
    defaultLanguage: "ar",
    supportedLanguages: ["ar", "en"],
    isProductionReady: true,
  },
  qa: {
    code: "qa",
    name: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    currency: "QAR",
    currencySymbol: "QAR",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=qa",
    hreflang: "ar-QA",
    defaultLanguage: "ar",
    supportedLanguages: ["ar", "en"],
    isProductionReady: true,
  },
  bh: {
    code: "bh",
    name: "Bahrain",
    flag: "🇧🇭",
    region: "Middle East",
    currency: "BHD",
    currencySymbol: "BD",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=bh",
    hreflang: "ar-BH",
    defaultLanguage: "ar",
    supportedLanguages: ["ar", "en"],
    isProductionReady: true,
  },

  // --- EUROPE ---
  uk: {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    currency: "GBP",
    currencySymbol: "£",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=uk",
    hreflang: "en-GB",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  de: {
    code: "de",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=de",
    hreflang: "de-DE",
    defaultLanguage: "de",
    supportedLanguages: ["de", "en"],
    isProductionReady: true,
  },
  fr: {
    code: "fr",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=fr",
    hreflang: "fr-FR",
    defaultLanguage: "fr",
    supportedLanguages: ["fr", "en"],
    isProductionReady: true,
  },
  nl: {
    code: "nl",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=nl",
    hreflang: "nl-NL",
    defaultLanguage: "nl",
    supportedLanguages: ["nl", "en"],
    isProductionReady: true,
  },
  ch: {
    code: "ch",
    name: "Switzerland",
    flag: "🇨🇭",
    region: "Europe",
    currency: "CHF",
    currencySymbol: "CHF",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ch",
    hreflang: "de-CH",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  se: {
    code: "se",
    name: "Sweden",
    flag: "🇸🇪",
    region: "Europe",
    currency: "SEK",
    currencySymbol: "kr",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=se",
    hreflang: "sv-SE",
    defaultLanguage: "sv",
    supportedLanguages: ["sv", "en"],
    isProductionReady: true,
  },
  es: {
    code: "es",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=es",
    hreflang: "es-ES",
    defaultLanguage: "es",
    supportedLanguages: ["es", "en"],
    isProductionReady: true,
  },
  it: {
    code: "it",
    name: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=it",
    hreflang: "it-IT",
    defaultLanguage: "it",
    supportedLanguages: ["it", "en"],
    isProductionReady: true,
  },
  ru: {
    code: "ru",
    name: "Russia",
    flag: "🇷🇺",
    region: "Europe",
    currency: "RUB",
    currencySymbol: "₽",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ru",
    hreflang: "ru-RU",
    defaultLanguage: "ru",
    supportedLanguages: ["ru", "en"],
    isProductionReady: true,
  },

  // --- APAC ---
  cn: {
    code: "cn",
    name: "China",
    flag: "🇨🇳",
    region: "APAC",
    currency: "CNY",
    currencySymbol: "¥",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=cn",
    hreflang: "zh-CN",
    defaultLanguage: "zh",
    supportedLanguages: ["zh", "en"],
    isProductionReady: true,
  },
  sg: {
    code: "sg",
    name: "Singapore",
    flag: "🇸🇬",
    region: "APAC",
    currency: "SGD",
    currencySymbol: "S$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=sg",
    hreflang: "en-SG",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  au: {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    region: "APAC",
    currency: "AUD",
    currencySymbol: "A$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=au",
    hreflang: "en-AU",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  nz: {
    code: "nz",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "APAC",
    currency: "NZD",
    currencySymbol: "NZ$",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=nz",
    hreflang: "en-NZ",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
  jp: {
    code: "jp",
    name: "Japan",
    flag: "🇯🇵",
    region: "APAC",
    currency: "JPY",
    currencySymbol: "¥",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=jp",
    hreflang: "ja-JP",
    defaultLanguage: "ja",
    supportedLanguages: ["ja", "en"],
    isProductionReady: true,
  },
  kr: {
    code: "kr",
    name: "South Korea",
    flag: "🇰🇷",
    region: "APAC",
    currency: "KRW",
    currencySymbol: "₩",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=kr",
    hreflang: "ko-KR",
    defaultLanguage: "ko",
    supportedLanguages: ["ko", "en"],
    isProductionReady: true,
  },
  my: {
    code: "my",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "APAC",
    currency: "MYR",
    currencySymbol: "RM",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=my",
    hreflang: "en-MY",
    defaultLanguage: "ms",
    supportedLanguages: ["ms", "en"],
    isProductionReady: true,
  },
  id: {
    code: "id",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "APAC",
    currency: "IDR",
    currencySymbol: "Rp",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=id",
    hreflang: "id-ID",
    defaultLanguage: "id",
    supportedLanguages: ["id", "en"],
    isProductionReady: true,
  },
  th: {
    code: "th",
    name: "Thailand",
    flag: "🇹🇭",
    region: "APAC",
    currency: "THB",
    currencySymbol: "฿",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=th",
    hreflang: "th-TH",
    defaultLanguage: "th",
    supportedLanguages: ["th", "en"],
    isProductionReady: true,
  },

  // --- AFRICA ---
  za: {
    code: "za",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Africa",
    currency: "ZAR",
    currencySymbol: "R",
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=za",
    hreflang: "en-ZA",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
    isProductionReady: true,
  },
};
export const DEFAULT_COUNTRY: CountryCode = "us";

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
