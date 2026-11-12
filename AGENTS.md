<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design language

The site follows the Swiss (International Typographic) Style: the grid-and-grotesk school of
Müller-Brockmann, Emil Ruder and Armin Hofmann, as it shows up today in design-studio and
type-foundry portfolio sites. The LinkedIn banner supplied the one colour. Keep to this when
changing or adding UI; the owner has rejected both effect-heavy and generic-minimal redesigns.

What that means here:

- **One typeface.** Schibsted Grotesk for everything, from captions to the display name
  (`lib/fonts.ts`). Hierarchy comes from size and weight, never from a second family. Geist Mono
  is only for code in blog posts.
- **Type as the image.** The name and page titles are set very large, bold and tightly spaced
  (`.display`). There are no illustrations, icons or decorative graphics.
- **A strict 12-column grid, edge to edge.** Every block uses `.grid` and aligns to the same
  columns: labels and dates from column 1, content from column 4. Text is flush left, ragged
  right. Nothing is centred.
- **Hairlines, not boxes.** Black 1px rules open sections; grey ones separate table rows. No
  cards, shadows, gradients, glows or rounded corners (the round copy button is the exception).
- **Paper, ink and one blue.** Warm paper `#f1efe9`, near-black ink `#0f0f0e`, and ultramarine
  `#1c3fd1` used only as a solid: links, the current-page dot, the hover fill on index rows, and
  the full-bleed contact footer. Light theme only. The tokens are at the top of `app/globals.css`.
- **Content set as tables and indexes.** Projects are a numbered index; experience and education
  are rows of date, title, detail; sections are numbered 01–04; screenshots are captioned figures
  ("Fig. 1"). Tech lists are plain comma-separated text, never chips.
- **Compact.** The owner asked several times for less wasted space. Keep section gaps, row
  padding and image sizes tight; screenshots are thumbnails that open full size in the lightbox.
- **Almost no motion.** Only responses to the pointer: the row hover fill, the email underline,
  the screenshot cross-fade. No entrance or scroll animations.

Make targeted changes within this system. Do not swap the palette, drop the numbering, arrows or
hairlines, or add effects without asking first.
