import Link from "@/components/shared/LocalizedLink";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import PrimaryLogo from "@/components/shared/logo/PrimaryLogo";
import { headers } from "next/headers";
import { CountryProvider } from "@/context/CountryContext";
import { TranslationProvider } from "@/context/TranslationContext";
import { getDictionary } from "@/lib/dictionaries";
import {
  type CountryCode,
  DEFAULT_COUNTRY,
  isValidCountryCode,
  getCountryConfig,
} from "@/config/countries";
import { type LanguageCode } from "@/config/languages";

export default async function CompanyInfoLayout({
  children,
}: {
  children: React.ReactNode;
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
        <div>
      <FullWidthSection backgroundColor="none" className="relative">
        <div className="absolute max-sm:hidden -top-[3.9rem] start-[13.8vw] z-10">
          <Link href="/">
            <PrimaryLogo />
          </Link>
        </div>

        {children}
      </FullWidthSection>
    </div>
    </TranslationProvider>
    </CountryProvider>
  );
}
