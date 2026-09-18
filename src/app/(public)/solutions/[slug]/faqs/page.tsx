import { notFound } from "next/navigation";
import { getSolutionData, getSolutionSlugs } from "@/lib/solutions";
import FAQClientLayout from "./FAQClientLayout";

interface FAQPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData) {
    return { title: "Solution Not Found" };
  }

  return {
    title: `${solutionData.hero.title} FAQs | Obrive`,
    description: `Frequently asked questions about Obrive's ${solutionData.hero.title}.`,
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData || !solutionData.faqs) {
    notFound();
  }

  return (
    <FAQClientLayout
      solutionName={solutionData.hero.title}
      faqs={solutionData.faqs}
    />
  );
}
