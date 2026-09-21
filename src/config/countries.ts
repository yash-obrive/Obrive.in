// src/config/countries.ts

export type CountryCode =
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
  region: "India" | "Americas" | "Middle East" | "Europe" | "APAC" | "Africa";
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
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=in",
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
    phone: "+1 (888) 477-4300",
    contactEmail: "us@obrive.com",
    offices: ["New York", "San Francisco", "Chicago", "Seattle", "Austin", "Wilmington"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=us",
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
    phone: "+1 (888) 477-4300",
    contactEmail: "ca@obrive.com",
    offices: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ca",
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
    phone: "+52 55 4160 4300",
    contactEmail: "mx@obrive.com",
    offices: ["Mexico City", "Monterrey", "Guadalajara"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=mx",
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
    phone: "+55 11 3197 4300",
    contactEmail: "br@obrive.com",
    offices: ["São Paulo", "Rio de Janeiro", "Brasília"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=br",
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
    phone: "+971 4 888 4300",
    contactEmail: "uae@obrive.com",
    offices: ["Dubai Internet City", "Abu Dhabi", "Sharjah"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ae",
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
    phone: "+966 11 888 4300",
    contactEmail: "ksa@obrive.com",
    offices: ["Riyadh", "Jeddah", "Dammam", "NEOM"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=sa",
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
    phone: "+974 4488 4300",
    contactEmail: "qatar@obrive.com",
    offices: ["Doha"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=qa",
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
    phone: "+973 1788 4300",
    contactEmail: "bahrain@obrive.com",
    offices: ["Manama"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=bh",
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
    phone: "+44 20 8884 4300",
    contactEmail: "uk@obrive.com",
    offices: ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=uk",
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
    phone: "+49 30 8884 4300",
    contactEmail: "eu@obrive.com",
    offices: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=de",
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
    phone: "+33 1 88 84 43 00",
    contactEmail: "eu@obrive.com",
    offices: ["Paris", "Lyon", "Toulouse", "Marseille"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=fr",
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
    phone: "+31 20 888 4300",
    contactEmail: "eu@obrive.com",
    offices: ["Amsterdam", "Rotterdam", "Eindhoven"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=nl",
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
    phone: "+41 22 888 4300",
    contactEmail: "ch@obrive.com",
    offices: ["Zurich", "Geneva", "Basel"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=ch",
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
    phone: "+46 8 888 4300",
    contactEmail: "eu@obrive.com",
    offices: ["Stockholm", "Gothenburg", "Malmö"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=se",
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
    phone: "+34 91 888 4300",
    contactEmail: "es@obrive.com",
    offices: ["Madrid", "Barcelona", "Valencia"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=es",
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
    phone: "+39 02 8884 4300",
    contactEmail: "it@obrive.com",
    offices: ["Milan", "Rome", "Turin"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=it",
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
    phone: "+65 6888 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Singapore"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=sg",
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
    phone: "+61 2 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=au",
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
    phone: "+64 9 888 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Auckland", "Wellington"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=nz",
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
    phone: "+81 3 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Tokyo", "Osaka", "Nagoya"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=jp",
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
    phone: "+82 2 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Seoul", "Busan"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=kr",
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
    phone: "+60 3 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Kuala Lumpur", "Penang"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=my",
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
    phone: "+62 21 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Jakarta", "Bandung", "Surabaya"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=id",
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
    phone: "+66 2 888 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Bangkok", "Phuket"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=th",
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
    phone: "+27 11 888 4300",
    contactEmail: "za@obrive.com",
    offices: ["Johannesburg", "Cape Town", "Durban"],
    calendlyUrl: "https://calendly.com/obrive-inc/talk-to-ob-experts?country=za",
    hreflang: "en-ZA",
    dir: "ltr",
    isProductionReady: true,
  },
};

export const DEFAULT_COUNTRY: CountryCode = "in";

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
