"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Small page-wide behaviours that CSS can't do on its own:
// - `[data-spotlight]` elements get --mx/--my set to the pointer position, for a glow that follows it.
// - `[data-play]` elements get `data-playing` once they scroll into view, to start a one-off animation.
// Without JavaScript neither runs, and everything renders in its finished state.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Re-run per page: the elements to watch change with every navigation.
  useEffect(() => {
    document.documentElement.dataset.motion = "";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.playing = "";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-play]:not([data-playing])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
