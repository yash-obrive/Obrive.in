"use client";

import React, { useState } from "react";
import FONTS from "@/assets/fonts";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CLIENT_FILENAMES = [
  "Goldman_Sachs.png",
  "Frame_1000008285.png", "Frame_1000008286.png", "Frame_1561531430.png",
  "Frame_1561531431.png", "Frame_1561531432.png", "Frame_1561531433.png",
  "Frame_1561531434.png", "Frame_1561531435.png", "Frame_1561531436.png",
  "Frame_1561531437.png", "Frame_1561531438.png", "Frame_1561531439.png",
  "Frame_1561531440.png", "Frame_1561531441.png", "Frame_1561531442.png",
  "Frame_1561531443.png", "Frame_1561531444.png", "Frame_1561531446.png",
  "Frame_1561531447.png", "Frame_1561531448.png", "Frame_1561531449.png",
  "Frame_1561531450.png", "Frame_1561531451.png", "Frame_1561531453.png"
];

const CLIENT_IMAGES = CLIENT_FILENAMES.map((filename, i) => ({
  id: `client-${i + 1}`,
  url: `/clients/${filename}`,
  alt: `Client ${i + 1}`,
}));

const ITEMS_PER_PAGE = 20;

export default function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(CLIENT_IMAGES.length / ITEMS_PER_PAGE);

  const paginatedImages = CLIENT_IMAGES.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
        <h1 className={`${FONTS.microgrammaBold.className} text-primary text-4xl md:text-5xl lg:text-[64px] text-center uppercase tracking-wide mb-16 md:mb-24`}>
          Our Clients
        </h1>

        {/* Client Grid */}
        <div className="w-full max-w-[1280px] px-4 md:px-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 min-h-[800px] content-start">
          {paginatedImages.map((img) => (
            <div 
              key={img.id} 
              className="flex items-center justify-center transition-transform hover:-translate-y-2 duration-300 w-full"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-auto object-contain drop-shadow-sm" 
                loading="lazy"
              />
            </div>
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
