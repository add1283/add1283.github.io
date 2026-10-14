import React from "react";
import { AbsoluteFill } from "remotion";
import { SERIF } from "./ActsOpening";
import { F } from "./fonts";
import { ACT, HLine, Label, Statement, Tick, VLine, beat, lerp, ramp, useT } from "./lib";
import { P } from "./tokens";

/* ── ACT V · VISIBILITY AND INTELLIGENCE ───────────────────── */

const COLUMNS = [
  { head: "ENGINEERING", items: ["C# / .NET", "ASP.NET MVC / Core", "SQL", "PHP / WordPress", "Git / GitHub"] },
  { head: "INTERFACE", items: ["TypeScript / Angular", "HTML / SCSS", "Tailwind / Bootstrap", "GSAP / Three.js", "Responsive, accessible UI"] },
  { head: "VISIBILITY", items: ["Technical SEO", "Core Web Vitals", "Structured data", "Search Console / GA4", "SEM / Google Ads", "Content architecture"] },
  { head: "INTELLIGENCE", items: ["AI and machine learning", "Data analysis", "Prompt engineering", "Claude / GPT APIs", "Cursor / Copilot", "Automation"] },
];

/** Deterministic scatter: where each label starts, around the last project's module list. */
const scatter = (c: number, k: number): [number, number, number] => {
  const n = c * 7 + k;
  const r = (m: number) => {
    const x = Math.sin(n * 91.7 + m * 13.3) * 43758.5453;
    return x - Math.floor(x);
  };
  return [560 + r(1) * 360, 760 + r(2) * 520, (r(3) - 0.5) * 16];
};

export const ActSystems: React.FC = () => {
  const t = useT();
  const b0 = ACT.systems;
  const s = beat(b0);
  const e = beat(ACT.human);
  if (t < s - 0.6 || t > e + 0.2) return null;
  const out = ramp(t, e - 0.45, e, "power3.in");
  // Two rows of two: each discipline gets a heading on the blue rail and its items below.
  const colX = [80, 560, 80, 560];
  const colY = [430, 430, 790, 790];
  return (
    <AbsoluteFill style={{ opacity: 1 - out * 0.85 }}>
      <Label x={80} y={250} p={ramp(t, s, s + 0.8, "linear")}>systems / how the work connects</Label>
      <Label right={80} y={250} p={ramp(t, s + 0.2, s + 0.9, "linear")} align="right">04 disciplines, 1 foundation</Label>

      {[430, 790].map((y, r) => (
        <HLine key={y} x={80} y={y} w={920} p={ramp(t, beat(b0 + 0.3 + r), beat(b0 + 2 + r), "expo.out")} color={P.blue} />
      ))}
      {COLUMNS.map((col, c) => (
        <React.Fragment key={c}>
          <div
            style={{
              position: "absolute",
              left: colX[c] - 7,
              top: colY[c] - 7,
              width: 14,
              height: 14,
              borderRadius: 7,
              background: P.blue,
              scale: String(ramp(t, beat(b0 + 0.6 + c * 0.5), beat(b0 + 1.2 + c * 0.5), "back.out(2)")),
            }}
          />
          <Label x={colX[c] + 24} y={colY[c] + 22} p={ramp(t, beat(b0 + 1 + c * 0.5), beat(b0 + 2 + c * 0.5), "linear")} size={20}>
            {String(c + 1).padStart(2, "0")}
          </Label>
          <Statement lines={[col.head]} x={colX[c] + 70} y={colY[c] + 18} size={32} weight={600} tracking="0.05em" p={ramp(t, beat(b0 + 1 + c * 0.5), beat(b0 + 2.5 + c * 0.5), "linear")} />
        </React.Fragment>
      ))}

      {/* Loose labels find their column: information becoming structured. */}
      {COLUMNS.map((col, c) =>
        col.items.map((item, k) => {
          const [sx, sy, rot] = scatter(c, k);
          const startAt = beat(b0 + 2 + c * 1.4 + k * 0.3);
          const settle = ramp(t, startAt, startAt + 0.8, "expo.out");
          const appear = ramp(t, s - 0.4 + (c * 6 + k) * 0.04, s + 0.2 + (c * 6 + k) * 0.04, "power2.out");
          return (
            <div
              key={item}
              style={{
                position: "absolute",
                left: lerp(sx, colX[c] + 70, settle),
                top: lerp(sy, colY[c] + 76 + k * 44, settle),
                rotate: `${lerp(rot, 0, settle)}deg`,
                font: `400 24px ${F.mono}`,
                color: settle > 0.6 ? P.offwhite : P.steel,
                opacity: appear * lerp(0.45, 1, settle),
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </div>
          );
        }),
      )}

      {/* Under all four: people. The psychology voice carries the foundation. */}
      {[80, 560].map((x, c) => (
        <VLine key={c} x={x} y={1100} h={60} p={ramp(t, beat(b0 + 8 + c * 0.3), beat(b0 + 9 + c * 0.3), "expo.out")} color={P.steel} from="bottom" />
      ))}
      <HLine x={80} y={1160} w={920} p={ramp(t, beat(b0 + 8.3), beat(b0 + 9.8), "expo.out")} color={P.steel} />
      <div style={{ position: "absolute", left: 80, top: 1186, overflow: "hidden" }}>
        <div style={{ font: SERIF(58), color: P.offwhite, translate: `0 ${(1 - ramp(t, beat(b0 + 8.8), beat(b0 + 10.3), "expo.out")) * 110}%`, paddingBottom: 12 }}>
          People: perception, attention, behaviour.
        </div>
      </div>
      <div style={{ position: "absolute", left: 80, top: 1270, width: 900, font: `400 28px/1.35 ${F.plex}`, color: "rgba(236,233,226,0.78)", opacity: ramp(t, beat(b0 + 9.8), beat(b0 + 11), "power2.out") }}>
        Hierarchy, legibility and speed, decided by how people actually read.
      </div>
      <Label x={80} y={1350} p={ramp(t, beat(b0 + 10.3), beat(b0 + 11.8), "linear")}>
        languages / Turkish, native / English, professional working
      </Label>
    </AbsoluteFill>
  );
};

/* ── ACT VI · THE PATH: where the two disciplines meet ───── */

type Kind = "mind" | "both" | "code";
const PATH: { years: string; what: string; where: string; kind: Kind }[] = [
  { years: "2018–2022", what: "Psychology, BSc", where: "Çukurova University, Adana", kind: "mind" },
  { years: "2019–2021", what: "Web board member, 1907 ÜNİFEB", where: "Social media, graphic and motion design, campaigns", kind: "both" },
  { years: "2021", what: "Digital Marketing", where: "Boğaziçi University Business and Economics Club", kind: "both" },
  { years: "2021–", what: "Web designer and frontend developer", where: "VBT Software, UI team: interfaces, page speed, SEO", kind: "code" },
  { years: "2022–2024", what: "Computer Programming, associate degree", where: "Anadolu University", kind: "code" },
  { years: "2024", what: "Intellectual and Industrial Property Rights", where: "Kobimen Akademi", kind: "both" },
  { years: "2026", what: "Circular Economy Trainer Programme", where: "Habitat Association", kind: "both" },
  { years: "2026", what: "AI and Machine Learning", where: "Data Analysis School, YÖK", kind: "code" },
];

export const ActHuman: React.FC = () => {
  const t = useT();
  const s = beat(ACT.human);
  const e = beat(ACT.signature);
  if (t < s - 0.1 || t > e + 0.1) return null;

  const first = ramp(t, beat(ACT.human + 6), beat(ACT.human + 7.5), "expo.out");
  const second = ramp(t, beat(ACT.human + 7.5), beat(ACT.human + 9), "expo.out");
  const out = ramp(t, e - 0.45, e, "power3.in");
  const top = 330;
  const step = 78;
  const axis = ramp(t, s, s + 1.8, "power1.inOut");
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <Label x={80} y={250} p={ramp(t, s, s + 0.7, "linear")}>path / where the two meet</Label>
      <Label right={80} y={250} p={ramp(t, s + 0.2, s + 0.9, "linear")} align="right" color={P.steel}>
        <span style={{ color: P.offwhite }}>mind</span> → <span style={{ color: P.blue }}>code</span>
      </Label>
      {/* The axis turns from off-white (psychology) to blue (software) as it goes. */}
      <div
        style={{
          position: "absolute",
          left: 276,
          top: top - 6,
          width: 2,
          height: (PATH.length - 1) * step + 30,
          background: `linear-gradient(${P.offwhite}, ${P.offwhite} 18%, ${P.blue} 55%, ${P.blue})`,
          transformOrigin: "50% 0",
          scale: `1 ${axis}`,
        }}
      />
      {PATH.map((row, k) => {
        const at = s + 0.1 + k * 0.2;
        const p = ramp(t, at, at + 0.55, "expo.out");
        const dot = row.kind === "mind" ? P.offwhite : row.kind === "code" ? P.blue : P.steel;
        return (
          <div key={k} style={{ position: "absolute", left: 0, top: top + k * step, width: 1080, opacity: p, translate: `${(1 - p) * 30}px 0` }}>
            <div style={{ position: "absolute", left: 80, top: 3, width: 170, font: `400 20px ${F.mono}`, color: P.steel }}>{row.years}</div>
            <div style={{ position: "absolute", left: 269, top: 6, width: 16, height: 16, borderRadius: 8, background: dot, boxShadow: row.kind === "code" ? `0 0 10px ${P.blue}` : undefined }} />
            <div style={{ position: "absolute", left: 316, top: 0, width: 640, font: row.kind === "mind" ? SERIF(36) : `500 27px/1.15 ${F.plex}`, color: P.offwhite }}>{row.what}</div>
            <div style={{ position: "absolute", left: 316, top: 38, width: 640, font: `400 19px ${F.mono}`, color: P.steel }}>{row.where}</div>
          </div>
        );
      })}

      {/* The method, in two voices, under the path that produced it. */}
      <HLine x={80} y={1000} w={920} p={ramp(t, beat(ACT.human + 5.5), beat(ACT.human + 7), "expo.out")} />
      <div style={{ position: "absolute", left: 80, top: 1030, overflow: "hidden" }}>
        <div style={{ font: SERIF(84), color: P.offwhite, letterSpacing: "-0.01em", translate: `0 ${(1 - first) * 110}%`, paddingBottom: 14 }}>Understand the problem.</div>
      </div>
      <Statement lines={["BUILD THE RIGHT", "SOLUTION."]} x={76} y={1140} size={92} p={second} tracking="-0.035em" />
    </AbsoluteFill>
  );
};

/* ── ACT VII · THE MARK ────────────────────────────────────── */

const NAME = ["Ahmet", "Deniz", "Dündar"];

/** Advance widths of the initials, measured from the loaded font so the wordmark assembles exactly. */
const advance = (() => {
  const cache = new Map<string, number>();
  return (ch: string, size: number) => {
    const key = `${ch}@${size}`;
    if (!cache.has(key)) {
      const ctx = document.createElement("canvas").getContext("2d")!;
      ctx.font = `600 ${size}px "${F.plex}"`;
      cache.set(key, ctx.measureText(ch).width);
    }
    return cache.get(key)!;
  };
})();

export const ActSignature: React.FC = () => {
  const t = useT();
  const s = beat(ACT.signature);
  const peak = beat(ACT.peak);
  if (t < s - 0.1) return null;

  const reveal = ramp(t, s + 0.05, s + 1.0, "linear");
  const initialsBlue = ramp(t, beat(ACT.signature + 2.5), beat(ACT.signature + 3.3), "power2.out");
  const restOut = ramp(t, beat(ACT.signature + 4), beat(ACT.signature + 4) + 0.45, "power3.in");
  const morph = ramp(t, beat(ACT.signature + 4.8), beat(ACT.signature + 6.6), "power3.inOut");
  const build = (a: number, d = 1.2) => ramp(t, beat(ACT.signature + a), beat(ACT.signature + a + d), "expo.out");
  const guidesOut = ramp(t, peak - 0.3, peak + 0.5, "power2.inOut");
  const sweep = ramp(t, peak, peak + 0.8, "power2.out");
  const pulse = Math.exp(-Math.max(0, t - peak) * 3) * (t >= peak ? 1 : 0);
  const end = ramp(t, 59.55, 60, "power2.in");

  // From a stacked name at 168 px to a centred wordmark at 300 px.
  const size = 168;
  const lineH = size * 0.95;
  const markSize = 300;
  const track = -0.03 * markSize;
  const adv = [advance("A", markSize), advance("D", markSize), advance("D", markSize)];
  const markW = adv[0] + adv[1] + adv[2] + track * 2;
  const markX = 540 - markW / 2;
  const markTop = 760;
  // IBM Plex Sans: ascent 1.025 em, descent 0.275 em, cap height 0.698 em, set at line-height 0.95.
  const baseY = markTop + markSize * 0.85;
  const capY = baseY - markSize * 0.698;
  const letterX = [markX, markX + adv[0] + track, markX + adv[0] + adv[1] + track * 2];
  const scale = lerp(1, markSize / size, morph);

  return (
    <AbsoluteFill style={{ opacity: 1 - end }}>
      <Tick x={80} y={260} p={ramp(t, s, s + 0.6, "expo.out")} />
      <Tick x={1000} y={260} p={ramp(t, s + 0.1, s + 0.7, "expo.out")} />
      <Tick x={80} y={1540} p={ramp(t, s + 0.2, s + 0.8, "expo.out")} />
      <Tick x={1000} y={1540} p={ramp(t, s + 0.3, s + 0.9, "expo.out")} />
      <Label x={80} y={300} p={ramp(t, s + 0.3, s + 1.1, "linear") * (1 - guidesOut)}>mark / sheet 01</Label>
      <Label right={80} y={300} p={ramp(t, s + 0.4, s + 1.2, "linear") * (1 - guidesOut)} align="right">IBM Plex Sans 600 / #4A7DFF</Label>

      {/* Construction: cap line, baseline and the letter boundaries, drawn like a logo sheet. */}
      <div style={{ opacity: 1 - guidesOut }}>
        <HLine x={0} y={capY} w={1080} p={build(6.4)} color="rgba(236,233,226,0.18)" />
        <HLine x={0} y={baseY} w={1080} p={build(6.6)} color="rgba(236,233,226,0.18)" />
        {[...letterX, markX + markW].map((x, i) => (
          <VLine key={i} x={x} y={620} h={560} p={build(7 + i * 0.3)} color="rgba(236,233,226,0.12)" />
        ))}
        <Label right={1080 - markX + 16} y={capY - 15} p={build(7.4)} size={18} align="right">cap</Label>
        <Label right={1080 - markX + 16} y={baseY - 15} p={build(7.6)} size={18} align="right">base</Label>
        {/* Dimension above the mark. */}
        <HLine x={markX} y={680} w={markW} p={build(8)} from="center" />
        <VLine x={markX} y={670} h={20} p={build(8)} />
        <VLine x={markX + markW} y={670} h={20} p={build(8)} />
        <div style={{ position: "absolute", left: 540 - 140, width: 280, top: 664, textAlign: "center", font: `400 20px ${F.mono}`, color: P.steel, opacity: build(8.3) }}>
          <span style={{ background: P.graphite, padding: "0 12px" }}>A · D · D</span>
        </div>
        {/* Each initial expanded once more, under its letter. */}
        {NAME.map((word, k) => (
          <div key={word} style={{ position: "absolute", left: letterX[k], top: baseY + 70, width: adv[k], textAlign: "center", font: `400 20px ${F.mono}`, color: P.steel, opacity: build(9 + k * 0.4) }}>
            {word.toLowerCase()}
          </div>
        ))}
      </div>

      {/* Ahmet / Deniz / Dündar: only the initials stay, and they assemble into ADD. */}
      {NAME.map((word, k) => {
        const k0 = ramp(reveal, k * 0.18, 0.7 + k * 0.18, "expo.out");
        const left = lerp(74, letterX[k], morph);
        const top = lerp(668 + k * lineH, markTop, morph);
        const toWhite = morph;
        return (
          <div key={word} style={{ position: "absolute", left, top, overflow: morph > 0 ? "visible" : "hidden", paddingTop: size * 0.12, marginTop: -size * 0.12 }}>
            <div
              style={{
                font: `600 ${size}px/0.95 ${F.plex}`,
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
                translate: `0 ${(1 - k0) * 110}%`,
                scale: String(scale),
                transformOrigin: "0 0",
              }}
            >
              <span
                style={{
                  color: initialsBlue > 0.5 && toWhite < 0.5 ? P.blue : P.offwhite,
                  textShadow: pulse > 0.01 ? `0 0 ${50 * pulse}px rgba(74,125,255,${0.9 * pulse})` : initialsBlue > 0.5 && toWhite < 0.5 ? `0 0 24px ${P.blue}` : undefined,
                }}
              >
                {word[0]}
              </span>
              <span style={{ color: P.offwhite, display: "inline-block", clipPath: `inset(0 ${restOut * 100}% 0 0)` }}>{word.slice(1)}</span>
            </div>
          </div>
        );
      })}

      {/* The signal line from the first frame becomes the mark's rule, ending in a node. */}
      <HLine x={markX} y={baseY + 34} w={markW} p={build(7.2, 1.6)} color={P.blue} thick={6} glow />
      <div
        style={{
          position: "absolute",
          left: markX + markW + 14,
          top: baseY + 28,
          width: 18,
          height: 18,
          background: P.blue,
          boxShadow: `0 0 ${14 + 30 * pulse}px ${P.blue}`,
          scale: String(ramp(t, beat(ACT.signature + 8.6), beat(ACT.signature + 9.2), "back.out(2.5)")),
        }}
      />
      {sweep > 0 && sweep < 1 && (
        <div
          style={{
            position: "absolute",
            left: lerp(markX - 80, markX + markW + 80, sweep) - 80,
            top: baseY + 33,
            width: 160,
            height: 8,
            background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
            boxShadow: `0 0 36px 10px ${P.blue}`,
            opacity: 1 - sweep,
          }}
        />
      )}

      <div style={{ position: "absolute", left: 0, width: 1080, top: baseY + 150, textAlign: "center", overflow: "hidden" }}>
        <div style={{ font: `500 34px ${F.plex}`, color: P.offwhite, letterSpacing: "0.01em", translate: `0 ${(1 - ramp(t, beat(ACT.signature + 10.5), beat(ACT.signature + 12), "expo.out")) * 110}%` }}>
          ahmetdenizdundar.com.tr
        </div>
      </div>
    </AbsoluteFill>
  );
};
