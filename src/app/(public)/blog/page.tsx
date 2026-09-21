import { Metadata } from "next";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { getAllBlogs } from "@/lib/blogs";
import BlogList from "@/components/pages/blogs/BlogList";

export const metadata: Metadata = {
  title: "Blog | Obrive",
  description: "Explore the latest insights, trends, and strategies in Augmented Reality, Virtual Reality, Mixed Reality, and Spatial Computing.",
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <main className="bg-white min-h-screen">
      <FullWidthSection backgroundColor="accent" className="py-20 pt-32">
        <div className="text-center flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
          <div className="text-secondary text-xs font-bold tracking-[0.14em] uppercase mb-4">
            Obrive Blog Library
          </div>
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl break-words text-balance`}
          >
            Insights on the Future of Immersive Technology
          </h1>
          <p className="text-base sm:text-lg text-center max-w-2xl px-4 font-medium text-secondary/80">
            Dive into our collection of 100 deep-dive articles covering AR, VR, MR, Spatial Computing, 3D, and their applications across industries.
          </p>
        </div>
      </FullWidthSection>

      <BlogList blogs={blogs} />
    </main>
  );
}
