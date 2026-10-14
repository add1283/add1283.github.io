import audioMap from "../data/audio-map.json";

type Band = "bass" | "mid" | "high" | "rms";

/** Per-frame band energy (0..1), measured from the actual music cut. */
export const energy = (band: Band, frame: number) => {
  const arr = audioMap[band] as number[];
  const f = Math.max(0, Math.min(arr.length - 1, frame));
  const i = Math.floor(f);
  const j = Math.min(arr.length - 1, i + 1);
  return arr[i] + (arr[j] - arr[i]) * (f - i);
};

/** Smoothed energy: average of the last `window` frames, so motion does not jitter. */
export const smoothEnergy = (band: Band, frame: number, window = 4) => {
  let sum = 0;
  for (let k = 0; k < window; k++) sum += energy(band, frame - k);
  return sum / window;
};

export const HATS: number[] = audioMap.hats;

/** A short flare after each detected hi-hat, decaying over a few frames. */
export const hatPulse = (frame: number, decay = 4) => {
  let last = -1;
  for (const h of HATS) {
    if (h <= frame) last = h;
    else break;
  }
  return last < 0 ? 0 : Math.exp(-(frame - last) / decay);
};
