"use client";

import Image from "next/image";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { InfiniteHorizontalScroll } from "@/components/shared/layout/InfiniteHorizontalScroll";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import { Button } from "@/components/ui/button";
import ResourceWorkflowSteps from "@/components/pages/resources/ResourceWorkflowSteps";
import {
  WHITE_LABEL_HERO,
  WHITE_LABEL_SERVICE_SECTIONS,
  WHITE_LABEL_PROCESS_STEPS,
  WHITE_LABEL_SIDEBAR_LINKS,
} from "@/constants/pages/services/white-label-partnerships";

export default function PartnersPage() {
  const capabilities = WHITE_LABEL_SERVICE_SECTIONS.find(s => s.id === "our-capabilities");
  const partnershipModels = WHITE_LABEL_SERVICE_SECTIONS.find(s => s.id === "partnership-models");
  const commercialStructure = WHITE_LABEL_SERVICE_SECTIONS.find(s => s.id === "commercial-structure");

  const partnerCards = [
    { eyebrow: "AGENCIES", title: "Expand your service portfolio", description: "Offer advanced technology without building a large specialist team." },
    { eyebrow: "CONSULTANTS", title: "Turn strategy into delivery", description: "Bring your transformation recommendations to life with an experienced technology layer." },
    { eyebrow: "TECH COMPANIES", title: "Add specialist capabilities", description: "Fill delivery gaps across AI, 3D, immersive technology and product engineering." },
    { eyebrow: "BUSINESSES", title: "Extend your internal team", description: "Access dedicated capabilities for projects that require specialist execution." },
  ];

  const whyObrive = [
    { num: "01", title: "Brand stays yours", description: "Position the delivery under your own brand and maintain the client relationship." },
    { num: "02", title: "Specialist talent", description: "Access cross-functional specialists without hiring every capability internally." },
    { num: "03", title: "Flexible capacity", description: "Scale delivery based on project requirements rather than fixed internal headcount." },
    { num: "04", title: "One delivery layer", description: "Coordinate complex technology work through one partner across design and engineering." },
  ];

  const marqueeItems = [
    "WHITE-LABEL DEVELOPMENT", "AR / VR / MR", "3D", "AI",
    "SPATIAL COMPUTING", "WEB & MOBILE", "SAAS", "PRODUCT ENGINEERING",
  ];

  const formatTitle = (title: string) => {
    if (!title) return "";
    return title.split(" ").map(word => {
      if (["AR/VR", "3D", "AI"].includes(word)) return word;
      if (word.includes("-")) {
        return word.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
  };

  return (
    <div className="flex flex-col w-full bg-white text-zinc-900">
      
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section>
        <FullWidthSection
          backgroundColor="accent"
          className="pt-20 sm:pt-28 lg:pt-38 pb-16 sm:pb-24 lg:pb-30"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 px-4 sm:px-8 lg:px-13 items-start justify-between">
            <div className="relative flex flex-col gap-4 w-full lg:min-w-[400px] lg:max-w-[500px]">
              <div className="w-full max-sm:w-[300px] max-sm:h-[300px] h-64 sm:h-80 lg:h-90 rounded-2xl overflow-hidden relative">
                <Image
                  src={WHITE_LABEL_HERO.backgroundImage}
                  alt="Obrive White Label Partnerships"
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6 w-full lg:relative lg:top-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Button
                  className="text-[10px] rounded-full w-fit"
                  variant="outline"
                  size="sm"
                >
                  WHITE-LABEL TECHNOLOGY PARTNERSHIPS
                </Button>
                <span className="text-slate-700 text-xs font-medium">
                  ALWAYS AVAILABLE
                </span>
              </div>

              <h1
                className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-secondary leading-tight`}
              >
                {WHITE_LABEL_HERO.title}
              </h1>

              <blockquote className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                {WHITE_LABEL_HERO.description}
              </blockquote>
              <blockquote className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                {WHITE_LABEL_HERO.description2}
              </blockquote>

              <div className="flex sm:flex-row gap-4 sm:gap-6 items-center pt-2 sm:pt-4">
                <AnimatedButton
                  className="text-xs uppercase"
                  size="lg"
                  href="/contact"
                  aria-label="become a partner"
                  iconSize={16}
                >
                  {WHITE_LABEL_HERO.ctaButtons.primary}
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  href="/services"
                  className="uppercase text-xs border-primary/20 text-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  iconSize={16}
                  arrowColor="primary"
                >
                  {WHITE_LABEL_HERO.ctaButtons.secondary}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </FullWidthSection>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-6 border-y border-black/15 bg-white">
        <InfiniteHorizontalScroll
          speed={30}
          gap={40}
          pauseOnHover={true}
          showNavigation={false}
          itemClassName="flex items-center"
        >
          {marqueeItems.map((item) => (
            <span
              key={item}
              className={`${FONTS.microgrammaBold.className} text-xs tracking-[0.2em] uppercase text-primary/50 whitespace-nowrap px-8 hover:text-primary transition-colors duration-300 cursor-default`}
            >
              {item}
            </span>
          ))}
        </InfiniteHorizontalScroll>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <FullWidthSection backgroundColor="none">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-40 my-8 sm:my-16 lg:my-20 px-4 sm:px-8 lg:px-0">
          
          {/* Workflow Steps Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ResourceWorkflowSteps steps={[
              "The Opportunity",
              "Capabilities",
              "Partnership Models",
              "Process",
              "Why Obrive",
              "Commercial Structure"
            ]} />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 flex-1">
            <div
              className="max-w-none lg:pr-8 xl:pr-16 flex flex-col gap-4 sm:gap-6 lg:gap-8"
              data-resource-content
            >
              {/* ── 01 / THE OPPORTUNITY ────────────────────────────── */}
              <section className="mb-4" id="the-opportunity">
                <h2 className="sr-only">
                  The Opportunity
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  Sell the solution. We build the technology.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700">
                  <p>
                    Your clients increasingly expect AI, immersive experiences, 3D, SaaS and modern digital products. You shouldn't need to hire, train and manage every specialist to deliver them. Partner with Obrive as your behind-the-scenes technology team while you own the client relationship, brand and commercial strategy.
                  </p>
                </div>
              </section>

              {/* ── 02 / CAPABILITIES ───────────────────────────────── */}
              <section className="mb-4" id="capabilities">
                <h2 className="sr-only">
                  Capabilities
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  One technology partner. More to sell.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 space-y-6">
                  <p>{capabilities?.description ?? "Access a multidisciplinary delivery team across emerging technology and digital product development."}</p>
                  
                  <ul className="list-none pl-0 space-y-3">
                    {(capabilities?.subSections ?? []).map((cap, i) => (
                      <li key={i}>
                        <strong className="text-gray-900 font-bold">{formatTitle(cap.title)}:</strong>{" "}
                        {cap.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ── 03 / PARTNERSHIP MODEL ──────────────────────────── */}
              <section className="mb-4" id="partnership-models">
                <h2 className="sr-only">
                  Partnership Models
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  Built around your business.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 space-y-6">
                  <p>{partnershipModels?.description ?? "Choose how deeply Obrive integrates into your delivery model. Our partnership structure is designed to protect your client ownership while giving you access to specialized execution."}</p>

                  <ul className="list-none pl-0 space-y-3">
                    {partnerCards.map((card, i) => (
                      <li key={i}>
                        <strong className="text-gray-900 font-bold">{formatTitle(card.eyebrow)} - {card.title}:</strong>{" "}
                        {card.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ── 04 / HOW IT WORKS ───────────────────────────────── */}
              <section className="mb-4" id="process">
                <h2 className="sr-only">
                  Process
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  From brief to delivery without the overhead.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 space-y-6">
                  <p>A simple operating model keeps responsibilities clear and delivery predictable.</p>
                  
                  <ul className="list-none pl-0 space-y-3">
                    {(partnershipModels?.subSections ?? []).map((model, i) => (
                      <li key={i}>
                        <strong className="text-gray-900 font-bold">Model {String.fromCharCode(65 + i)} - {formatTitle(model.title)}:</strong>{" "}
                        {model.description}
                      </li>
                    ))}
                  </ul>

                  <ul className="list-none pl-0 space-y-3">
                    {WHITE_LABEL_PROCESS_STEPS.map((step, i) => (
                      <li key={i}>
                        <strong className="text-gray-900 font-bold">{step.title}:</strong>{" "}
                        {step.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ── 05 / WHY OBRIVE ─────────────────────────────────── */}
              <section className="mb-4" id="why-obrive">
                <h2 className="sr-only">
                  Why Obrive
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  More capability. Less complexity.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 space-y-6">
                  <p>Our white-label model is designed to help partners increase capability without increasing organizational complexity at the same pace.</p>

                  <ul className="list-none pl-0 space-y-3">
                    {whyObrive.map((item, i) => (
                      <li key={i}>
                        <strong className="text-gray-900 font-bold">{item.title}:</strong>{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ── 06 / COMMERCIAL STRUCTURE ───────────────────────── */}
              <section className="mb-12" id="commercial-structure">
                <h2 className="sr-only">
                  Commercial Structure
                </h2>
                <h3 className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl leading-tight mb-4 mt-6`}>
                  Designed to leave room for your margin.
                </h3>
                <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 space-y-6">
                  <p>{commercialStructure?.description ?? "Obrive can structure partner pricing so you can package, mark up and commercialize the capability within your own offering."}</p>

                  <ul className="list-none pl-0 space-y-3">
                    {(commercialStructure?.subSections ?? []).map((struct, i) => {
                      const eyebrows = ["Partner Benefit", "Commercial Control", "Scale"];
                      return (
                        <li key={i}>
                          <strong className="text-gray-900 font-bold">{eyebrows[i]} - {formatTitle(struct.title)}:</strong>{" "}
                          {struct.description}
                        </li>
                      );
                    })}
                  </ul>
                  
                  <p className={`${FONTS.microgrammaBold.className} text-[9px] tracking-[0.15em] uppercase text-zinc-400 mt-8 block`}>
                    *FINAL PARTNER PRICING IS SCOPED ACCORDING TO TECHNOLOGY, PROJECT COMPLEXITY, TEAM REQUIREMENTS AND ENGAGEMENT MODEL.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </FullWidthSection>
    </div>
  );
}
