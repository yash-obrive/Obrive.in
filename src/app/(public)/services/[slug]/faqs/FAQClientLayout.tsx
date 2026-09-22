"use client";

import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import FAQWorkflowSteps from "@/components/pages/faq/FAQWorkflowSteps";
import FAQAccordionSection, { FAQItem } from "@/components/pages/faq/sections/FAQAccordionSection";

interface FAQ {
  q: string;
  a: string;
}

interface FAQClientLayoutProps {
  solutionName: string;
  faqs: Record<string, FAQ[]>;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function FAQClientLayout({
  solutionName,
  faqs,
}: FAQClientLayoutProps) {
  const categories = Object.keys(faqs);
  const categoryIds = categories.map((cat) => slugify(cat));

  if (categories.length === 0) {
    return (
      <FullWidthSection backgroundColor="accent" className="min-h-screen">
        <div className="pt-20 sm:pt-28 lg:pt-38 pb-16 sm:pb-24 lg:pb-30 flex items-center justify-center">
          <h1 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl`}>
            No FAQs Available
          </h1>
        </div>
      </FullWidthSection>
    );
  }

  return (
    <FullWidthSection backgroundColor="accent" className="min-h-screen">
      <div className="pt-20 sm:pt-28 lg:pt-38 pb-16 sm:pb-24 lg:pb-30">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-13 mb-8 sm:mb-16 lg:mb-20">
          <p
            className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl lg:text-6xl text-secondary leading-tight mb-6 uppercase tracking-widest`}
          >
            {solutionName} FAQs
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
  );
}
