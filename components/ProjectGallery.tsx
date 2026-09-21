"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screenshot } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

type Labels = { enlarge: string; close: string; prev: string; next: string };

// Thumbnails that open a native <dialog> preview. The dialog brings focus trapping,
// Esc to close and a backdrop for free; arrows/click are the only extras handled here.
export function ProjectGallery({
  shots,
  lang,
  labels,
}: {
  shots: Screenshot[];
  lang: Locale;
  labels: Labels;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const shot = shots[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length);

  return (
    <>
      <div className="gallery">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className="thumb"
            aria-label={`${labels.enlarge}: ${s.alt[lang]}`}
            onClick={() => open(i)}
          >
            <Image src={s.src} width={s.width} height={s.height} alt={s.alt[lang]} />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={shot.alt[lang]}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt[lang]} />
        <div className="lightbox-bar">
          <button type="button" onClick={() => step(-1)} aria-label={labels.prev}>
            ‹
          </button>
          <span>
            {shot.alt[lang]} · {index + 1}/{shots.length}
          </span>
          <button type="button" onClick={() => step(1)} aria-label={labels.next}>
            ›
          </button>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label={labels.close}
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
