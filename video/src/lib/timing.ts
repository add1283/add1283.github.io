import audioMap from "../data/audio-map.json";

export const FPS = 30;
export const DURATION = 60 * FPS;

/** Beat times in seconds, relative to the start of the cut (2:50.9 in the track). */
export const BEATS: number[] = audioMap.beats;

/** Time of beat n. The cut starts on beat 0; the drop is beat 45. */
export const beat = (n: number) => {
  if (n <= 0) return BEATS[0] + n * (60 / 136);
  if (n >= BEATS.length - 1) return BEATS[BEATS.length - 1] + (n - BEATS.length + 1) * (60 / 136);
  const i = Math.floor(n);
  return BEATS[i] + (BEATS[i + 1] - BEATS[i]) * (n - i);
};

export const beatFrame = (n: number) => beat(n) * FPS;

/** Song structure, in beats. */
export const B = {
  drop: 45,
  shift: 89,
  peak: 132,
  /** Five projects, two bars each, from the drop. */
  projects: [45, 53, 61, 69, 77],
  hover: 85,
  /** Four projects, one bar each, in the second section. */
  rapid: [89, 93, 97, 101],
  phone: 105,
  cert: 113,
  words: [121, 122, 123, 124],
  logo: 125,
} as const;

/** Index of the last beat at or before time t (seconds), and how far into it we are (0..1). */
export const beatPhase = (t: number) => {
  let lo = 0;
  let hi = BEATS.length - 1;
  if (t < BEATS[0]) return { index: -1, phase: 0 };
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (BEATS[mid] <= t) lo = mid;
    else hi = mid - 1;
  }
  const next = BEATS[lo + 1] ?? BEATS[lo] + 60 / 136;
  return { index: lo, phase: (t - BEATS[lo]) / (next - BEATS[lo]) };
};

/** A sharp attack on each beat that decays before the next one. */
export const beatPulse = (t: number, decay = 6) => {
  const { index, phase } = beatPhase(t);
  return index < 0 ? 0 : Math.exp(-phase * decay);
};

/** 0..1 progress of t through [a, b], clamped. */
export const prog = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));
