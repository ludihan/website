"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screenshot } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

type Labels = { enlarge: string; close: string; prev: string; next: string; show: string; screenshots: string };

// A lit stage for a project's screenshots. Wide ones play in a framed screen, picked from
// a filmstrip below; phone ones stand side by side. Any of them opens in a native <dialog>
// preview, which brings focus trapping, Esc to close and a backdrop for free.
export function ProjectGallery({
  shots,
  lang,
  labels,
  priority = false,
}: {
  shots: Screenshot[];
  lang: Locale;
  labels: Labels;
  /** Load the first screenshot right away: it's the page's largest image above the fold. */
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  // `active` is the one on the stage, `index` the one in the preview.
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  // The preview image only exists while the dialog is open. Left in the page, a lazy copy of
  // the first screenshot makes Next.js report the eager one on the stage as a lazy LCP image.
  const [isOpen, setIsOpen] = useState(false);
  const shot = shots[index];
  const tall = shots[0].height > shots[0].width;
  const imageProps = (s: Screenshot, alt: string, i?: number) => ({
    src: s.src,
    width: s.width,
    height: s.height,
    alt,
    ...(priority && i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {}),
  });

  const open = (i: number) => {
    setIndex(i);
    setIsOpen(true);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length);
  return (
    <>
      {tall ? (
        <div className="showcase is-tall">
          <div className="stage">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className="device"
                aria-label={`${labels.enlarge}: ${s.alt[lang]}`}
                onClick={() => open(i)}
              >
                <Image {...imageProps(s, s.alt[lang], i)} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="showcase">
          <button
            type="button"
            className="stage"
            aria-label={`${labels.enlarge}: ${shots[active].alt[lang]}`}
            onClick={() => open(active)}
          >
            <span className="window">
              {/* All stacked in one cell and cross-faded, so switching never waits on a download. */}
              <span className="window-view">
                {shots.map((s, i) => (
                  <Image
                    key={s.src}
                    {...imageProps(s, i === active ? s.alt[lang] : "", i)}
                    className={i === active ? "is-active" : undefined}
                  />
                ))}
              </span>
            </span>
          </button>
          {shots.length > 1 && (
            <div className="filmstrip" role="group" aria-label={labels.screenshots}>
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`${labels.show}: ${s.alt[lang]}`}
                  onClick={() => setActive(i)}
                >
                  <Image {...imageProps(s, "", i)} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={shot.alt[lang]}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        // Leave the stage on whatever was last looked at.
        onClose={() => {
          setIsOpen(false);
          if (!tall) setActive(index);
        }}
      >
        {/* Keyed so each new screenshot remounts and fades in. */}
        {isOpen && (
          <Image key={shot.src} {...imageProps(shot, shot.alt[lang])} />
        )}
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
