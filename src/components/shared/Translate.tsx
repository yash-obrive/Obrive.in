"use client";
import { useTranslation } from "@/context/TranslationContext";
import React from "react";

export default function Translate({ text }: { text: string }) {
  const { dictionary } = useTranslation();
  const dict = dictionary as Record<string, string>;
  return <span suppressHydrationWarning>{dict[text] || text}</span>;
}
