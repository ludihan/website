// Adds the `frontmatter` export (remark-mdx-frontmatter) to @types/mdx.
declare module "*.md" {
  export const frontmatter: import("@/lib/content").Frontmatter;
  const Content: () => React.JSX.Element;
  export default Content;
}

declare module "*.mdx" {
  export const frontmatter: import("@/lib/content").Frontmatter;
  const Content: () => React.JSX.Element;
  export default Content;
}
