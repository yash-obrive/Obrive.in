"use client";

import Image from "next/image";
import FONTS from "@/assets/fonts";
import Link from "@/components/shared/LocalizedLink";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { SOCIAL_LINKS } from "@/constants/Footer";
import { useCountry } from "@/context/CountryContext";
import Translate from "@/components/shared/Translate";
import { useEffect, useState } from "react";

const contactCellBase =
  "border border-primary/30 rounded-lg text-xs text-sm hover:text-white transition-colors duration-500 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary before:scale-y-0 before:origin-center hover:before:scale-y-100 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.19,1,0.22,1)] before:-z-10 z-10";

export default function FooterContact() {
  const { countryConfig } = useCountry();
  const [isExplicitUS, setIsExplicitUS] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/us")) {
      setIsExplicitUS(true);
    }
  }, []);

  const offices = [
    "Bengaluru, Karnataka, India",
    "Mumbai, Maharashtra, India",
    "Ahmedabad, Gujarat, India"
  ];

  return (
    <div className="flex flex-col">
      <Link
        href="/contact"
        className={`border border-primary/40 py-2 px-3 font-semibold text-primary rounded-lg ${FONTS.microgrammaBold.className}`}
      >
         <Translate text="Contact" /> </Link>
      <div className={`${contactCellBase} p-3`} dir="ltr">
        +91-888-477-4300
      </div>
      <a
        href="mailto:info@obrive.in"
        className={`${contactCellBase} p-3`}
        dir="ltr"
      >
        info@obrive.in
      </a>

      {/* Display up to 3 offices */}
      {offices.slice(0, 3).map((office, idx) => (
        <div key={idx} className={`${contactCellBase} p-3`}>
          <Translate text={office} />
        </div>
      ))}

      {/* Fill remaining slots to maintain layout height if there are less than 3 offices */}
      {offices.length < 3 && <div className={`${contactCellBase} p-3`}>&nbsp;</div>}
      {offices.length < 2 && <div className={`${contactCellBase} p-3`}>&nbsp;</div>}
      {offices.length === 0 && <div className={`${contactCellBase} p-3`}>&nbsp;</div>}

      <div className={`${contactCellBase} p-5`}></div>

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
