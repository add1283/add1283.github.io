# ADD: portfolio film

A 60-second vertical (1080 × 1920, 30 fps) film for Ahmet Deniz Dündar's portfolio, built with Remotion, Three.js (React Three Fiber) and GSAP.

Everything is cut to the music. `src/data/audio-map.json` holds the beat grid and per-frame bass, mid, high and loudness measured from the track, and `src/lib/director.ts` turns that into camera moves, particle formations, bloom and flashes for every frame.

## Structure

- `src/lib/director.ts`: shot list, camera, and every animated value per frame
- `src/lib/timing.ts`: beat grid and song sections (drop, shift, peak)
- `src/scene/`: chrome ADD logo, particle field, project screens, phone, neural network, effects
- `src/overlay/`: type, driven by paused GSAP timelines that are seeked to the current frame

## Music

The soundtrack is not in this repository. Put the cut at `public/music.m4a` (60 s from 2:50.9 of the track, normalised to -14 LUFS).

## Render

```bash
npm i
npx remotion studio                       # preview
npx remotion render ADD out/ADD.mp4       # 1080 × 1920
npx remotion render ADD-preview out/p.mp4 # half size
```

Without a GPU, point Remotion at a headless shell build of Chromium, for example:
`REMOTION_BROWSER=/path/to/headless_shell npx remotion render ADD out/ADD.mp4`
