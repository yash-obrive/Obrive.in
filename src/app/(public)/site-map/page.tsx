import React from "react";
import { Metadata } from "next";
import FONTS from "@/assets/fonts";
import { getDirectoryData } from "./directoryData";
import DirectorySearch from "./components/DirectorySearch";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import Link from "next/link";
import PrimaryFooterCard from "@/components/shared/cards/PrimaryFooterCard";

export const metadata: Metadata = {
  title: "Obrive Website Directory | AR, VR, MR, 3D & Spatial Computing",
  description:
    "Explore the Obrive website directory covering immersive technology solutions, products, industries, use cases, technology, resources, company, support and legal pages.",
};

export default function DirectoryPage() {
  const directoryData = getDirectoryData();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <FullWidthSection backgroundColor="none" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-[1280px] mx-auto flex flex-col items-start">
          <div className="text-accent text-xs font-bold tracking-[0.14em] uppercase mb-4">
            Obrive Website Directory
          </div>
          <h1
            className={`${FONTS.microgrammaBold.className} text-primary text-5xl sm:text-6xl md:text-[88px] leading-[0.95] tracking-[-0.065em] max-w-[900px] mb-6`}
          >
            Explore the Obrive ecosystem.
          </h1>
          <p className="text-primary/70 text-lg max-w-[760px] mb-10">
            Find the right solution, product, industry application, technology resource or support page. Obrive connects AR, VR, MR, 3D Design and Spatial Computing to real-world business experiences.
          </p>

        </div>
      </FullWidthSection>

      {/* Interactive Directory Search & List */}
      <DirectorySearch categories={directoryData} />

      {/* CTA Section using the project's native PrimaryFooterCard */}
      <FullWidthSection backgroundColor="none" className="pb-20">
        <div className="max-w-[1280px] mx-auto">
          <PrimaryFooterCard
            title="Have a project in mind?"
            description="Tell Obrive what you want to build and we’ll help identify the right technology, product or implementation path."
          />
        </div>
      </FullWidthSection>
    </div>
  );
}
