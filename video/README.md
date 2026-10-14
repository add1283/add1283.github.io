# Ahmet Deniz Dündar: portfolio films

Two Remotion projects live here.

## Project Lexicon (current)

A 64-second vertical film (1080 × 1920, 60 fps) in a technical-blueprint language: graphite, warm off-white, muted steel and a restrained electric blue; IBM Plex Sans and IBM Plex Mono, the same family as the website.

| Act | Time | What happens |
|---|---|---|
| I · Mind × Code | 0–5.3 s | Two voices on one blue line: "Psychology" in a serif, "Software" in Plex. They meet on the beat; "Beyond the interface." |
| II · The Identity | 5.3–12.4 s | The line becomes the cap height of the name. Portrait from the site; "Psychology graduate. Software developer." |
| III · The Craft | 12.4–19.9 s | A typeset C# controller and SQL query become rows, an interface, then a dashboard; the stack lights up as it is used. The panel folds into the phone outline. |
| IV · The Portfolio | 19.9–41.1 s | All nine projects on their real mobile screens. Numbered rings mark the intended reading order; the page's real `<title>`, function and documented stack; one serif line on what the screen asks of the person reading it. |
| V · Systems | 41.1–48.4 s | Engineering, Visibility and Intelligence settle into columns on one foundation: people (perception, attention, behaviour). Languages. |
| VI · The Path | 48.4–55.5 s | Psychology BSc, design and marketing training, VBT Software, programming degree, certificates up to the YÖK AI and Machine Learning programme. "Understand the problem. Build the right solution." |
| VII · The Signature | 55.5–64 s | The name returns; on the music's peak only the initials stay and become the ADD mark. "Psychology × Software", "Engineer the experience.", URL. |

Made for Instagram Reels: 9:16, the first frame already carries the grid and line, and the right-hand edge below mid-height stays clear of the Reels buttons. Stories cut videos into 60-second segments, so a Story post of the 64-second film arrives as two parts.

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
