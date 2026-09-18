import DOMPurify from "dompurify";
import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQAccordionSectionProps {
  title?: string;
  children: React.ReactNode;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function FAQAccordionSection({
  title,
  children,
}: FAQAccordionSectionProps) {
  return (
    <section className="mb-6" id={title ? slugify(title) : undefined}>
      {title && <p className="text-base mb-4 text-gray-700">{title}</p>}

      <div className="border border-zinc-800 rounded-xl overflow-hidden">
        <Accordion type="single" collapsible className="space-y-0">
          {children}
        </Accordion>
      </div>
    </section>
  );
}

interface FAQItemProps {
  question?: string;
  q?: string;
  answer?: string | React.ReactNode;
  children?: React.ReactNode;
  value?: string;
}

export function FAQItem({ question, q, answer, children, value }: FAQItemProps) {
  const actualQuestion = question || q || "";
  const sanitizeHTML = (html: string): string => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html;
  };

  const itemValue = value || `faq-${slugify(actualQuestion).substring(0, 20)}`;
  const content = children || answer;

  return (
    <AccordionItem value={itemValue} className="bg-white">
      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
        <span className="text-sm pr-4 text-secondary">{actualQuestion}</span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-4">
        <div className="text-sm leading-relaxed text-gray-700">
          {typeof content === "string" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(content),
              }}
            />
          ) : (
            <div className="[&>ul]:list-disc [&>ul]:list-outside [&>ul]:pl-8 [&>ul]:space-y-2">
              {content}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
