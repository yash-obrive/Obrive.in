"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { Calendar, CircleUser } from "lucide-react";
import { useRef } from "react";
import FONTS from "@/assets/fonts";

const pageHeader = {
  title: "Our Partners & Recognition",
  author: "Obrive Industries Private Limited",
  date: "February 28, 2025",
  subtitle: "Proud to be recognized by leading platforms worldwide",
};

// Generate an array of 13 partner images
const partnerImages = Array.from({ length: 13 }, (_, i) => ({
  id: `partner-${i + 1}`,
  url: `/partners/partner-${i + 1}.png`,
  alt: `Partner Recognition ${i + 1}`,
}));

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function ClientCard({
  img,
  index,
}: {
  img: { id: string; url: string; alt: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      key={img.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        scale: 1.04,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group relative w-[200px] sm:w-[260px] flex items-center justify-center cursor-pointer"
    >
      {/* Glow ring on hover */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-2 ring-primary/30 shadow-[0_0_24px_4px_rgba(7,57,51,0.12)]" />

      {/* Card */}
      <div className="w-full bg-white border border-primary/10 rounded-2xl p-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
        <img
          src={img.url}
          alt={img.alt}
          className="w-full h-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4 sm:px-8 mt-10">
      <main className="max-w-5xl mx-auto flex flex-col space-y-12">
        {/* Page Header */}
        <motion.header
          className="border-b pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1
            className={`${FONTS.microgrammaBold.className} text-[#074139] text-2xl sm:text-3xl tracking-wide`}
          >
            {pageHeader.title}
          </h1>
          <div
            className={`${FONTS.microgrammaBold.className} text-[#074139] flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-semibold mt-2`}
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <CircleUser className="h-4 w-4" />
              {pageHeader.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {pageHeader.date}
            </span>
          </div>
          <p
            className={`${FONTS.microgrammaBold.className} text-[#074139] text-sm font-medium mt-4`}
          >
            {pageHeader.subtitle}
          </p>
        </motion.header>

        {/* Clients Grid */}
        <section className="flex flex-col items-center text-center mt-10">
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 w-full px-4">
            {partnerImages.map((img, i) => (
              <ClientCard key={img.id} img={img} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
