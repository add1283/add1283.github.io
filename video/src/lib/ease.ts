import gsap from "gsap";

/** GSAP's easing curves, used to drive frame-based motion deterministically. */
export const ease = (name: string) => gsap.parseEase(name) as (t: number) => number;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo-random in [0, 1) from an integer seed. */
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

/** Seeded generator, so sampled point clouds are identical on every render. */
export const seeded = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
