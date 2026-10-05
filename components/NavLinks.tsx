"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Marks the link for the current section, including its sub-pages (a blog post highlights "blog").
// With `highlight` off, marks none, for pages built without knowing their path (the 404).
export function NavLinks({ links, highlight = true }: { links: { href: string; label: string }[]; highlight?: boolean }) {
  const pathname = usePathname();
  return links.map(({ href, label }) => {
    const active = highlight && (pathname === href || pathname.startsWith(`${href}/`));
    return (
      <Link key={href} href={href} className="nav-link" aria-current={active ? "page" : undefined}>
        {active && <span className="nav-pill" aria-hidden="true" />}
        <span className="nav-label">{label}</span>
      </Link>
    );
  });
}
