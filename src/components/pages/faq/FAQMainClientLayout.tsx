"use client";

import Script from "next/script";
import FONTS from "@/assets/fonts";
import FAQWorkflowSteps from "@/components/pages/faq/FAQWorkflowSteps";
import FAQAccordionSection, {
  FAQItem,
} from "@/components/pages/faq/sections/FAQAccordionSection";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

interface FAQ {
  q: string;
  a: string;
}

interface FAQMainClientLayoutProps {
  faqs: Record<string, FAQ[]>;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function FAQMainClientLayout({
  faqs,
}: FAQMainClientLayoutProps) {
  const categories = Object.keys(faqs);
  const categoryIds = categories.map((cat) => slugify(cat));

  // Build FAQPage Schema.org structured data
  const mainEntity: any[] = [];
  categories.forEach((cat) => {
    faqs[cat].forEach((item) => {
      mainEntity.push({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      });
    });
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  return (
    <>
      <Script
        id="main-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>

      <FullWidthSection backgroundColor="accent" className="min-h-screen">
        <div className="pt-20 sm:pt-28 lg:pt-38 pb-16 sm:pb-24 lg:pb-30">
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-13 mb-8 sm:mb-16 lg:mb-20">
            <h1
              className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl lg:text-6xl text-secondary leading-tight mb-6 uppercase tracking-widest`}
            >
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              Explore answers to common questions about Obrive&apos;s
              capabilities, digital product development, web design &amp;
              development, AI, AR, VR, MR, 3D design, Spatial Computing,
              pricing, timelines, and collaboration models.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-40 px-4 sm:px-8 lg:px-0">
            {/* Workflow steps sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FAQWorkflowSteps steps={categories} stepIds={categoryIds} />
            </div>

            <div className="flex flex-col flex-1">
              {/* FAQ Accordions */}
              <div className="max-w-none lg:pr-8 xl:pr-16">
                {categories.map((category) => (
                  <div key={category} className="mb-10">
                    <FAQAccordionSection title={category}>
                      {faqs[category].map((faq, index) => (
                        <FAQItem
                          key={index}
                          value={`faq-${slugify(category)}-${index}`}
                          question={faq.q}
                          answer={faq.a.split("\n\n").map((para, i) => (
                            <p key={i} className="mb-4 last:mb-0">
                              {para}
                            </p>
                          ))}
                        />
                      ))}
                    </FAQAccordionSection>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FullWidthSection>
    </>
  );
}
