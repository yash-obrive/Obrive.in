"use client";

import Image from "next/image";
import FONTS from "@/assets/fonts";
import Link from "@/components/shared/LocalizedLink";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/config/countries";
import { SOCIAL_LINKS } from "@/constants/Footer";
import { useCountry } from "@/context/CountryContext";

const contactCellBase =
  "relative overflow-hidden border border-primary/30 rounded-lg text-xs text-primary/80 transition-colors duration-500 hover:text-white before:content-[''] before:absolute before:inset-0 before:bg-primary before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.19,1,0.22,1)] before:-z-10 z-10";

export default function FooterContact() {
  const { countryConfig: _ } = useCountry();
  const defaultCountryConfig = COUNTRIES[DEFAULT_COUNTRY];
  const offices = defaultCountryConfig.offices || [];

  return (
    <div className="flex flex-col">
      <Link
        href="/contact"
        className={`border border-primary/40 py-2 px-3 font-semibold text-primary rounded-lg ${FONTS.microgrammaBold.className} hover:bg-primary/5 transition-colors duration-200 block text-center`}
      >
        Contact
      </Link>
      <div className={`${contactCellBase} p-3`}>
        {defaultCountryConfig.phone}
      </div>
      <a
        href={`mailto:${defaultCountryConfig.contactEmail}`}
        className={`${contactCellBase} p-3`}
      >
        {defaultCountryConfig.contactEmail}
      </a>

      {/* Display up to 2 offices */}
      {offices.slice(0, 2).map((office, idx) => (
        <div key={idx} className={`${contactCellBase} p-3`}>
          {office}, {defaultCountryConfig.name}
        </div>
      ))}

      {/* Fill remaining slots to maintain layout height if there are less than 2 offices */}
      {offices.length < 2 && <div className={`${contactCellBase} p-3`}></div>}
      {offices.length === 0 && <div className={`${contactCellBase} p-3`}></div>}

      <div className={`${contactCellBase} p-5`}></div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href="/client-login"
            className={`${contactCellBase} py-3 px-6 uppercase tracking-wide text-xs`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Log In
          </Link>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          align="start"
          sideOffset={12}
          className="bg-primary text-white border-none rounded-2xl p-4 w-[220px] shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="/client-login"
              className="uppercase text-xs tracking-wide hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client Login
            </Link>
            <Link
              href="/employee-login"
              className="uppercase text-xs tracking-wide hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Employee Login
            </Link>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="border border-primary/30 flex items-center gap-2 justify-between rounded-lg py-3 px-6 text-xs text-primary/80">
        {SOCIAL_LINKS.map(({ href, icon, meta }) => (
          <Link
            key={meta.alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={icon}
              alt={meta.alt}
              width={meta.width}
              height={meta.height}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
