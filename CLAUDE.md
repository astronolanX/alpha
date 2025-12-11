# CLAUDE.md - Alpha Portfolio

## Project Overview

Alpha is a dynamic portfolio website built with modern web technologies. The project features an interactive grid-based visual design with animated blocks and alignment guides, serving as a creative portfolio experience.

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS 4 (via Vite plugin)
- **Animation**: Motion One (~3kb)
- **Output**: Static site (deployable to Vercel/Cloudflare/Netlify)
- **Language**: TypeScript (components and client scripts)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/     # Reusable Astro components
│   ├── Card.astro        # Interactive card with optional link
│   ├── Container.astro   # Max-width centered container (max-w-5xl)
│   ├── GridFacade.astro  # Main visual: animated grid blocks
│   └── Section.astro     # Page section wrapper (py-16/24)
├── layouts/
│   └── Base.astro        # HTML document wrapper
├── pages/
│   └── index.astro       # Homepage
└── styles/
    └── global.css        # Design tokens & base styles
```

## Design System

### Color Tokens (defined in global.css @theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-surface` | `#0a0a0a` | Page background |
| `--color-surface-elevated` | `#141414` | Card backgrounds |
| `--color-surface-accent` | `#1a1a1a` | Hover states, borders |
| `--color-text-primary` | `#fafafa` | Main text |
| `--color-text-secondary` | `#a1a1a1` | Subdued text |
| `--color-text-muted` | `#525252` | Disabled/hint text |
| `--color-accent` | `#3b82f6` | Primary accent (blue) |
| `--color-accent-hover` | `#60a5fa` | Accent hover state |

### Wireframe/Redlining Colors

| Token | Usage |
|-------|-------|
| `--color-guide-h` | Horizontal alignment guides (red) |
| `--color-guide-v` | Vertical alignment guides (blue) |
| `--color-block-fill` | Grid block fill (white) |
| `--color-block-stroke` | Grid block borders |

### Typography

- **Sans**: Inter, system-ui fallback
- **Mono**: JetBrains Mono, ui-monospace fallback

### Spacing

- **Grid gutter**: 24px (follows 8pt spacing system)
- **Container padding**: px-6 (24px)
- **Section padding**: py-16 (mobile) / py-24 (desktop)

## GridFacade Component

The main visual element of the portfolio. Key characteristics:

- **Layout**: 7 randomly placed blocks clustered toward center
- **Grid**: Dynamic 12x12 base, responsive cell sizing (64-96px based on viewport)
- **Placement**: Center-biased random algorithm (middle 50% of grid)
- **Block sizes**: 1-3 cells wide/tall (square or rectangular)
- **Gutters**: 24px between blocks

### Animations (Motion One)

Animations are handled via Motion One's `animate` and `stagger` functions:

- **Entry**: Scale + opacity from 0, staggered 120ms, spring easing `[0.34, 1.56, 0.64, 1]`
- **Hover**: CSS scale to 1.03 (not Motion)
- **Click**: Motion animate `scale: [1, 0.92, 1]` over 250ms
- **Guides**: Fade in via CSS transition 300ms after block appears
- **Resize**: Debounced (150ms) full layout regeneration

### Alignment Guides

- Red lines appear flush with block edges (top, bottom, left, right)
- Gradient fade at edges for visual polish
- Non-interactive (pointer-events: none)

## Component Patterns

### Props Interface

All components use TypeScript interfaces for props:

```astro
---
interface Props {
  class?: string;  // Optional className override
}
const { class: className = '' } = Astro.props;
---
```

### class:list Pattern

Use Astro's class:list for conditional classes:

```astro
<div class:list={['base-classes', conditional && 'conditional-class', className]}>
```

### Polymorphic Components

Card component renders as `<a>` when href is provided, `<div>` otherwise.

## Git Workflow

- Branch naming: descriptive kebab-case (e.g., `happy-pasteur`, `peaceful-swirles`)
- Commit style: Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Commit bodies should include bullet points describing changes
- Merge commits summarize the branch's purpose

## Evolution Notes

The project has gone through several iterations:

1. **Initial**: Basic setup
2. **Maintenance page**: Dark theme, centered layout, status cards
3. **Astro migration**: Component architecture, Catppuccin theme (since replaced)
4. **Clean slate**: Rebuild with GridFacade as hero visual (vanilla JS animations)
5. **Current**: Motion One integration, TypeScript ES modules, simplified CSS

## Development Guidelines

- Prefer editing existing files over creating new ones
- Keep components focused and reusable
- Use CSS custom properties for theming (not hardcoded values)
- Client-side scripts use ES module `<script>` tags (not `is:inline`) for imports
- Use Motion One for JavaScript-driven animations, CSS transitions for simple hover states
- Responsive design: mobile-first, use Tailwind breakpoints (md:, lg:)
- Empty Astro divs need `&nbsp;` to prevent collapse during hydration
