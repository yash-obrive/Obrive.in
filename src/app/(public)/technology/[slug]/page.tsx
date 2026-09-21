import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { getTechnologyData, getTechnologySlugs } from "@/lib/technology";

interface TechnologyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getTechnologySlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TechnologyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const technologyData = getTechnologyData(slug);

  if (!technologyData) {
    return {
      title: "Technology Not Found",
    };
  }

  const blockedSlugs = new Set([
    "mixed-reality",
    "extended-reality",
    "digital-twins",
    "ai-immersive-technology",
  ]);

  // Returning baseline metadata using the exact pattern established in the Solutions/Industries fallback
  return {
    title: `${technologyData.hero.title} | Obrive`,
    description: technologyData.hero.description,
    ...(blockedSlugs.has(slug) && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
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
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "@id": `https://www.obrive.in/technology/${slug}`,
          url: `https://www.obrive.in/technology/${slug}`,
          name: technologyData.hero.title,
          description: technologyData.hero.description,
        })}
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
