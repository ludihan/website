<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design language

The site uses the Swiss International Style as defined by the **swiss-design** skill
(`zeke/swiss-design-skill`), adapted to this codebase. Read the skill before changing or adding UI.

## Install the skill first

If the `swiss-design` skill isn't available in your session, install it before touching the UI:

```sh
npx skills add zeke/swiss-design-skill
```

Then load it (in Claude Code: the `swiss-design` skill, or `/swiss-design`) and follow it, with
the site-specific decisions below taking precedence where they differ.

## Site-specific decisions

- **Typeface.** IBM Plex Sans for everything (weights 300, 400, 500), IBM Plex Mono only for code
  in blog posts (`lib/fonts.ts`). Hierarchy comes from size, weight and opacity, never a second
  family.
- **Headings are light.** Display, page titles, section titles and project names are weight 300
  with slight negative tracking; row and item titles are 400. Never bold. Emphasis is 500.
- **Not too big.** The owner asked that nothing be oversized. The name tops out at 6rem, page
  titles at 4.5rem, section gaps at 5rem. Keep new elements within the type scale at the top of
  `app/globals.css` (`--text-caption` to `--text-headline`).
- **Palette: stone and one accent, light only.** Page stone-50 `#fafaf9`, surfaces stone-100,
  ink stone-900 `#1c1917`, rules stone-200. The accent is cobalt `#003b8e`, used for links,
  section numbers, the current-page dot, the hover fill on index rows and the full-bleed contact
  footer. There is no dark mode: the owner prefers the light palette, so don't add one.
- **Hierarchy by opacity.** Quieter text is the ink at lower opacity (`--ink-2` 85%, `--soft`
  70%, `--faint` 40%), never another grey or hue.
- **Grid.** A 12-column grid on an 8px base inside a centred `max-w-6xl` (72rem) container, with
  a 16px gutter on phones and 32px from 768px. Labels and dates start at column 1, content at
  column 4. Text is flush left, ragged right; nothing is centred. Body text stays within 60ch.
- **Captions.** Labels (meta, facts, skill groups, the footer label) are 12px uppercase with
  wide tracking, at 70% ink.
- **Hairlines, not boxes.** Ink rules open sections; stone-200 rules separate rows. No cards,
  shadows, gradients or rounded corners (the current-page dot is the only round shape).
- **Content as tables and indexes.** Projects are a numbered index; experience, education and
  skills are rows of label and detail; sections are numbered from 01; screenshots are captioned
  figures ("Fig. 1"). Tech lists are plain comma-separated text, never chips.
- **Typography details.** Curly quotes and apostrophes, `…` not `...`, tabular figures for dates
  and numbers, balanced headings.
- **Mobile.** Every layout must work from 320px. Links are at least 44px tall on phones.
- **Almost no motion.** Only responses to the pointer: the row hover fill, the email underline,
  the screenshot cross-fade. No entrance or scroll animations, and respect reduced motion.
