"use client";

import { useCallback, useMemo, useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCardContent } from "@/constants/pages/resources/blog-card";
import ArticlesGrid from "./components/ArticlesGrid";
import CustomPagination from "./components/CustomPagination";
import FeaturedPopularSection from "./components/FeaturedPopularSection";
import ResourcesFilter from "./components/ResourcesFilter";

const FILTER_KEYWORDS = {
  AR: ["ar", "augmented reality", "augmented"],
  VR: ["vr", "virtual reality", "virtual"],
  MR: ["mr", "mixed reality", "mixed"],
  "3D": ["3d", "three dimensional", "rendering", "texturing"],
  "Spatial Computing": ["spatial", "computing", "spatial computing"],
} as const;

const BLOGS_PER_PAGE = 12;

// Optimized filter function with memoization
const filterBlogsByKeyword = (
  blogs: typeof BlogCardContent,
  keyword: string,
) => {
  const searchTerms = FILTER_KEYWORDS[
    keyword as keyof typeof FILTER_KEYWORDS
  ] || [keyword.toLowerCase()];

  return blogs.filter((blog) => {
    const searchText = `${blog.title} ${blog.description}`.toLowerCase();
    return searchTerms.some((term) => searchText.includes(term));
  });
};

const ResourcesContentInner = () => {
  const searchParams = useSearchParams();
  const queryFilter = searchParams.get("filter");
  
  const [currentFilter, setCurrentFilter] = useState(queryFilter || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Sync state when URL searchParams changes
  useEffect(() => {
    if (queryFilter && queryFilter !== currentFilter) {
      setCurrentFilter(queryFilter);
      setCurrentPage(1);
    }
  }, [queryFilter]); // purposefully omitted currentFilter from deps so it only triggers on URL change

  // Memoized filtered blogs for performance
  const filteredBlogs = useMemo(() => {
    switch (currentFilter) {
      case "All":
        return BlogCardContent;
      case "Blog":
        return BlogCardContent.filter((blog) => blog.type !== "Case Studies");
      case "Case Studies":
        return BlogCardContent.filter((blog) => blog.type === "Case Studies");
      default:
        return filterBlogsByKeyword(BlogCardContent, currentFilter);
    }
  }, [currentFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  // Memoized current page blogs
  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const showFeaturedAndPopular = currentFilter === "All";

  // Store scroll position before filter/pagination change
  const preserveScrollPosition = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      scrollPositionRef.current = window.scrollY + rect.top - 100; // 100px offset from top
    }
  }, []);

  // Smooth scroll to preserved position
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

      // Small delay to allow scroll position capture
      await new Promise((resolve) => setTimeout(resolve, 50));

      setCurrentFilter(filter);
      setCurrentPage(1); // Reset to first page on filter change

      // Restore scroll position after content updates
      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [currentFilter, preserveScrollPosition, restoreScrollPosition],
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      preserveScrollPosition();
      setIsTransitioning(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      setCurrentPage(page);

      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [currentPage, preserveScrollPosition, restoreScrollPosition],
  );

  return (
    <div ref={contentRef}>
      <ResourcesFilter
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        isTransitioning={isTransitioning}
      />

      <FeaturedPopularSection showFeaturedAndPopular={showFeaturedAndPopular} />

      <ArticlesGrid
        currentBlogs={currentBlogs}
        currentFilter={currentFilter}
        currentPage={currentPage}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isTransitioning={isTransitioning}
      />
    </div>
  );
};

const ResourcesContent = () => {
  return (
    <Suspense fallback={<div>Loading resources...</div>}>
      <ResourcesContentInner />
    </Suspense>
  );
};

export default ResourcesContent;
