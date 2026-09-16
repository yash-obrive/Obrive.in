"use client";

import React from "react";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import FAQAccordionSection from "@/components/pages/faq/sections/FAQAccordionSection";
import FAQWorkflowSteps from "@/components/pages/faq/FAQWorkflowSteps";
import FONTS from "@/assets/fonts";
import { SolutionFAQCategory } from "@/lib/solutions";

interface SolutionFAQSectionProps {
  title?: string;
  description?: string;
  categories: readonly SolutionFAQCategory[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function SolutionFAQSection({
  title = "Frequently Asked Questions",
  description,
  categories,
}: SolutionFAQSectionProps) {
  if (!categories || categories.length === 0) return null;

  const categoryTitles = categories.map((cat) => cat.title);
  const categoryStepIds = categories.map((cat) => slugify(cat.title));

  return (
    <FullWidthSection
      backgroundColor="accent"
      className="min-h-screen"
    >
      <div id="faqs" className="pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-30">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-13 mb-8 sm:mb-16 lg:mb-20">
          <h2
            className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl lg:text-6xl text-secondary leading-tight ${
              description ? "mb-6" : ""
            }`}
          >
            {title}
          </h2>

          {description && (
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-40 px-4 sm:px-8 lg:px-0">
          {/* Categories Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FAQWorkflowSteps
              steps={categoryTitles}
              stepIds={categoryStepIds}
            />
          </div>

          {/* Accordion Categories */}
          <div className="flex flex-col flex-1">
            <div className="max-w-none lg:pr-8 xl:pr-16">
              {categories.map((category) => (
                <FAQAccordionSection
                  key={category.title}
                  title={category.title}
                  items={category.items}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
}
