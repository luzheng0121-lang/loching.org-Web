# Chinglo — Notebook

An editorial archive site for a practice spanning book design, sound art,
and visual research. Built as a static site: no build step, no framework,
no dependencies beyond two font services.

## Why it's built this way

The brief asked for something closer to a well-designed publication than
a marketing site — calm, typographic, restrained. Every decision below
traces back to that.

**The hero is a table of contents, not a tagline.**
The truest thing about this practice is that it holds several disciplines
together through deliberate structure, not improvisation. So instead of a
headline + subhead + CTA, the second spread is a literal contents page —
five chapters, numbered and weighted identically. The numbering is
intentional, not decorative: this is the way the practice itself works,
not a generic "01/02/03" applied to content that isn't actually
sequential elsewhere on the page (the work-card grids and research grid
deliberately do *not* reuse the numbering convention as a sequence — they
use small roman/arabic marks the way a printed plate list would, which is
a labeling device, not a step-by-step claim).

**A running head instead of a navbar.**
`#main`'s only persistent UI is a fixed header styled like a printed
book's running header: a mark, the current chapter name, and a folio
(page) number. It updates via `IntersectionObserver` as you scroll
(`js/folio.js`), exactly the way a running head updates as you turn
pages — it states where you are, it doesn't ask you to do anything.
`mix-blend-mode: difference` lets it sit on both light and dark areas
without per-section overrides.

**No accent color.**
The palette is paper, ink, and two intermediate grays — no third hue.
Hierarchy comes from type size, weight, and space, the way it would on a
printed page, rather than from a color system. (A warm-cream +
serif + terracotta-accent palette is the current default look for
AI-generated editorial sites; this project deliberately avoids it by
staying fully monochrome instead of choosing a "softer" accent.)

**Motion is a page settling, not a reveal.**
Each spread fades and rises 14px into place the first time it's ~15%
visible (`js/reveal.js` + `css/motion.css`), then never animates again on
that visit. No parallax, no staggered list animations, no scroll-jacking.
`prefers-reduced-motion` disables it entirely at the CSS layer.

## Structure

```
index.html
css/
  reset.css        — removes browser defaults, nothing else
  tokens.css        — single source of truth: color, type, spacing, motion
  layout.css         — grid system, running head, spread/page rhythm
  components.css       — typographic components (toc, cards, lists, colophon)
  motion.css             — the one reveal animation, and its reduced-motion override
js/
  folio.js          — drives the running head's section name + folio number
  reveal.js          — adds .is-visible to each spread on first scroll-into-view
assets/
  fonts/             — reserved for self-hosting fonts later if needed
  images/             — reserved for real plates/photography
README.md
```

## Typography

- **Newsreader** (serif) — every headline and all reading text. Carries
  the editorial voice.
- **Inter** (grotesque sans) — labels, captions, metadata only. Always
  reads as scaffolding, never as voice.
- **Space Mono** — folio numbers, kickers, the running head. Borrowed
  from the convention of a printer's proof mark.

Loaded via Google Fonts in `<head>`. To self-host instead (recommended
for production, for both performance and not depending on a third-party
request): download the relevant weights into `assets/fonts/`, add
`@font-face` rules to the top of `css/tokens.css`, and remove the Google
Fonts `<link>` tags from `index.html`.

## Extending the site

The architecture is built to take the future sections named in the brief
(Publications, Talks, Exhibitions, CV) without restructuring:

1. Add a new `<section class="spread spread--chapter">` to `index.html`,
   following the pattern of the existing chapter spreads — a
   `data-folio` and `data-section-name` attribute, a `chapter-num` +
   `chapter-title` + `chapter-intro`, then whatever grid or list fits the
   content (reuse `.work-grid`, `.research-grid`, or `.journal-list`, or
   add a new pattern to `components.css` following the same structure).
2. Add a corresponding `<li class="toc__item">` to the contents spread.
3. Renumber `data-folio` values sequentially if inserting a section
   mid-sequence — the running head and contents page both read directly
   from these attributes, there is no hardcoded count elsewhere.

No section depends on a fixed total page count or fixed grid-column
count elsewhere in the codebase, so this can grow indefinitely.

## Browser support / performance

- No JS framework; ~50 lines of vanilla JS total, both files using
  `IntersectionObserver` (supported in all browsers in active use).
- No build step — open `index.html` directly, or serve the folder with
  any static server.
- No layout-shifting images yet (placeholder plates are inline SVG); when
  real photography is added, give each `<img>` explicit `width`/`height`
  or `aspect-ratio` and a `loading="lazy"` attribute on any image below
  the first spread, consistent with the aspect-ratio already set on
  `.work-card__plate`.
- Two Google Fonts requests via `preconnect` + a single combined
  stylesheet request — minimal for a typography-led site; self-host (see
  above) to remove the dependency entirely.
