import React from "react";
import { AbsoluteFill } from "remotion";
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

      <HLine x={80} y={900} w={920} p={ramp(t, beat(105), beat(106.5), "expo.out")} color={P.steelDim} />
      {/* The YÖK certificate, filed under intelligence. */}
      <div style={{ position: "absolute", left: 80, top: 950, width: 920, clipPath: `inset(0 0 ${100 - ramp(t, beat(105.5), beat(107), "expo.out") * 100}% 0)` }}>
        <div style={{ font: `400 22px ${F.mono}`, color: P.blue }}>certificate</div>
        <div style={{ font: `500 40px/1.2 ${F.plex}`, color: P.offwhite, marginTop: 12 }}>Artificial Intelligence and Machine Learning</div>
        <div style={{ font: `400 24px/1.4 ${F.mono}`, color: P.steel, marginTop: 12 }}>Data Analysis School, Council of Higher Education (YÖK), 2026</div>
      </div>
    </AbsoluteFill>
  );
};

/* ── ACT VI · THE HUMAN DIMENSION ──────────────────────────── */

export const ActHuman: React.FC = () => {
  const t = useT();
  const s = beat(ACT.human);
  const e = beat(ACT.signature);
  if (t < s - 0.1 || t > e + 0.3) return null;

  // A dense architectural grid draws, then thins to a single balanced interface.
  const dense = ramp(t, s, s + 0.9, "power2.out") * (1 - ramp(t, beat(111), beat(115), "power2.inOut"));
  const card = ramp(t, beat(112), beat(115), "power3.inOut");
  const out = ramp(t, e - 0.4, e + 0.1, "power3.in");
  const first = ramp(t, beat(112), beat(113.5), "linear");
  const firstOut = ramp(t, beat(118), beat(118.8), "linear");
  const second = ramp(t, beat(118.5), beat(120), "linear");

  const cx = 240;
  const cy = 860;
  const cw = 600;
  const ch = 470;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: dense }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <HLine key={`h${i}`} x={80} y={640 + i * 30} w={920} p={ramp(t, s + i * 0.012, s + 0.5 + i * 0.012, "expo.out")} color="rgba(236,233,226,0.22)" />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <VLine key={`v${i}`} x={80 + i * 40} y={640} h={870} p={ramp(t, s + 0.1 + i * 0.012, s + 0.6 + i * 0.012, "expo.out")} color="rgba(236,233,226,0.22)" />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: 1 - out }}>
        {/* The simple interface: a title, two lines of text, one action. */}
        <div style={{ position: "absolute", left: cx, top: cy, width: cw, height: ch, border: `1px solid ${P.steel}`, clipPath: `inset(0 ${100 - card * 100}% 0 0)` }}>
          <div style={{ position: "absolute", left: 48, top: 56, width: 330, height: 26, background: P.offwhite, scale: `${ramp(t, beat(114), beat(115.5), "expo.out")} 1`, transformOrigin: "0 50%" }} />
          <div style={{ position: "absolute", left: 48, top: 130, width: 480, height: 12, background: P.steel, scale: `${ramp(t, beat(114.5), beat(116), "expo.out")} 1`, transformOrigin: "0 50%" }} />
          <div style={{ position: "absolute", left: 48, top: 162, width: 400, height: 12, background: P.steel, scale: `${ramp(t, beat(115), beat(116.5), "expo.out")} 1`, transformOrigin: "0 50%" }} />
          <div style={{ position: "absolute", left: 48, top: 340, width: 210, height: 64, background: P.blue, opacity: ramp(t, beat(116), beat(117.5), "power2.out") }} />
        </div>
        <Label x={cx} y={cy + ch + 40} p={ramp(t, beat(115), beat(117), "linear")}>BSc Psychology, Çukurova University</Label>
        <Label x={cx} y={cy + ch + 78} p={ramp(t, beat(116), beat(118), "linear")}>Computer Programming, Anadolu University</Label>
      </AbsoluteFill>

      <Statement lines={["UNDERSTAND THE", "PROBLEM."]} x={76} y={360} size={104} p={first} out={firstOut} tracking="-0.03em" />
      <Statement lines={["BUILD THE RIGHT", "SOLUTION."]} x={76} y={360} size={104} p={second} out={out} tracking="-0.03em" />
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

  const reveal = ramp(t, s + 0.15, s + 1.4, "linear");
  const initialsBlue = ramp(t, beat(129), beat(130), "power2.out");
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
      <Statement lines={["SOFTWARE · WEB · SEO · AI"]} x={80} y={930} size={30} weight={500} tracking="0.1em" color={P.steel} p={finalBlock(1)} />
      <Statement lines={["ENGINEER THE", "EXPERIENCE."]} x={76} y={1040} size={112} p={finalBlock(2)} tracking="-0.035em" />
      <Statement lines={["ahmetdenizdundar.com.tr"]} x={80} y={1330} size={34} weight={500} tracking="0" color={P.blue} p={finalBlock(3)} />
    </AbsoluteFill>
  );
};
