"use client";

import { type ReactNode } from "react";
// Neutralized Translation Context to improve performance for Pan India codebase
// where multi-language support is no longer needed.

export function TranslationProvider({
  children,
}: {
  children: ReactNode;
  dictionary?: any;
}) {
  return <>{children}</>;
}

export function useTranslation() {
  return { dictionary: {}, t: (key: string) => key };
}

export function deepTranslate(data: any, t?: (key: string) => string): any {
  // Since we neutralized translations, just return the data as-is.
  return data;
}
