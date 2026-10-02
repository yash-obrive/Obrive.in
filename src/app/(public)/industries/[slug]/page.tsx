import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getIndustryData, getIndustrySlugs } from "@/lib/industries";

function getAlternates(slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": `https://obrive.com/industries/${slug}`,
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.com/${code}/industries/${slug}`;
  }
  return {
    canonical: `https://obrive.com/industries/${slug}`,
    languages: langs,
  };
}


interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndustrySlugs().map((slug: string) => ({ slug }));
}

import { resolveIndustryMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  return resolveIndustryMetadata((await props.params).slug);
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industryData = getIndustryData(slug);

  if (!industryData) {
    notFound();
    return null;
  }

  return (
    <>
      {/* WebPage Schema Markup mirroring Solutions pattern */}
      <Script
        id={`${slug}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify([
          {
            "@context": "https://schema.org/",
            "@type": "WebPage",
            "@id": `https://obrive.com/industries/${slug}`,
            url: `https://obrive.com/industries/${slug}`,
            name: industryData.hero.title,
            description: industryData.hero.description,
            provider: {
              "@type": "Organization",
              name: "Obrive Industries",
              url: "https://obrive.com",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://obrive.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Industries",
                "item": "https://obrive.com/industries"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": industryData.hero.title,
                "item": `https://obrive.com/industries/${slug}`
              }
            ]
          }
        ])}
      </Script>
      <SolutionTemplate
        slug={slug}
        hero={industryData.hero}
        keyBenefits={industryData.keyBenefits}
        howItWorks={industryData.howItWorks}
        workflowStepsSidebar={industryData.workflowStepsSidebar}
        sidebarLinks={industryData.sidebarLinks}
        serviceSections={industryData.serviceSections}
        processSteps={industryData.processSteps}
      />
    </>
  );
}
