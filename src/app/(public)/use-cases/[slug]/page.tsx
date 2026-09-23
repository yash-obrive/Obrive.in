import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SolutionTemplate } from "@/components/pages/services/SolutionTemplate";
import { getUseCaseData, getUseCaseSlugs } from "@/lib/use-cases";

interface UseCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getUseCaseSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCaseData = getUseCaseData(slug);

  if (!useCaseData) {
    return {
      title: "Use Case Not Found",
    };
  }

  return {
    title: `${useCaseData.hero.title} | Obrive`,
    description: useCaseData.hero.description,
  };
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
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "@id": `https://www.obrive.in/use-cases/${slug}`,
          url: `https://www.obrive.in/use-cases/${slug}`,
          name: useCaseData.hero.title,
          description: useCaseData.hero.description,
        })}
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
