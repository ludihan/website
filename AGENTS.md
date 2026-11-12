<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design language

The site follows the Swiss (International Typographic) Style of Müller-Brockmann, Ruder and
Hofmann: a strict grid running edge to edge, one grotesk in strong weights, hairline rules,
flush-left text and a single accent colour. Keep to this when changing or adding UI.

- **Typeface.** Inter, a neo-grotesk in the Helvetica line, for everything from captions to the
  display name, with its optical-size axis on (`lib/fonts.ts`). Geist Mono only for code in blog
  posts. Hierarchy comes from size, weight and opacity, never a second family.
- **Strong weights.** The name, page titles and project and post titles are bold (700) and
  tightly tracked; section titles 600; row and item titles 600; running text 400. Contrast comes
  from weight more than from sheer size.
- **One very large thing.** The name is the only oversized element (up to 9rem), set against
  small text for Swiss scale contrast. Everything else stays moderate: the owner asked that
  nothing else be oversized. Page titles top out at 4.5rem, section gaps at 5rem. Keep new
  elements within the type scale at the top of `app/globals.css` (`--text-small` to
  `--text-headline`).
- **Palette: warm paper, ink and one blue, light only.** Paper `#f1efe9`, surfaces `#e6e3db`,
  ink `#0f0f0e`, and ultramarine `#1c3fd1` (from the owner's LinkedIn banner) as the one accent,
  used for links, section numbers, the current-page dot, the hover fill on index rows and the
  full-bleed contact footer.
  There is no dark mode: the owner prefers this light palette, so don't add one.
- **Hierarchy by opacity.** Quieter text and the grey rules are the ink at lower opacity
  (`--ink-2` 85%, `--soft` 70%, `--faint` 40%, `--rule` 16%), never another grey or hue.
- **Grid.** A 12-column grid on an 8px base running edge to edge (no centred container), with a
  16px gutter and page margin on phones and 32px from 768px. Labels and dates start at column 1, content at
  column 4. Text is flush left, ragged right; nothing is centred. Body text stays within 60ch.
- **Labels.** Labels (meta, facts, dates, the footer label) are small, normal case, at 70% ink.
  No uppercase or letter-spaced captions.
- **Hairlines, not boxes.** A 2px ink rule opens each section, 1px ink rules open the page intro
  and tables, and 16% ink rules separate rows. No cards,
  shadows, gradients or rounded corners (the current-page dot is the only round shape).
- **Content as tables and indexes.** Projects are a numbered index; experience, education and
  skills are rows of label and detail; sections are numbered from 01, the numerals set in blue
  at the size and weight of the section title; screenshots are captioned
  figures ("Fig. 1"). Tech lists are plain comma-separated text, never chips.
- **Typography details.** Curly quotes and apostrophes, `…` not `...`, tabular figures for dates
  and numbers, balanced headings.
- **Header.** The nav links and language codes are lower case. The nav bar sticks to the top of the screen, on paper with a 16% ink hairline
  under it; on phones it is a single row (name left, links right) to keep it short.
- **Mobile.** Every layout must work from 320px. Links are at least 44px tall on phones.
- **Almost no motion.** Only responses to the pointer: the row hover fill, the email underline,
  the screenshot cross-fade. No entrance or scroll animations, and respect reduced motion.
