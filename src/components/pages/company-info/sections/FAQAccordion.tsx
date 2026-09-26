"use client";

import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQAccordionProps {
  children: React.ReactNode;
}

export function FAQAccordion({ children }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4 mt-6">
      {children}
    </Accordion>
  );
}

interface FAQItemProps {
  q: string;
  children: React.ReactNode;
  value?: string;
}

export function FAQItem({ q, children, value }: FAQItemProps) {
  // Use a random value if none is provided so AccordionItem works
  const itemValue = value || `faq-${Math.random().toString(36).substring(7)}`;
  return (
    <AccordionItem
      value={itemValue}
      className="bg-white rounded-lg px-6 border border-gray-200 data-[state=open]:shadow-sm transition-all duration-300"
    >
      <AccordionTrigger className="text-left text-base md:text-lg font-medium text-[#073933] hover:no-underline py-5">
        {q}
      </AccordionTrigger>
      <AccordionContent className="text-[#073933]/80 text-sm md:text-base leading-relaxed pb-6">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
