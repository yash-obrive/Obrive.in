import { headers } from "next/headers";
import type { ReactNode } from "react";
import CookiePopup from "@/components/shared/cookies/cookies";
import PublicLayout from "@/components/shared/layout/PublicLayout";
import {
  type CountryCode,
  DEFAULT_COUNTRY,
  isValidCountryCode,
  getCountryConfig,
} from "@/config/countries";
import { CountryProvider } from "@/context/CountryContext";
import { TranslationProvider } from "@/context/TranslationContext";
import { type LanguageCode } from "@/config/languages";
import { getTranslationStatus } from "@/config/translations";
import { getDictionary } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const countryHeader = headerList.get("x-obrive-country");
  const country: CountryCode = isValidCountryCode(countryHeader)
    ? (countryHeader as CountryCode)
    : DEFAULT_COUNTRY;
  const languageHeader = headerList.get("x-obrive-language");
  const language: LanguageCode = (languageHeader as LanguageCode) || getCountryConfig(country).defaultLanguage;
  const pathname = headerList.get("x-obrive-pathname") || "/";

  let internalRoute = pathname;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2 && isValidCountryCode(segments[0])) {
    internalRoute = "/" + segments.slice(2).join("/");
  }

  const status = getTranslationStatus(country, language, internalRoute);

  if (status === "pending") {
    return {
      robots: { index: false, follow: false },
    };
  }
  return {};
}

export default async function LayoutPublic({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = await headers();
  const countryHeader = headerList.get("x-obrive-country");
  const country: CountryCode = isValidCountryCode(countryHeader)
    ? (countryHeader as CountryCode)
    : DEFAULT_COUNTRY;
  const suggestedCountry = null;

  const languageHeader = headerList.get("x-obrive-language");
  const language: LanguageCode = (languageHeader as LanguageCode) || getCountryConfig(country).defaultLanguage;

  const dictionary = await getDictionary(language);

  return (
    <CountryProvider
      initialCountry={country}
      initialLanguage={language}
      initialSuggestedCountry={suggestedCountry}
    >
      <TranslationProvider dictionary={dictionary}>
        <PublicLayout>{children}</PublicLayout>
        <CookiePopup />
      </TranslationProvider>
    </CountryProvider>
  );
}
