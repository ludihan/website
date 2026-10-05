"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screenshot } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

type Labels = { enlarge: string; close: string; prev: string; next: string; show: string; screenshots: string };

// A lit stage for a project's screenshots. Wide ones play in a browser window, picked from
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
  const shot = shots[index];
  const tall = shots[0].height > shots[0].width;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length);
  const eager = (i: number) => priority && i === 0 && ({ loading: "eager", fetchPriority: "high" } as const);

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
                <Image src={s.src} width={s.width} height={s.height} alt={s.alt[lang]} {...eager(i)} />
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
              <span className="window-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {/* All stacked in one cell and cross-faded, so switching never waits on a download. */}
              <span className="window-view">
                {shots.map((s, i) => (
                  <Image
                    key={s.src}
                    src={s.src}
                    width={s.width}
                    height={s.height}
                    alt={i === active ? s.alt[lang] : ""}
                    className={i === active ? "is-active" : undefined}
                    {...eager(i)}
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
                  <Image src={s.src} width={s.width} height={s.height} alt="" {...eager(i)} />
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
        onClose={() => !tall && setActive(index)}
      >
        {/* Keyed so each new screenshot remounts and fades in. */}
        <Image key={shot.src} src={shot.src} width={shot.width} height={shot.height} alt={shot.alt[lang]} />
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
