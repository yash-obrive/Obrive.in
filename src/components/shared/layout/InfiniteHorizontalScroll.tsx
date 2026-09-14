"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InfiniteHorizontalScrollProps {
  children: React.ReactNode;
  speed?: number;
  gap?: number;
  pauseOnHover?: boolean;
  autoplayDelay?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  indicatorPosition?: "bottom" | "top";
  className?: string;
  itemClassName?: string;
}

export const InfiniteHorizontalScroll =
  React.memo<InfiniteHorizontalScrollProps>(
    ({
      children,
      speed = 30,
      gap = 16,
      pauseOnHover = true,
      autoplayDelay = 1500,
      showIndicators = true,
      showNavigation = false,
      indicatorPosition = "bottom",
      className = "",
      itemClassName = "",
    }) => {
      const [api, setApi] = useState<CarouselApi>();
      const [current, setCurrent] = useState(0);
      const [count, setCount] = useState(0);

      // Memoize plugin to prevent recreation on every render
      const plugin = useMemo(
        () =>
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: pauseOnHover,
            stopOnFocusIn: false,
            playOnInit: true,
          }),
        [autoplayDelay, pauseOnHover]
      );

      // Memoize children array to prevent unnecessary re-renders
      const childrenArray = useMemo(
        () => React.Children.toArray(children),
        [children]
      );

      // Carousel configuration memoized
      const carouselOpts = useMemo(
        () => ({
          align: "start" as const,
          loop: true,
          skipSnaps: false,
          duration: Math.max(10, Math.min(100, 100 - speed)), // Convert speed to duration
          containScroll: "trimSnaps" as const,
        }),
        [speed]
      );

      // Handle mouse events
      const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) {
          plugin.stop();
        }
      }, [pauseOnHover, plugin]);

      const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) {
          plugin.play();
        }
      }, [pauseOnHover, plugin]);

      // Handle indicator click
      const handleIndicatorClick = useCallback(
        (index: number) => {
          if (api) {
            api.scrollTo(index);
            plugin.reset();
          }
        },
        [api, plugin]
      );

      // Handle navigation buttons
      const scrollPrev = useCallback(() => {
        if (api) {
          api.scrollPrev();
          plugin.reset();
        }
      }, [api, plugin]);

      const scrollNext = useCallback(() => {
        if (api) {
          api.scrollNext();
          plugin.reset();
        }
      }, [api, plugin]);

      // Setup carousel API listeners
      useEffect(() => {
        if (!api) return;

        const snapList = api.scrollSnapList();
        setCount(snapList.length);
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
          setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        
        // Explicitly start the autoplay plugin once the API is ready
        // This resolves issues with playOnInit failing in React StrictMode
        plugin.play();

        return () => {
          api.off("select", onSelect);
        };
      }, [api, plugin]);

      // Handle visibility and focus for autoplay
      useEffect(() => {
        const handleResume = () => {
          // Check if document is visible before resuming
          if (document.visibilityState === "visible") {
            plugin.play();
          }
        };

        const handlePause = () => {
          if (document.visibilityState === "hidden") {
            plugin.stop();
          }
        };

        // Named visibility handler so we can remove the exact same function later
        const handleVisibilityChange = () => {
          if (document.visibilityState === "visible") {
            handleResume();
          } else {
            handlePause();
          }
        };

        // Add event listeners
        window.addEventListener("focus", handleResume);
        window.addEventListener("blur", handlePause);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
          window.removeEventListener("focus", handleResume);
          window.removeEventListener("blur", handlePause);
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        };
      }, [plugin]);

      // Early return if no children
      if (childrenArray.length === 0) {
        return null;
      }

      // Render indicators
      const indicators = showIndicators && count > 0 && (
        <div
          className={`flex justify-center gap-2 ${
            indicatorPosition === "bottom" ? "mt-4" : "mb-4"
          }`}
          role="tablist"
          aria-label="Carousel navigation"
        >
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === current
                  ? "bg-gray-800 dark:bg-gray-200 w-8"
                  : "bg-gray-300 dark:bg-gray-600 w-1.5 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === current}
              role="tab"
              tabIndex={index === current ? 0 : -1}
            />
          ))}
        </div>
      );

      return (
        <div className={`w-full overflow-hidden ${className}`}>
          {indicatorPosition === "top" && indicators}

          <Carousel
            opts={carouselOpts}
            plugins={[plugin]}
            className="w-full relative group"
            setApi={setApi}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent
              className="flex py-2"
              style={{
                marginLeft: `-${gap}px`,
                touchAction: "pan-y pinch-zoom", // Better mobile touch handling
              }}
            >
              {childrenArray.map((child, index) => (
                <CarouselItem
                  key={`carousel-item-${index}`}
                  className={`basis-auto flex-shrink-0 min-w-0 max-sm:w-[380px] select-none ${itemClassName}`}
                  style={{ paddingLeft: `${gap}px` }}
                  aria-label={`Slide ${index + 1} of ${childrenArray.length}`}
                >
                  {child}
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {showNavigation && (
              <>
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#A7F1E0] text-primary hover:opacity-80 transition-opacity h-10 w-10 md:h-12 md:w-12 shadow-sm z-10 sm:flex"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#A7F1E0] text-primary hover:opacity-80 transition-opacity h-10 w-10 md:h-12 md:w-12 shadow-sm z-10 sm:flex"
                  aria-label="Next slide"
                >
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </>
            )}
          </Carousel>

          {indicatorPosition === "bottom" && indicators}
        </div>
      );
    }
  );

InfiniteHorizontalScroll.displayName = "InfiniteHorizontalScroll";

export type { InfiniteHorizontalScrollProps };
