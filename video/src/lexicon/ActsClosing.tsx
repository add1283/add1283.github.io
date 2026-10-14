import React from "react";
import { AbsoluteFill } from "remotion";
import { SERIF } from "./ActsOpening";
import { F } from "./fonts";
import { ACT, HLine, Label, Statement, Tick, VLine, beat, lerp, ramp, useT } from "./lib";
import { P } from "./tokens";

/* ── ACT V · VISIBILITY AND INTELLIGENCE ───────────────────── */

const COLUMNS = [
  { head: "ENGINEERING", items: ["Web applications", "C# / .NET", "ASP.NET MVC", "Angular", "SQL"] },
  { head: "VISIBILITY", items: ["Technical SEO", "Search Console", "GA4", "Core Web Vitals", "PageSpeed", "SEM & Google Ads"] },
  { head: "INTELLIGENCE", items: ["AI APIs", "Prompt engineering", "Claude, GPT", "Cursor workflows", "Automation"] },
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
  const s = beat(ACT.systems);
  const e = beat(ACT.human);
  if (t < s - 0.6 || t > e + 0.2) return null;
  const out = ramp(t, e - 0.45, e, "power3.in");
  const colX = [80, 390, 700];
  return (
    <AbsoluteFill style={{ opacity: 1 - out * 0.85 }}>
      <Label x={80} y={250} p={ramp(t, s, s + 0.8, "linear")}>systems / how the work connects</Label>

      <HLine x={80} y={440} w={620} p={ramp(t, beat(93.5), beat(95.5), "expo.out")} color={P.blue} />
      {colX.map((x, c) => (
        <React.Fragment key={c}>
          <div
            style={{
              position: "absolute",
              left: x - 7,
              top: 433,
              width: 14,
              height: 14,
              borderRadius: 7,
              background: P.blue,
              scale: String(ramp(t, beat(94 + c * 0.5), beat(94.6 + c * 0.5), "back.out(2)")),
            }}
          />
          <Statement lines={[COLUMNS[c].head]} x={x} y={470} size={33} weight={600} tracking="0.05em" p={ramp(t, beat(94.5 + c), beat(96 + c), "linear")} />
        </React.Fragment>
      ))}

      {/* Loose labels find their column: information becoming structured. */}
      {COLUMNS.map((col, c) =>
        col.items.map((item, k) => {
          const [sx, sy, rot] = scatter(c, k);
          const startAt = beat(96 + c * 3 + k * 0.5);
          const settle = ramp(t, startAt, startAt + 0.7, "expo.out");
          const appear = ramp(t, s - 0.4 + (c * 5 + k) * 0.05, s + 0.2 + (c * 5 + k) * 0.05, "power2.out");
          return (
            <div
              key={item}
              style={{
                position: "absolute",
                left: lerp(sx, colX[c], settle),
                top: lerp(sy, 545 + k * 54, settle),
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

      {/* Under all three: people. The psychology voice carries the foundation. */}
      {colX.map((x, c) => (
        <VLine key={c} x={x} y={860} h={70} p={ramp(t, beat(104 + c * 0.3), beat(105 + c * 0.3), "expo.out")} color={P.steel} from="bottom" />
      ))}
      <HLine x={80} y={930} w={620} p={ramp(t, beat(104.5), beat(106), "expo.out")} color={P.steel} />
      <div style={{ position: "absolute", left: 80, top: 962, overflow: "hidden" }}>
        <div style={{ font: SERIF(64), color: P.offwhite, translate: `0 ${(1 - ramp(t, beat(105), beat(106.5), "expo.out")) * 110}%`, paddingBottom: 12 }}>
          People: perception, attention, behaviour.
        </div>
      </div>
      <Label x={80} y={1060} p={ramp(t, beat(106), beat(107.5), "linear")}>the foundation under every column</Label>
      <Label x={80} y={1150} p={ramp(t, beat(106.5), beat(108), "linear")} color={P.offwhite}>
        Turkish, native / English, professional working proficiency
      </Label>
    </AbsoluteFill>
  );
};

/* ── ACT VI · THE PATH: where the two disciplines meet ───── */

type Kind = "mind" | "both" | "code";
const PATH: { years: string; what: string; where: string; kind: Kind }[] = [
  { years: "2018–2022", what: "Psychology, BSc", where: "Çukurova University", kind: "mind" },
  { years: "2019–2021", what: "Web, graphic and motion design", where: "1907 ÜNİFEB, Çukurova University", kind: "both" },
  { years: "2021", what: "Digital Marketing", where: "Boğaziçi University Business and Economics Club", kind: "both" },
  { years: "2021–", what: "Web designer and frontend developer", where: "VBT Software", kind: "code" },
  { years: "2022–2024", what: "Computer Programming, associate degree", where: "Anadolu University", kind: "code" },
  { years: "2024", what: "Intellectual and Industrial Property Rights", where: "Kobimen Akademi", kind: "both" },
  { years: "2026", what: "Circular Economy Trainer Programme", where: "Habitat Association", kind: "both" },
  { years: "2026", what: "AI and Machine Learning", where: "Data Analysis School, YÖK", kind: "code" },
];

export const ActHuman: React.FC = () => {
  const t = useT();
  const s = beat(ACT.human);
  const release = beat(127);
  if (t < s - 0.1 || t > release + 0.1) return null;

  const pathOut = ramp(t, beat(118.6), beat(119.6), "power3.in");
  const first = ramp(t, beat(119.5), beat(121), "expo.out");
  const second = ramp(t, beat(120.8), beat(122.3), "expo.out");
  // The two sentences hold into the first beats of Act VII.
  const out = ramp(t, release - 0.4, release, "power3.in");
  const top = 360;
  const step = 112;
  const axis = ramp(t, s, s + 2.2, "power1.inOut");
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - pathOut }}>
        <Label x={80} y={250} p={ramp(t, s, s + 0.7, "linear")}>path / where the two meet</Label>
        <Label right={80} y={250} p={ramp(t, s + 0.2, s + 0.9, "linear")} align="right" color={P.steel}>
          <span style={{ color: P.offwhite }}>mind</span> → <span style={{ color: P.blue }}>code</span>
        </Label>
        {/* The axis turns from off-white (psychology) to blue (software) as it goes. */}
        <div
          style={{
            position: "absolute",
            left: 276,
            top: top - 10,
            width: 2,
            height: PATH.length * step,
            background: `linear-gradient(${P.offwhite}, ${P.offwhite} 18%, ${P.blue} 55%, ${P.blue})`,
            transformOrigin: "50% 0",
            scale: `1 ${axis}`,
          }}
        />
        {PATH.map((row, k) => {
          const at = s + 0.15 + k * 0.25;
          const p = ramp(t, at, at + 0.55, "expo.out");
          const dot = row.kind === "mind" ? P.offwhite : row.kind === "code" ? P.blue : P.steel;
          return (
            <div key={k} style={{ position: "absolute", left: 0, top: top + k * step, width: 1080, opacity: p, translate: `${(1 - p) * 30}px 0` }}>
              <div style={{ position: "absolute", left: 80, top: 4, width: 170, font: `400 22px ${F.mono}`, color: P.steel }}>{row.years}</div>
              <div style={{ position: "absolute", left: 268, top: 8, width: 18, height: 18, borderRadius: 9, background: dot, boxShadow: row.kind === "code" ? `0 0 10px ${P.blue}` : undefined }} />
              <div
                style={{
                  position: "absolute",
                  left: 316,
                  top: 0,
                  width: 640,
                  font: row.kind === "mind" ? SERIF(40) : `500 30px/1.15 ${F.plex}`,
                  color: P.offwhite,
                }}
              >
                {row.what}
              </div>
              <div style={{ position: "absolute", left: 316, top: 46, width: 640, font: `400 21px ${F.mono}`, color: P.steel }}>{row.where}</div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Two sentences, two voices. */}
      <div style={{ position: "absolute", left: 80, top: 760, overflow: "hidden", opacity: 1 - out }}>
        <div style={{ font: SERIF(110), color: P.offwhite, letterSpacing: "-0.01em", translate: `0 ${(1 - first) * 110}%`, paddingBottom: 16 }}>Understand</div>
      </div>
      <div style={{ position: "absolute", left: 80, top: 880, overflow: "hidden", opacity: 1 - out }}>
        <div style={{ font: SERIF(110), color: P.offwhite, letterSpacing: "-0.01em", translate: `0 ${(1 - first) * 110}%`, paddingBottom: 16 }}>the problem.</div>
      </div>
      <Statement lines={["BUILD THE RIGHT", "SOLUTION."]} x={76} y={1040} size={100} p={second} out={out} tracking="-0.035em" />
    </AbsoluteFill>
  );
};

/* ── ACT VII · THE SIGNATURE ───────────────────────────────── */

const NAME = ["Ahmet", "Deniz", "Dündar"];

export const ActSignature: React.FC = () => {
  const t = useT();
  const s = beat(ACT.signature);
  const peak = beat(ACT.peak);
  if (t < s - 0.1) return null;

  // The name enters once the Act VI sentences have cleared.
  const reveal = ramp(t, beat(127), beat(127) + 0.9, "linear");
  const initialsBlue = ramp(t, beat(129.5), beat(130.3), "power2.out");
  const restOut = ramp(t, peak, peak + 0.4, "power3.in");
  const monogram = ramp(t, peak + 0.35, peak + 1.3, "power3.inOut");
  const finalBlock = (k: number) => ramp(t, peak + 0.9 + k * 0.22, peak + 1.8 + k * 0.22, "linear");
  const sweep = ramp(t, peak, peak + 0.9, "power2.out");
  const end = ramp(t, 63.3, 64, "power2.in");

  const size = 168;
  const lineH = size * 0.95;
  const finalSize = 118;
  const scale = lerp(1, finalSize / size, monogram);

  return (
    <AbsoluteFill style={{ opacity: 1 - end }}>
      <Tick x={80} y={260} p={ramp(t, s, s + 0.6, "expo.out")} />
      <Tick x={1000} y={260} p={ramp(t, s + 0.1, s + 0.7, "expo.out")} />
      <Tick x={80} y={1540} p={ramp(t, s + 0.2, s + 0.8, "expo.out")} />
      <Tick x={1000} y={1540} p={ramp(t, s + 0.3, s + 0.9, "expo.out")} />

      {/* The cap-height line from Act II returns; at the peak a light runs along it. */}
      <HLine x={80} y={lerp(664, 336, monogram)} w={920} p={ramp(t, s, s + 0.7, "expo.out") * lerp(1, 0.35, monogram)} color={P.blue} />
      {sweep > 0 && sweep < 1 && (
        <div
          style={{
            position: "absolute",
            left: lerp(80, 1000, sweep) - 60,
            top: lerp(664, 336, monogram) - 2,
            width: 120,
            height: 5,
            background: `linear-gradient(90deg, transparent, #ffffff, transparent)`,
            boxShadow: `0 0 30px 8px ${P.blue}`,
            opacity: 1 - sweep,
          }}
        />
      )}

      {/* Ahmet / Deniz / Dündar. At the peak only the initials stay, and A·D·D becomes the mark. */}
      {NAME.map((word, k) => {
        const top = lerp(668 + k * lineH, 340 + k * finalSize * 0.9, monogram);
        const k0 = ramp(reveal, k * 0.18, 0.7 + k * 0.18, "expo.out");
        return (
          <div key={word} style={{ position: "absolute", left: 74, top, overflow: "hidden", paddingTop: size * 0.12, marginTop: -size * 0.12 }}>
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
              <span style={{ color: initialsBlue > 0.5 ? P.blue : P.offwhite, textShadow: initialsBlue > 0.5 ? `0 0 ${30 * (1 - monogram)}px ${P.blue}` : undefined }}>{word[0]}</span>
              <span style={{ color: P.offwhite, display: "inline-block", clipPath: `inset(0 ${restOut * 100}% 0 0)` }}>{word.slice(1)}</span>
            </div>
          </div>
        );
      })}

      {/* Final lockup. */}
      <Statement lines={["Ahmet Deniz Dündar"]} x={80} y={830} size={76} p={finalBlock(0)} tracking="-0.02em" />
      <div style={{ position: "absolute", left: 80, top: 922, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 22, translate: `0 ${(1 - ramp(finalBlock(1), 0, 0.8, "expo.out")) * 110}%`, paddingBottom: 8 }}>
          <span style={{ font: SERIF(80), color: P.offwhite }}>Psychology</span>
          <span style={{ font: SERIF(80), color: P.blue }}>×</span>
          <span style={{ font: `600 66px ${F.plex}`, color: P.offwhite, letterSpacing: "-0.03em" }}>Software</span>
        </div>
      </div>
      <Label x={80} y={1030} p={finalBlock(1.5)} color={P.steel} size={24}>web / seo / ai / performance</Label>
      <Statement lines={["ENGINEER THE", "EXPERIENCE."]} x={76} y={1100} size={112} p={finalBlock(2)} tracking="-0.035em" />
      <Statement lines={["ahmetdenizdundar.com.tr"]} x={80} y={1384} size={34} weight={500} tracking="0" color={P.blue} p={finalBlock(3)} />
    </AbsoluteFill>
  );
};
