# CLAUDE.md - Project Guidelines

## Project Overview

This is Nolan's personal portfolio site. Currently in active development.

## Current Priority: Maintenance Page

**Objective:** Create a friendly "under construction" facade for visitors while the full site is being built.

### Maintenance Page Requirements

- **Tone:** Playful but professional - we're not hiding, just not ready yet
- **Messaging:** Make it obvious the site is temporarily down for improvements
- **Keep it light:** A little personality goes a long way (think: "good things brewing")
- **Essential elements:**
  - Clear indication this is intentional maintenance, not a broken site
  - Nolan's name/brand presence
  - Optional: estimated return or "coming soon" language
  - Optional: contact method or social links for the curious

### Design Principles

- Mobile-first responsive design
- Fast loading (minimal dependencies)
- Accessible (proper contrast, semantic HTML)
- Works without JavaScript if possible

## Tech Stack (TBD)

The full site stack will be determined as development progresses. For the maintenance page, prefer:

- Simple HTML/CSS (or minimal framework)
- No heavy dependencies
- Easy to swap out when the real site launches

## Development Notes

- This repo uses git worktrees for feature isolation
- Main branch: `main`
- Current working branch: `practical-benz`

## File Structure (Planned)

```
/
├── index.html          # Maintenance page (current focus)
├── styles/             # CSS
├── assets/             # Images, icons
└── CLAUDE.md           # You are here
```

## Commit Conventions

- Use clear, descriptive commit messages
- Prefix with context when helpful (e.g., "maintenance: add hero section")

---

*These guidelines will evolve as the project grows from maintenance page to full portfolio.*
