# Investor Pitch — Agent Handoff

Living doc for anyone (human or agent) picking up this deck. Update the **Status** + **Last touched** lines each session. Append new decisions to the bottom of the log; don't rewrite history.

**Status:** in progress — 9 slides; B2C act restructured around the 4-beat narrative
**Last touched:** 2026-05-15

---

## What this is

A self-contained HTML investor pitch deck for Bash (consumer engagement platform for venues). Opens via `open investor-pitch/index.html` — no build, no server. Keyboard nav: ← / → / space, Home/End. URL hash deep-links to a slide (`#1`, `#2`…).

**Design DNA** mirrors `html-design/b2b/index.html`:
- Dark theme (paper `#0d0d0e`, ink `#f4f1ea`)
- Display: Faustina italic for headlines, system-ui sans for body, ui-monospace for chrome
- Brand orange `#fe8c00` reserved for kickers, em accents, live indicators
- BASH wordmark SVG (orange gradient) at `investor-pitch/bash-logo.svg`, on every slide masthead

## Current slide list

| # | Title | Notes |
|---|-------|-------|
| 1 | **Title** — bash logo + tagline | Logo SVG, "The customer engagement platform for venues that earn their crowd." |
| 2 | **One Surface — 4 tools in a row** | 4 phone mockups side-by-side, each iframing a live product surface. See "Phone wiring" below. |
| 5 | **Live Hospitality · Bash Manager** | Left = editorial lede + 2×2 grid of capability cards (The Brief / Live tonight / Needs you / Bash Agent). Right = single large `.demo-phone` iframing `../html-design/b2b/index.html` for a clickable live demo of the manager app. Phone has dark slab body + orange-tinted box-shadow halo + "LIVE DEMO" tag with pulsing orange dot at top-right. Iframe uses the same `MOBILE_VW=420` scaling logic as slide 2's phones — `fitIframes()` selector extended to include `.demo-phone .screen`. Phone height = `min(calc(100vh - 200px), calc((100vw - 180px) / 2 * 0.55 * 19/9))` so it sits comfortably in the right column without overflowing tight viewports. **The b2b app is the actual Bash Manager prototype** (`html-design/b2b/index.html`) — Faustina + Gilroy fonts load relative to that folder, ECharts pulled from CDN; tap "Ask Bash" inside the iframe to enter the AI chat takeover. |
| 4 | **Wealth of Data — Two Flywheels** | Two-column "for the venue / for Bash" layout. Left column = single-venue lift (Know every guest / Run the floor / Sell smarter / Bring them back). Right column = network moat (Cross-venue graph / Programming intelligence / Underwriting & credit / Network products). Each column has a kicker + Faustina italic h2 + sub. 4 stacked `.data-card`s per column reusing the slide-3 source-card aesthetic (mono num + italic name + mono bullet list, orange dash markers). Center hairline divider with rotated "ONE · GRAPH" label sits between the columns. No animation — static editorial layout. Card grid uses `grid-template-rows: repeat(4, 1fr)` so cards stretch evenly to fill column height. |
| 6 | **Part Two · The Consumer Layer** (B2C intro / act break) | Title-style breath slide. Tagline "Your outing has a reputation. *Bash keeps score*." No stamps, no extra chrome — clean break before the consumer act. |
| 7 | **The Crowd** (slide-3 mirror, 3 animated persona cards) | Left: 4 source cards (Group Outings / Check-ins / Next Plans / Wrapped & Shares) - data the venue can't see. Middle: 4 curves carry 7 staggered pulses through the planning journey. Right: 3 persona cards (Aanya · Loyalist · BLR, Rohan · Discoverer · MUM, Tara · Squad Captain · HYD) that **fade in synced to pulses** (e1, e3, e4). Between cards: animated `.squad-link` connectors showing the cascade — Aanya's squad invite → Rohan; Aanya's Wrapped share → Tara. Each card has its own 2-event mini-feed using `feed-eN` keyframes. Tara's last event carries the `.now` LIVE flash. The 3-persona variant deliberately shows variety of journeys, not one customer. |
| 8 | **The Consumer Flywheel** (slide-4 mirror) | Two-column flywheel layout reusing every slide-4 class (`.fw-stage` / `.fw-wheel-col` / `.fw-cards` / `.fw-card` / `.fw-outputs`). Left: **I · The Loop** (Hook / Backfill / Check-in / Share). Right: **II · The Compound** (CAC drops / Graph grows / Doublings / Sales flips). The Doublings card carries the literal 1→3→9→…→3,000 ladder text. Bottom rows: "FOR THE CROWD · WEEKLY" + "FOR BASH · COMPOUNDS WEEKLY". |
| 9 | **Bash AI · Your planning agent** (mirror of slide 5) | Same `brief-slide` structure as slide 5. Headline "Not a social app. *An AI agent that plans your night.*" Caps: Plan in chat / Auto-invite / Cheapest door / Agent-to-Agent · Bash Collective. Right column iframes `https://bash-web.nikhil-pragna-k.workers.dev/app`. Focus mode (`1` / `Esc`) wired via the multi-`.brief-slide` setup. |
| 3 | **The Customer Graph** — what we collect, what Bash AI learns, what's happening live | 4 source cards (left) → 4 curves carrying **7 staggered colored pulses** (middle) → Venue-CRM customer profile (right, Aanya R.) with identity + KPI stats + "Bash AI knows" traits + "Live · tracking tonight" activity feed. **14s loop, 7 events through the full night**: (1) 21:48 Car entered — orange — Valet, (2) 21:52 Walk-in party of 4 at VIP Table 7 — teal — Register, (3) 22:05 Viewed menu · Espresso Martini ×3 — sky — Menu, (4) 22:18 Ordered 2 Martinis · Pizza · Fries · ₹3,200 — magenta — Tickets·Bookings·Bill, (5) 23:14 **Bought 2 tickets · Lazy Brunch · next Sunday** — purple — Tickets·Bookings·Bill (in-venue upsell beat), (6) 01:22 Called valet · car requested — amber — Valet, (7) 01:25 **Car collected · she leaves · pickup in 3m 12s** — lime — Valet (LIVE row with `now-flash`). Bill curve carries 2 pulses (e4, e5), Valet curve carries 3 (e1, e6, e7), staggered so each curve only has one dash at any moment. **Pulse rendering**: `stroke-dasharray: 6 9999` + per-path `--pulse-travel` (negative pixels) computed in JS from each path's sampled visual length — needed because `preserveAspectRatio="none"` + `non-scaling-stroke` makes dasharray repeat in pixel-space. Source card 3 relabeled "Tickets · Bookings · Bill" so it carries both F&B payment and event-ticket-purchase events. Per-pulse keyframes `pulse-e1`..`pulse-e7` and per-row keyframes `feed-e1`..`feed-e7` share the 14s cycle so everything resets together. |

## Phone wiring (slide 2)

Each phone is a `.mini-phone` div containing an iframe. Iframes are scaled by JS at the bottom of `index.html` to render at a true mobile viewport (`MOBILE_VW = 420`) then CSS-scale to fit the phone screen. This keeps mobile breakpoints inside the iframe sane regardless of how big the phone is on the deck.

| # | Tool | iframe src | Source |
|---|------|-----------|--------|
| 01 | Digital Menu | `https://webapp.bash-india.com/club/29` | **Live** webapp (X-Frame-Options is null so it embeds). Full club landing — Malibu logo, Events/Menu/Valet pills, event posters. |
| 02 | Guest Register | `screens/register-app.html` | **HTML mockup** I built from the bash-worker Flutter source (`bash-worker/lib/app/modules/bouncer_homePage/`). Mirrors the real design: BASH logo, "Today" date pill, Entries/Reservations/Guest List tabs, Total Entries KPI + breakdown, guest tiles with corner status badges, FAB. |
| 03 | Event Ticketing | `screens/ticketing.html` | **HTML mockup** (Lazy Brunch poster + Regular/Couple/VIP tiers + Buy CTA). Not yet sourced from real app code — open to swap for `webapp.bash-india.com/club/29/events?scrollToAllEvents=true` (the live events page). |
| 04 | Digital Valet | `screens/valet.html` | **Real prototype** — single-file copy of `bash-valet-expo/_handoff/bash-valet/project/`. React 18 + Babel-standalone, JSX inlined into one HTML so it works from `file://`. Key gotcha: each JSX file re-declares `const { useState, ... } = React;`; the generator script rewrites those to `var` so they don't collide across script blocks. Source folder also lives at `screens/valet-handoff/` as the unmodified copy. |

### Re-generating valet.html

If `bash-valet-expo/_handoff/` changes, regenerate `screens/valet.html` by concatenating the JSX files. From the deck folder:

```bash
cd investor-pitch/screens/valet-handoff
{
  echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>'
  echo '<title>Bash Valet</title>'
  echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">'
  echo '<style>'; cat styles.css; echo '</style>'
  echo '<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>'
  echo '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>'
  echo '<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>'
  echo '</head><body><div id="root"></div>'
  for f in data.jsx primitives.jsx queue.jsx scan.jsx keys.jsx app.jsx; do
    echo "<script type=\"text/babel\" data-presets=\"react\">"
    sed 's/^const \({[^}]*} = React;\)/var \1/' "$f"
    echo '</script>'
  done
  echo '</body></html>'
} > ../valet.html
```

## Open product decisions

- **Iframes stay interactive** (no `scrolling="no"`). User wants the demo to be live-clickable, not a static snapshot. Don't re-disable scroll — they explicitly want this.
- **Phone aspect** is 9:19; height is `min(100vh - 290px, calc((100vw - 180px) / 4 * 19 / 9))` so 4 fit horizontally on any common viewport (1280×800 → 1920×1080 tested).
- **Notch removed** from phone mockup — clean rounded slab, no `::before` pseudo-element.
- **Live menu iframe currently points at `/club/29`** (full club landing), not `/club/29/menu` (sub-page). User preference — they wanted the whole club page visible.
- **Bash Worker (guest register) is Flutter.** APK can't be iframed. Open options: (a) `flutter build web` on `bash-worker/` (risky — Firebase/image_picker/local_notifications plugins lack web support), (b) keep the current Dart-faithful HTML mockup. Currently on (b).

### Slide 3 specifics
- **Persona is fixed** — Aanya R., Customer #4019, Bangalore, Saturday night. Phone, party composition (2W/2M · VIP Table 7), vehicle (Verna KA-01), order (2 Martinis · Pizza · Fries · ₹3,200), and event (Lazy Brunch next Sunday) are referenced in the source cards, the chips, and the feed. If you change the persona, change all three locations consistently.
- **Field names live in the research, not on the slide.** The user reverted from schema-name chips ("`web_user_id · scan_at`") to plain English ("Scanned menu at the table"). Don't add raw column names back to the slide.
- **Pulse choreography is hand-tuned.** 7 events on a 14s cycle, fired every 11%. Adding events (or shrinking cycle) means re-tuning all `pulse-eN` + `feed-eN` keyframe percentages. If event count grows beyond ~8, consider bumping cycle to 16–18s rather than packing pulses tighter; otherwise the eye can't track them.
- **`fitPulses()` must re-run on resize.** It already does. If you add more `.flow-pulse` paths, no JS changes are needed — the routine queries `.graph-flow .flow-pulse` and writes `--pulse-travel` per path.
- **`@property --pulse-travel`** is declared with `syntax: '<length>'` so the variable interpolates inside `@keyframes`. Without it, modern browsers would treat `var(--pulse-travel)` in a keyframe as a discrete value and the pulse would teleport, not slide.
- **`stroke-dasharray: 6 9999`** is the fix for `preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke` making `pathLength="100"` ineffective for dasharray. Don't lower the 9999 — it must exceed every path's visual pixel length to guarantee a single dash on each curve.
- **Color per event** (don't reshuffle without reason — these read like a legend if anyone studies the deck twice): e1 orange `#fe8c00` (car in) · e2 teal `#5dd9b9` (walk-in) · e3 sky `#6fb6e8` (menu view) · e4 magenta `#e879c8` (order) · e5 purple `#b794f4` (ticket purchase) · e6 amber `#ffd166` (call valet) · e7 lime `#c2f54b` (car collected, live).
- **The `.now` row** is the last `<li>` in the feed and uses two animations (`feed-e7` + `now-flash`). If you change which event is "live," update both the `.now` class placement and the `.now` rule's animation names.

## Verifying changes — Playwright screenshots

`/tmp/pw/` has a node project with playwright installed. To screenshot the deck at 3 viewports:

```bash
cat > /tmp/pw/shoot.mjs <<'EOF'
import { chromium } from 'playwright';
const url = 'file:///Users/prannoyroy/temp/development/bash-brainstorm/investor-pitch/index.html#2';
const viewports = [
  { w: 1440, h: 900, name: '1440x900' },
  { w: 1920, h: 1080, name: '1920x1080' },
  { w: 1280, h: 800, name: '1280x800' },
];
const browser = await chromium.launch();
for (const v of viewports) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/tmp/deck-${v.name}.png` });
  await ctx.close();
}
await browser.close();
EOF
cd /tmp/pw && node shoot.mjs
```

Then `Read` the PNGs at `/tmp/deck-{viewport}.png` to inspect.

## File map

```
investor-pitch/
├── index.html              ← the deck (1 file, vanilla HTML/CSS/JS)
├── bash-logo.svg           ← BASH wordmark (orange gradient lockup)
├── HANDOFF.md              ← this file
└── screens/
    ├── _shared.css         ← shared styles for the local mockups (legacy from earlier mockups)
    ├── menu.html           ← legacy local mockup (unused; live URL is iframed instead)
    ├── register.html       ← legacy local mockup (replaced by register-app.html)
    ├── register-app.html   ← Dart-faithful bouncer mockup (iframed by phone 02)
    ├── ticketing.html      ← Lazy Brunch ticketing mockup (iframed by phone 03)
    ├── valet.html          ← inlined React valet prototype (iframed by phone 04)
    └── valet-handoff/      ← unmodified copy of bash-valet-expo handoff source
        ├── Bash Valet Redesign.html
        ├── *.jsx, styles.css, frames/, screenshots/, uploads/
```

## Log

- **2026-05-15 (later)** — **Slide 7 → "The Crowd" with 3 animated persona cards + squad cascade. Slide 8 → slide-4 mirror.**
  - **Slide 7 copy reset.** Dropped every "dossier" reference per user — masthead "V · The Crowd · What the venue can't see", kicker "The Crowd · No venue signed", headline "We know your customers - *before any venue signs*." Keep the headline literal and simple; do not embellish.
  - **Right pane swapped from one Aanya card to 3 distinct persona cards** stacked vertically — the user explicitly wanted variety, not a single customer journey. Personas: Aanya R. (Loyalist · Bangalore · orange avatar · LOYALIST tier), Rohan K. (Discoverer · Mumbai · blue avatar · EXPLORER tier), Tara M. (Squad Captain · Hyderabad · purple avatar · RAINMAKER tier). Each card carries an avatar, name + persona type, 3-stat meta row (Score / Check-ins / Squad-or-First-Of), 3 colour-coded badges, and a 2-event mini-feed.
  - **Pulse-synced cascade.** Each persona card fades in synced to a specific pulse landing — Aanya at e1 (Thu install · 10%), Rohan at e3 (Sat squad invite · 32%), Tara at e4 (Sat Wrapped share · 45%). New keyframes `persona-pop-1/2/3` drive the cards. Each card's 2 events use the existing `feed-eN` keyframes (Aanya e1+e4, Rohan e3+e6, Tara e5+e7) so events pop in as their pulse arrives. Tara's 2nd event carries the `.now` class with the `now-flash` overlay so the slide ends on a LIVE moment, same convention as slide 3.
  - **Squad interlink connectors** between cards: `.squad-link.sl1` ("Squad invite · Aanya → Rohan · Sat 17:42") and `.sl2` ("Wrapped share · Aanya → Tara · Sat 19:55"). Each is a horizontal hairline with the orange-arrow label centered. They fade in synced to e3 and e4 respectively via `link-pop-1` / `link-pop-2` keyframes — so the cascade reads as: Aanya installs → her squad chat pulls Rohan → her tier-up share lands in Tara's feed. Card tags also reinforce origin ("via Aanya"). Pulse-arrival-as-card-appearance is the load-bearing animation idea here; don't break it without re-tuning the cascade narrative.
  - **Slide 8 → two-column flywheel (slide-4 mirror).** Replaced the multiplier-ladder chain entirely. Now uses slide 4's `.fw-stage` / `.fw-wheel-col` / `.fw-wheel-head` / `.fw-cards` / `.fw-card` / `.fw-outputs` classes directly — pure reuse, no new CSS. Left column = **I · The Loop** with 4 cards (Hook / Backfill / Check-in / Share). Right column = **II · The Compound** with 4 cards (CAC drops / Graph grows / Doublings / Sales flips). The doublings card carries the literal `1 → 3 → 9 → 27 → 81 → 243 → 729 → 2,187 → ~3,000 at Venue X` to preserve the compounding punchline from the prior ladder design. Bottom outputs row mirrors slide 4: "FOR THE CROWD · WEEKLY" + "FOR BASH · COMPOUNDS WEEKLY".
  - **Old `.compound-stage` / `.chain` / `.chain-row` / `.chain-count.sN` / `.compound-pitch` CSS is now unused** but left in place — only matches `.compound-slide`-class markup that no longer exists in the HTML. Leaving it costs ~3kB; safe to delete in a future cleanup pass.
  - **Pre-existing slide 7 extras** (`.badges`, `.venue-arc`, `.b-backfill/.b-squad/.b-streak/.b-wrap/.b-first/.b-cross` badge styles) are still used by the persona cards. The `.venue-arc` CSS is now unused (its markup was in the single profile-card variant we removed) — same story as `.compound-*`: dead but harmless.
  - **JS not touched this round** — the existing `fitPulses` / `fitFlow` / `.activity-feed`-style animation infrastructure all keeps working because the new persona cards use the same `feed-eN` keyframes by name.
  - Verified at 1280×800 and 1440×900 via Playwright. Animation cycle is 14s; cards reset at 100% and re-cascade.
- **2026-05-15** — **B2C act (slides 6–9) restructured around a 4-beat narrative.** The earlier B2C slides (consumer-loop / agent-chat / wheel / live-demo) didn't land — pitch was scattered and didn't explain why we ship before venues. Reorganized:
  - **Slide 6 (Part Two title)** — copy kept simple: tagline "Your outing has a reputation. *Bash keeps score*." Stamps removed entirely per user. Slide is now a clean breath before the act.
  - **Slide 7 (`graph-slide consumer-graph-slide`) — The Off-Venue Dossier.** Full structural mirror of slide 3. Reuses every slide-3 class (`.graph-stage` / `.graph-sources` / `.graph-flow` / `.flow-pulse.eN` / `.profile-card` / `.activity-feed`) — no new CSS. Four source cards = **data points the venue can't see**: Pre-Night Intent, Squad Signals, Backfill Ledger, After-Venue Moves. Seven staggered pulses choreograph **Aanya's planning journey Thursday → Sunday** without any venue integration: install + backfill 14 venues → tap Kompound poster → squad "drinks tonight?" → tier-up share → check-in at Kompound (NOT a Bash venue) → after-venue Lazy Brunch → live auto-RSVP next Saturday. Right pane is the *same Aanya R., Customer #C-4019* — explicit "no venue signed" tag drives the point home. Pulse colour map matches slide 3 so the visual rhyme is intentional.
  - **Slide 8 (`compound-slide`) — The Compounding Loop.** Replaced the old 4-spoke wheel with a **literal multiplier ladder**: 9 rows from W0 (1 user) through W8 (3,000 at Venue X), each labelled with the loop mechanism that fires the tripling (Night Card on IG, squad auto-invite, tier-up brag, backfill prompt, Wrapped drop, drop-card comp, Streak Flag). Count font-size scales row by row (`.s0`…`.s8` clamped sizes) and turns orange + bold at the W8 punch line. Bottom strip carries the **B2B pitch flip**: *"Please listen." → "When can we start?"* New CSS block defines `.compound-stage`, `.chain` (grid of `auto 1fr auto auto`), `.chain-row` (`display: contents` so cells inherit grid columns), `.chain-week / .chain-mech / .chain-op / .chain-count`, `.compound-pitch`. Lede on the left reuses the existing display + mono treatments for tonal consistency.
  - **Slide 9 (`brief-slide planning-agent-slide`) — Bash AI · Your planning agent.** Mirror of slide 5. Editorial caps on the left (Plan in chat / Auto-invite / Cheapest door / Agent-to-Agent · Bash Collective), live consumer prototype iframe on the right (`bash-web.nikhil-pragna-k.workers.dev/app`). Headline leads with **"Not a social app. *An AI agent that plans your night.*"** — this is the deck's load-bearing reframe. Caps absorb the agent-chat narrative from the deleted slide.
  - **Old slide 8 (`consumer-ai-slide` · agent-chat dramatization) deleted.** Its content folded into the new slide 9 caps. Deck total drops from 10 → 9 slides.
  - **JS refactors.** `fitFlow()` now iterates `.graph-stage` and scopes the path/chip rewrite per slide, so slide 3 and slide 7 stay independent. `setupBriefFocus` (the `1`/`Esc` phone-focus state machine) was rewritten from singleton-on-first-match into a per-`.brief-slide` loop reading each slide's own `.focus-backdrop` / `.focus-dismiss` — both slide 5 and slide 9 now have working focus mode. Removed the `#briefBackdrop` / `#briefFocusDismiss` ID lookups in favour of class-scoped selectors.
  - **Open product decisions for slide 8.** Doubling factor is 3× across all 8 weeks (1 → 3 → 9 → 27 → 81 → 243 → 729 → 2,187 → ~3,000). If the user wants this grounded in actual K-factor data later, swap the row counts but keep the visual scaling — the column structure and `.sN` size classes are decoupled from the specific numbers.
  - **Open product decisions for slide 7.** The seven events are tuned to mirror slide 3's 7-pulse choreography exactly (same 14s cycle, same e1..e7 keyframes). If you add/remove events, you'd re-tune `pulse-eN` and `feed-eN` keyframe percentages in the existing slide-3 CSS block (lines 750-840-ish). Activity feed uses 7 `<li>` items with `nth-child(N)` selectors picking up colour + animation from the existing CSS.
  - **Pulse routing in slide 7.** Curve y-positions still map: Intent → y=12, Squad → y=38, Backfill → y=62, After-Venue → y=88. Events distributed: Backfill carries e1+e5 (install/backfill + check-in at non-Bash venue), Intent carries e2 (Kompound tap), Squad carries e3+e4 (drinks chat + share), After carries e6+e7 (Lazy Brunch + Café 91 next plan, e7 is the LIVE row).
  - Verified at 1280×800 / 1440×900 / 1920×1080 via the existing Playwright shoot rig (`/tmp/pw/shoot-b2c-rebuild.mjs`).
- **2026-05-12** — Slide 4 redesigned again into the **literal flywheel** form. Two circular `.flywheel` SVG diagrams, each with 4 wedges (NW/NE/SE/SW pie slices, alternating `paper-2` and `oklch(0.205 0.012 70)` fills), an outer `.fw-ring`, a center donut cover (`.fw-center-cover` filled with `paper`), and an orbiting `.fw-orbit` dash that rotates around the ring (10s linear, `-cw` on left wheel, `-ccw` on right — so they appear to feed toward each other). Each wedge has an absolutely-positioned `.fw-quad` overlay with `num · italic name · one-line summary` — bullets shrank to one-liners as planned. Center donut hole carries the wheel label ("FOR THE VENUE" / "FOR BASH") as `.fw-hub`. Between the two wheels: a `.graph-node` orb with `THE Graph` title + "BOTH WHEELS MEET HERE" caption, with subtle orange gradient hairlines extending toward each wheel. Old `.data-stage` / `.data-hub` / `.hub-*` / `.data-card` / `.data-col-head` / `.data-body` styles + the radial-spoke markup were wholesale replaced; `fitPulses()` selector reverted to `.graph-flow .flow-pulse` only. Verified at 1280×800 / 1440×900 / 1920×1080. The flywheel metaphor is now the picture, not a phrase in the headline.
- **2026-05-12** — Redesigned slide 4 from a flat 2-column card grid into a **hub + radial spokes** diagram. Central `.hub-orb` ("THE GRAPH · Data Wealth") sits in a 3-column grid (`1fr · clamp(150–220px) · 1fr`); 8 SVG `.hub-line` spokes radiate to 4 venue cards left + 4 Bash cards right. 8 `.hub-pulse` paths carry traveling dashes on a 3.2s cycle, staggered every 0.4s for a clockwise sweep (reuses the slide-3 `--pulse-travel` mechanism — `fitPulses()` selector extended to include `.data-hub .hub-pulse`). Orb has a radial-gradient body, orange ring, breathing box-shadow animation (`orb-breathe` 3.4s). Layout restructured: `.data-stage` is now a 2-row grid (`auto` for col-heads, `1fr` for data-bodies); col-heads + bodies use `data-side="left|right"` attribute selectors to land in their grid cells; `.data-hub` spans `grid-column: 2; grid-row: 2;` only so spoke endpoints (12.5/37.5/62.5/87.5%) align with the centers of the 4 cards beside it. Old `.data-divider` + `.data-col` flex wrappers removed. Column heads also reframed: kickers now read "Venues improve / Bash compounds"; h2s now "What every venue *gets back*" / "How the *network* gets stronger" — sharper than the static "What the venue learns / What the network learns".
- **2026-05-12** — Added slide 5: **Live Hospitality · Bash Manager**. Iframes the actual b2b manager prototype (`../html-design/b2b/index.html`) inside a large dark phone slab on the right; left column has an editorial lede + 2×2 grid of capability cards (The Brief / Live tonight / Needs you / Bash Agent). Reused the slide-2 iframe scaling routine (`MOBILE_VW=420` + per-screen scale) — extended the `fitIframes()` selector to include `.demo-phone .screen`. The iframe is fully interactive — manager can demo tapping "Ask Bash" to enter the chat takeover state during the pitch. Added a small "LIVE DEMO" tag with a pulsing orange dot anchored to the top-right of the phone column so investors know it's clickable. Verified at 1280×800 / 1440×900 / 1920×1080 via Playwright; phone halo + content frame fit comfortably at all three.
- **2026-05-12** — Bumped slide 4 supporting text sizes (bullets +25%, card name +12%, kickers/subs +20%) for projector readability; slide headline + column h2s left at original size. Reduced bullet line-height 1.5→1.45 and tightened bullet gap to absorb the extra vertical without overflow.
- **2026-05-12** — Added slide 4: **Wealth of Data — Two Flywheels**. Two-column editorial layout under a single headline ("One graph. *Two compounding flywheels*."). Left = "For the venue" (what the venue learns tonight — guests, floor ops, upsell, retention). Right = "For Bash" (what the network learns across venues — cross-venue graph, programming intelligence, underwriting/credit, network products). Each column has a kicker + Faustina italic h2 + 1-line sub, then 4 stacked cards. Cards reuse the slide-3 `.source` card aesthetic (mono num + italic display name + mono bullet list with orange dash bullets) but as a new `.data-card` class so they don't inherit the `.source::after` orange dot. Center hairline divider with rotated "ONE · GRAPH" label glued the two sides into a single narrative. Verified at 1280×800 and 1920×1080 via the existing Playwright shoot rig — all 4 cards per column fit cleanly with no overflow.
- **2026-05-12** — Slide 3 iterated from a static schema diagram into a fully choreographed 7-event live-tracking animation. The path of edits, for future context:
  1. **Started static** — three columns (sources / curves / profile card) with chip labels listing raw `bash-backend` field names along the curves.
  2. **Switched copy to plain English** per user feedback ("data points should be readily understandable") — chips and source bullets rewritten without schema names. Field names were *kept as research grounding* but not displayed.
  3. **Made the right pane a "Venue CRM" card** ("Customer #4019" / Aanya R.) per user clarification that this is the venue's view of the customer, not a consumer profile.
  4. **Added a live activity feed below the inferred-traits ("Bash AI knows") section** when user asked for "activity tracking." Feed sits underneath KPIs + traits so the customer card retains its identity feel.
  5. **Added bright traveling pulses** along each curve, synced to feed-row appearance ("when the pulse reaches the card, add that activity"). First attempt: 5 simultaneous pulses on a continuous loop.
  6. **Reframed the feed top-down chronologically** (oldest at top, newest at bottom) and gave each pulse a distinct color per user request ("change the colors"). Pulse colors chosen so each event reads at a glance: orange = car, teal = entry, sky = view, magenta = order, purple = ticket-purchase, amber = call valet, lime = car collected.
  7. **Switched to one-pulse-per-curve** (4 pulses, no overlap on the same line at any moment). Then **expanded the narrative through her leaving** — added "Called valet" and "Car collected" as additional valet-curve pulses, time-staggered so the curve only ever has one dash visible.
  8. **Added "Bought 2 tickets · next Sunday"** as a 7th event on the Bill curve — represents the in-venue upsell beat. Source card 3 relabeled "Tickets · Bookings · Bill" so it carries both F&B payment and event-ticket-purchase signals.
  9. **Fixed a real rendering bug** the user spotted: multiple dashes were visible on every curve at once. Root cause was `preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke` making the dasharray pattern repeat in pixel-space, not user-space (so `pathLength="100"` was silently bypassed for dasharray math). Fix: `stroke-dasharray: 6 9999` (gap huge enough that only one dash fits on any curve) + a small JS routine (`fitPulses`) that samples each `.flow-pulse` path with `getPointAtLength` to compute its true visual pixel length, then writes a per-path `--pulse-travel` CSS variable (negative pixels) used as the dashoffset endpoint in the keyframes. `@property --pulse-travel { syntax: '<length>' }` declared so the variable interpolates correctly inside `@keyframes`.
  10. **Final timing**: 14s cycle. Pulses fire every 11% of cycle. Each travels for ~9%. Last event lands at 75%, leaving a ~25% rest before the next loop. Per-pulse keyframes `pulse-e1`..`pulse-e7` and per-row keyframes `feed-e1`..`feed-e7` share the same 14s duration so all elements reset together.
  11. **Source verification** — the original schema-grounded research lives in the slide list entry above; it was confirmed against `bash-backend/config/db/schema.ts` and `bash-backend/modules/guestRegister/model.ts` etc. by an Explore agent. User flagged that `bash-backend-hono/` is *not* the source of truth.
- **2026-05-12** — Initial scaffold. Title slide + tools overview + 4 individual tool slides (6 slides). Restructured to 2 slides (title + collapsed "one surface" slide with 4 phones in a 2x2 grid). User then asked for 4-in-a-row → restructured again. Tightened phone sizing math (`min(vh-budget, vw-budget × aspect)`) so 4 phones fit horizontally without overflow at 1280×800, 1440×900, 1920×1080. Removed notch. Added JS to render iframes at fixed 420px mobile viewport and scale to fit. Wired live `webapp.bash-india.com/club/29` for menu. Built Dart-faithful guest register mockup from `bash-worker/lib/app/modules/bouncer_homePage/`. Inlined the React valet prototype (`bash-valet-expo/_handoff/`) into a single self-contained `screens/valet.html`. Removed the duplicate "Four tools, one surface" overview slide. Switched header to a compact single-line headline ("Four tools. One surface. One customer graph.") with per-phone info blocks (01 / italic name / description) below each phone. Briefly added `scrolling="no"` to all iframes for a static-snapshot look; user reverted — they want iframes interactive.
- **2026-05-12** — Initial scaffold. Title slide + tools overview + 4 individual tool slides (6 slides). Restructured to 2 slides (title + collapsed "one surface" slide with 4 phones in a 2x2 grid). User then asked for 4-in-a-row → restructured again. Tightened phone sizing math (`min(vh-budget, vw-budget × aspect)`) so 4 phones fit horizontally without overflow at 1280×800, 1440×900, 1920×1080. Removed notch. Added JS to render iframes at fixed 420px mobile viewport and scale to fit. Wired live `webapp.bash-india.com/club/29` for menu. Built Dart-faithful guest register mockup from `bash-worker/lib/app/modules/bouncer_homePage/`. Inlined the React valet prototype (`bash-valet-expo/_handoff/`) into a single self-contained `screens/valet.html`. Removed the duplicate "Four tools, one surface" overview slide. Switched header to a compact single-line headline ("Four tools. One surface. One customer graph.") with per-phone info blocks (01 / italic name / description) below each phone. Briefly added `scrolling="no"` to all iframes for a static-snapshot look; user reverted — they want iframes interactive.
