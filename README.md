# Bash — Investor Pitch

Self-contained HTML investor pitch deck for Bash. No build step — `index.html` is the deck.

**Live:** https://bash-investor-pitch.vercel.app

## Deploy

This repo is connected to the Vercel project `bash-investor-pitch`. **Every push to `main` auto-deploys to production**; pushes to other branches get preview URLs.

It's a static site — Vercel serves the repo root, no build command.

## Structure

```
index.html              ← the deck (vanilla HTML/CSS/JS, 9 slides)
bash-logo.svg           ← BASH wordmark
screens/
  bouncer/              ← Guest Register mockup (iframed on slide 2)
  valet.html            ← inlined React valet prototype (iframed on slide 2)
html-design/b2b/        ← Bash Manager demo, bundled here so slide 5's iframe resolves
HANDOFF.md              ← deck design notes / slide-by-slide reference
```

## Notes

- Slide 5's "Bash Manager" iframe points at `html-design/b2b/index.html` (bundled in this repo). The original source lives in the `bash-brainstorm` working folder at `investor-pitch/` + `html-design/b2b/`; this repo is the deployable copy.
- Slides 2 and 7 embed live URLs (`webapp.bash-india.com`, the consumer app worker) — those depend on those services staying up.

<!-- deploy pipeline: GitHub Bash-India/bash-investor-pitch → Vercel (auto) -->
