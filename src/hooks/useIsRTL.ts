"use client";
import { useEffect, useState } from "react";

/**
 * Returns true when the current page is rendered in RTL direction (e.g. Arabic).
 * Reads the `dir` attribute from the <html> element which is set by the root layout.
 */
export function useIsRTL(): boolean {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl");
  }, []);

  return isRTL;
}
