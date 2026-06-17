# Bash Manager Brief — Session Notes

**Date**: 2026-05-04 (now multiple sessions; see "Session log" at the bottom)
**File**: `html-design/b2b/index.html` (single self-contained file — brief + chat in one document)
**Status**: design prototype, hash-routed two-view single-page

---

## What this is

A single-page editorial mobile prototype for Bash's manager-facing surface — a venue manager opens "the brief" and sees tonight's state + actionable analytics. Newspaper-DNA design (Faustina serif + Gilroy sans, warm paper, orange-only-for-live-state).

## Current architecture

**Live (top of page, "what's happening now")**
- Sticky masthead — BASH logo + date/time + theme toggle (sun/moon SVG, 40×26 paper-2 pill)
- Venue row — "Bandra Social" + green pulsing "Open · 47 in"
- Staff ledger (4 cells) — Owners (orange flag) / Managers / Bouncers / Valet — inverts to white card in dark mode
- Needs you (3 items, no animation): expired poster, no register entries since Apr 20, 3 negative feedbacks
- Headline — "47 visitors. *33 regulars* back, 14 new."
- Tonight stats 4-up — Visits / Returning / Menu scans / Avg group
- Who's visited (persona-grid, 6 rows with brand colors): Regulars=orange (hl), First-timers=ink, Event tickets=purple, Reservations=blue, Guest list=gold, Digital valet=ink

**Analytics chapters**
- **II · Visitors Overview** — 4-cell KPI grid (8,201 / 3,940 / 7 / 2,049 At-risk-orange), Visits breakdown donut, Weekly trend (16w slide), Daily new vs returning (30d slide), How they came in (30d slide)
- **III · Guest Register** — 9-cell KPI grid (3-col), Entry source donut (7 categories with brand colors), Daily entries gender × type (18d slide)
- **IV · Customer Data** — Recent entries, At-risk regulars, Top customers, New customers (all sortable HTML tables with sticky thead, scrollable, Export buttons)
- **V · Loyalty & Growth** — 4-cell MoM KPI grid, Loyalty depth funnel, Cumulative growth (12mo slide)

**Chat**
- Bottom dock pill "Ask Bash ⌘K" — fixed at bottom with safe-area-inset
- Full-screen chat takeover (Bash Agent) with suggestion chips and action cards

## Brand palette

```
--ink     #2a2521  (text default — flips with theme)
--paper   #f7f4ee  (bg default — flips with theme; dark = #121212)
--orange  #e26a2c  Returning · At-risk · Highlight · "AI summary" label
--blue    #5e7d9e  Reservations
--rose    used in gender chart family
--gold    #b89548  VIP · Guest list · Walk-in guests
--teal    #5d8b88  (legacy) Walk-in only
--plum    #8c6981  Band/Artist
--purple  #7c5fa3  Event tickets · Party/Event
--cat-default #8a847d  New / QR scan / Direct (theme-fixed neutral)
```

**Gender chart specific** (gender-flag coded):
- Walk-in M `#347DC1` (Mediterranean) / Walk-in F `#e75455` (coral)
- Reservation M `#01A6EA` (Pocket Gender Blue) / Reservation F `#f08080`
- Guest list M `#76B6E2` / Guest list F `#f7c0c0`

**Aggregator brand colors** (entry source donut):
- Swiggy `#fc8019`
- Zomato `#e23744`
- EazyDiner `#008b8b`

## Theme system

- CSS custom properties on `:root`
- `.theme-dark` class on `<html>` overrides paper/ink/rule with `#121212` family
- ECharts colors load via `loadTheme()` (theme-dependent vars are `let`, not `const`)
- Theme toggle: clicks → toggle class → dispose all charts (`echarts.getInstanceByDom(el).dispose()`) → `loadTheme()` → `initAllCharts()` rebuilds
- Ledger inverts in dark mode (white card with dark text)

## Animations

- **Scroll-driven reveal**: `IntersectionObserver` adds `.in-view` class as sections cross 18% threshold; transform translateY(28px) → 0, opacity 0 → 1, 900ms cubic-bezier
- **Live indicators**: green dot pulse with shadow halo (Open status), orange caret blink (chat input)
- **Slide pill**: orange italic Faustina pill with color-blink animation; hides on `.dual-chart.dragged` (after first user scroll)
- **Edge fades**: paper-color gradient on left/right of dual-chart bars area
- **No typewriter on captions** (removed; just static editorial text under each chart)
- Respects `prefers-reduced-motion`

## Charts

All ECharts. Slide pattern = `<div class="dual-chart">` containing:
- `.dual-chart-yaxis` (38px fixed, sticky) with HTML y-axis labels rendered by `renderYAxis(id, max, interval, opts)`
- `.dual-chart-bars` (overflow-x scroll, custom thin scrollbar)
- `.drag-pill` "Slide for earlier ___"

Chart canvas widths:
- daily charts: 1600px
- gender × type: 920px (inline)
- weekly + cumulative growth: 900px (`.dual-chart.weekly`)

## AI summary captions

Each analytics chart has a `<p class="caption">` with:
- "AI SUMMARY" mono orange label (`::before`) on its own line
- Editorial Faustina italic body with `<span class="em">` accent for highlight phrase
- 8 captions total — plain editorial summaries (not problem statements)

## Files in folder

- `index.html` — single-file prototype: brief (default view) + chat (overlay at `#chat`)
- `bashLogo.png` — masthead logo
- `ai-stars.svg` — AI sparkle icon (currently unused; was on AI summary label, removed by user)
- `Gilroy-*.ttf` — 20 font files
- `README.md` — original design intent
- `SESSION-NOTES.md` — this file

## How to run

```bash
cd html-design/b2b
python3 -m http.server 8765 --bind 0.0.0.0
# Open http://localhost:8765/index.html
# For phone (same WiFi): http://<mac-local-ip>:8765/index.html
# For QR: qrencode -t ANSIUTF8 "http://<ip>:8765/index.html"
```

## Open threads / what might be next

- Convert prototype → Expo / React Native (user said "next session")
- Bundle into single self-contained HTML (base64 fonts + logo) for sharing
- Deploy via Netlify Drop / Surge / Tiiny.host
- Mobile app conversion: tab bar design, native nav patterns
- Possibly: dashboards beyond manager view (owner / multi-venue / promoter)

## Useful context

- The design DNA is "morning paper for your venue" — editorial, opinionated, single column, generous vertical rhythm, almost no motion
- Orange is reserved for: live status, returning customers, at-risk callouts, italic accents in headlines
- Brand colors should hold contrast on both warm paper AND `#121212` dark
- User dislikes: harsh white lines between sections (use `--rule` not `--ink`), AI cliché blur effects on text streaming, "slivers" jargon, cards/tiles in middle of editorial flow
- User likes: editorial captions that summarize charts plainly, scroll-reveal animation, sticky masthead with theme toggle, gender-flag colors in the gender chart, the Faustina italic accent treatment

---

# Session 2 — 2026-05-04 (later same date)

## Strategic decisions locked

These are the load-bearing product decisions made this session. Don't relitigate without good reason.

### 1. No desktop split. Mobile-only on every viewport.
Tried 75/25, 60/40, 40/60, 25/75, 30/70, fixed-canvas variants. All looked "off" because the editorial typography is tuned for a 380–460px column — anything wider stretches it weirdly, and anything narrower squeezes KPI cells. **Final answer: keep `.device { max-width: 420px; margin: 0 auto; }`. On wide screens it's a centered column with paper margins on either side — "the brief on a desk."** All `@media` rules for desktop layout were removed; only `prefers-reduced-motion` remains.

### 2. Direction "A": editorial page, agent has no chrome of its own.
The product positioning is **"the page is the brief, the agent is the tool, and the agent has zero UI."** No buttons, no nav, no settings panel, no toolbars. Anything you'd "click" in a normal SaaS, you tell the agent. This was a deliberate rejection of the "AI sidebar bolted onto a dashboard" shape that every other product uses.

### 3. Bash is replacing the ops person, NOT the dashboard.
Reframe: a venue's current tech is POS + reservations + event tool. A human ops person sits at a desk translating WhatsApp/posters/phone reservations/POS receipts into clicks. **That ops person is the keypad. Bash removes the ops person, not the keypad — the keypad never mattered.** Pricing model: compete with an ops salary ($800–2.5K/mo), not with SaaS subscriptions.

### 4. Tech approach for connectors: read files, don't fight APIs.
POS systems are closed. APIs would take 18 months. **A small local Bash daemon sits in the venue's folder structure, watches POS files on disk, parses them with the LLM. No internet dependency. Per-POS file shape is a one-time cost; second venue with same POS works in a day.** This is the moat.

### 5. iPhone vs BlackBerry analogy (user's framing — keep using it).
Most B2B SaaS = BlackBerry: keypad (toolbar buttons) AND touchscreen (chat) bolted together. Bash = iPhone: pure interaction surface, no legacy chrome. Don't be religious about "no buttons" though — some workflows (multi-field structured input) ARE forms; the agent can render structured input cards inside the conversation when that's the right primitive.

### 6. Stack picked (not yet implemented).
- **Agent core**: Claude (Anthropic Messages API) — strongest at vision, tool use, agentic loops. Sonnet 4.6 or Opus 4.7.
- **Voice in**: Whisper API (push-to-talk, not always-listening; user confirms Whisper handles loud venues).
- **Local agent**: small daemon in venue folder watching POS files.
- **Chat plumbing**: Vercel AI SDK + AI Elements (or assistant-ui) — borrows the standardized agent-action grammar (thinking, tool cards, HITL, streaming) but theme-able to Bash's editorial DNA.
- **Prompt caching**: critical — system prompt + brief context is huge and reused; cuts cost ~80%.

## chat-mock.html — what's in it

Standalone demonstration of the full chat surface with the agent-action grammar. Self-contained HTML, same fonts/palette as `index.html`. **This is the chat surface; iterate here.**

### Layout
- **Desktop**: 280px left rail (conversation switcher) + flex-1 chat pane.
- **Mobile (≤720px)**: rail becomes off-canvas drawer (80vw, max 320px) behind a hamburger button on the right of the chat header. Backdrop overlay closes it.
- **Very narrow (≤360px)**: voice icon hidden.

### Header
- **Left**: `← Brief` link in mono uppercase (hover orange) — navigates back to `index.html`.
- **Center**: title with pulsing orange agent-dot + conversation name ("Brunch poster · May 17") — ellipsises if long.
- **Right**: hamburger menu button (`.menu-btn`, 3 ink bars in a paper-2 rounded square) — opens the conversation drawer. Hidden on desktop where the rail is permanent.

### Conversation rail
- **Header bar**: "● Bash Agent" title + "+ New" pill button.
- **Search input** below header.
- **Grouped list**: Today / Yesterday / This week. Each item = Faustina title + Gilroy snippet + relative time. Active item has orange left-border + paper bg.
- **Foot**: venue name + version number.

### Chat body — three full agent flows demonstrating every primitive

**Turn 1 — manager drops a poster image**
- User attachment row: faked poster thumb (88×88, dark gradient bg, orange kicker "BRUNCH · SAT 17", italic Faustina title "Lazy Brunch", footer)
- User text: "Make this happen for next Saturday. Cover ₹500."

**Turn 2 — agent: thinking → tool calls → preview → confirm**
- `.think.open` block — italic Faustina reasoning, collapsible (click to toggle)
- `.tool.done.expanded` — `extract_event_from_image` with `<dl class="kv">` showing extracted fields (title/date/time/lineup/sponsors/confidence)
- `.tool.done` — `find_existing_event` (collapsed dedupe check)
- Agent message in Faustina with orange italic accent
- `.confirm` HITL card — bordered in `--ink`, "Awaiting your nod" mono kicker top-left, headline "Create *Lazy Brunch* for Saturday May 17", editable rows (k/v pairs with ✎ on editable values), `[Confirm & Publish] [Edit] [Cancel]` actions

**Turn 3 — manager confirms + adds instruction**
- User: "Confirm. Also push the listing to Insta + WhatsApp broadcast."
- Agent: 3 tool cards in sequence (`create_event`, `post_to_instagram`, `whatsapp_broadcast`) all done state with checks, expandable
- Final agent message with stats (312 regulars, staggered 15min)

**Turn 4 — manager drops a guest list xlsx**
- User attachment: `.att-sheet` card — XLSX icon (faked CSS file-fold), filename, "2 sheets · 47 rows · 18 KB"
- User text: "And add this to the guest list. Skip duplicates."

**Turn 5 — agent: status → parse → dedupe → preview → HITL → suggestions**
- `.status-pill` — "Reading guest_list_may17.xlsx…" (pulsing orange dot)
- `.tool.done` for `parse_sheet` and `dedupe_against_existing`
- `.sheet-prev` — table with first 7 rows, `dup`/`vip` flags inline as warning/orange tags after name cells, "Show all 47 rows ›" foot
- `.confirm` HITL — "Add 42 new guests to the *Lazy Brunch* list" + summary stats + send-SMS toggle row
- `.suggest` chips — three Faustina follow-ups

### UI primitives styled (the agent-action grammar)
- `.think` — italic Faustina reasoning block, collapsible, ink-3 left border
- `.tool` — bordered card paper-2 bg; states `.working` (orange pulse), `.done` (green check), `.error` (red !); `.expanded` shows body with `.kv` dl key-value grid
- `.status-pill` — paper-2 rounded pill with pulsing orange dot
- `.confirm` — ink-bordered card with orange "Awaiting your nod" kicker tab
- `.att-img.poster` — faked dark-gradient poster thumbnail with editorial inner content
- `.att-sheet` — file card with CSS-faked XLSX icon
- `.sheet-prev` — preview table with `dup`/`vip` row classes for inline tags
- `.suggest .s-chip` — Faustina follow-up suggestions, full-width on mobile

### Input row
Order: `[+ attach]   [text input]   [🎙 voice]   [↑ send]`
- `+` = circle with plus, attach (poster/sheet/screenshot)
- mic = clean line-stroke svg, push-to-talk
- ↑ = inked-circle send button with line-stroke up-arrow svg
- All three icons share stroke-width 1.4–1.6, currentColor, look like a designed set
- No `›` prompt-mark anymore (removed)
- Helper text + kbd shortcuts row hidden on mobile

## Brief ↔ Chat wiring (single-file architecture)

- One file. Brief is the default view; chat is an overlay shown when `location.hash === '#chat'`.
- Dock pill (`#chatLauncher`) and `⌘K` set the hash to `#chat` (no navigation, no flash).
- `← Brief` link in the chat header clears the hash and hides the overlay. `Esc` does the same.
- All chat CSS is scoped under `.view-chat` — no class-name collisions with the brief.
- Theme is shared automatically: `.theme-dark` on `<html>` flows into the chat overlay since both use the same custom-property tokens. No localStorage round-trip needed.
- The chat overlay is `position: fixed; inset: 0; z-index: 200` and locks body scroll via `body.chat-open { overflow: hidden }`.

## Where we stopped

Single-file merge done. Brief + chat live in `index.html`; `chat-mock.html` deleted.

### Other open threads
- The poster thumb in chat is faked with CSS gradient — eventually swap for real image upload preview.
- Tool card states (`.working`, `.error`) are styled but only `.done` shown in mock — add a working-state demo for one card if useful.
- Voice flow not mocked yet — could add a "manager held mic, agent transcribed: 'mark Riya VIP'" turn to demo the voice path.

## Strategic context for the next session (don't lose this)

- **Positioning line**: "Bash is the AI ops person, not the AI dashboard." Use this internally and externally.
- **Hero demo**: poster → event in 8 seconds. That's the iPhone-pinch-to-zoom moment. Lead every pitch with it.
- **Pricing frame**: compete with an ops salary, not with SaaS. Different unit economics, different sales pitch, different feature priorities.
- **Manager persona is the real ICP**, not the operator. Manager wants to be on the floor, not at a desk. Voice + brief + push-to-talk = "I can use this while walking the venue."
- **Three philosophies of agent UX** (Bash is camp 3): (1) tool with agent bolted on (Notion AI), (2) agent in chat box (ChatGPT), (3) artifact + ambient agent (Cursor, Claude Code, Bash). Camp 3 is the strongest position.

## Session log

- **Session 1 (early 2026-05-04)**: built the full editorial brief in `index.html`. Mobile-first single column, Faustina + Gilroy, all chapters, all charts, scroll-reveal, theme toggle, bottom chat dock + inline chat-full modal.
- **Session 2 (later 2026-05-04)**: tried desktop split layouts (75/25, 60/40, 40/60, 25/75, 30/70, fixed-canvas) — all rejected. Reverted to mobile-only on all sizes. Strategic conversation about Bash's positioning (ops-person replacement, not dashboard; iPhone vs BlackBerry; Bloomberg Terminal for venues). Built `chat-mock.html` with full agent-action UI grammar. Wired brief dock → chat-mock navigation. Stopped before merging the two into one design system.
- **Session 3 (2026-05-04)**: merged `chat-mock.html` into `index.html` as a hash-routed overlay (`#chat`). All chat CSS scoped under `.view-chat`. Removed the dead inline `chat-full` modal + dummy chip-response JS. Theme + tokens now shared automatically. `chat-mock.html` deleted.
