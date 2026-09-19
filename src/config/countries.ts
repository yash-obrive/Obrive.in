// src/config/countries.ts

export type CountryCode =
  | "global"
  | "in"
  | "us"
  | "ca"
  | "mx"
  | "br"
  | "ae"
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
  | "za";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  region: "Global" | "India" | "Americas" | "Middle East" | "Europe" | "APAC" | "Africa";
  currency: string;
  currencySymbol: string;
  phone: string;
  contactEmail: string;
  offices: string[];
  calendlyUrl?: string;
  hreflang: string;
  dir: "ltr" | "rtl";
  isProductionReady: boolean;
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  // --- GLOBAL (DEFAULT) ---
  global: {
    code: "global",
    name: "Global",
    flag: "🌍",
    region: "Global",
    currency: "USD",
    currencySymbol: "$",
    phone: "+1-800-XXX-XXXX",
    contactEmail: "info@obrive.com",
    offices: ["Global Headquarters"],
    calendlyUrl: "https://calendly.com/obrive/inquiry",
    hreflang: "en",
    dir: "ltr",
    isProductionReady: true,
  },

  // --- INDIA ---
  in: {
    code: "in",
    name: "India",
    flag: "🇮🇳",
    region: "India",
    currency: "INR",
    currencySymbol: "₹",
    phone: "+91-888-477-4300",
    contactEmail: "info@obrive.com",
    offices: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Ahmedabad", "Pune", "Chennai"],
    calendlyUrl: "https://calendly.com/obrive/inquiry",
    hreflang: "en-IN",
    dir: "ltr",
    isProductionReady: true,
  },

  // --- AMERICAS ---
  us: {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    currency: "USD",
    currencySymbol: "$",
    phone: "+1-800-XXX-XXXX",
    contactEmail: "us@obrive.com",
    offices: ["New York", "San Francisco", "Chicago", "Seattle", "Austin", "Wilmington"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-us",
    hreflang: "en-US",
    dir: "ltr",
    isProductionReady: true,
  },
  ca: {
    code: "ca",
    name: "Canada",
    flag: "🇨🇦",
    region: "Americas",
    currency: "CAD",
    currencySymbol: "C$",
    phone: "+1-800-XXX-XXXX",
    contactEmail: "ca@obrive.com",
    offices: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-us",
    hreflang: "en-CA",
    dir: "ltr",
    isProductionReady: true,
  },
  mx: {
    code: "mx",
    name: "Mexico",
    flag: "🇲🇽",
    region: "Americas",
    currency: "MXN",
    currencySymbol: "$",
    phone: "+52-55-XXXX-XXXX",
    contactEmail: "mx@obrive.com",
    offices: ["Mexico City", "Monterrey", "Guadalajara"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-us",
    hreflang: "es-MX",
    dir: "ltr",
    isProductionReady: true,
  },
  br: {
    code: "br",
    name: "Brazil",
    flag: "🇧🇷",
    region: "Americas",
    currency: "BRL",
    currencySymbol: "R$",
    phone: "+55-11-XXXX-XXXX",
    contactEmail: "br@obrive.com",
    offices: ["São Paulo", "Rio de Janeiro", "Brasília"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-us",
    hreflang: "pt-BR",
    dir: "ltr",
    isProductionReady: true,
  },

  // --- MIDDLE EAST ---
  ae: {
    code: "ae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    currency: "AED",
    currencySymbol: "AED",
    phone: "+971-4-XXX-XXXX",
    contactEmail: "uae@obrive.com",
    offices: ["Dubai Internet City", "Abu Dhabi", "Sharjah"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-mena",
    hreflang: "en-AE",
    dir: "ltr",
    isProductionReady: true,
  },
  sa: {
    code: "sa",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    currency: "SAR",
    currencySymbol: "SAR",
    phone: "+966-11-XXX-XXXX",
    contactEmail: "ksa@obrive.com",
    offices: ["Riyadh", "Jeddah", "Dammam", "NEOM"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-mena",
    hreflang: "en-SA",
    dir: "ltr",
    isProductionReady: true,
  },
  qa: {
    code: "qa",
    name: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    currency: "QAR",
    currencySymbol: "QAR",
    phone: "+974-44XX-XXXX",
    contactEmail: "qatar@obrive.com",
    offices: ["Doha"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-mena",
    hreflang: "en-QA",
    dir: "ltr",
    isProductionReady: true,
  },
  bh: {
    code: "bh",
    name: "Bahrain",
    flag: "🇧🇭",
    region: "Middle East",
    currency: "BHD",
    currencySymbol: "BD",
    phone: "+973-17XX-XXXX",
    contactEmail: "bahrain@obrive.com",
    offices: ["Manama"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-mena",
    hreflang: "en-BH",
    dir: "ltr",
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
    phone: "+44-20-XXXX-XXXX",
    contactEmail: "uk@obrive.com",
    offices: ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "en-GB",
    dir: "ltr",
    isProductionReady: true,
  },
  de: {
    code: "de",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    phone: "+49-30-XXXX-XXXX",
    contactEmail: "eu@obrive.com",
    offices: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "de-DE",
    dir: "ltr",
    isProductionReady: true,
  },
  fr: {
    code: "fr",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    phone: "+33-1-XXXX-XXXX",
    contactEmail: "eu@obrive.com",
    offices: ["Paris", "Lyon", "Toulouse", "Marseille"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "fr-FR",
    dir: "ltr",
    isProductionReady: true,
  },
  nl: {
    code: "nl",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    phone: "+31-20-XXXX-XXXX",
    contactEmail: "eu@obrive.com",
    offices: ["Amsterdam", "Rotterdam", "Eindhoven"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "en-NL",
    dir: "ltr",
    isProductionReady: true,
  },
  ch: {
    code: "ch",
    name: "Switzerland",
    flag: "🇨🇭",
    region: "Europe",
    currency: "CHF",
    currencySymbol: "CHF",
    phone: "+41-22-XXXX-XXXX",
    contactEmail: "ch@obrive.com",
    offices: ["Zurich", "Geneva", "Basel"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "de-CH",
    dir: "ltr",
    isProductionReady: true,
  },
  se: {
    code: "se",
    name: "Sweden",
    flag: "🇸🇪",
    region: "Europe",
    currency: "SEK",
    currencySymbol: "kr",
    phone: "+46-8-XXXX-XXXX",
    contactEmail: "eu@obrive.com",
    offices: ["Stockholm", "Gothenburg", "Malmö"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "sv-SE",
    dir: "ltr",
    isProductionReady: true,
  },
  es: {
    code: "es",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    phone: "+34-91-XXXX-XXXX",
    contactEmail: "es@obrive.com",
    offices: ["Madrid", "Barcelona", "Valencia"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "es-ES",
    dir: "ltr",
    isProductionReady: true,
  },
  it: {
    code: "it",
    name: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    phone: "+39-02-XXXX-XXXX",
    contactEmail: "it@obrive.com",
    offices: ["Milan", "Rome", "Turin"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-uk",
    hreflang: "it-IT",
    dir: "ltr",
    isProductionReady: true,
  },

  // --- APAC ---
  sg: {
    code: "sg",
    name: "Singapore",
    flag: "🇸🇬",
    region: "APAC",
    currency: "SGD",
    currencySymbol: "S$",
    phone: "+65-6XXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Singapore"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "en-SG",
    dir: "ltr",
    isProductionReady: true,
  },
  au: {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    region: "APAC",
    currency: "AUD",
    currencySymbol: "A$",
    phone: "+61-2-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "en-AU",
    dir: "ltr",
    isProductionReady: true,
  },
  nz: {
    code: "nz",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "APAC",
    currency: "NZD",
    currencySymbol: "NZ$",
    phone: "+64-9-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Auckland", "Wellington"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "en-NZ",
    dir: "ltr",
    isProductionReady: true,
  },
  jp: {
    code: "jp",
    name: "Japan",
    flag: "🇯🇵",
    region: "APAC",
    currency: "JPY",
    currencySymbol: "¥",
    phone: "+81-3-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Tokyo", "Osaka", "Nagoya"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "ja-JP",
    dir: "ltr",
    isProductionReady: true,
  },
  kr: {
    code: "kr",
    name: "South Korea",
    flag: "🇰🇷",
    region: "APAC",
    currency: "KRW",
    currencySymbol: "₩",
    phone: "+82-2-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Seoul", "Busan"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "ko-KR",
    dir: "ltr",
    isProductionReady: true,
  },
  my: {
    code: "my",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "APAC",
    currency: "MYR",
    currencySymbol: "RM",
    phone: "+60-3-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Kuala Lumpur", "Penang"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "en-MY",
    dir: "ltr",
    isProductionReady: true,
  },
  id: {
    code: "id",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "APAC",
    currency: "IDR",
    currencySymbol: "Rp",
    phone: "+62-21-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Jakarta", "Bandung", "Surabaya"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "id-ID",
    dir: "ltr",
    isProductionReady: true,
  },
  th: {
    code: "th",
    name: "Thailand",
    flag: "🇹🇭",
    region: "APAC",
    currency: "THB",
    currencySymbol: "฿",
    phone: "+66-2-XXXX-XXXX",
    contactEmail: "apac@obrive.com",
    offices: ["Bangkok", "Phuket"],
    calendlyUrl: "https://calendly.com/obrive/inquiry-apac",
    hreflang: "th-TH",
    dir: "ltr",
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
    phone: "+27-11-XXXX-XXXX",
    contactEmail: "za@obrive.com",
    offices: ["Johannesburg", "Cape Town", "Durban"],
    calendlyUrl: "https://calendly.com/obrive/inquiry",
    hreflang: "en-ZA",
    dir: "ltr",
    isProductionReady: true,
  },
};

export const DEFAULT_COUNTRY: CountryCode = "global";

export const SUPPORTED_COUNTRIES: CountryCode[] = Object.keys(
  COUNTRIES
) as CountryCode[];

export function isValidCountryCode(code?: string | null): code is CountryCode {
  if (!code) return false;
  return Object.prototype.hasOwnProperty.call(COUNTRIES, code.toLowerCase());
}

export function getCountryConfig(code?: string | null): CountryConfig {
  if (code && isValidCountryCode(code)) {
    return COUNTRIES[code.toLowerCase() as CountryCode];
  }
  return COUNTRIES[DEFAULT_COUNTRY];
}
