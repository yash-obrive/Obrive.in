import Image from "next/image";
import Link from "@/components/shared/LocalizedLink";
import FONTS from "@/assets/fonts";
import { Blog } from "@/lib/blogs";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { Button, buttonVariants } from "@/components/ui/button";
import BlogRecommendations from "@/components/pages/resources/BlogRecommendations";
import ResourceWorkflowSteps from "@/components/pages/resources/ResourceWorkflowSteps";
import ResourceBackButton from "@/components/pages/resources/ResourceBackButton";
import { UserIcon } from "lucide-react";
import { BlogCardContent } from "@/constants/pages/resources/blog-card";
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
  // Find the blog image from BlogCardContent if possible, else fallback
  const blogCardInfo = BlogCardContent.find((b) => b.slug === blog.slug);
  const heroSrc = blogCardInfo?.src || "/images/blogs/blog-fallback.png";
  const altText = blogCardInfo?.alt || blog.title;

  const workflowSteps = blog.sections
    .map((section) => section.title)
    .filter((title) => title && title.trim().length > 0);

  return (
    <div>
      {/* hero section */}
      <section>
        <FullWidthSection
          backgroundColor="accent"
          className="pt-20 sm:pt-28 lg:pt-38 pb-16 sm:pb-24 lg:pb-30"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 px-4 sm:px-8 lg:px-13 items-start justify-between">
            <div className="relative flex flex-col gap-4 w-full lg:min-w-[400px] lg:max-w-[500px]">
              <div className="w-full max-sm:w-[300px] max-sm:h-[300px] h-64 sm:h-80 lg:h-90 rounded-2xl sm:flex items-center justify-center sm:relative">
                <Image
                  src={heroSrc}
                  alt={altText}
                  fill
                  className="object-cover rounded-2xl pointer-events-none"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6 w-full lg:relative lg:top-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Button
                  className="text-[10px] rounded-full w-fit"
                  variant={"outline"}
                  size={"sm"}
                >
                  {blog.category ? blog.category.toUpperCase() : "BLOG"}
                </Button>

                <span className="text-slate-700 text-xs font-medium">
                  {blog.read_time}
                </span>
              </div>

              <h1
                className={`${FONTS.microgrammaBold.className} text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-secondary leading-tight`}
              >
                {blog.title}
              </h1>

              <blockquote className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                {blog.sections[0]?.content[0]}
              </blockquote>

              <div className="flex items-center gap-3 pt-2 sm:pt-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-xs">
                  <UserIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm sm:text-base">
                    {blog.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FullWidthSection>
      </section>

      <FullWidthSection backgroundColor="none">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-40 my-8 sm:my-16 lg:my-20 px-4 sm:px-8 lg:px-0">
          {/* workflow steps sidebar */}
          {workflowSteps.length > 0 && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-4">
                <ResourceBackButton />
              </div>
              <ResourceWorkflowSteps steps={workflowSteps} />
            </div>
          )}

          {/* Back button fallback when no sidebar */}
          {workflowSteps.length === 0 && (
            <div>
              <ResourceBackButton />
            </div>
          )}

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 flex-1">
            <div
              className="max-w-none lg:pr-8 xl:pr-16 flex flex-col gap-4 sm:gap-6 lg:gap-8"
              data-resource-content
            >
              {blog.sections.map((section, idx) => {
                const isFaq = section.title?.toLowerCase().includes("faq") || section.title?.toLowerCase().includes("frequently asked");
                return (
                  <section key={idx}>
                    {section.title && (
                      <h2
                        className={`${FONTS.microgrammaBold.className} text-3xl mb-4 mt-6`}
                      >
                        {section.title}
                      </h2>
                    )}
                    {isFaq ? (
                      <Accordion type="single" collapsible className="w-full">
                        {section.content.reduce<{q: string, a: string}[]>((acc, curr, i) => {
                          if (i % 2 === 0) acc.push({ q: curr, a: section.content[i+1] || "" });
                          return acc;
                        }, []).map((faq, fIdx) => (
                          <AccordionItem key={fIdx} value={`item-${fIdx}`}>
                            <AccordionTrigger className={`${FONTS.microgrammaBold.className} text-left text-primary text-base md:text-lg hover:no-underline py-4`}>
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-secondary/80 text-base leading-relaxed pb-4">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="space-y-4">
                        {section.content.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-base leading-relaxed text-gray-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </FullWidthSection>

      {/* Blog Recommendations */}
      <BlogRecommendations currentSlug={blog.slug} maxRecommendations={2} />
    </div>
  );
};

export default BlogDetail;
