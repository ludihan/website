"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

// Marks the link for the current section, including its sub-pages (a blog post highlights "blog").
// The highlight shares one view transition name, so it slides from the old link to the new one.
export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return links.map(({ href, label }) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link key={href} href={href} className="nav-link" aria-current={active ? "page" : undefined}>
        {active && (
          <ViewTransition name="nav-pill" share="pill" enter="pill-in" exit="pill-out" default="none">
            <span className="nav-pill" aria-hidden="true" />
          </ViewTransition>
        )}
        <span className="nav-label">{label}</span>
      </Link>
    );
  });
}
