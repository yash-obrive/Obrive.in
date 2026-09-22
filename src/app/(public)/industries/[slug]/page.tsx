import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { getIndustryData, getIndustrySlugs } from "@/lib/industries";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndustrySlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industryData = getIndustryData(slug);

  if (!industryData) {
    return {
      title: "Industry Not Found",
    };
  }

  const blockedSlugs = new Set([
    "retail",
    "healthcare",
    "manufacturing",
    "architecture-engineering",
    "education",
    "enterprise",
  ]);

  // Returning baseline metadata using the exact pattern established in the Solutions fallback
  return {
    title: `${industryData.hero.title} | Obrive`,
    description: industryData.hero.description,
    ...(blockedSlugs.has(slug) && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
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
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "@id": `https://www.obrive.in/industries/${slug}`,
          url: `https://www.obrive.in/industries/${slug}`,
          name: industryData.hero.title,
          description: industryData.hero.description,
          provider: {
            "@type": "Organization",
            name: "Obrive",
            url: "https://obrive.com",
          },
        })}
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
