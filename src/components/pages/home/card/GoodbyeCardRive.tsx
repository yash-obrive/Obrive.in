"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";

const RIVE_SRC = "/animations/goodbye-card.riv";
const STATE_MACHINE_NAME = "talk to expert for page";

type GoodbyeCardRiveProps = {
  className?: string;
};

export default function GoodbyeCardRive({ className }: GoodbyeCardRiveProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    autoplay: false,
    stateMachines: [STATE_MACHINE_NAME],
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (!rive || !containerRef.current) {
      return;
    }

    const node = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          rive.resizeDrawingSurfaceToCanvas();
          rive.play();
        } else {
          rive.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
      rive.pause();
    };
  }, [rive]);

  const combinedClassName = [
    "flex items-center justify-center w-full h-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={combinedClassName}>
      <RiveComponent className="w-full h-full" />
    </div>
  );
}
