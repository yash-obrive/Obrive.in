import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import CaseStudyList from "@/components/pages/case-studies/CaseStudyList";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

export const metadata: Metadata = {
  title: "Case Studies & Work | Obrive",
  description:
    "Explore our latest case studies and see how Obrive helps enterprises transform their businesses with AR, VR, and Spatial Computing.",
  alternates: {
    canonical: "https://obrive.com/case-studies",
  },
  openGraph: {
    title: "Case Studies & Work | Obrive",
    description:
      "Explore our latest case studies and see how Obrive helps enterprises transform their businesses with AR, VR, and Spatial Computing.",
    url: "https://obrive.com/case-studies",
  },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  // Structured Data for Case Studies Collection
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Obrive Case Studies",
    headline: "Case Studies & Work | Obrive",
    description: "Explore our latest case studies and see how Obrive helps enterprises transform their businesses with AR, VR, and Spatial Computing.",
    url: "https://obrive.com/case-studies",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((cs, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://obrive.com/case-studies/${cs.slug}`,
        name: cs.title,
        description: cs.overview,
      })),
    },
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      
      {/* Hero Section */}
      <FullWidthSection backgroundColor="accent" className="py-20 pt-32">
        <div className="text-center flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
          <div className="text-secondary text-xs font-bold tracking-[0.14em] uppercase mb-4">
            Our Work
          </div>
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl break-words text-balance`}
          >
            Real Business Impact Through Immersive Technology
          </h1>
          <p className="text-base sm:text-lg text-center max-w-2xl px-4 font-medium text-secondary/80">
            See how enterprise leaders use AR, VR, and Spatial Computing to solve complex challenges, drive efficiency, and create new growth opportunities.
          </p>
        </div>
      </FullWidthSection>

      {/* Case Studies List component handles filtering and grid display */}
      <CaseStudyList caseStudies={caseStudies} />
    </main>
  );
}
