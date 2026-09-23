import type { Metadata } from "next";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import DirectorySearch from "./components/DirectorySearch";
import { getDirectoryData } from "./directoryData";

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
      <FullWidthSection backgroundColor="accent" className="py-10 pt-30">
        <div className="text-center flex flex-col items-center gap-8">
          <div className="text-secondary text-xs font-bold tracking-[0.14em] uppercase mb-4">
            Obrive Website Directory
          </div>
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[90vw] sm:max-w-3xl md:max-w-4xl break-words text-balance`}
          >
            Explore the Obrive ecosystem.
          </h1>
          <p className="text-base sm:text-md text-center max-w-3xl px-4 font-medium">
            Find the right solution, product, industry application, technology
            resource or support page. Obrive connects AR, VR, MR, 3D Design and
            Spatial Computing to real-world business experiences.
          </p>
        </div>
      </FullWidthSection>

      {/* Interactive Directory Search & List */}
      <DirectorySearch categories={directoryData} />
    </div>
  );
}
