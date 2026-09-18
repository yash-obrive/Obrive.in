"use client";

import { Calendar, CircleUser } from "lucide-react";
import Image from "next/image";
import React from "react";
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

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 px-4 sm:px-8 mt-10">
      <main className="max-w-5xl mx-auto flex flex-col space-y-12">
        {/* Page Header */}
        <header className="border-b pb-6">
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
        </header>

        {/* Partners Grid */}
        <section className="flex flex-col items-center text-center mt-10">
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 w-full px-4">
            {partnerImages.map((img) => (
              <div
                key={img.id}
                className="w-[220px] sm:w-[280px] flex items-center justify-center transition-transform hover:-translate-y-2 duration-300"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
