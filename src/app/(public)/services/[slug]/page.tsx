import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getSolutionData, getSolutionSlugs } from "@/lib/services";

function getAlternates(slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady
  );
  const langs: Record<string, string> = {
    "x-default": `https://obrive.com/services/${slug}`,
  };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.com/${code}/services/${slug}`;
  }
  return {
    canonical: `https://obrive.com/services/${slug}`,
    languages: langs,
  };
}


interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getSolutionSlugs().map((slug: string) => ({ slug }));
}

import { resolveServiceMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  return resolveServiceMetadata((await props.params).slug);
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData) {
    notFound();
  }

  return (
    <>
      {/* WebPage Schema Markup - No duplicate GTM since it's in root layout */}
      <Script
        id={`${slug}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify([
          {
            "@context": "https://schema.org/",
            "@type": "Service",
            "@id": `https://obrive.com/services/${slug}`,
            url: `https://obrive.com/services/${slug}`,
            name: (() => {
              switch (slug) {
                case "augmented-reality-development":
                  return "Augmented Reality Development Across Industries";
                case "virtual-reality-development":
                  return "Virtual Reality Development Across Industries";
                case "3d-design-development":
                  return "3D Design & Development Across Industries";
                case "spatial-computing-app-development":
                  return "Spatial Computing App Development Across Industries";
                default:
                  return solutionData.hero.title;
              }
            })(),
            description: solutionData.hero.description,
            provider: {
              "@type": "Organization",
              name: "Obrive Industries",
              url: "https://obrive.com",
            },
            serviceType: "Software Development",
            areaServed: "Worldwide",
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
                "name": "Services",
                "item": "https://obrive.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": solutionData.hero.title,
                "item": `https://obrive.com/services/${slug}`
              }
            ]
          }
        ])}
      </Script>
      <SolutionTemplate
        slug={slug}
        hero={solutionData.hero}
        keyBenefits={solutionData.keyBenefits}
        howItWorks={solutionData.howItWorks}
        workflowStepsSidebar={solutionData.workflowStepsSidebar}
        sidebarLinks={solutionData.sidebarLinks}
        serviceSections={solutionData.serviceSections}
        processSteps={solutionData.processSteps}
      />
    </>
  );
}
