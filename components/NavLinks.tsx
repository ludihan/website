"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Marks the link for the current section, including its sub-pages (a blog post highlights "blog").
export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return links.map(({ href, label }) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link key={href} href={href} className="nav-link" aria-current={active ? "page" : undefined}>
        {label}
      </Link>
    );
  });
}
