"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { JOIN_TEAM_CARD } from "@/constants/pages/career/join-team-card";
import JoinTeamCards from "./card/JoinTeamCards";
import { useIsRTL } from "@/hooks/useIsRTL";

export default function JoinTeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = JOIN_TEAM_CARD.length;
  const isRTL = useIsRTL();

  const scrollToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const scrollToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

  const scrollToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // auto scrolling
  useEffect(() => {
    const autoScroll = setInterval(() => {
      scrollToNext();
    }, 4000);

    return () => clearInterval(autoScroll);
  }, [scrollToNext]);

  // In RTL, slide direction is positive (right → left visual = negative logical)
  const translateValue = isRTL
    ? `translateX(${currentIndex * 100}%)`
    : `translateX(-${currentIndex * 100}%)`;

  return (
    <div className="flex gap-8 max-sm:px-4 flex-col items-center justify-center py-16">
      <div className="w-full max-w-[1238px] overflow-hidden relative">
        <div
          className="flex transition-transform duration-1500 ease-in-out"
          style={{ transform: translateValue }}
        >
          {JOIN_TEAM_CARD.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="mx-auto">
                <JoinTeamCards {...card} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* In RTL: ArrowLeft visually means "go forward" (next), ArrowRight means "go back" (prev) */}
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full hover:bg-primary/10 transition-colors"
          onClick={isRTL ? scrollToNext : scrollToPrev}
          aria-label="Previous"
        >
          <ArrowLeft />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full hover:bg-primary/10 transition-colors"
          onClick={isRTL ? scrollToPrev : scrollToNext}
          aria-label="Next"
        >
          <ArrowRight />
        </Button>
      </div>

      {/* indicator dots */}
      <div className="flex gap-2">
        {JOIN_TEAM_CARD.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
