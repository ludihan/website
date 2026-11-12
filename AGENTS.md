<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design language

The site is set in the Swiss International Style of Müller-Brockmann, Ruder and Hofmann: a
strict grid, one neo-grotesk, type as the image, rules instead of boxes, flush-left text and
one colour used as a solid field. Keep to this system when changing or adding UI. Everything
visual lives in `app/globals.css` (tokens at the top, then one block per component); its header
comment summarises the rules below.

## Foundations

- **Typeface.** Inter, a neo-grotesk in the Helvetica line, for everything, with its optical-size
  axis on (`lib/fonts.ts`). Two weights only, 400 and 700; there is no 500 or 600. Geist Mono only
  for code in blog posts. The Open Graph images (`lib/og.tsx`) use Inter too.
- **Type scale.** Ratio 1.5, as tokens: `--t-cap` 13px (labels, captions, dates in tables),
  `--t-1` 16px (body), `--t-2` 24px, `--t-3` 36px, `--t-4` 54px, `--t-5` 81px. `--t-2` to
  `--t-5` are fluid and shrink on small screens. Only three sizes sit outside the scale, all
  display type: the cover name (5–15rem; 27vw on phones), page titles (4–12rem) and project
  numerals (4–9rem). Large type is bold with tight tracking (about -0.045em to -0.065em) and tight
  leading (0.8–1.1); body text is 1.5.
- **Grid.** 12 columns edge to edge, `--margin` and `--gutter` both 1–2rem, read as four fields
  of three columns. Labels, dates, numerals and facts sit in the first field (columns 1–3);
  content starts at column 4; a link or action closing a row sits in the last field (10–12).
  Nothing is centred; text is flush left, ragged right. Measures: body text 60ch, statements
  26em, the cover statement 30em, blog posts 44rem.
- **Colour.** Warm paper `--paper #f1efe9` (with `--paper-2 #e4e1d8` behind screenshots), ink
  `--ink #0f0f0e`, ultramarine `--blue #1c3fd1`. Quieter text and rules are the ink at lower
  opacity, never another grey: `--ink-2` 86% (running text), `--soft` 62% (labels), `--faint` 35%
  (separators), `--rule` 18% (hairlines). Blue is a solid field (the home cover, the colophon
  row hover) and a signal (numerals, links, the current section's number). Ink is the second
  field (the colophon). Light only: there is no dark mode.
- **Rules.** A 3px ink rule opens every section, project, empty blog list and post navigation;
  1px ink rules open tables, page leads and the project figures' captions, and close the
  masthead; 18% ink hairlines divide rows. In the colophon the rules are paper at 30%. No boxes,
  cards, shadows, gradients or rounded corners (the only exception is the 3px blue bar under the
  current filmstrip thumbnail).
- **Numbering.** Sections are numbered 01, 02… in blue at the size and weight of their title;
  each project carries a very large blue numeral in the first field; features are numbered 01–04
  in blue; the masthead nav is numbered 01, 02; the colophon's contact rows are 01–03; focus
  areas are lettered a–d in blue.
- **Typography details.** Curly quotes and apostrophes, `…` not `...`, tabular figures for dates
  and numbers, balanced headings, pretty-wrapped statements. Tech lists are plain comma-separated
  text (`components/Tags.tsx`), never chips.

## Components

- **Masthead** (`components/SiteHeader.tsx`). One sticky row on paper with a 1px ink rule
  below: name and role in the first field, the numbered nav (lower case) from column 4, the
  language switch (`en / pt`) in the last field. The current section's number turns blue.
- **Section head** (`components/SectionHead.tsx`). 3px rule, blue numeral in the first field and
  the title from column 4, both at `--t-4` bold, an optional "→" link in the last field.
- **Page head** (`components/PageIntro.tsx`). The page title very large and bold, flush left,
  with room below for descenders; then an optional lead row over a 1px rule, facts in the first
  field and a `--t-3` statement from column 4.
- **Facts.** Small label (62% ink) over value (ink), stacked in the first field.
- **Rows** (`components/ResumeRow.tsx`). Period in the first field, title (`--t-2` bold) and
  organisation from column 4, detail from column 8 with its tech list below. Skills use the same
  rows: group name in bold, list from column 4.
- **Contact links** (`components/ProfileLinks.tsx`). Email, LinkedIn ↗, GitHub ↗, always in that
  order, one per line, underlined.
- **Gallery** (`components/ProjectGallery.tsx`). Wide screenshots in a hairline frame with a row
  of thumbnails below; switching cross-fades. The frame is capped by the window height
  (`max-width: min(100%, 88svh)`) so the image and its thumbnails always fit on one screen. Phone
  screenshots stand whole, side by side, on a `--paper-2` stage. Any image opens full size in a
  native `<dialog>` lightbox.
- **Colophon** (`components/SiteFooter.tsx`). A black field closing every page: "Contact", then
  the three channels as an index, one row each: number and name in the first field, the address
  at `--t-4` bold from column 4, the copy button (email) or ↗ in the last field. The whole row is
  the link and fills blue under the pointer. Below, a small row with ©, RSS (once there are
  posts) and "Back to top ↑".

## Pages

- **Home** (`components/home/Home.tsx`). A full-height ultramarine cover: an information line
  across the top (Based in, Local time, Currently, Contact), the name stacked in two lines at the
  bottom left and the statement at the bottom right. Then 01 Selected work as a modular field of
  three projects, each a 4:3 figure (the top-left of the screenshot enlarged to 175%, or an
  upright phone screen with its foot running off the frame), a rule with number and dates, the
  name at `--t-3`, tagline and tech. Then 02 Experience as rows.
- **Projects** (`app/[lang]/projects/page.tsx`, `components/ProjectCard.tsx`). No intro: the
  title, then each project under a 3px rule. The first field holds the numeral and the facts
  (timeline, licence, tech, source); from column 4 come the name at `--t-5`, the tagline, the
  gallery, then the description at `--t-2` and the numbered features side by side.
- **About** (`components/about/AboutPage.tsx`). Title; facts (including Contact) beside the
  summary; then 01 What I work on (four columns lettered a–d), 02 Experience, 03 Education (with
  coursework and the grade in the detail column), 04 Skills.
- **Blog.** The list is rows of date, title (`--t-3` bold) with description, and reading time.
  A post starts at column 4. The blog's nav link, the colophon RSS link and the 404 blog link
  stay hidden until there is a published post (`getSlugs(lang).length > 0`).
- **404** (`app/global-not-found.tsx`). "404" as the page title, then the message and links in
  the lead row.

## Behaviour

- **Mobile (800px and below).** The grid collapses to one column, except section heads, where
  the numeral and title stay on one line. The masthead is one row (name, nav, language; the role
  and nav numbers are hidden). The cover's information line becomes two columns. Every layout
  works from 320px, and links are at least 44px tall. Anchor jumps land below the sticky
  masthead (`scroll-padding-top`).
- **Motion.** Only responses to the pointer: project names turning blue, the colophon row fill,
  link colour changes, the screenshot cross-fade and thumbnail fade. No entrance or scroll
  animations; `prefers-reduced-motion` removes the transitions.

## Owner preferences

Decisions the owner has made along the way; follow them unless they say otherwise.

- Real Swiss International Style, as in the print work of the 1950s–60s, not a generic
  "minimal" look. Don't use or install the `swiss-design` skill (`zeke/swiss-design-skill`):
  the owner tried it and rejected its IBM Plex, stone palette, light headings, uppercase labels,
  centred container and dark mode.
- Keep the warm paper and ultramarine palette, light only. Don't add a dark mode.
- Contact links are always email, LinkedIn, GitHub, and must stay easy to find.
- Show a change visually before calling it done: check desktop (about 1440px) and phone
  (about 390px) widths.
- Commit each change separately with a plain message; push only when asked.
