"use client";

import { useEffect, useState } from "react";

// The time where I am, so visitors know whether I'm likely awake. Rendered after mount:
// the page is static, so the server can't know the time a visitor will read it at.
export function LocalTime({ timeZone, locale, fallback }: { timeZone: string; locale: string; fallback: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);
  return <time suppressHydrationWarning>{now ? `${now} · ${fallback}` : fallback}</time>;
}
