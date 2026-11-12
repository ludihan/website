import type { ReactNode } from "react";

// A page opens like a poster: the title set very large and bold, flush left, then an optional
// row on the grid beneath it (facts in the first three columns, a statement from column 4).
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="page-head">
      <h1 className="page-title">{title}</h1>
      {children && <div className="page-lead grid">{children}</div>}
    </header>
  );
}
