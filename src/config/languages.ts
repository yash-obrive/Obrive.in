// src/config/languages.ts

export type LanguageCode = 
  | "en" | "hi" | "ar" | "es" | "pt" | "fr" | "de" | "nl" 
  | "sv" | "it" | "zh" | "ja" | "ko" | "ms" | "id" | "th";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  hi: { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  es: { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr" },
  nl: { code: "nl", name: "Dutch", nativeName: "Nederlands", dir: "ltr" },
  sv: { code: "sv", name: "Swedish", nativeName: "Svenska", dir: "ltr" },
  it: { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr" },
  zh: { code: "zh", name: "Chinese (Mandarin)", nativeName: "中文", dir: "ltr" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr" },
  ko: { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr" },
  ms: { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", dir: "ltr" },
  id: { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr" },
  th: { code: "th", name: "Thai", nativeName: "ไทย", dir: "ltr" },
};

export function isValidLanguageCode(code?: string | null): code is LanguageCode {
  if (!code) return false;
  return Object.hasOwn(LANGUAGES, code.toLowerCase());
}

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return LANGUAGES[code];
}
