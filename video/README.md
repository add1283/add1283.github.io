# Ahmet Deniz Dündar: portfolio films

Two Remotion projects live here.

## Project Lexicon (current)

A 64-second vertical film (1080 × 1920, 60 fps) in a technical-blueprint language: graphite, warm off-white, muted steel and a restrained electric blue; IBM Plex Sans and IBM Plex Mono, the same family as the website.

| Act | Time | What happens |
|---|---|---|
| I · The Signal | 0–5.3 s | A line of light opens a grid; layers of the site's own interface pass by in depth. "Beyond the interface." |
| II · The Identity | 5.3–12.4 s | The line becomes the cap height of the name. Portrait from the site, role, one-line statement. |
| III · The Craft | 12.4–19.9 s | A typeset C# controller and SQL query become rows, an interface, then a dashboard; the stack lights up as it is used. The panel folds into a phone outline. |
| IV · The Portfolio | 19.9–41.1 s | All nine projects on their real mobile screens, with callouts on what is visibly there, the page's real `<title>`, function and documented stack. |
| V · Visibility and Intelligence | 41.1–48.4 s | Loose labels settle into Engineering, Visibility and Intelligence; the YÖK AI and Machine Learning certificate. |
| VI · The Human Dimension | 48.4–55.5 s | A dense grid resolves into one simple interface. "Understand the problem. Build the right solution." |
| VII · The Signature | 55.5–64 s | The name returns; on the music's peak only the initials stay and become the ADD mark. Final lockup and URL. |

Act boundaries sit on the soundtrack's beat grid (`src/lexicon/beats.json`). Every act reads time in seconds, so the film renders the same at 30 or 60 fps.

Source: `src/lexicon/` (`lib.tsx` holds the shared primitives: self-drawing lines, dimension lines, callouts, the phone instrument, masked statements).

Screens in `public/mobile/` were captured from the live sites at 430 × 932, 3×, with cookie banners dismissed. The film only drifts slightly down each page: further down, several news sites carry unrelated headlines.

## ADD (first cut)

The earlier particle and chrome-logo film (`src/ADD.tsx`, `src/scene/`, `src/overlay/`).

## Music

Not in this repository. Place the cut at `public/music64.m4a` (64 s from 2:50.9 of the track, normalised to -14 LUFS, faded out over the last 2.4 s). Render without music with `--props='{"music":false}'`.

## Render

```bash
npm i
npx remotion studio                                   # preview
npx remotion render Lexicon out/Lexicon.mp4           # 1080 × 1920, 60 fps
npx remotion render Lexicon-preview out/preview.mp4   # 540 × 960, 30 fps
```

Without a GPU or with a recent Chrome that lacks the old headless mode, point Remotion at a headless shell build:
`REMOTION_BROWSER=/path/to/headless_shell npx remotion render Lexicon out/Lexicon.mp4`
