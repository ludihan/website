<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design language

The site is set in the Swiss International Style of Müller-Brockmann, Ruder and Hofmann: a
strict grid, one neo-grotesk, type as the image, rules instead of boxes, flush-left text and a
single colour used as a solid field. Keep to this system when changing or adding UI. The
stylesheet is `app/globals.css`; its header comment summarises the rules below.

- **Typeface.** Inter (a neo-grotesk in the Helvetica line) for everything, with its
  optical-size axis on (`lib/fonts.ts`). Two weights only: 400 and 700. Geist Mono only for code
  in blog posts.
- **Type scale.** Modular, ratio 1.5: `--t-cap` 13px, `--t-1` 16px, then `--t-2` to `--t-5`
  (24, 36, 54, 81px, fluid on small screens). The cover name, page titles and project numerals
  are the only sizes outside the scale. Large type is bold, tightly tracked and tightly led.
- **Grid.** 12 columns edge to edge, read as four fields of three columns. Labels, dates,
  numerals and facts sit in the first field (columns 1–3); content starts at column 4. Nothing is
  centred; text is flush left, ragged right; body text stays within 60ch.
- **Colour.** Warm paper `#f1efe9`, ink `#0f0f0e`, ultramarine `#1c3fd1`. Blue is used as a
  solid field (the home cover) and as signal (numerals, links, the current section). Ink is the
  second field (the colophon). Quieter text and rules are the ink at lower opacity. Light only:
  no dark mode.
- **Rules.** A 3px ink rule opens each section and project; 1px ink rules open tables and page
  leads; 18% ink hairlines divide rows. No boxes, cards, shadows, gradients or rounded corners.
- **Numbering.** Sections are numbered 01, 02… in blue at the size of their title; projects
  carry a very large blue numeral in the first field; features are numbered 01–04; the nav is
  numbered too. Focus areas are lettered a–d.
- **Pages.**
  - Masthead: one sticky row (name and role, numbered nav, language), lower-case nav.
  - Home: a full-height ultramarine cover with an information line at the top, the name
    stacked in two lines at the bottom left and the statement at the bottom right; then the
    projects as a modular field of three (figure, rule, number and date, name, tagline, stack);
    then experience as a table.
  - Projects: numeral and facts in the first field; name, screenshots, description and
    numbered features from column 4.
  - Colophon: a black field closing every page, with the email set large from column 4.
- **Content as tables.** Experience, education and skills are rows of label and detail. Tech
  lists are plain comma-separated text, never chips.
- **Typography details.** Curly quotes and apostrophes, `…` not `...`, tabular figures for dates
  and numbers, balanced headings.
- **Mobile.** Every layout works from 320px; the grid collapses to one column, except section
  heads (numeral and title stay on one line). The masthead is one row. Links are at least 44px
  tall.
- **Motion.** Only responses to the pointer: name colour on project hover, the email underline,
  the screenshot cross-fade. No entrance or scroll animations; reduced motion is respected.
