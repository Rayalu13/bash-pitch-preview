# CLAUDE.md — Bash Investor Pitch

Guidance for any Claude session working in this repo.

## What this repo is

A **self-contained HTML investor pitch deck** for Bash (customer-engagement platform for nightlife/hospitality venues in India + a consumer going-out app). `index.html` **is** the deck — vanilla HTML/CSS/JS, no build step.

- **Live:** https://bash-investor-pitch.vercel.app
- **CI/CD:** this repo (`github.com/Bash-India/bash-investor-pitch`, private) is connected to the Vercel project `bash-investor-pitch`. **Every push to `main` auto-deploys to production.** Static site, no build command — Vercel serves the repo root.
- Navigation in the deck: ← / → / Space / Home / End. URL hash deep-links a slide (`#1`, `#2`…). On phones/small touch screens a **mobile gate** ("Best viewed on desktop") covers the deck (pure CSS media query, no JS).

### How to ship a change
Edit `index.html` (or assets), then:
```bash
git add -A && git commit -m "…" && git push
```
Live in seconds. To preview without shipping to prod, push a non-`main` branch (gets a preview URL).

## Repo structure

```
index.html              ← the deck (9 slides)
bash-logo.svg           ← BASH wordmark
screens/
  bouncer/              ← Guest Register mockup (iframed on slide 2)
  valet.html            ← inlined React valet prototype (iframed on slide 2)
html-design/b2b/        ← Bash Manager demo, BUNDLED here so slide 5's iframe resolves
HANDOFF.md              ← deck design notes + slide-by-slide reference (read this before editing layout/animation)
```

## What's IN the deck (9 slides)

Two acts — B2B toolkit/data moat, then B2C consumer flywheel:

1. **Title** — logo + tagline ("The customer engagement platform for venues that earn their crowd.")
2. **One Surface** — 4 tools in a row (Digital Menu / Guest Register / Event Ticketing / Digital Valet), live iframes
3. **The Customer Graph** — every scan/entry/pickup becomes one customer; animated 7-event live-tracking of persona "Aanya R."
4. **The Wealth of Data** — two compounding flywheels (venue flywheel + network flywheel)
5. **An AI Team On Shift** — Bash Manager: 4 AI agents (Brief / Needs You / Live Hospitality / Bash Agent), live demo iframe
6. **Part Two** (act break) — "Your outing has a reputation. Bash keeps score."
7. **The Consumer App · First Look** — squads / check-in / backfill / Wrapped; live prototype iframe
8. **The Crowd** — "We know your customers before any venue signs"; 3 persona cards + squad cascade
9. **The Consumer Flywheel** — the loop + the compound; `1→3→9→…→3,000`, sales flip ("When can we start?")

This is a strong **product/demo + strategic narrative** deck. The live, clickable embedded demos are its biggest credibility asset.

## What's MISSING (the standard fundraising slides)

The deck is titled "Investor Pitch · 2026" but does **not** yet contain the slides investors expect. If asked to make it a complete fundraising deck, add:

1. **Market** — TAM/SAM/SOM, # of venues in Hyderabad/India, $ size, why-now timing.
2. **Traction** — real metrics: live/signed venues, pipeline, GMV, revenue/ARR, users, growth %, retention.
3. **Business model** — how Bash earns (₹/venue SaaS, ticketing take-rate, valet, bill-pay, lending/credit, ads, loyalty, network products) + unit economics.
4. **Team** — founders, backgrounds, why-this-team, advisors.
5. **The Ask** — round size, stage, valuation, use of funds, prior funding, target investors.

Other gaps: no competition/why-us slide on-deck (analysis exists in `bash-brainstorm`), and the **3× weekly compounding** on slide 9 is asserted, not grounded — a sharp investor will push on the K-factor.

> ⚠️ Do **not** invent fundraising numbers (the ask, valuation, real GMV/MAU/revenue, team bios). Those are the founder's real raise. Pull verifiable facts from `bash-brainstorm` (below) and **ask the founder** for anything not documented there.

## Reference: the `bash-brainstorm` working folder

This repo is a **bundled, deployable copy**. The canonical deck source and all company context live in the `bash-brainstorm` working folder (one level up from `.vercel-deploy/`, i.e. `/Users/prannoyroy/temp/development/bash-brainstorm/`). **Use it as the source of truth for any content, numbers, or strategy.** Key files:

- `investor-pitch/index.html` — original source of this deck (kept in sync with this repo; note the original uses `../html-design/b2b/` for the slide-5 iframe, this repo uses the bundled `html-design/b2b/`).
- `investor-pitch/HANDOFF.md` — full deck design/engineering notes (also copied into this repo).
- `context/01_COMPANY_OVERVIEW.md` — company status, team, current ₹1Cr friends-&-family round, investor leads.
- `context/02_B2B_PRODUCT_AND_SALES.md` — venue pricing (₹3,000/mo), modules, sales motion.
- `context/03_B2C_PRODUCT_STRATEGY.md` — Bash Score, squads, tiers, monetization phases.
- `context/04_SMART_ARRIVAL_AND_ROADMAP.md` — roadmap, Hyderabad market dynamics.
- `context/05_COMPETITIVE_ANALYSIS.md` — competitors (Beli, Zomato, BookMyShow, Dineout…) + moat/defensibility.
- `context/bash-context.md` — data points (1.2L users in DB, 30–40K QR scans/mo, 18 venues, collections issues).
- `fundraising/01-funding-landscape.md` — comparable rounds, investor targets by stage.
- `fundraising/02-smaller-apps-business-models.md` — monetization comps, retention bars.

### Syncing caveat
Because this is a copy, **deck edits made here must be mirrored into `bash-brainstorm/investor-pitch/index.html`** (and vice-versa) to keep both in sync. When editing the deck, update both unless told otherwise.
