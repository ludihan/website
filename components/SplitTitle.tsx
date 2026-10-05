import { Fragment, type CSSProperties } from "react";

// A page title whose letters rise into place one after another. Screen readers and
// crawlers get the plain text; the per-letter spans are decoration only.
export function SplitTitle({ text }: { text: string }) {
  const words = text.split(" ");
  // Each letter's position in the whole title, so the stagger runs across words.
  const starts = words.map((_, w) => words.slice(0, w).join("").length);
  return (
    <h1 className="title split-title">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={w}>
            {w > 0 && " "}
            <span className="word">
              {[...word].map((ch, c) => (
                <span key={c} className="char" style={{ "--i": starts[w] + c } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
