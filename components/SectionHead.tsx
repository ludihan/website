import Link from "next/link";

// A section opens on a heavy rule with its numeral and title set at the same size: the numeral
// in blue in the first three columns, the title from column 4, an optional link at the end.
export function SectionHead({ n, title, more }: { n: number; title: string; more?: { href: string; label: string } }) {
  return (
    <header className="sec-head grid">
      <span className="sec-no">{String(n).padStart(2, "0")}</span>
      <h2 className="sec-title">{title}</h2>
      {more && (
        <Link href={more.href} className="sec-more">
          {more.label} →
        </Link>
      )}
    </header>
  );
}
