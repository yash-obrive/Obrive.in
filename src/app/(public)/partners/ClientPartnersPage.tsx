"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FONTS from "@/assets/fonts";
import { FadeInOnLoad, FadeInOnView } from "@/components/shared/motion/GsapMotion";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { InfiniteHorizontalScroll } from "@/components/shared/layout/InfiniteHorizontalScroll";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  WHITE_LABEL_HERO,
  WHITE_LABEL_SERVICE_SECTIONS,
  WHITE_LABEL_PROCESS_STEPS,
} from "@/constants/pages/services/white-label-partnerships";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Animated Section Header ──────────────────────────────────────────────────
function SectionHeader({
  index,
  eyebrow,
  heading,
  headingAccent,
  description,
}: {
  index: string;
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  description: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 pb-8"
    >
      {/* Left: eyebrow */}
      <motion.div
        className="flex flex-col gap-0.5 pt-1"
        variants={slideLeft}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <span className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-zinc-400`}>
          {index}
        </span>
        <span className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-zinc-400`}>
          {eyebrow}
        </span>
      </motion.div>

      {/* Right: heading + description */}
      <div className="flex flex-col gap-5">
        <motion.h2
          className={`${FONTS.microgrammaBold.className} text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.1]`}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {heading}
          {headingAccent && (
            <span className="text-[#38b292]"> {headingAccent}</span>
          )}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg leading-relaxed max-w-2xl text-zinc-500"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

// ─── Animated Card (reusable hover lift) ─────────────────────────────────────
function AnimCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay * 0.08 }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(7,57,51,0.10)" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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

  return (
    <div className="flex flex-col w-full bg-white text-zinc-900">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <FullWidthSection backgroundColor="none" className="pt-28 pb-10 bg-white">
        <div className="text-center flex flex-col items-center gap-6 mt-4">
          <FadeInOnLoad delay={0.1}>
            <p className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-zinc-400`}>
              OBRIVE / WHITE-LABEL TECHNOLOGY PARTNERSHIPS
            </p>
          </FadeInOnLoad>
          <FadeInOnLoad delay={0.15}>
            <h1 className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-secondary`}>
              Extend Your Capabilities With Obrive
            </h1>
          </FadeInOnLoad>
          <FadeInOnLoad delay={0.3}>
            <p className="text-sm sm:text-md text-center max-w-4xl px-4 font-medium leading-relaxed">
              {WHITE_LABEL_HERO.description}
            </p>
          </FadeInOnLoad>
          <FadeInOnLoad delay={0.45}>
            <div className="flex sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-4">
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
          </FadeInOnLoad>
        </div>
      </FullWidthSection>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div className="bg-white overflow-hidden py-4">
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

      {/* ── 01 / THE OPPORTUNITY ────────────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="01"
            eyebrow="THE OPPORTUNITY"
            heading="Sell the solution."
            headingAccent="We build the technology."
            description="Your clients increasingly expect AI, immersive experiences, 3D, SaaS and modern digital products. You shouldn't need to hire, train and manage every specialist to deliver them. Partner with Obrive as your behind-the-scenes technology team while you own the client relationship, brand and commercial strategy."
          />
        </FullWidthSection>
      </div>

      {/* ── 02 / CAPABILITIES ───────────────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="02"
            eyebrow="CAPABILITIES"
            heading="One technology partner."
            headingAccent="More to sell."
            description={capabilities?.description ?? "Access a multidisciplinary delivery team across emerging technology and digital product development."}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 border border-primary/10 rounded-2xl overflow-hidden">
            {(capabilities?.subSections ?? []).map((cap, i) => {
              const total = capabilities?.subSections?.length ?? 0;
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  className={`flex flex-col gap-3 p-8 lg:p-10 cursor-default group
                    ${i % 2 === 0 ? "md:border-r border-primary/10" : ""}
                    ${i < total - 2 ? "border-b border-primary/10" : ""}
                  `}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={{ backgroundColor: "rgba(7,57,51,0.025)" }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                >
                  <span className={`${FONTS.microgrammaBold.className} text-[10px] text-primary/30 tracking-[0.2em] group-hover:text-primary/60 transition-colors duration-300`}>
                    0{i + 1}
                  </span>
                  <h3 className={`${FONTS.microgrammaBold.className} text-base sm:text-lg text-primary`}>
                    {cap.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FullWidthSection>
      </div>

      {/* ── 03 / PARTNERSHIP MODEL ──────────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="03"
            eyebrow="PARTNERSHIP MODEL"
            heading="Built around your business."
            description={partnershipModels?.description ?? "Choose how deeply Obrive integrates into your delivery model. Our partnership structure is designed to protect your client ownership while giving you access to specialized execution."}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerCards.map((card, i) => (
              <AnimCard
                key={i}
                delay={i}
                className="flex flex-col gap-4 p-7 rounded-2xl border border-primary/10 bg-white cursor-default"
              >
                <span className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-primary/40`}>
                  {card.eyebrow}
                </span>
                <h3 className={`${FONTS.microgrammaBold.className} text-base sm:text-lg text-primary leading-snug`}>
                  {card.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </AnimCard>
            ))}
          </div>
        </FullWidthSection>
      </div>

      {/* ── 04 / HOW IT WORKS ───────────────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="04"
            eyebrow="HOW IT WORKS"
            heading="From brief to delivery without the overhead."
            description="A simple operating model keeps responsibilities clear and delivery predictable."
          />

          {/* 3 Model cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {(partnershipModels?.subSections ?? []).map((model, i) => (
              <AnimCard
                key={i}
                delay={i}
                className="flex flex-col gap-4 p-7 rounded-2xl border border-primary/10 bg-white cursor-default"
              >
                <span className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-primary/40`}>
                  MODEL {String.fromCharCode(65 + i)}
                </span>
                <h3 className={`${FONTS.microgrammaBold.className} text-base text-primary leading-snug`}>
                  {model.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {model.description}
                </p>
              </AnimCard>
            ))}
          </div>

          {/* 6-step process grid — sequential step reveal */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-primary/10 rounded-2xl overflow-hidden bg-white">
            {WHITE_LABEL_PROCESS_STEPS.map((step, i) => {
              const total = WHITE_LABEL_PROCESS_STEPS.length;
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  className={`flex flex-col gap-3 p-6 group cursor-default
                    ${i < total - 1 ? "border-r border-primary/10" : ""}
                  `}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(7,57,51,0.03)" }}
                >
                  {/* Animated step number dot */}
                  <motion.span
                    className={`${FONTS.microgrammaBold.className} text-[10px] text-primary/30 tracking-[0.2em] group-hover:text-primary/70 transition-colors duration-300`}
                    animate={inView ? { opacity: [0, 1], scale: [0.8, 1] } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    0{i + 1}
                  </motion.span>
                  <h3 className={`${FONTS.microgrammaBold.className} text-sm text-primary`}>
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FullWidthSection>
      </div>

      {/* ── 05 / WHY OBRIVE ─────────────────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="05"
            eyebrow="WHY OBRIVE"
            heading="More capability."
            headingAccent="Less complexity."
            description="Our white-label model is designed to help partners increase capability without increasing organizational complexity at the same pace."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 border border-primary/10 rounded-2xl overflow-hidden">
            {whyObrive.map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  className={`flex flex-col gap-3 p-8 lg:p-10 group cursor-default
                    ${i % 2 === 0 ? "md:border-r border-primary/10" : ""}
                    ${i < 2 ? "border-b border-primary/10" : ""}
                  `}
                  variants={scaleIn}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={{ backgroundColor: "rgba(7,57,51,0.025)" }}
                  transition={{ delay: i * 0.1, duration: 0.25 }}
                >
                  {/* Number with pulse animation */}
                  <motion.span
                    className={`${FONTS.microgrammaBold.className} text-[10px] text-primary/30 tracking-[0.2em] group-hover:text-primary/70 transition-colors duration-300`}
                    animate={inView ? { opacity: [0, 1] } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  >
                    {item.num}
                  </motion.span>
                  <h3 className={`${FONTS.microgrammaBold.className} text-base sm:text-lg text-primary`}>
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FullWidthSection>
      </div>

      {/* ── 06 / COMMERCIAL STRUCTURE ───────────────────────────────── */}
      <div className="bg-white">
        <FullWidthSection backgroundColor="none" className="py-10 lg:py-16">
          <SectionHeader
            index="06"
            eyebrow="COMMERCIAL STRUCTURE"
            heading="Designed to leave room for your margin."
            description={commercialStructure?.description ?? "Obrive can structure partner pricing so you can package, mark up and commercialize the capability within your own offering."}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(commercialStructure?.subSections ?? []).map((struct, i) => {
              const eyebrows = ["PARTNER BENEFIT", "COMMERCIAL CONTROL", "SCALE"];
              return (
                <AnimCard
                  key={i}
                  delay={i}
                  className="flex flex-col gap-4 p-7 rounded-2xl border border-primary/10 bg-white cursor-default"
                >
                  <span className={`${FONTS.microgrammaBold.className} text-[10px] tracking-[0.2em] uppercase text-primary/40`}>
                    {eyebrows[i]}
                  </span>
                  <h3 className={`${FONTS.microgrammaBold.className} text-base text-primary`}>
                    {struct.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {struct.description}
                  </p>
                </AnimCard>
              );
            })}
          </div>
          <FadeInOnView>
            <p className={`${FONTS.microgrammaBold.className} text-[9px] tracking-[0.15em] uppercase text-zinc-400 mt-8`}>
              *FINAL PARTNER PRICING IS SCOPED ACCORDING TO TECHNOLOGY, PROJECT COMPLEXITY, TEAM REQUIREMENTS AND ENGAGEMENT MODEL.
            </p>
          </FadeInOnView>
        </FullWidthSection>
      </div>


    </div>
  );
}
