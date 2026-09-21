"use client";

import { useEffect } from "react";

export function Redirect({
  locales,
  defaultLocale,
}: {
  locales: readonly string[];
  defaultLocale: string;
}) {
  useEffect(() => {
    const preferred = navigator.languages
      .map((l) => l.split("-")[0])
      .find((l) => locales.includes(l));
    window.location.replace(`/${preferred ?? defaultLocale}`);
  }, [locales, defaultLocale]);
  return null;
}
