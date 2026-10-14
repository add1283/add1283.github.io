import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import type { State } from "../lib/director";
import { BODY, DISPLAY } from "../lib/fonts";
import { C } from "../lib/palette";
import { B, FPS, beatFrame } from "../lib/timing";
import { Kinetic, type Line } from "./Kinetic";

const display = (size: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: DISPLAY,
  fontWeight: 700,
  fontSize: size,
  lineHeight: 0.98,
  letterSpacing: "-0.035em",
  fontVariationSettings: "'opsz' 96",
  color: C.ice,
  ...extra,
});

const body = (size: number, color: string = C.muted, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: BODY,
  fontWeight: 500,
  fontSize: size,
  lineHeight: 1.3,
  color,
  marginTop: 18,
  ...extra,
});

const PROJECTS = [
  { name: "12 Punto", kind: "Independent news platform", domain: "12punto.com.tr" },
  { name: "Heroty", kind: "HR software", domain: "heroty.com" },
  { name: "Atatürkçü Düşünce Derneği", kind: "Association portal", domain: "add.org.tr" },
  { name: "Disnet", kind: "Enterprise technology", domain: "disnet.com.tr" },
  { name: "Avrupadan", kind: "Community news", domain: "avrupadan.com" },
  { name: "Kpay", kind: "Payments", domain: "kpay.com.tr" },
  { name: "VBT Software", kind: "Corporate site", domain: "vbt.com.tr" },
  { name: "Ser&Berker", kind: "Independent audit", domain: "serberker.com" },
  { name: "Flerpi", kind: "ERP software", domain: "flerpi.com" },
];

const projectLines = (i: number, quick: boolean): Line[] => {
  const p = PROJECTS[i];
  const long = p.name.length > 14;
  return [
    { text: `${i + 1} / 9`, style: body(30, C.muted, { marginTop: 0, fontVariantNumeric: "tabular-nums" }), split: "words" },
    { text: p.name, style: display(quick ? 104 : long ? 84 : 116, { marginTop: 14 }), split: "chars" },
    ...(quick ? [] : [{ text: p.kind, style: body(40, C.turquoise), split: "words" as const }]),
    { text: p.domain, style: body(32, C.muted, { marginTop: quick ? 14 : 8 }), split: "words" },
  ];
};

/** One huge word per beat, slammed in with a short blur. */
const BeatWord: React.FC<{ word: string; at: number; until: number; size: number }> = ({ word, at, until, size }) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= until) return null;
  const local = frame - at;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          ...display(size, { fontWeight: 800, letterSpacing: "-0.045em" }),
          scale: interpolate(local, [0, 5], [1.35, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          opacity: interpolate(local, [0, 2], [0, 1], { extrapolateRight: "clamp" }),
          filter: `blur(${interpolate(local, [0, 4], [14, 0], { extrapolateRight: "clamp" })}px)`,
          textShadow: `0 0 60px ${C.electric}`,
        }}
      >
        {word}
      </div>
    </AbsoluteFill>
  );
};

/** A hairline of light that draws across the frame in the first second. */
const Flare: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > 90) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          height: 2,
          width: interpolate(local, [0, 18], [0, 1000], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          opacity: interpolate(local, [0, 4, 40, 90], [0, 1, 0.7, 0], { extrapolateRight: "clamp" }),
          background: `linear-gradient(90deg, transparent, ${C.ice} 30%, #ffffff 50%, ${C.ice} 70%, transparent)`,
          boxShadow: `0 0 24px 4px ${C.electric}, 0 0 90px 18px ${C.cobalt}`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Film grain from an SVG noise field, re-seeded every frame. */
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 97} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Darkens the lower part of the frame while captions are up. */
const Scrim: React.FC<{ strength: number }> = ({ strength }) => (
  <AbsoluteFill
    style={{
      opacity: strength,
      background: `linear-gradient(180deg, transparent 52%, ${C.void}cc 72%, ${C.void}f2 100%)`,
    }}
  />
);

export const Overlay: React.FC<{ state: State }> = ({ state }) => {
  const bf = beatFrame;
  const captionsOn = state.t >= bf(B.drop) / FPS && state.t < bf(B.phone) / FPS;
  return (
    <AbsoluteFill>
      <Scrim strength={captionsOn ? 1 : state.t >= bf(B.cert) / FPS && state.t < bf(B.words[0]) / FPS ? 0.8 : 0} />

      <Flare at={Math.round(bf(1))} />

      {/* Act I: the name, under the chrome logo. */}
      <Kinetic
        from={bf(32) + 4}
        to={bf(40)}
        style={{ top: 1150 }}
        lines={[
          { text: "Ahmet Deniz Dündar", style: display(108), split: "chars" },
          { text: "Frontend Developer & SEO Specialist", style: body(42), split: "words", delay: 0.35 },
        ]}
      />

      {/* Act II: five projects, two bars each. */}
      {B.projects.map((b, i) => (
        <Kinetic key={b} from={bf(b) + 12} to={bf(b + 8)} style={{ top: 1290 }} lines={projectLines(i, false)} />
      ))}

      <Kinetic
        from={bf(B.hover) + 6}
        to={bf(B.shift)}
        style={{ top: 330 }}
        lines={[
          { text: "Nine sites.", style: display(132), split: "chars" },
          { text: "All live.", style: display(132, { color: C.turquoise }), split: "chars", delay: 0.25 },
        ]}
      />

      {/* Act III: four more, one bar each. */}
      {B.rapid.map((b, k) => (
        <Kinetic key={b} quick from={bf(b) + 4} to={bf(b + 4)} style={{ top: 1350 }} lines={projectLines(5 + k, true)} />
      ))}

      <Kinetic
        from={bf(B.phone) + 6}
        to={bf(B.cert)}
        style={{ top: 250 }}
        lines={[
          { text: "This site.", style: display(104), split: "chars" },
          { text: "Angular and Three.js, prerendered in two languages.", style: body(38), split: "words", delay: 0.3 },
        ]}
      />

      <Kinetic
        from={bf(B.cert) + 8}
        to={bf(B.words[0])}
        style={{ top: 1310 }}
        lines={[
          { text: "Certified in AI", style: display(100), split: "chars" },
          { text: "and Machine Learning", style: display(100), split: "chars", delay: 0.12 },
          { text: "Council of Higher Education (YÖK), 2026", style: body(36, C.turquoise), split: "words", delay: 0.4 },
        ]}
      />

      {/* One word per beat into the peak. */}
      {[
        ["Frontend.", 200],
        ["SEO.", 280],
        ["Psychology.", 160],
        ["Three.js.", 200],
      ].map(([w, size], k) => (
        <BeatWord key={w} word={w as string} size={size as number} at={Math.round(bf(B.words[k]))} until={Math.round(bf(B.words[k] + 1))} />
      ))}

      {/* End card under the logo. */}
      <Kinetic
        hold
        from={bf(B.logo + 2)}
        to={60 * FPS}
        style={{ top: 1150, textAlign: "center" }}
        lines={[
          { text: "Ahmet Deniz Dündar", style: display(76), split: "chars" },
          { text: "Frontend Developer & SEO Specialist", style: body(36), split: "words", delay: 0.25 },
          { text: "ahmetdenizdundar.com.tr", style: body(42, C.electric, { marginTop: 46, fontWeight: 600 }), split: "chars", delay: 0.6 },
        ]}
      />

      <Grain />
      <AbsoluteFill style={{ background: "#ffffff", opacity: state.flash, mixBlendMode: "screen" }} />
      <AbsoluteFill style={{ background: "#000000", opacity: state.fade }} />
    </AbsoluteFill>
  );
};
