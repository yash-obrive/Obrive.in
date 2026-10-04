"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedNavLabelProps {
  children: ReactNode;
  iconSize?: number;
  icon?: ReactNode;
  shiftDirection?: "left" | "right";
  color?: "white" | "black";
  gap?: number;
}

export default function AnimatedNavLabel({
  children,
  iconSize = 12,
  icon,
  shiftDirection = "right",
  color = "white",
  gap = 10,
}: AnimatedNavLabelProps) {
  const shiftAmount = iconSize + gap;
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const dir = getComputedStyle(containerRef.current).direction;
      setIsRTL(dir === "rtl");
    }
  }, []);

  // In RTL: flip x direction so icon slides in from the right
  const dir = isRTL ? -1 : 1;

  const DefaultIcon = isRTL ? (
    <ArrowLeft strokeWidth={3} size={iconSize} color={color} />
  ) : (
    <ArrowRight strokeWidth={3} size={iconSize} color={color} />
  );

  return (
    <motion.span
      ref={containerRef}
      className="relative inline-flex items-center"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* icon slides in from correct direction */}
      <motion.span
        className="absolute start-0 flex items-center justify-center"
        style={{
          width: shiftAmount,
          height: iconSize + 4,
          overflow: "hidden",
          top: "50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
        variants={{
          rest: { x: -shiftAmount * dir, opacity: 0 },
          hover: { x: 0, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        {icon ?? DefaultIcon}
      </motion.span>

      {/* text shifts in correct direction when icon appears */}
      <motion.span
        className="relative"
        variants={{
          rest: { x: 0 },
          hover: {
            x:
              shiftDirection === "left"
                ? -shiftAmount * dir
                : (shiftAmount + 4) * dir,
          },
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
