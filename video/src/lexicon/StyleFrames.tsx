import React, { useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Img, staticFile } from "remotion";
import { F, lexiconFonts } from "./fonts";
import { P, PROJECTS } from "./tokens";

export type Direction = "swiss" | "editorial" | "technical";
export type Shot = "identity" | "project";

const useFonts = () => {
  const [handle] = useState(() => delayRender("Loading Lexicon fonts"));
  const [ready, setReady] = useState(false);
  useState(() => {
    lexiconFonts.then(() => {
      setReady(true);
      continueRender(handle);
    });
    return null;
  });
  return ready;
};

const Grain: React.FC = () => (
  <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>
  </AbsoluteFill>
);

const project = PROJECTS[2]; // 12 Punto, a representative frame

/* ── A. Swiss grid ─────────────────────────────────────────── */

const SwissGrid: React.FC = () => (
  <AbsoluteFill>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 80 + i * 153.3, width: 1, background: P.line }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 220, height: 1, background: P.line }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 380, height: 1, background: P.line }} />
  </AbsoluteFill>
);

const Swiss: React.FC<{ shot: Shot }> = ({ shot }) =>
  shot === "identity" ? (
    <AbsoluteFill>
      <SwissGrid />
      <div style={{ position: "absolute", left: 80, top: 250, font: `500 26px ${F.grotesk}`, color: P.steel, letterSpacing: "0.02em" }}>
        Portfolio, 2026
      </div>
      <div style={{ position: "absolute", left: 80, top: 700, width: 153, height: 4, background: P.blue }} />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 740,
          font: `800 196px/0.86 ${F.grotesk}`,
          letterSpacing: "-0.045em",
          color: P.offwhite,
        }}
      >
        AHMET
        <br />
        DENİZ
        <br />
        DÜNDAR
      </div>
      <div style={{ position: "absolute", left: 80, top: 1290, font: `600 38px ${F.grotesk}`, color: P.offwhite, letterSpacing: "0.01em" }}>
        Web Engineering · SEO · AI
      </div>
      <div style={{ position: "absolute", left: 80, top: 1350, width: 620, font: `400 32px/1.4 ${F.grotesk}`, color: P.steel }}>
        Building useful digital experiences through engineering, design and optimization.
      </div>
    </AbsoluteFill>
  ) : (
    <AbsoluteFill>
      <SwissGrid />
      <div style={{ position: "absolute", left: 80, top: 250, font: `500 26px ${F.grotesk}`, color: P.steel }}>Selected work</div>
      <div style={{ position: "absolute", right: 80, top: 250, font: `500 26px ${F.grotesk}`, color: P.steel, fontVariantNumeric: "tabular-nums" }}>
        03 / 09
      </div>
      {/* Screenshot cropped to grid columns 2–6. */}
      <div style={{ position: "absolute", left: 233, top: 310, width: 767, height: 900, overflow: "hidden", outline: `1px solid ${P.line}` }}>
        <Img src={staticFile(`mobile/${project.slug}.jpg`)} style={{ width: "100%", display: "block" }} />
      </div>
      <div style={{ position: "absolute", left: 72, top: 1250, font: `800 150px/0.9 ${F.grotesk}`, letterSpacing: "-0.045em", color: P.offwhite }}>
        {project.name}
      </div>
      <div style={{ position: "absolute", left: 80, top: 1420, font: `500 34px ${F.grotesk}`, color: P.offwhite }}>{project.what}</div>
      <div style={{ position: "absolute", left: 80, top: 1470, display: "flex", gap: 28, font: `500 26px ${F.grotesk}`, color: P.steel }}>
        {project.stack.map((s) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, background: P.blue }} />
            {s}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );

/* ── B. Editorial ──────────────────────────────────────────── */

const Editorial: React.FC<{ shot: Shot }> = ({ shot }) =>
  shot === "identity" ? (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, right: 80, top: 250, display: "flex", justifyContent: "space-between", font: `500 24px ${F.grotesk}`, color: P.steel }}>
        <span>Ahmet Deniz Dündar</span>
        <span>Portfolio film</span>
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 292, height: 1, background: P.line }} />
      <div style={{ position: "absolute", left: 70, top: 560, font: `400 236px/0.88 ${F.serif}`, letterSpacing: "-0.02em", color: P.offwhite }}>
        Ahmet
        <br />
        Deniz
        <br />
        Dündar
      </div>
      <div style={{ position: "absolute", left: 80, top: 1240, width: 140, height: 1, background: P.blue }} />
      <div style={{ position: "absolute", left: 80, top: 1270, font: `500 30px ${F.grotesk}`, color: P.offwhite, letterSpacing: "0.12em" }}>
        WEB ENGINEERING · SEO · AI
      </div>
      <div style={{ position: "absolute", left: 80, top: 1330, width: 760, font: `italic 400 46px/1.25 ${F.serif}`, color: P.steel }}>
        Building useful digital experiences through engineering, design and optimization.
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 400, height: 1, background: P.line }} />
    </AbsoluteFill>
  ) : (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, right: 80, top: 250, display: "flex", justifyContent: "space-between", font: `500 24px ${F.grotesk}`, color: P.steel }}>
        <span>Selected work</span>
        <span>No. 3</span>
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 292, height: 1, background: P.line }} />
      <div style={{ position: "absolute", left: 76, top: 330, font: `400 168px/0.9 ${F.serif}`, color: P.offwhite, letterSpacing: "-0.015em" }}>
        {project.name}
      </div>
      {/* The screenshot as a plate, with generous margins and a caption. */}
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 520,
          width: 700,
          height: 900,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          borderRadius: 4,
        }}
      >
        <Img src={staticFile(`mobile/${project.slug}.jpg`)} style={{ width: "100%", display: "block" }} />
      </div>
      <div style={{ position: "absolute", left: 190, top: 1445, width: 700, font: `italic 400 40px/1.3 ${F.serif}`, color: P.offwhite }}>
        Plate 3. {project.what}.
      </div>
      <div style={{ position: "absolute", left: 190, top: 1500, font: `500 26px ${F.grotesk}`, color: P.steel, letterSpacing: "0.04em" }}>
        {project.stack.join(", ")}. {project.domain}
      </div>
    </AbsoluteFill>
  );

/* ── C. Technical blueprint ────────────────────────────────── */

const Tick: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <>
    <div style={{ position: "absolute", left: x - 14, top: y, width: 28, height: 1, background: P.steel }} />
    <div style={{ position: "absolute", left: x, top: y - 14, width: 1, height: 28, background: P.steel }} />
  </>
);

const Dim: React.FC<{ x1: number; x2: number; y: number; label: string }> = ({ x1, x2, y, label }) => (
  <>
    <div style={{ position: "absolute", left: x1, top: y, width: x2 - x1, height: 1, background: P.steelDim }} />
    <div style={{ position: "absolute", left: x1, top: y - 10, width: 1, height: 20, background: P.steelDim }} />
    <div style={{ position: "absolute", left: x2, top: y - 10, width: 1, height: 20, background: P.steelDim }} />
    <div
      style={{
        position: "absolute",
        left: (x1 + x2) / 2 - 80,
        width: 160,
        top: y - 16,
        textAlign: "center",
        font: `400 20px ${F.mono}`,
        color: P.steel,
        background: P.graphite,
      }}
    >
      {label}
    </div>
  </>
);

const Callout: React.FC<{ x: number; y: number; toX: number; label: string; right?: boolean }> = ({ x, y, toX, label, right }) => (
  <>
    <div style={{ position: "absolute", left: x - 7, top: y - 7, width: 14, height: 14, borderRadius: 7, border: `2px solid ${P.blue}` }} />
    <div style={{ position: "absolute", left: Math.min(x, toX), top: y, width: Math.abs(toX - x), height: 1, background: P.blue }} />
    <div
      style={{
        position: "absolute",
        top: y - 14,
        ...(right ? { left: toX + 14 } : { right: 1080 - toX + 14 }),
        font: `400 22px ${F.mono}`,
        color: P.offwhite,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  </>
);

const Technical: React.FC<{ shot: Shot }> = ({ shot }) =>
  shot === "identity" ? (
    <AbsoluteFill>
      {/* Baseline grid. */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 80, right: 80, top: 260 + i * 36, height: 1, background: "rgba(236,233,226,0.035)" }} />
      ))}
      <Tick x={80} y={260} />
      <Tick x={1000} y={260} />
      <Tick x={80} y={1540} />
      <Tick x={1000} y={1540} />
      <div style={{ position: "absolute", left: 80, top: 300, font: `400 22px ${F.mono}`, color: P.steel }}>identity / ahmetdenizdundar.com.tr</div>
      <div style={{ position: "absolute", left: 76, top: 660, font: `600 168px/0.95 ${F.plex}`, letterSpacing: "-0.03em", color: P.offwhite }}>
        Ahmet
        <br />
        Deniz
        <br />
        Dündar
      </div>
      <div style={{ position: "absolute", left: 80, top: 657, width: 920, height: 1, background: P.blue, opacity: 0.6 }} />
      <div style={{ position: "absolute", right: 80, top: 630, font: `400 20px ${F.mono}`, color: P.blue }}>cap height</div>
      <Dim x1={80} x2={1000} y={1220} label="1080 px" />
      <div style={{ position: "absolute", left: 80, top: 1280, font: `500 36px ${F.plex}`, color: P.offwhite }}>Web Engineering · SEO · AI</div>
      <div style={{ position: "absolute", left: 80, top: 1336, width: 720, font: `400 30px/1.45 ${F.plex}`, color: P.steel }}>
        Building useful digital experiences through engineering, design and optimization.
      </div>
    </AbsoluteFill>
  ) : (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 250, font: `400 22px ${F.mono}`, color: P.steel }}>work / 03 of 09</div>
      <div style={{ position: "absolute", right: 80, top: 250, font: `400 22px ${F.mono}`, color: P.steel }}>{project.domain}</div>
      <div style={{ position: "absolute", left: 290, top: 330, width: 500, height: 1084, overflow: "hidden", borderRadius: 28, outline: `1px solid ${P.steelDim}`, outlineOffset: 10 }}>
        <Img src={staticFile(`mobile/${project.slug}.jpg`)} style={{ width: "100%", display: "block" }} />
      </div>
      <Dim x1={290} x2={790} y={300} label="430 pt" />
      {/* Labels name what is visibly on the screen. */}
      <Callout x={420} y={370} toX={250} label="navigation" />
      <Callout x={560} y={600} toX={830} label="lead story" right />
      <Callout x={400} y={722} toX={250} label="headline" />
      <Callout x={540} y={1360} toX={830} label="tab bar" right />
      <div style={{ position: "absolute", left: 80, top: 1450, font: `600 116px/0.95 ${F.plex}`, letterSpacing: "-0.03em", color: P.offwhite }}>{project.name}</div>
      <div style={{ position: "absolute", left: 80, top: 1570, font: `400 24px ${F.mono}`, color: P.steel }}>
        {project.what.toLowerCase()} / {project.stack.join(" + ")}
      </div>
    </AbsoluteFill>
  );

export const StyleFrame: React.FC<{ dir: Direction; shot: Shot }> = ({ dir, shot }) => {
  const ready = useFonts();
  return (
    <AbsoluteFill style={{ background: P.graphite }}>
      {ready && (dir === "swiss" ? <Swiss shot={shot} /> : dir === "editorial" ? <Editorial shot={shot} /> : <Technical shot={shot} />)}
      <Grain />
    </AbsoluteFill>
  );
};
