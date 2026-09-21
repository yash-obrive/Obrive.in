import Image from "next/image";
import FONTS from "@/assets/fonts";
import { CaseStudy } from "@/lib/case-studies";
import ResourceTemplate from "@/components/pages/resources/ResourceTemplate";
import type { CaseStudyMetadata } from "@/lib/mdx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const metadata: CaseStudyMetadata = {
    title: caseStudy.title,
    date: "25.07.2025",
    quote: caseStudy.testimonial?.quote || caseStudy.outcome_snapshot,
    author: caseStudy.testimonial?.author || caseStudy.client,
    postType: "CASE STUDY",
    heroImage: caseStudy.image ? `/images/case-studies/${caseStudy.image}` : "HERO_IMAGE_ONE",
    avatar: "AVATAR_ONE",
    workflowSteps: caseStudy.approach?.map((step) => step.title),
  };

  return (
    <ResourceTemplate metadata={metadata} slug={caseStudy.slug}>
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        
        <div>
          <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Overview</h2>
          <p className="text-secondary/80 leading-relaxed text-sm sm:text-base lg:text-lg">{caseStudy.overview}</p>
        </div>

        {caseStudy.challenge && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>The Challenge</h2>
            <p className="text-secondary/80 leading-relaxed text-sm sm:text-base lg:text-lg">{caseStudy.challenge}</p>
          </div>
        )}

        {caseStudy.architecture && caseStudy.architecture.length > 0 && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Solution Architecture</h2>
            <ul className="list-disc pl-5 space-y-3">
              {caseStudy.architecture.map((arch, idx) => (
                <li key={idx} className="text-secondary/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                  <strong className="text-secondary font-bold">{arch.layer}:</strong> {arch.delivery} - {arch.purpose}
                </li>
              ))}
            </ul>
          </div>
        )}

        {caseStudy.deliverables && caseStudy.deliverables.length > 0 && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Deliverables</h2>
            <ul className="list-disc pl-5 space-y-2">
              {caseStudy.deliverables.map((item, idx) => (
                <li key={idx} className="text-secondary/80 leading-relaxed text-sm sm:text-base lg:text-lg">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {caseStudy.techStack && caseStudy.techStack.length > 0 && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.flatMap(stack => stack.split(", ")).map((tech, idx) => (
                <span key={idx} className="bg-primary/5 border-[0.5px] border-primary/20 px-4 py-2 rounded-full text-xs font-medium text-primary">
                  {tech.replace(".", "")}
                </span>
              ))}
            </div>
          </div>
        )}

        {caseStudy.impacts && caseStudy.impacts.length > 0 && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Impact & Outcomes</h2>
            <ul className="list-disc pl-5 space-y-4">
              {caseStudy.impacts.map((impact, idx) => (
                <li key={idx} className="text-secondary/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                  <strong className="text-secondary font-bold">{impact.metric} {impact.label}:</strong> {impact.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {caseStudy.faqs && caseStudy.faqs.length > 0 && (
          <div>
            <h2 className={`${FONTS.microgrammaBold.className} text-xl md:text-2xl text-secondary mb-4 uppercase tracking-widest`}>Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {caseStudy.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className={`${FONTS.microgrammaBold.className} text-left text-primary text-base md:text-lg hover:no-underline py-4`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary/80 text-base leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </ResourceTemplate>
  );
}
