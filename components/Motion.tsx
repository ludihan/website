"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

// Small page-wide behaviours that CSS can't do on its own:
// - `[data-spotlight]` elements get --mx/--my set to the pointer position, for a glow that follows it.
// - `[data-play]` elements get `data-playing` once they scroll into view, to start a one-off animation.
// - `[data-loop]` elements get `data-paused` while out of view, so endless animations stop drawing.
// - <html> gets `data-navigated` after the first in-app navigation, so first-load entrances don't replay.
// Without JavaScript none of this runs, and everything renders in its finished state.
export function Motion() {
  const pathname = usePathname();
  const firstPathname = useRef(pathname);

  // A layout effect runs before the new page is painted, so it never shows a frame mid-entrance.
  useLayoutEffect(() => {
    if (pathname !== firstPathname.current) document.documentElement.dataset.navigated = "";
  }, [pathname]);

  // Pointers can report several moves per frame; only the latest is drawn, once per frame.
  useEffect(() => {
    let last: PointerEvent | null = null;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const e = last!;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
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

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-paused", !e.isIntersecting);
    });
    document.querySelectorAll("[data-loop]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
