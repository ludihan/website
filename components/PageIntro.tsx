import type { ReactNode } from "react";

// A page title, then the intro on the grid: an optional column of facts or links from column 1,
// the statement from column 4. Like the hero, so the text never floats alone between two rules.
export function PageIntro({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <h1 className="display display-page">{title}</h1>
      <div className="grid hero-body">
        {children}
        <p className="statement">{description}</p>
      </div>
    </header>
  );
}
