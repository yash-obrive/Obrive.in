// src/config/languages.ts

export type LanguageCode = 
  | "en" | "ar" | "es" | "pt" | "fr" | "de" | "nl" 
  | "sv" | "it" | "zh" | "ja" | "ko" | "ms" | "id" | "th" | "ru"
  | "mr" | "hi" | "kn" | "ta" | "te" | "bn" | "gu" | "pa" | "ml" | "or" | "as";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  ar: { code: "ar", name: "Arabic", nativeName: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", dir: "rtl" },
  es: { code: "es", name: "Spanish", nativeName: "Espa\u00f1ol", dir: "ltr" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Portugu\u00eas", dir: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Fran\u00e7ais", dir: "ltr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr" },
  nl: { code: "nl", name: "Dutch", nativeName: "Nederlands", dir: "ltr" },
  sv: { code: "sv", name: "Swedish", nativeName: "Svenska", dir: "ltr" },
  it: { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr" },
  zh: { code: "zh", name: "Chinese (Mandarin)", nativeName: "\u4e2d\u6587", dir: "ltr" },
  ja: { code: "ja", name: "Japanese", nativeName: "\u65e5\u672c\u8a9e", dir: "ltr" },
  ko: { code: "ko", name: "Korean", nativeName: "\ud55c\uad6d\uc5b4", dir: "ltr" },
  ms: { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", dir: "ltr" },
  id: { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr" },
  th: { code: "th", name: "Thai", nativeName: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22", dir: "ltr" },
  ru: { code: "ru", name: "Russian", nativeName: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", dir: "ltr" },
  // Indian regional languages
  mr: { code: "mr", name: "Marathi", nativeName: "\u092e\u0930\u093e\u0920\u0940", dir: "ltr" },
  hi: { code: "hi", name: "Hindi", nativeName: "\u0939\u093f\u0928\u094d\u0926\u0940", dir: "ltr" },
  kn: { code: "kn", name: "Kannada", nativeName: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1", dir: "ltr" },
  ta: { code: "ta", name: "Tamil", nativeName: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd", dir: "ltr" },
  te: { code: "te", name: "Telugu", nativeName: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", dir: "ltr" },
  bn: { code: "bn", name: "Bengali", nativeName: "\u09ac\u09be\u0982\u09b2\u09be", dir: "ltr" },
  gu: { code: "gu", name: "Gujarati", nativeName: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0", dir: "ltr" },
  pa: { code: "pa", name: "Punjabi", nativeName: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40", dir: "ltr" },
  ml: { code: "ml", name: "Malayalam", nativeName: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02", dir: "ltr" },
  or: { code: "or", name: "Odia", nativeName: "\u0b13\u0b21\u0b3c\u0b3f\u0b06", dir: "ltr" },
  as: { code: "as", name: "Assamese", nativeName: "\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be", dir: "ltr" },
};

export function isValidLanguageCode(code?: string | null): code is LanguageCode {
  if (!code) return false;
  return Object.hasOwn(LANGUAGES, code.toLowerCase());
}

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return LANGUAGES[code];
}
