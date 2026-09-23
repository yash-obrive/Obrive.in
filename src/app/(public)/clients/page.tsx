"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import FONTS from "@/assets/fonts";

const CLIENT_FILENAMES = [
  "Goldman_Sachs.png",
  "Frame_1000008285.png",
  "Frame_1000008286.png",
  "Frame_1561531430.png",
  "Frame_1561531431.png",
  "Frame_1561531432.png",
  "Frame_1561531433.png",
  "Frame_1561531435.png",
  "Frame_1561531436.png",
  "Frame_1561531437.png",
  "Frame_1561531438.png",
  "Frame_1561531439.png",
  "Frame_1561531440.png",
  "Frame_1561531441.png",
  "Frame_1561531442.png",
  "Frame_1561531443.png",
  "Frame_1561531444.png",
  "Frame_1561531446.png",
  "Frame_1561531447.png",
  "Frame_1561531448.png",
  "Frame_1561531449.png",
  "Frame_1561531450.png",
  "Frame_1561531451.png",
  "Frame_1561531453.png",
];

const CLIENT_IMAGES = CLIENT_FILENAMES.map((filename, i) => ({
  id: `client-${i + 1}`,
  url: `/clients/${filename}`,
  alt: `Client ${i + 1}`,
}));

const ITEMS_PER_PAGE = 20;

function ClientCard({
  img,
  index,
}: {
  img: { id: string; url: string; alt: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      key={img.id}
      initial={{ opacity: 0, y: 36, scale: 0.93 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 36, scale: 0.93 }
      }
      transition={{
        delay: (index % 8) * 0.07,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="group relative flex items-center justify-center w-full cursor-pointer"
    >
      {/* Glow bg on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Border glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_8px_32px_-4px_rgba(7,57,51,0.18)] transition-all duration-300 pointer-events-none" />

      {/* Card */}
      <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center min-h-[140px]">
        <img
          src={img.url}
          alt={img.alt}
          className="w-full h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export default function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(CLIENT_IMAGES.length / ITEMS_PER_PAGE);

  const paginatedImages = CLIENT_IMAGES.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="w-full flex flex-col items-center pt-24 md:pt-32 pb-24 md:pb-32">
        {/* Hero Title */}
        <motion.h1
          className={`${FONTS.microgrammaBold.className} text-primary text-4xl md:text-5xl lg:text-[64px] text-center uppercase tracking-wide mb-10 md:mb-12`}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Clients
        </motion.h1>

        {/* Client Grid */}
        <div className="w-full max-w-[1280px] px-4 md:px-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 min-h-[800px] content-start">
          {paginatedImages.map((img, i) => (
            <ClientCard key={img.id} img={img} index={i} />
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-20 md:mt-24">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors shadow-sm ${
                currentPage === 1
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-accent/20 border-primary/30 text-primary hover:bg-accent hover:border-accent cursor-pointer"
              }`}
              aria-label="Previous page"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors shadow-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-accent/20 border-primary/30 text-primary hover:bg-accent hover:border-accent cursor-pointer"
              }`}
              aria-label="Next page"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
