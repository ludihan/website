import type { Metadata } from "next";
import About, { frontmatter } from "@/content/about.md";

export const metadata: Metadata = { title: frontmatter.title };

export default function Page() {
  return (
    <>
      <h1 className="title">{frontmatter.title}</h1>
      <div className="prose">
        <About />
      </div>
    </>
  );
}
