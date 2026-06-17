# Bash B2B Manager App — HTML prototype

Single mobile prototype for the manager-facing surface. One screen, two states.

## Design direction

**"The Brief"** — a morning paper for your venue. ZINE-derived but not ZINE-applied: same DNA (orange + black, editorial typography, opinionated tone) rebuilt for utility.

- Light theme. Warm off-white paper, black ink, orange reserved for live/urgent state.
- Display: Faustina (editorial serif). Body: Geist. Numbers: Geist Mono.
- Single column, mobile-first, generous vertical rhythm. No cards-in-cards.
- Almost no motion — one staggered reveal on first load, chat rises on takeover.

## States

1. **Brief (default)** — masthead, headline, 7-day revenue chart, stat grid, tonight live counters, upcoming event capacity, "Needs you" action list. Ambient chat input docked at the bottom.
2. **Chat takeover** — tap the input or press ⌘K. Full-screen Bash Agent with suggestion chips on first open; user message → typing → agent reply with action cards (proposed price changes, carousel edits, event drafts, etc.).

Tap "← Brief" or hit Esc to return.

## Files

- `index.html` — both states in one file, JS toggles between them.

## Open it

```bash
open html-design/b2b/index.html
```
