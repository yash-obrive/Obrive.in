"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/lib/blogs";
import BlogCard from "./BlogCard";
import RoundedBallIcon from "@/components/shared/icons/RoundedBallIcon";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

interface BlogListProps {
  blogs: Blog[];
}

const ITEMS_PER_PAGE = 12;

const BlogList = ({ blogs }: BlogListProps) => {
  const [currentFilter, setCurrentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Extract unique categories for filter options
  const filterOptions = useMemo(() => {
    const categories = new Set(blogs.map((b) => b.category));
    return ["All", ...Array.from(categories)].filter(Boolean).sort();
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    if (currentFilter === "All") {
      return blogs;
    }
    return blogs.filter((b) => b.category === currentFilter);
  }, [blogs, currentFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  // Current page blogs
  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const preserveScrollPosition = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      scrollPositionRef.current = window.scrollY + rect.top - 100;
    }
  }, []);

  const restoreScrollPosition = useCallback(() => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "smooth",
      });
    }
  }, []);

  const handleFilterChange = useCallback(
    async (filter: string) => {
      if (filter === currentFilter) return;

      preserveScrollPosition();
      setIsTransitioning(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      setCurrentFilter(filter);
      setCurrentPage(1);

      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [currentFilter, preserveScrollPosition, restoreScrollPosition]
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return;

      preserveScrollPosition();
      setIsTransitioning(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      setCurrentPage(page);

      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [currentPage, preserveScrollPosition, restoreScrollPosition, totalPages]
  );

  return (
    <div ref={contentRef} className="py-12">
      <FullWidthSection backgroundColor="none">
        <div className="flex flex-col items-center gap-8 mb-12">
          {/* Filters */}
          <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex justify-center gap-2 min-w-max px-4">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  disabled={isTransitioning}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentFilter === filter
                      ? "bg-secondary text-white shadow-md"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 mt-4">
            <RoundedBallIcon />
            <h2 className="uppercase text-xs sm:text-sm font-medium text-center tracking-widest text-muted-foreground">
              {currentFilter === "All" ? "All Blogs" : currentFilter}
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="px-2 sm:px-4 lg:px-0 min-h-[500px]">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 lg:gap-y-16"
            key={`${currentFilter}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {currentBlogs.map((blog, index) => (
              <motion.div
                key={`${blog.slug}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="w-full"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
          
          {currentBlogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <p>No blogs found for this category.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isTransitioning}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card text-foreground disabled:opacity-50 hover:bg-accent transition-colors shadow-sm"
              aria-label="Previous page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isTransitioning}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card text-foreground disabled:opacity-50 hover:bg-accent transition-colors shadow-sm"
              aria-label="Next page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </FullWidthSection>
    </div>
  );
};

export default BlogList;
