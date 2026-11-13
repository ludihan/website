"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The sections as a numbered list: 01 about, 02 projects. Marks the current one, including its
// sub-pages (a blog post marks "blog"). With `highlight` off, marks none, for pages built without
// knowing their path (the 404).
export function NavLinks({ links, highlight = true }: { links: { href: string; label: string }[]; highlight?: boolean }) {
  const pathname = usePathname();
  return links.map(({ href, label }, i) => {
    const active = highlight && (pathname === href || pathname.startsWith(`${href}/`));
    return (
      <Link key={href} href={href} className="nav-link" aria-current={active ? "page" : undefined}>
        <span className="nav-no">{String(i + 1).padStart(2, "0")}</span>
        {label}
      </Link>
    );
  });
}
