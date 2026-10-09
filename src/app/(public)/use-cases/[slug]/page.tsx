import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getUseCaseData, getUseCaseSlugs } from "@/lib/use-cases";

function getAlternates(slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": `https://obrive.in/use-cases/${slug}`,
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.in/${code}/use-cases/${slug}`;
  }
  return {
    canonical: `https://obrive.in/use-cases/${slug}`,
    languages: langs,
  };
}


interface UseCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getUseCaseSlugs().map((slug: string) => ({ slug }));
}

import { resolveUseCaseMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  return resolveUseCaseMetadata((await props.params).slug);
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const useCaseData = getUseCaseData(slug);

  if (!useCaseData) {
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
            "@id": `https://obrive.in/use-cases/${slug}`,
            url: `https://obrive.in/use-cases/${slug}`,
            name: useCaseData.hero.title,
            description: useCaseData.hero.description,
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
                "name": "Use Cases",
                "item": "https://obrive.in/use-cases"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": useCaseData.hero.title,
                "item": `https://obrive.in/use-cases/${slug}`
              }
            ]
          }
        ])}
      </Script>
      <SolutionTemplate
        slug={slug}
        hero={useCaseData.hero}
        keyBenefits={useCaseData.keyBenefits}
        howItWorks={useCaseData.howItWorks}
        workflowStepsSidebar={useCaseData.workflowStepsSidebar}
        sidebarLinks={useCaseData.sidebarLinks}
        serviceSections={useCaseData.serviceSections}
        processSteps={useCaseData.processSteps}
      />
    </>
  );
}
