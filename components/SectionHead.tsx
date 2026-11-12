import Link from "next/link";

// A numbered section opener on the page grid, with an optional link at the far right.
export function SectionHead({ n, title, more }: { n: number; title: string; more?: { href: string; label: string } }) {
  return (
    <header className="section-head grid">
      <span className="section-no">{String(n).padStart(2, "0")}</span>
      <h2>{title}</h2>
      {more && (
        <Link href={more.href} className="section-more">
          {more.label} →
        </Link>
      )}
    </header>
  );
}
