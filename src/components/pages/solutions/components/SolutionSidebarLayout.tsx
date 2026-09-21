"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/shared/LocalizedLink";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import type {
  ServiceSection,
  SidebarLink,
  WorkflowStep,
} from "@/types/solutions";
import SolutionProcessSteps from "./SolutionProcessSteps";
import SolutionServiceSection from "./SolutionServiceSection";

interface SolutionSidebarLayoutProps {
  slug: string;
  sidebarLinks: SidebarLink[];
  serviceSections: ServiceSection[];
  processSteps: WorkflowStep[];
  serviceLabel?: string;
}

const SolutionSidebarLayout = ({
  slug,
  sidebarLinks,
  serviceSections,
  processSteps,
  serviceLabel = "Our Services",
}: SolutionSidebarLayoutProps) => {
  const [activeId, setActiveId] = useState<string>(sidebarLinks[0]?.id || "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection observer — highlight active sidebar link on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const sectionsToObserve = [...serviceSections.map(s => s.id)];

    sectionsToObserve.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [serviceSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      {/* ── Sidebar + Content ────────────────────────────────────────────── */}
      <div className="flex items-start gap-12 lg:gap-24 xl:gap-32 my-20 max-xl:gap-16 max-lg:flex-col max-lg:items-stretch max-md:my-14 max-sm:my-10">
        {/* Sticky Sidebar */}
        <div className="sticky top-20 self-start max-lg:hidden flex-shrink-0">
          <div className="w-sm">
            <p className="text-xs py-4 px-2">{serviceLabel}</p>
            {sidebarLinks.map((link, index) => (
              <div
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-3 py-4 px-2 cursor-pointer hover:bg-primary/10 transition-colors text-xs
                  ${index === 0 ? "border-y" : "border-b"} border-primary/80
                  ${activeId === link.id ? "text-primary font-semibold" : ""}
                `}
              >
                <span>{link.label}</span>
              </div>
            ))}
            <div
              onClick={() => {
                const element = document.getElementById("our-process");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 py-4 px-2 cursor-pointer hover:bg-primary/10 transition-colors text-xs border-b border-primary/80"
            >
              <span>Our Process</span>
            </div>
            <Link
              href={`/solutions/${slug}/industries`}
              className="flex items-center gap-3 py-4 px-2 cursor-pointer hover:bg-primary/10 transition-colors text-xs border-b border-primary/80"
            >
              Industries We Serve
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-32 md:gap-48 lg:gap-64 flex-1">
          {serviceSections.map((section) => (
            <FadeInOnView key={section.id}>
              <div
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
              >
                <SolutionServiceSection {...section} />
              </div>
            </FadeInOnView>
          ))}
          
        </div>
      </div>

      {/* ── Full-Width Process Steps (breaks out of container padding) ───── */}
      <FadeInOnView>
        <div className="-mx-4 sm:-mx-6 md:-mx-10 lg:-mx-20">
          <SolutionProcessSteps steps={processSteps} />
        </div>
      </FadeInOnView>
    </div>
  );
};

export default SolutionSidebarLayout;
