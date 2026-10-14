import gsap from "gsap";
import React, { createContext, useContext } from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import beatsData from "./beats.json";
import loserData from "./beats-loser.json";
import { F } from "./fonts";
import { P } from "./tokens";

/* ── Time ──────────────────────────────────────────────────── */

export type Track = "papaoutai" | "loser";
const GRIDS: Record<Track, number[]> = { papaoutai: beatsData.beats, loser: loserData.beats };
export const MUSIC: Record<Track, string> = { papaoutai: "music60.m4a", loser: "music-loser60.m4a" };

/**
 * The beat grid in use. The Loser grid keeps the same pacing in beats, warped
 * so every act boundary and screen change lands on that song's sections and bars.
 */
export let BEATS: number[] = GRIDS.papaoutai;
export const setTrack = (track: Track) => {
  BEATS = GRIDS[track];
};
export const beat = (n: number) => {
  const i = Math.max(0, Math.min(BEATS.length - 2, Math.floor(n)));
  return BEATS[i] + (BEATS[i + 1] - BEATS[i]) * (n - i);
};

/** Act boundaries, in beats. Cuts and reveals are placed on this grid. */
export const ACT = { signal: 0, identity: 16, craft: 30, portfolio: 45, systems: 90, human: 104, signature: 117, peak: 132 } as const;
export const RUNTIME = 60;

/** Act IV screens, in beats: three groups of three projects, four bars each. */
export const GROUP_BEATS = [45, 60, 75, 90];

/** Current time in seconds, independent of the render frame rate. */
export const TimeContext = createContext(0);
export const useT = () => useContext(TimeContext);
export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/* ── Easing (GSAP curves, driven by time) ─────────────────── */

const cache = new Map<string, (t: number) => number>();
export const ease = (name: string) => {
  if (!cache.has(name)) cache.set(name, gsap.parseEase(name) as (t: number) => number);
  return cache.get(name)!;
};

/** 0..1 progress of t through [a, b], eased. */
export const ramp = (t: number, a: number, b: number, curve = "expo.out") => {
  if (t <= a) return 0;
  if (t >= b) return 1;
  return ease(curve)((t - a) / (b - a));
};

/** In, hold, out: 0 → 1 → 0 across [a, a+inD] … [b-outD, b]. */
export const hold = (t: number, a: number, b: number, inD = 0.5, outD = 0.35) =>
  Math.min(ramp(t, a, a + inD, "expo.out"), 1 - ramp(t, b - outD, b, "power3.in"));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ── Drawing primitives ───────────────────────────────────── */

/** A hairline that draws itself from one end. */
export const HLine: React.FC<{ x: number; y: number; w: number; p: number; color?: string; from?: "left" | "right" | "center"; thick?: number; glow?: boolean }> = ({
  x, y, w, p, color = P.steelDim, from = "left", thick = 1, glow,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: thick,
      background: color,
      transformOrigin: from === "left" ? "0 50%" : from === "right" ? "100% 50%" : "50% 50%",
      scale: `${Math.max(0, p)} 1`,
      boxShadow: glow ? `0 0 18px 2px ${color}` : undefined,
    }}
  />
);

export const VLine: React.FC<{ x: number; y: number; h: number; p: number; color?: string; from?: "top" | "bottom"; thick?: number }> = ({
  x, y, h, p, color = P.steelDim, from = "top", thick = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: thick,
      height: h,
      background: color,
      transformOrigin: from === "top" ? "50% 0" : "50% 100%",
      scale: `1 ${Math.max(0, p)}`,
    }}
  />
);

/** Corner registration ticks. */
export const Tick: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => (
  <div style={{ opacity: p }}>
    <HLine x={x - 14} y={y} w={28} p={p} color={P.steel} from="center" />
    <VLine x={x} y={y - 14} h={28} p={p} color={P.steel} />
  </div>
);

/** Small technical label, revealed left to right. */
export const Label: React.FC<{ x?: number; y: number; right?: number; p: number; children: React.ReactNode; color?: string; size?: number; align?: "left" | "right" }> = ({
  x, y, right, p, children, color = P.steel, size = 25, align = "left",
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      right,
      top: y,
      font: `400 ${size}px/1.3 ${F.mono}`,
      color,
      whiteSpace: "nowrap",
      textAlign: align,
      clipPath: align === "left" ? `inset(0 ${100 - p * 100}% 0 0)` : `inset(0 0 0 ${100 - p * 100}%)`,
    }}
  >
    {children}
  </div>
);

/** Dimension line with end stops and a centred measurement. */
export const Dim: React.FC<{ x1: number; x2: number; y: number; p: number; label: string }> = ({ x1, x2, y, p, label }) => (
  <>
    <HLine x={x1} y={y} w={x2 - x1} p={p} from="center" />
    <VLine x={x1} y={y - 10} h={20} p={p} />
    <VLine x={x2} y={y - 10} h={20} p={p} />
    <div
      style={{
        position: "absolute",
        left: (x1 + x2) / 2 - 90,
        width: 180,
        top: y - 16,
        textAlign: "center",
        font: `400 22px ${F.mono}`,
        color: P.steel,
        opacity: p,
      }}
    >
      <span style={{ background: P.graphite, padding: "0 10px" }}>{label}</span>
    </div>
  </>
);

/** A callout: a ring on the subject, a leader line, and a label. */
export const Callout: React.FC<{ x: number; y: number; toX: number; label: string; p: number; side?: "left" | "right"; index?: number }> = ({ x, y, toX, label, p, side, index }) => {
  const right = side ? side === "right" : toX > x;
  const ring = ramp(p, 0, 0.3, "back.out(2)");
  const line = ramp(p, 0.15, 0.7, "expo.out");
  const text = ramp(p, 0.45, 1, "expo.out");
  return (
    <>
      {/* Numbered rings read as the intended order of attention. */}
      <div
        style={{
          position: "absolute",
          left: x - 17,
          top: y - 17,
          width: 34,
          height: 34,
          borderRadius: 17,
          border: `2px solid ${P.blue}`,
          background: index ? P.graphite : "transparent",
          scale: String(ring),
          boxShadow: `0 0 12px ${P.blue}`,
          display: "grid",
          placeItems: "center",
          font: `500 18px ${F.mono}`,
          color: P.offwhite,
        }}
      >
        {index}
      </div>
      <HLine x={right ? x + 17 : toX} y={y} w={Math.max(0, Math.abs(toX - x) - 17)} p={line} color={P.blue} from={right ? "left" : "right"} />
      <Label y={y - 16} p={text} color={P.offwhite} {...(right ? { x: toX + 14 } : { right: 1080 - toX + 14, align: "right" as const })}>
        {label}
      </Label>
    </>
  );
};

/* ── The instrument: a phone outline that carries Act IV ──── */

export interface PhoneShot {
  x: number;
  y: number;
  w: number;
  /** Screen image (public path) and how far down the capture to show, in screens. */
  src: string;
  scroll?: number;
  /** Magnify part of the screen: zoom factor and focus point (0..1). */
  zoom?: number;
  focus?: [number, number];
}

/** Screens keep the device's 430 × 932 aspect. */
export const PHONE_RATIO = 932 / 430;

export const Phone: React.FC<PhoneShot & { reveal?: number; incoming?: { src: string; p: number; scroll?: number }; frameOpacity?: number }> = ({
  x, y, w, src, scroll = 0, zoom = 1, focus = [0.5, 0.3], reveal = 1, incoming, frameOpacity = 1,
}) => {
  const h = w * PHONE_RATIO;
  const r = w * 0.065;
  const screen = (s: string, sc: number, clip?: string) => (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: r, clipPath: clip }}>
      <Img
        src={staticFile(s)}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%`,
          scale: String(zoom),
          // Scroll is measured in screens.
          translate: `0 ${-sc * h}px`,
        }}
      />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ position: "absolute", inset: -12, borderRadius: r + 12, border: `1px solid ${P.steelDim}`, opacity: frameOpacity }} />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(${(1 - reveal) * 100}% 0 0 0 round ${r}px)` }}>
        {screen(src, scroll)}
        {/* The next project's screen wipes up from the bottom edge. */}
        {incoming && incoming.p > 0 && screen(incoming.src, incoming.scroll ?? 0, `inset(${(1 - incoming.p) * 100}% 0 0 0)`)}
      </div>
    </div>
  );
};

/* ── Type ──────────────────────────────────────────────────── */

/** Large statement, revealed line by line through a mask. */
export const Statement: React.FC<{ lines: string[]; x: number; y: number; size: number; p: number; out?: number; color?: string; weight?: number; tracking?: string; lh?: number }> = ({
  lines, x, y, size, p, out = 0, color = P.offwhite, weight = 600, tracking = "-0.02em", lh = 1,
}) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    {lines.map((line, i) => {
      const k = ramp(p, i * 0.18, 0.7 + i * 0.18, "expo.out");
      const o = ramp(out, i * 0.08, 0.6 + i * 0.08, "power3.in");
      return (
        <div key={i} style={{ overflow: "hidden", paddingTop: size * 0.12, marginTop: -size * 0.12 }}>
          <div
            style={{
              font: `${weight} ${size}px/${lh} ${F.plex}`,
              letterSpacing: tracking,
              color,
              whiteSpace: "nowrap",
              translate: `0 ${(1 - k) * 110 - o * 110}%`,
            }}
          >
            {line}
          </div>
        </div>
      );
    })}
  </div>
);
