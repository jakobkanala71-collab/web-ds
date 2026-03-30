# Anyfin Design System

Token-driven component library for new Anyfin web pages. Built with React + Tailwind CSS v4. All visual decisions live in CSS custom properties — components reference tokens, never hardcoded values.

This system will run alongside the existing Next.js + Styled Components stack. New pages use this system; existing pages remain unchanged.

## Requirements

- **Tailwind CSS v4** — uses `@theme`, `@utility` syntax (not compatible with v3)
- **React 18+**
- **Vite** (or any bundler that supports `import.meta.glob` for the Icon primitive)

## Setup

1. Add Tailwind v4 to the Next.js project
2. Import both CSS files in your entry point:
   ```ts
   import './fonts.css';
   import './tokens.css';
   ```
3. Place `assets/fonts/` where the `fonts.css` `@font-face` declarations can resolve them

## Structure

```
├── tokens.css              ← Tokens, gradients, glass utilities, typography, animations
├── fonts.css               ← @font-face declarations (Anyfin Sans, Neulis Sans)
├── assets/
│   ├── fonts/              ← .woff2 / .woff files
│   ├── icons/              ← SVG icons (loaded by Icon primitive via import.meta.glob)
│   └── images/             ← Section images
├── hooks/
│   └── useInView.ts        ← Intersection Observer hook
├── primitives/             ← Base building blocks
│   ├── Text.tsx            ← Typography (h1–h7, p-xl–p-small)
│   ├── Button.tsx          ← primary, ghost, secondary variants
│   ├── Container.tsx       ← Max-width wrapper with padding
│   ├── Image.tsx           ← Responsive image with radius/aspect tokens
│   ├── Icon.tsx            ← SVG loader from assets/icons
│   └── Divider.tsx         ← Horizontal rule
├── composites/             ← Multi-primitive compositions
│   ├── ScrollEntrance.tsx  ← Scroll-triggered animations
│   ├── ResponsiveHeading.tsx ← Mobile/desktop heading sizes
│   └── IconCircle.tsx      ← Circular icon container
├── sections/               ← Full-width page sections
│   ├── InsetHero.tsx       ← Hero with inset card overlay
│   ├── USPHero.tsx         ← Horizontal USP strip
│   ├── TextImage.tsx       ← Text + image, 4 layout variants
│   ├── StepFlowMini.tsx    ← Numbered step flow
│   └── FaqAccordion.tsx    ← Expandable Q&A
└── pages/
    └── Schufa-9.tsx        ← SCHUFA landing page (reference implementation)
```

## Token system

All tokens are in `tokens.css` under `@theme`. Components use them via Tailwind classes or `var()` references.

| Group | Examples | Controls |
|-------|---------|----------|
| Colors — Core | `--color-sand-950`, `--color-yellow-200`, `--color-orange` | Brand palette |
| Colors — Semantic | `--color-text-primary`, `--color-surface`, `--color-accent` | Contextual meaning |
| Colors — Overlays | `--color-overlay`, `--color-overlay-light` | Dark scrims |
| Colors — White | `--color-white-8` through `--color-white-85` | Transparent white scale |
| Colors — Glass | `--color-glass-light-bg`, `--color-glass-dark-border` | Frosted effects |
| Gradients | `--gradient-glass-light`, `--gradient-overlay-dark` | Composite fills |
| Radius | `--radius-sm` (0.5rem) through `--radius-full` (9999px) | Border radius |
| Shadows | `--shadow-xs` through `--shadow-lg` | Elevation |
| Fonts | `--font-heading` (Neulis Sans), `--font-body` (Anyfin Sans) | Typefaces |
| Typography | `text-h1`–`text-h7`, `text-p-xl`–`text-p-small` | Type scale (as utilities) |
| Animations | `animate-fade-in-up`, `animate-scale-in`, etc. | Scroll entrance effects |

## Glass utilities

`glass-light` and `glass-dark` provide frosted glass effects with progressive blur. They require three child divs as blur layers:

```tsx
<div className="glass-light">
  <div className="blur-1" />
  <div className="blur-2" />
  <div className="blur-3" />
  <div>{/* your content */}</div>
</div>
```

## Notes

- Buttons currently have `onClick` handlers but no `href`/link support. Adding an `href` prop that renders an `<a>` instead of `<button>` is straightforward.
- `Icon` uses Vite's `import.meta.glob` to load SVGs. If migrating to a different bundler, this is the one piece that needs adaptation.
- More sections and composites are coming (nav, footer, carousels, etc.) — this is the initial set for the SCHUFA page.
# web-ds
