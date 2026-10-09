import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getTechnologyData, getTechnologySlugs } from "@/lib/technology";

function getAlternates(slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": `https://obrive.in/technology/${slug}`,
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.in/${code}/technology/${slug}`;
  }
  return {
    canonical: `https://obrive.in/technology/${slug}`,
    languages: langs,
  };
}


interface TechnologyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getTechnologySlugs().map((slug: string) => ({ slug }));
}

import { resolveTechnologyMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  return resolveTechnologyMetadata((await props.params).slug);
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { slug } = await params;
  const technologyData = getTechnologyData(slug);

  if (!technologyData) {
    notFound();
    return null;
  }

  return (
    <>
      {/* WebPage Schema Markup mirroring Solutions/Industries pattern */}
      <Script
        id={`${slug}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify([
          {
            "@context": "https://schema.org/",
            "@type": "WebPage",
            "@id": `https://obrive.in/technology/${slug}`,
            url: `https://obrive.in/technology/${slug}`,
            name: technologyData.hero.title,
            description: technologyData.hero.description,
            provider: {
              "@type": "Organization",
              name: "Obrive Industries",
              url: "https://obrive.in",
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
                "item": "https://obrive.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Technology",
                "item": "https://obrive.in/technology"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": technologyData.hero.title,
                "item": `https://obrive.in/technology/${slug}`
              }
            ]
          }
        ])}
      </Script>
      <SolutionTemplate
        slug={slug}
        hero={technologyData.hero}
        keyBenefits={technologyData.keyBenefits}
        howItWorks={technologyData.howItWorks}
        workflowStepsSidebar={technologyData.workflowStepsSidebar}
        sidebarLinks={technologyData.sidebarLinks}
        serviceSections={technologyData.serviceSections}
      />
    </>
  );
}
