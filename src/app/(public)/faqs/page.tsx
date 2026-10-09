import type { Metadata } from "next";
import FAQMainClientLayout from "@/components/pages/faq/FAQMainClientLayout";
import mainFaqs from "@/data/main-faqs.json";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Obrive",
  description:
    "Explore comprehensive frequently asked questions about Obrive's digital product development, web design, web development, AI, AR, VR, MR, 3D design, Spatial Computing, pricing, timelines, and services.",
  alternates: {
    canonical: "https://obrive.in/faqs",
  },
};

export default function FAQsPage() {
  const flattenedFaqs = Object.values(mainFaqs).flat();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": flattenedFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FAQMainClientLayout faqs={mainFaqs} />
    </>
  );
}
