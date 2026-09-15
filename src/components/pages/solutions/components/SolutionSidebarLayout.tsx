"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FONTS from "@/assets/fonts";
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
      <div className="flex items-start gap-10 my-20 max-xl:gap-8 max-lg:flex-col max-lg:items-stretch max-lg:gap-12 max-md:my-14 max-sm:my-10">
        {/* Sticky Sidebar */}
        <div className="sticky top-20 self-start max-lg:hidden">
          <div className="w-56">
            <p className="text-xs py-4 px-2 text-zinc-500">{serviceLabel}</p>
            {sidebarLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left flex items-center gap-3 py-4 cursor-pointer transition-colors text-xs leading-5 ${FONTS.microgrammaBold.className} text-black border-zinc-300
                  ${index === 0 ? "border-y" : "border-b"}
                  ${activeId === link.id ? "opacity-100" : "hover:bg-zinc-50"}
                `}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                const element = document.getElementById("our-process");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`w-full text-left flex items-center gap-3 py-4 cursor-pointer transition-colors text-xs leading-5 border-b border-zinc-300 hover:bg-zinc-50 ${FONTS.microgrammaBold.className} text-black`}
            >
              Our Process
            </button>
            <Link
              href={`/solutions/${slug}/industries`}
              className={`w-full text-left flex items-center gap-3 py-4 cursor-pointer transition-colors text-xs leading-5 border-b border-zinc-300 hover:bg-zinc-50 ${FONTS.microgrammaBold.className} text-black`}
            >
              Industries We Serve
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-16 flex-1 max-xl:gap-14 max-md:gap-12">
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
