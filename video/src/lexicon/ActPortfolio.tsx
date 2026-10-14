import React from "react";
import { AbsoluteFill } from "remotion";
import { SERIF } from "./ActsOpening";
import { F } from "./fonts";
import { Callout, Label, PHONE_RATIO, PROJECT_BEATS, Phone, Statement, beat, lerp, ramp, useT } from "./lib";
import { P, PROJECTS } from "./tokens";

type Layout = "center" | "left" | "right";

interface Shot {
  layout: Layout;
  /** Real <title> of the page, read from the live site at capture time. */
  title: string;
  /** Callouts: position on the screen (0..1) and what is visibly there. */
  notes: { fx: number; fy: number; label: string }[];
  scroll?: [number, number];
  zoom?: number;
  focus?: [number, number];
  lines?: string[];
  extra?: "payments";
  /** What the screen asks of a person, in the psychology voice. */
  mind: string;
}

const SHOTS: Shot[] = [
  {
    layout: "center",
    title: "Anasayfa - Atatürkçü Düşünce Derneği",
    mind: "A face and a name are read first.",
    notes: [
      { fx: 0.3, fy: 0.13, label: "masthead" },
      { fx: 0.6, fy: 0.38, label: "featured story" },
      { fx: 0.3, fy: 0.62, label: "leadership" },
    ],
    scroll: [0, 0.05],
    lines: ["Atatürkçü", "Düşünce Derneği"],
  },
  {
    layout: "right",
    title: "Heroty",
    mind: "One promise, understood in a second.",
    notes: [
      { fx: 0.5, fy: 0.27, label: "product promise" },
      { fx: 0.5, fy: 0.66, label: "app preview" },
    ],
  },
  {
    layout: "left",
    title: "12punto Haber ve İçerik Platformu",
    mind: "Built to be scanned, not studied.",
    notes: [
      { fx: 0.5, fy: 0.105, label: "markets ticker" },
      { fx: 0.55, fy: 0.4, label: "lead story" },
    ],
    // A slow drift only: further down the page are unrelated news headlines.
    scroll: [0, 0.02],
  },
  {
    layout: "right",
    title: "Disnet Technology",
    mind: "The headline arrives before the detail.",
    notes: [
      { fx: 0.5, fy: 0.27, label: "headline" },
      { fx: 0.5, fy: 0.52, label: "illustration" },
    ],
    zoom: 1.16,
    focus: [0.5, 0.22],
  },
  {
    layout: "center",
    title: "Avrupadan Bülten",
    mind: "Familiar cues: language, date, country.",
    notes: [
      { fx: 0.5, fy: 0.24, label: "newsletter" },
      { fx: 0.35, fy: 0.37, label: "date bar" },
      { fx: 0.13, fy: 0.49, label: "country tabs" },
    ],
    scroll: [0, 0.06],
  },
  {
    layout: "right",
    title: "Ana Sayfa - KPAY",
    mind: "Trust first, then the next step.",
    notes: [
      { fx: 0.5, fy: 0.2, label: "payment platform" },
    ],
    extra: "payments",
  },
  {
    layout: "left",
    title: "VBT Software: We Make Ideas Digital",
    mind: "One idea per slide.",
    notes: [
      { fx: 0.5, fy: 0.4, label: "solutions carousel" },
      { fx: 0.4, fy: 0.6, label: "feature list" },
    ],
    lines: ["VBT", "Software"],
  },
  {
    layout: "center",
    title: "Anasayfa - SER&BERKER BAĞIMSIZ DENETİM A.Ş.",
    mind: "Calm, credible and clear.",
    notes: [
      { fx: 0.5, fy: 0.24, label: "hero statement" },
      { fx: 0.3, fy: 0.6, label: "services" },
    ],
    scroll: [0, 0.08],
  },
  {
    layout: "right",
    title: "Flerpi",
    mind: "Structure lowers the reading load.",
    notes: [
      { fx: 0.3, fy: 0.38, label: "general structure" },
      { fx: 0.08, fy: 0.62, label: "module list" },
    ],
  },
];

/** Where the phone sits and how big it is, per layout. */
const frameFor = (l: Layout) => {
  switch (l) {
    case "center":
      return { x: 350, y: 345, w: 380 };
    case "left":
      return { x: 80, y: 345, w: 440 };
    // Kept clear of the Reels action buttons on the right edge.
    case "right":
      return { x: 530, y: 345, w: 430 };
  }
};

export const ActPortfolio: React.FC = () => {
  const t = useT();
  const s = beat(PROJECT_BEATS[0]);
  const e = beat(PROJECT_BEATS[9]);
  if (t < s - 0.05 || t > e + 0.6) return null;

  let i = 0;
  while (i < 8 && t >= beat(PROJECT_BEATS[i + 1])) i++;
  const a = beat(PROJECT_BEATS[i]);
  const b = beat(PROJECT_BEATS[i + 1]);
  const shot = SHOTS[i];
  const proj = PROJECTS[i];
  const local = t - a;
  const dur = b - a;

  // The phone glides from the previous frame to this one, and the next screen wipes in at the cut.
  const prev = frameFor(SHOTS[Math.max(0, i - 1)].layout);
  const here = frameFor(shot.layout);
  const move = i === 0 ? 1 : ramp(t, a - 0.05, a + 0.45, "power3.inOut");
  const f = { x: lerp(prev.x, here.x, move), y: lerp(prev.y, here.y, move), w: lerp(prev.w, here.w, move) };
  const h = f.w * PHONE_RATIO;
  const wipeNext = i < 8 ? ramp(t, b - 0.3, b + 0.05, "power3.inOut") : 0;
  const exitAct = ramp(t, e - 0.2, e + 0.5, "power3.inOut");

  const scroll = shot.scroll ? lerp(shot.scroll[0], shot.scroll[1], ramp(local, 0.3, dur, "power1.inOut")) : 0;
  const zoom = shot.zoom ? lerp(1, shot.zoom, ramp(local, 0.2, dur, "power2.inOut")) : 1;
  const leave = ramp(t, b - 0.32, b - 0.02, "power3.in");

  // Captions sit beside the phone (left/right) or under it (center/macro).
  const side = shot.layout === "left" ? "right" : shot.layout === "right" ? "left" : "below";
  const textX = side === "right" ? 570 : 80;
  const textW = side === "below" ? 880 : 400;
  const nameY = side === "below" ? here.y + here.w * PHONE_RATIO + 30 : 1060;
  const nameSize = side === "below" ? (shot.lines ? 72 : 96) : shot.lines ? 78 : 92;
  const lines = shot.lines ?? [proj.name];

  return (
    <AbsoluteFill style={{ opacity: 1 - exitAct }}>
      <Label x={80} y={250} p={ramp(local, 0, 0.4, "linear")}>
        work / {String(i + 1).padStart(2, "0")} of 09
      </Label>
      <Label right={80} y={250} p={ramp(local, 0.1, 0.6, "linear")} align="right">
        {proj.domain}
      </Label>

      <Phone
        x={f.x}
        y={f.y}
        w={f.w}
        src={`mobile/${proj.slug}-long.jpg`}
        scroll={scroll}
        zoom={zoom}
        focus={shot.focus}
        incoming={i < 8 ? { src: `mobile/${PROJECTS[i + 1].slug}-long.jpg`, p: wipeNext } : undefined}
      />

      {/* Callouts on what is actually on the screen. */}
      {move > 0.98 &&
        shot.notes.map((n, k) => {
          const px = f.x + n.fx * f.w;
          // Notes ride with the page as it scrolls, and drop out once off screen.
          const py = f.y + (n.fy - scroll) * h;
          if (py < f.y + 20 || py > f.y + h - 20) return null;
          const toX = side === "left" ? f.x - 30 : side === "right" ? f.x + f.w + 30 : n.fx < 0.5 ? f.x - 30 : f.x + f.w + 30;
          const p = ramp(local, 0.4 + k * 0.22, 0.95 + k * 0.22, "linear") * (1 - leave);
          return <Callout key={k} x={px} y={py} toX={toX} label={n.label} p={p} index={k + 1} />;
        })}
      {/* The reading path between the numbered rings. */}
      {move > 0.98 && shot.notes.length > 1 && (
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1080} height={1920}>
          <polyline
            points={shot.notes.map((n) => `${f.x + n.fx * f.w},${f.y + (n.fy - scroll) * h}`).join(" ")}
            fill="none"
            stroke={P.offwhite}
            strokeOpacity={0.7}
            strokeWidth={2}
            strokeDasharray="6 8"
            pathLength={100}
            strokeDashoffset={0}
            style={{ clipPath: `inset(0 0 ${100 - ramp(local, 0.5, 1.5, "power2.inOut") * 100}% 0)`, opacity: 1 - leave }}
          />
        </svg>
      )}

      {/* Name, function, stack, and the page's real <title>. */}
      <div style={{ position: "absolute", left: textX, top: nameY, width: textW }}>
        <Statement lines={lines} x={0} y={0} size={nameSize} lh={0.98} tracking="-0.03em" p={ramp(local, 0.2, 0.9, "linear")} out={leave} />
      </div>
      <div style={{ position: "absolute", left: textX, top: nameY + nameSize * 0.98 * lines.length + 22, width: textW, opacity: (1 - leave) * ramp(local, 0.45, 0.85, "power2.out") }}>
        <div style={{ font: `500 34px/1.3 ${F.plex}`, color: P.offwhite }}>{proj.what}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", marginTop: 14, font: `400 25px ${F.mono}`, color: P.steel }}>
          {proj.stack.map((st) => (
            <span key={st} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 9, height: 9, background: P.blue }} />
              {st}
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 80, top: 290, width: 920, font: `400 21px/1.35 ${F.mono}`, color: P.steelDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", clipPath: `inset(0 ${100 - ramp(local, 0.3, 0.9, "linear") * 100}% 0 0)`, opacity: 1 - leave }}>
        {"<title>"}
        <span style={{ color: P.steel }}>{shot.title}</span>
        {"</title>"}
      </div>

      {/* The psychology voice: what the screen asks of the person reading it. */}
      <div
        style={{
          position: "absolute",
          left: textX,
          top: side === "below" ? 1478 : 1330,
          width: textW,
          font: SERIF(side === "below" ? 38 : 42),
          lineHeight: 1.15,
          color: P.offwhite,
          clipPath: `inset(0 ${100 - ramp(local, 0.9, 1.6, "power2.out") * 100}% 0 0)`,
          opacity: 1 - leave,
        }}
      >
        {shot.mind}
      </div>
      {i === 0 && (
        <Label x={80} y={322} p={ramp(local, 0.8, 1.5, "linear") * (1 - leave)} size={20} color={P.steelDim}>
          numbered rings: intended reading order
        </Label>
      )}

      {/* Kpay: the three ways its platform takes a payment, as listed on its site. */}
      {shot.extra === "payments" && (
        <div style={{ position: "absolute", left: 80, top: 650, width: 420, opacity: (1 - leave) * ramp(local, 0.6, 1.1, "power2.out") }}>
          {["POS", "SoftPOS", "Virtual POS"].map((name, k) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 18, height: 86 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${P.blue}`, background: ramp(local, 0.8 + k * 0.2, 1.0 + k * 0.2, "linear") > 0.5 ? P.blue : "transparent" }} />
              <div style={{ font: `500 36px ${F.plex}`, color: P.offwhite }}>{name}</div>
            </div>
          ))}
          <div style={{ position: "absolute", left: 10, top: 54, width: 2, height: 172 * ramp(local, 0.7, 1.4, "power2.inOut"), background: P.blue, opacity: 0.6 }} />
        </div>
      )}
    </AbsoluteFill>
  );
};
