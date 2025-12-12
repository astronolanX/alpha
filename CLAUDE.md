# CLAUDE.md - Alpha Portfolio

> **Global Rules**: See `~/.config/claude/RULES.md` for cross-project preferences and guidelines.

## Project Overview

Alpha is a dynamic portfolio website built with modern web technologies. The project features an interactive grid-based visual design with animated blocks and alignment guides, serving as a creative portfolio experience.

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS 4 (via Vite plugin)
- **Animation**: Motion One (~3kb)
- **Output**: Static site (deployable to Vercel/Cloudflare/Netlify)
- **Language**: TypeScript (components and client scripts)

## Commands

<!-- auto-generated: commands -->
```bash
npm run dev      # Start development server (port 4321)
npm run build    # Build for production
npm run preview  # Preview production build
```
<!-- end auto-generated: commands -->

## Project Structure

<!-- auto-generated: project-structure -->
```
src/
├── content/
│   └── projects/           # Content collection for projects
│       └── {project-slug}/
│           ├── index.md    # Project content (markdown + frontmatter)
│           └── media/      # Project-specific assets (images, videos)
├── components/
│   ├── BottomSheet.astro   # Slide-up info panel with toggle
│   ├── Card.astro          # Interactive card with optional link
│   ├── Container.astro     # Max-width centered container (max-w-5xl)
│   ├── Hero.astro          # Landing page: animated block grid + project links
│   └── Section.astro       # Page section wrapper (py-16/24)
├── layouts/
│   └── Base.astro          # HTML document wrapper
├── pages/
│   ├── index.astro         # Homepage (Hero + BottomSheet)
│   └── projects/
│       └── [...slug].astro # Dynamic project pages from content collection
├── styles/
│   └── global.css          # Design tokens & base styles
└── content.config.ts       # Content collection schema
```
<!-- end auto-generated: project-structure -->

## Content Collection: Projects

### Adding a New Project

1. Create a folder under `src/content/projects/` with your project slug
2. Add an `index.md` file with frontmatter:

```md
---
title: Project Title
description: Brief description
tags: [tag1, tag2]
date: 2024-01-15
draft: false
---

Your markdown content here...
```

3. Add media to the `media/` subfolder and reference with relative paths:

```md
![Screenshot](./media/screenshot.png)
```

### Frontmatter Schema

| Field       | Type       | Required | Description                    |
|-------------|------------|----------|--------------------------------|
| title       | string     | Yes      | Project title                  |
| description | string     | Yes      | Brief description              |
| cover       | image      | No       | Cover image path               |
| date        | date       | No       | Project date                   |
| tags        | string[]   | No       | Tags for categorization        |
| draft       | boolean    | No       | If true, excluded from build   |

### How It Works

- `content.config.ts` defines the schema with Zod validation
- `Hero.astro` fetches projects and renders clickable blocks
- `pages/projects/[...slug].astro` generates pages from content
- Blocks link to `/projects/{slug}`

## Design System

### Color Tokens (defined in global.css @theme)

<!-- auto-generated: design-tokens -->
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
<!-- end auto-generated: design-tokens -->

### Typography

- **Sans**: Inter, system-ui fallback
- **Mono**: JetBrains Mono, ui-monospace fallback

### Spacing

- **Grid gutter**: 24px (follows 8pt spacing system)
- **Container padding**: px-6 (24px)
- **Section padding**: py-16 (mobile) / py-24 (desktop)

## Hero Component

The landing page composition. Key characteristics:

- **Layout**: 5 blocks clustered toward center, linking to project pages
- **Grid**: Dynamic 12x12 base, responsive cell sizing (64-96px based on viewport)
- **Placement**: Center-weighted seeded random (middle 50% of grid)
- **Block sizes**: 1-3 cells wide/tall (square or rectangular)
- **Gutters**: 24px between blocks
- **Links**: Each block links to its corresponding project page

### Session-Stable Layouts

The block arrangement is **deterministic per session** using a seeded PRNG:

- **Same session = same layout**: Navigating to a project and back preserves spatial memory
- **New session = fresh layout**: New tab, browser restart, or different visitor gets a unique arrangement
- **Storage**: Seed stored in `sessionStorage` under key `hero:seed`
- **Algorithm**: Linear congruential generator (LCG)

This ensures each visitor experiences a consistent layout throughout their browsing session, while still providing visual variety across different visitors and sessions.

### Function Reference

| Function | Purpose |
|----------|---------|
| `measureGrid()` | Calculate grid dimensions from viewport |
| `arrangeBlocks()` | Place blocks using seeded randomness |
| `placeBlock()` | Attempt to place a single block |
| `weightedCenter()` | Bias random values toward center |
| `render()` | Create DOM elements for blocks |
| `drawGuides()` | Add alignment guide lines |
| `revealBlocks()` | Animate blocks into view |
| `handleResize()` | Debounced viewport change handler |

### Animations (Motion One)

- **Entry**: Scale + opacity from 0, staggered 120ms, spring easing `[0.34, 1.56, 0.64, 1]`
- **Hover**: CSS scale to 1.03
- **Click**: Motion animate `scale: [1, 0.92, 1]` over 200ms, then navigate
- **Guides**: Fade in via CSS transition 300ms after block appears
- **Resize**: Debounced (150ms) re-arrangement (uses same seed)

### Alignment Guides

- Red lines appear flush with block edges (top, bottom, left, right)
- Fully opaque across viewport
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

## Development Guidelines

- Use CSS custom properties for theming (not hardcoded values)
- Client-side scripts use ES module `<script>` tags (not `is:inline`) for imports
- Use Motion One for JavaScript-driven animations, CSS transitions for simple hover states
- Responsive design: mobile-first, use Tailwind breakpoints (md:, lg:)
- Empty Astro divs need `&nbsp;` to prevent collapse during hydration
