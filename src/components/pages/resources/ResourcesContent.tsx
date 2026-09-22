"use client";

import { useCallback, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();

  // Read filter and page directly from URL so back/forward navigation works
  const queryFilter = searchParams.get("filter") || "All";
  const queryPage = parseInt(searchParams.get("page") || "1", 10);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Push filter+page into URL (enables browser back/forward to restore state)
  const updateURL = useCallback(
    (filter: string, page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (filter === "All") {
        params.delete("filter");
      } else {
        params.set("filter", filter);
      }
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }
      const query = params.toString();
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Memoized filtered blogs for performance
  const filteredBlogs = useMemo(() => {
    switch (queryFilter) {
      case "All":
        return BlogCardContent;
      case "Blog":
        return BlogCardContent.filter((blog) => blog.type !== "Case Studies");
      case "Case Studies":
        return BlogCardContent.filter((blog) => blog.type === "Case Studies");
      default:
        return filterBlogsByKeyword(BlogCardContent, queryFilter);
    }
  }, [queryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);

  // Clamp page to valid range
  const currentPage = Math.min(Math.max(queryPage, 1), totalPages || 1);

  // Memoized current page blogs
  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const showFeaturedAndPopular = queryFilter === "All";

  // Store scroll position before filter/pagination change
  const preserveScrollPosition = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      scrollPositionRef.current = window.scrollY + rect.top - 100;
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
      if (filter === queryFilter) return;

      preserveScrollPosition();
      setIsTransitioning(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      updateURL(filter, 1); // Reset to page 1 on filter change

      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [queryFilter, preserveScrollPosition, restoreScrollPosition, updateURL],
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === currentPage) return;

      preserveScrollPosition();
      setIsTransitioning(true);

      await new Promise((resolve) => setTimeout(resolve, 50));

      updateURL(queryFilter, page);

      setTimeout(() => {
        restoreScrollPosition();
        setIsTransitioning(false);
      }, 300);
    },
    [currentPage, queryFilter, preserveScrollPosition, restoreScrollPosition, updateURL],
  );

  return (
    <div ref={contentRef}>
      <ResourcesFilter
        currentFilter={queryFilter}
        onFilterChange={handleFilterChange}
        isTransitioning={isTransitioning}
      />

      <FeaturedPopularSection showFeaturedAndPopular={showFeaturedAndPopular} />

      <ArticlesGrid
        currentBlogs={currentBlogs}
        currentFilter={queryFilter}
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
