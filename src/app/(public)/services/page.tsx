import type { Metadata } from "next";
import { headers } from "next/headers";
import FONTS from "@/assets/fonts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView, StaggerOnView } from "@/components/shared/motion/GsapMotion";
import { MAIN_SERVICES_HERO, SERVICES_CATEGORIES } from "@/constants/pages/servicesData";
import { DEFAULT_COUNTRY, getCountryConfig, isValidCountryCode, COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const countryCode = headerList.get("x-obrive-country");
  const config = getCountryConfig(
    isValidCountryCode(countryCode) ? countryCode : DEFAULT_COUNTRY,
  );

  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": "https://obrive.com/services",
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.com/${code}/services`;
  }

  return {
    title: `Services & Capabilities (${config.name}) | Obrive Industries`,
    description: `Explore Obrive Industries' core capabilities including Strategy & Consulting, Immersive Technology, 3D Design, AI, Digital Product Development, and more in ${config.name}.`,
    alternates: {
      canonical: "https://obrive.com/services",
      languages: langs,
    },
    openGraph: {
      title: `Services & Capabilities | Obrive Industries`,
      description: `Explore Obrive Industries' core capabilities including Strategy & Consulting, Immersive Technology, 3D Design, AI, Digital Product Development, and more.`,
      type: "website",
      siteName: "Obrive Industries",
    },
  };
}

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <FullWidthSection
        backgroundColor="accent"
        className="py-12 sm:py-20 pt-28 sm:pt-36"
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-balance uppercase`}
          >
            {MAIN_SERVICES_HERO.title}
          </h1>
          <p className="text-primary/80 text-base sm:text-lg max-w-3xl font-normal leading-relaxed text-balance">
            {MAIN_SERVICES_HERO.description}
          </p>
        </div>
      </FullWidthSection>

      {/* 2. CORE CAPABILITIES */}
      <FullWidthSection backgroundColor="none" className="pt-2 pb-24">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
          {SERVICES_CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="pt-10 scroll-mt-32">
              <FadeInOnView>
                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
                  <div className="max-w-2xl">
                    <div className="uppercase text-xs font-semibold tracking-wider text-primary/60 mb-3">
                      {category.category}
                    </div>
                    <h2
                      className={`${FONTS.microgrammaBold.className} text-secondary text-3xl sm:text-4xl m-0 leading-tight`}
                    >
                      {category.heading}
                    </h2>
                  </div>
                  <p className="max-w-[500px] text-primary/70 text-sm sm:text-base m-0 lg:pt-8 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIdx) => {
                    const CardContent = (
                      <div className="group flex flex-col min-h-[180px] h-full p-6 bg-gradient-to-br from-white to-primary/[0.03] border border-primary/10 rounded-[20px] transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                        <div className="text-secondary/50 text-[10px] font-extrabold tracking-[0.15em]">
                          {String(itemIdx + 1).padStart(2, "0")}
                        </div>
                        <h3
                          className={`${FONTS.microgrammaBold.className} text-primary text-base mt-[16px] mb-[8px] group-hover:text-secondary transition-colors`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-primary/70 text-[13px] m-0 mb-auto leading-relaxed">
                          {item.description}
                        </p>
                        {item.href && (
                          <div className="mt-6 flex items-center text-[11px] font-bold text-primary/40 group-hover:text-primary transition-colors uppercase tracking-widest">
                            Learn more <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                          </div>
                        )}
                      </div>
                    );

                    if (item.href) {
                      return (
                        <Link href={item.href} key={itemIdx} className="block h-full">
                          {CardContent}
                        </Link>
                      );
                    }

                    return (
                      <div key={itemIdx} className="h-full">
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              </FadeInOnView>
            </section>
          ))}
        </div>
      </FullWidthSection>
    </div>
  );
}
