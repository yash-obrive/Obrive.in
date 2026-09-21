import Image from "next/image";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import FONTS from "@/assets/fonts";
import { Blog } from "@/lib/blogs";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import SectionHeader from "@/components/shared/layout/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <article className="bg-white min-h-screen pb-20 relative">
      {/* Background Gradient for Hero */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 via-primary/5 to-white pointer-events-none" />

      <FadeInOnView>
        <FullWidthSection backgroundColor="none">
          <div className="flex mt-40 items-center flex-col gap-8 max-xl:mt-32 max-lg:mt-28 max-md:mt-20 max-sm:mt-26 relative z-10 px-4">
            
            {/* Meta Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <span className="bg-white shadow-sm border border-primary/20 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <div className="w-full max-w-5xl">
              <h1 className={`${FONTS.microgrammaBold.className} text-center text-primary text-5xl max-xl:text-4xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl leading-tight text-balance`}>
                {blog.title}
              </h1>
            </div>
            
            {/* Author & Time Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-secondary/70 text-sm font-medium">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{blog.read_time}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>2026</span>
              </div>
            </div>
          </div>
        </FullWidthSection>
      </FadeInOnView>
      
      {/* Featured Image */}
      <FadeInOnView>
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-24 relative z-10">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] relative shadow-2xl ring-1 ring-primary/10">
             <Image
                src="/images/blogs/blog-fallback.png"
                alt="Immersive Technology Concept"
                fill
                className="object-cover"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </FadeInOnView>

      <FullWidthSection backgroundColor="none">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Content Sections */}
          {blog.sections.map((section, idx) => {
            const isFaq = section.title?.toLowerCase().includes("faq") || section.title?.toLowerCase().includes("frequently asked");
            
            return (
              <FadeInOnView key={idx}>
                {isFaq ? (
                  <div className="space-y-12">
                    <SectionHeader title={section.title} iconText="Answers" />
                    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-primary/10">
                      <Accordion type="single" collapsible className="w-full">
                        {section.content.reduce<{q: string, a: string}[]>((acc, curr, i) => {
                          if (i % 2 === 0) acc.push({ q: curr, a: section.content[i+1] || "" });
                          return acc;
                        }, []).map((faq, fIdx) => (
                          <AccordionItem key={fIdx} value={`item-${fIdx}`}>
                            <AccordionTrigger className={`${FONTS.microgrammaBold.className} text-left text-primary text-base md:text-lg hover:no-underline hover:text-accent-foreground py-6`}>
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-secondary/80 text-base leading-relaxed pb-6">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {section.title && section.title.length < 100 && (
                       <SectionHeader title={section.title} />
                    )}
                    <div className="space-y-8 bg-white/50 rounded-3xl p-2 md:p-8">
                      {section.content.map((paragraph, pIdx) => {
                        // Make the very first paragraph of the first section look like a drop-cap introduction
                        const isIntro = idx === 0 && pIdx === 0;
                        return (
                          <p 
                            key={pIdx} 
                            className={`text-lg text-secondary/80 leading-loose ${isIntro ? 'text-xl font-medium border-l-4 border-primary/40 pl-6 py-2' : ''}`}
                          >
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </FadeInOnView>
            );
          })}

        </div>
      </FullWidthSection>
    </article>
  );
};

export default BlogDetail;
