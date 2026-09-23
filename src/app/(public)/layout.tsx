import { headers } from "next/headers";
import type { ReactNode } from "react";
import CookiePopup from "@/components/shared/cookies/cookies";
import CountrySwitcherBanner from "@/components/shared/layout/CountrySwitcherBanner";
import PublicLayout from "@/components/shared/layout/PublicLayout";
import {
  type CountryCode,
  DEFAULT_COUNTRY,
  isValidCountryCode,
} from "@/config/countries";
import { CountryProvider } from "@/context/CountryContext";

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
  const suggestedCountry =
    (headerList.get("x-obrive-suggested-country") as CountryCode) || null;

  return (
    <CountryProvider
      initialCountry={country}
      initialSuggestedCountry={suggestedCountry}
    >
      <CountrySwitcherBanner />
      <PublicLayout>{children}</PublicLayout>
      <CookiePopup />
    </CountryProvider>
  );
}
