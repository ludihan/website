type PostModule = typeof import("*.md");

// Every blog post, keyed by its path from this folder ("./en/blog/hello.md"). It lives here
// because import.meta.glob only matches files beside or below the file that calls it. Unlike a
// dynamic import, a glob still compiles when nothing matches, so the blog can have no posts.
export const postModules = import.meta.glob("./*/blog/*.md") as Record<string, () => Promise<PostModule>>;
