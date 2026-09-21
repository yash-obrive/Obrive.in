"use client";

import Image from "next/image";
import { useRef } from "react";
import FONTS from "@/assets/fonts";
import { IMAGES, IMAGES_META } from "@/assets/images";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import BenefitsTable from "../cards/BenefitsTable";
import WorkflowSteps from "../cards/WorkflowSteps";
import type { SidebarLink, ServiceSection } from "@/types/solutions";
import SolutionServiceSection from "./SolutionServiceSection";

interface WorkflowSectionProps {
  howItWorks?: readonly any[];
  workflowStepsSidebar?: readonly string[];
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
}

const WorkflowSection = ({
  howItWorks,
  workflowStepsSidebar,
  sidebarLinks,
  serviceSections,
}: WorkflowSectionProps) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToStep = (stepIndex: number) => {
    const targetElement = stepRefs.current[stepIndex];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex items-start my-20 justify-between gap-12 lg:gap-24 xl:gap-32 max-xl:gap-16 max-lg:flex-col max-lg:items-stretch max-lg:justify-start max-md:my-14 max-sm:my-10">
      <div className="sticky top-20 self-start max-md:hidden flex-shrink-0">
        <div className="w-sm">
          <p className="text-xs py-4 px-2">Workflow Steps</p>
          {(workflowStepsSidebar || []).map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-3 py-4 px-2 cursor-pointer hover:bg-primary/10 transition-colors ${
                index === 0 ? "border-y" : "border-b"
              } border-primary/80`}
              onClick={() => scrollToStep(index)}
            >
              <span className="text-xs">{step}</span>
            </div>
          ))}

          {sidebarLinks && sidebarLinks.length > 0 && (
            <div className="mt-8">
              <p className="text-xs py-4 px-2 text-zinc-500">More Details</p>
              {sidebarLinks.map((link, index) => (
                <div
                  key={link.id}
                  className={`flex items-center gap-3 py-4 px-2 cursor-pointer hover:bg-primary/10 transition-colors ${
                    index === 0 ? "border-y" : "border-b"
                  } border-primary/80`}
                  onClick={() => scrollToStep((howItWorks?.length || 0) + index)}
                >
                  <span className="text-xs">{link.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-16 md:gap-24 lg:gap-32 flex-1 max-lg:gap-12 max-md:gap-10">
        {howItWorks?.map((item, index) => (
          <FadeInOnView key={item.title}>
            <div
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
            >
              <WorkflowSteps {...item} />
            </div>
          </FadeInOnView>
        ))}
        {serviceSections?.map((section, index) => (
          <FadeInOnView key={section.id}>
            <div
              ref={(el) => {
                stepRefs.current[(howItWorks?.length || 0) + index] = el;
              }}
            >
              <SolutionServiceSection {...section} />
            </div>
          </FadeInOnView>
        ))}

        {(!serviceSections || serviceSections.length === 0) && (
          <FadeInOnView>
            <div className="bg-accent flex items-center justify-center px-14 py-8 border border-primary/80 rounded-xl max-xl:px-12 max-lg:px-10 max-md:px-8 max-sm:px-5 max-sm:py-6">
            <div className="flex flex-col gap-6 max-md:gap-5 max-sm:gap-4 w-full max-w-[720px]">
              <h1
                className={`${FONTS.microgrammaBold.className} text-primary text-5xl max-xl:text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl`}
              >
                Why Choose Obrive
              </h1>

              <Image
                src={IMAGES.SOLUTION_FIRST_IMAGE}
                alt={IMAGES_META.SOLUTION_FIRST_IMAGE.alt}
                width={IMAGES_META.SOLUTION_FIRST_IMAGE.width}
                height={IMAGES_META.SOLUTION_FIRST_IMAGE.height}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 560px"
              />

              <div className="overflow-x-auto">
                <BenefitsTable />
              </div>
            </div>
          </div>
        </FadeInOnView>
        )}
      </div>
    </div>
  );
};

export default WorkflowSection;
