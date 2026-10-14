import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { F } from "./fonts";
import { ACT, Dim, HLine, Label, Statement, Tick, VLine, beat, lerp, ramp, useT } from "./lib";
import { P } from "./tokens";

/* ── Baseline grid, shared by Acts I–III ──────────────────── */

export const BaselineGrid: React.FC<{ p: number; top?: number; rows?: number; gap?: number; alpha?: number }> = ({ p, top = 260, rows = 36, gap = 36, alpha = 0.04 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <HLine key={i} x={80} y={top + i * gap} w={920} p={ramp(p, i * 0.012, 0.5 + i * 0.012, "power2.out")} color={`rgba(236,233,226,${alpha})`} />
    ))}
  </>
);

/* ── ACT I · THE SIGNAL: Psychology × Software ─────────────── */

/** Two voices run through the film: a serif for the mind, Plex for the machine. */
export const SERIF = (size: number, italic = true) => `${italic ? "italic " : ""}400 ${size}px/1 ${F.serif}`;

export const ActSignal: React.FC = () => {
  const t = useT();
  const end = beat(ACT.identity);
  if (t > end + 0.1) return null;
  // No empty first frame: the grid and the line are already there for the cover.
  // Frame 0 doubles as the Reels thumbnail: the line, the grid and the labels are already set.
  const line = 1;
  const grid = 0.85 + 0.15 * ramp(t, 0, 1, "power2.out");
  const mind = ramp(t, beat(1), beat(1) + 0.8, "expo.out");
  const code = ramp(t, beat(3), beat(3) + 0.8, "expo.out");
  const meet = ramp(t, beat(5), beat(6.5), "power3.inOut");
  const times = ramp(t, beat(6), beat(7), "back.out(1.6)");
  const tagline = ramp(t, beat(8), beat(9.5), "linear");
  const out = ramp(t, end - 0.45, end, "power3.in");

  const mindY = lerp(560, 735, meet);
  const codeY = lerp(1090, 985, meet);
  return (
    <AbsoluteFill>
      <div style={{ opacity: grid * (1 - out) }}>
        <BaselineGrid p={1} alpha={0.05} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <VLine key={i} x={80 + i * 153.3} y={260} h={1280} p={1} color="rgba(236,233,226,0.045)" />
        ))}
      </div>
      <Label x={80} y={250} p={1 - out}>ahmetdenizdundar.com.tr</Label>
      <Label right={80} y={250} p={1 - out} align="right">mind × code</Label>

      {/* The mind, in the serif voice. */}
      <div style={{ position: "absolute", left: 76, top: mindY, overflow: "hidden", opacity: 1 - out }}>
        <div style={{ font: SERIF(200), color: P.offwhite, letterSpacing: "-0.02em", translate: `0 ${(1 - mind) * 105}%`, paddingBottom: 24 }}>Psychology</div>
      </div>
      <Label x={80} y={mindY - 44} p={ramp(t, beat(1.5), beat(2.5), "linear") * (1 - meet) * (1 - out)}>how people think</Label>

      <HLine x={0} y={959} w={1080} p={line} color={P.blue} glow />

      {/* The machine, in Plex. */}
      <div style={{ position: "absolute", left: 74, top: codeY, overflow: "hidden", opacity: 1 - out }}>
        <div style={{ font: `600 176px/1 ${F.plex}`, color: P.offwhite, letterSpacing: "-0.04em", translate: `0 ${(1 - code) * 105}%`, paddingBottom: 20 }}>Software</div>
      </div>
      <Label x={80} y={codeY + 200} p={ramp(t, beat(3.5), beat(4.5), "linear") * (1 - meet) * (1 - out)}>how systems work</Label>

      <div style={{ position: "absolute", right: 80, top: 880, font: SERIF(150), color: P.blue, scale: String(times), opacity: 1 - out }}>×</div>

      <div style={{ position: "absolute", left: 80, top: 1270, font: SERIF(58), color: P.steel, clipPath: `inset(0 ${100 - tagline * 100}% 0 0)`, opacity: 1 - out }}>
        Beyond the interface.
      </div>
      <div style={{ position: "absolute", left: 80, top: 1356, width: 900, font: `400 32px/1.35 ${F.plex}`, color: P.offwhite, opacity: ramp(t, beat(9), beat(10.2), "power2.out") * (1 - out) }}>
        Interfaces built around how people actually read,
        <br />
        <span style={{ color: P.steel }}>and built for search engines too.</span>
      </div>
    </AbsoluteFill>
  );
};

/* ── ACT II · THE IDENTITY ─────────────────────────────────── */

/** Facts as published on the website and LinkedIn. */
const SPEC: [string, string][] = [
  ["BASED", "Istanbul, Türkiye"],
  ["ROLE", "UI team, VBT Software"],
  ["SINCE", "2021"],
  ["STUDIED", "Psychology, Computer Programming"],
  ["CERTIFIED", "AI and Machine Learning, YÖK"],
];

export const ActIdentity: React.FC = () => {
  const t = useT();
  const s = beat(ACT.identity);
  const e = beat(ACT.craft);
  if (t < s - 0.05 || t > e + 0.1) return null;
  const out = ramp(t, e - 0.5, e, "power3.in");
  const fade = 1 - out;
  return (
    <AbsoluteFill>
      <div style={{ opacity: fade }}>
        <BaselineGrid p={ramp(t, s, s + 1.2, "power2.out")} />
        <Tick x={80} y={260} p={ramp(t, beat(13), beat(14), "expo.out")} />
        <Tick x={1000} y={260} p={ramp(t, beat(13.5), beat(14.5), "expo.out")} />
        <Tick x={80} y={1540} p={ramp(t, beat(14), beat(15), "expo.out")} />
        <Tick x={1000} y={1540} p={ramp(t, beat(14.5), beat(15.5), "expo.out")} />
        <Label x={80} y={300} p={ramp(t, beat(13), beat(15), "linear")}>identity / portfolio, 2026</Label>
      </div>

      {/* The signal line from Act I settles as the cap-height line of the name. */}
      <HLine
        x={80}
        y={lerp(959, 664, ramp(t, s, s + 0.8, "power3.inOut"))}
        w={920}
        p={fade}
        color={P.blue}
      />
      <Label right={80} y={632} p={ramp(t, beat(15), beat(16.5), "linear") * fade} color={P.blue} align="right" size={22}>
        cap height
      </Label>

      <Statement lines={["Ahmet", "Deniz", "Dündar"]} x={74} y={668} size={168} lh={0.95} tracking="-0.03em" p={ramp(t, s + 0.35, s + 1.9, "linear")} out={out} />

      {/* A real portrait from the site, framed like a figure. */}
      <div style={{ position: "absolute", left: 760, top: 336, width: 220, opacity: ramp(t, beat(20), beat(22), "power2.out") * fade }}>
        <div style={{ width: 220, height: 220, overflow: "hidden", clipPath: `inset(0 0 ${100 - ramp(t, beat(20), beat(22.5), "expo.out") * 100}% 0)` }}>
          <Img src={staticFile("portrait.webp")} style={{ width: "100%", filter: "grayscale(0.25) contrast(1.05)" }} />
        </div>
        <div style={{ font: `400 20px ${F.mono}`, color: P.steel, marginTop: 12 }}>fig. 1</div>
      </div>

      <div style={{ opacity: fade }}>
        <Dim x1={80} x2={1000} y={1236} p={ramp(t, beat(16), beat(17.5), "expo.out")} label="1080 px" />
      </div>
      {/* The two disciplines, each in its own voice. */}
      <div style={{ position: "absolute", left: 80, top: 1272, overflow: "hidden", opacity: fade }}>
        <div style={{ font: SERIF(60), color: P.offwhite, translate: `0 ${(1 - ramp(t, beat(18), beat(19.5), "expo.out")) * 110}%`, paddingBottom: 10 }}>Psychology graduate.</div>
      </div>
      <Statement lines={["Frontend developer & SEO specialist."]} x={80} y={1350} size={50} tracking="-0.02em" p={ramp(t, beat(19), beat(20.5), "linear")} out={out} />
      <Label x={80} y={1428} p={ramp(t, beat(21), beat(23), "linear") * fade}>interfaces / technical seo / performance / ai</Label>

      {/* A specification sheet beside the name, read like a drawing's title block. */}
      <div style={{ position: "absolute", left: 700, top: 668, width: 300, opacity: fade }}>
        {SPEC.map(([k, v], i) => {
          const p = ramp(t, beat(21 + i * 0.6), beat(22 + i * 0.6), "expo.out");
          return (
            <div key={k} style={{ borderTop: `1px solid ${P.steelDim}`, padding: "12px 0 16px", opacity: p, translate: `${(1 - p) * 24}px 0` }}>
              <div style={{ font: `400 18px ${F.mono}`, color: P.steel, letterSpacing: "0.06em" }}>{k}</div>
              <div style={{ font: `500 25px/1.25 ${F.plex}`, color: P.offwhite, marginTop: 6 }}>{v}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── ACT III · THE CRAFT ───────────────────────────────────── */

/** Representative code, typeset; not taken from any client's repository. */
const CODE: { text: string; kind?: "kw" | "type" | "dim" }[][] = [
  [{ text: "public class ", kind: "kw" }, { text: "ArticlesController", kind: "type" }, { text: " : Controller" }],
  [{ text: "{" }],
  [{ text: "    public async ", kind: "kw" }, { text: "Task<IActionResult>", kind: "type" }, { text: " Index()" }],
  [{ text: "    {" }],
  [{ text: "        var ", kind: "kw" }, { text: "latest = await _db.Articles" }],
  [{ text: "            .OrderByDescending(a => a.PublishedAt)" }],
  [{ text: "            .Take(20).ToListAsync();" }],
  [{ text: "        return ", kind: "kw" }, { text: "View(latest);" }],
  [{ text: "    }" }],
  [{ text: "}" }],
];

const SQL = ["SELECT TOP 20 Id, Title, PublishedAt", "FROM Articles", "ORDER BY PublishedAt DESC;"];

const STACK: { name: string; at: number }[] = [
  { name: "C# / .NET", at: 29 },
  { name: "ASP.NET MVC", at: 30 },
  { name: "SQL", at: 34 },
  { name: "TypeScript", at: 37 },
  { name: "Angular", at: 37.5 },
  { name: "HTML / SCSS", at: 38 },
  { name: "WordPress / PHP", at: 40 },
  { name: "Bootstrap 5 / Tailwind", at: 40.5 },
  { name: "Git / GitHub", at: 41 },
];

export const ActCraft: React.FC = () => {
  const t = useT();
  const s = beat(ACT.craft);
  const e = beat(ACT.portfolio);
  if (t < s - 0.05 || t > e + 0.05) return null;

  const codeLines = CODE.length;
  const typed = ramp(t, s + 0.2, beat(33), "linear") * codeLines;
  const toTable = ramp(t, beat(33.5), beat(35), "power3.inOut");
  const toUi = ramp(t, beat(36), beat(37.5), "power3.inOut");
  const toDash = ramp(t, beat(39), beat(40.5), "power3.inOut");
  // The panel folds into a phone outline on the drop, carrying the eye into Act IV.
  const fold = ramp(t, beat(43), e, "power3.inOut");

  const panel = {
    x: lerp(80, 365, fold),
    y: lerp(340, 365, fold),
    w: lerp(920, 350, fold),
    h: lerp(760, 350 * (932 / 430), fold),
  };

  const color = (k?: string) => (k === "kw" ? P.steel : k === "type" ? P.blue : P.offwhite);
  return (
    <AbsoluteFill>
      <Label x={80} y={250} p={ramp(t, s, s + 0.8, "linear") * (1 - fold)}>craft / one request, end to end</Label>

      <div
        style={{
          position: "absolute",
          left: panel.x,
          top: panel.y,
          width: panel.w,
          height: panel.h,
          border: `1px solid ${P.steelDim}`,
          borderRadius: lerp(6, 30, fold),
          overflow: "hidden",
          clipPath: `inset(0 0 ${100 - ramp(t, s, s + 0.6, "expo.out") * 100}% 0)`,
        }}
      >
        {/* Code */}
        <div style={{ position: "absolute", left: 28, top: 34, opacity: 1 - toTable, font: `400 25px/1.75 ${F.mono}` }}>
          {CODE.map((parts, i) => {
            const k = Math.max(0, Math.min(1, typed - i));
            const full = parts.map((p) => p.text).join("");
            let left = Math.round(k * full.length);
            return (
              <div key={i} style={{ whiteSpace: "pre", display: "flex" }}>
                <span style={{ color: P.steelDim, width: 46 }}>{String(i + 1).padStart(2, " ")}</span>
                {parts.map((p, j) => {
                  const shown = p.text.slice(0, Math.max(0, left));
                  left -= p.text.length;
                  return (
                    <span key={j} style={{ color: color(p.kind) }}>
                      {shown}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Query and the rows it returns: abstract bars, not invented content. */}
        <div style={{ position: "absolute", left: 28, top: 34, right: 28, opacity: toTable * (1 - toUi) }}>
          {SQL.map((l, i) => (
            <div key={i} style={{ font: `400 25px/1.75 ${F.mono}`, color: i === 0 ? P.offwhite : P.steel, whiteSpace: "pre" }}>
              {l}
            </div>
          ))}
          <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "90px 1fr 220px", font: `400 22px ${F.mono}`, color: P.steel, borderBottom: `1px solid ${P.steelDim}`, paddingBottom: 10 }}>
            <span>Id</span>
            <span>Title</span>
            <span>PublishedAt</span>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 220px", alignItems: "center", height: 44, borderBottom: "1px solid rgba(236,233,226,0.06)", opacity: ramp(t, beat(34) + i * 0.06, beat(34.5) + i * 0.06, "power2.out") }}>
              <div style={{ width: 34, height: 8, background: P.steelDim }} />
              <div style={{ width: `${55 + ((i * 37) % 35)}%`, height: 8, background: "rgba(236,233,226,0.35)" }} />
              <div style={{ width: 150, height: 8, background: P.steelDim }} />
            </div>
          ))}
        </div>

        {/* The same rows become an interface: a list of stories. */}
        <div style={{ position: "absolute", inset: 28, opacity: toUi * (1 - toDash) }}>
          <div style={{ height: 54, borderBottom: `1px solid ${P.steelDim}`, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 120, height: 14, background: P.offwhite }} />
            <div style={{ marginLeft: "auto", width: 30, height: 3, background: P.steel, boxShadow: `0 9px 0 ${P.steel}` }} />
          </div>
          <div style={{ marginTop: 24, height: 250, background: "rgba(74,125,255,0.10)", border: `1px solid ${P.steelDim}` }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", gap: 20, marginTop: 22, translate: `0 ${(1 - ramp(t, beat(36.5) + i * 0.08, beat(37.5) + i * 0.08, "expo.out")) * 40}px` }}>
              <div style={{ width: 150, height: 96, background: "rgba(236,233,226,0.08)", border: `1px solid ${P.steelDim}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: "86%", height: 12, background: "rgba(236,233,226,0.45)" }} />
                <div style={{ width: "60%", height: 12, marginTop: 12, background: "rgba(236,233,226,0.25)" }} />
                <div style={{ width: 120, height: 8, marginTop: 20, background: P.steelDim }} />
              </div>
            </div>
          ))}
        </div>

        {/* And the interface becomes a dashboard: modules, an axis, a list. No numbers. */}
        <div style={{ position: "absolute", inset: 28, opacity: toDash * (1 - fold) }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 120, border: `1px solid ${P.steelDim}`, padding: 18 }}>
                <div style={{ width: 70, height: 8, background: P.steel }} />
                <div style={{ width: 120, height: 22, marginTop: 22, background: i === 0 ? P.blue : "rgba(236,233,226,0.5)" }} />
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: 300, marginTop: 18, border: `1px solid ${P.steelDim}` }}>
            <svg width="100%" height="100%" viewBox="0 0 860 300" preserveAspectRatio="none">
              <line x1="40" y1="260" x2="840" y2="260" stroke={P.steelDim} />
              <line x1="40" y1="30" x2="40" y2="260" stroke={P.steelDim} />
              <polyline
                points="40,230 140,214 240,220 340,180 440,190 540,150 640,132 740,110 840,96"
                fill="none"
                stroke={P.blue}
                strokeWidth="3"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - ramp(t, beat(39.5), beat(41.5), "power2.inOut")}
              />
            </svg>
          </div>
          {[0, 1].map((i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 52, borderBottom: "1px solid rgba(236,233,226,0.08)" }}>
              <div style={{ width: 300, height: 10, background: "rgba(236,233,226,0.4)" }} />
              <div style={{ width: 80, height: 10, background: P.steelDim }} />
            </div>
          ))}
        </div>
      </div>

      {/* Which stage of the request is on screen. */}
      <div style={{ position: "absolute", left: 80, top: 1118, width: 920, display: "flex", justifyContent: "space-between", font: `400 21px ${F.mono}`, opacity: ramp(t, s + 0.3, s + 1, "power2.out") * (1 - fold) }}>
        {["01 controller", "02 query", "03 interface", "04 dashboard"].map((name, k) => {
          const stage = toDash > 0.5 ? 3 : toUi > 0.5 ? 2 : toTable > 0.5 ? 1 : 0;
          return (
            <span key={name} style={{ color: k === stage ? P.blue : k < stage ? P.steel : P.steelDim }}>
              {name}
            </span>
          );
        })}
      </div>
      <HLine x={80} y={1150} w={920} p={ramp(t, s + 0.3, s + 1.2, "expo.out") * (1 - fold)} />
      <div style={{ position: "absolute", left: 80, top: 1440, width: 920, font: SERIF(46), color: P.offwhite, clipPath: `inset(0 ${100 - ramp(t, beat(41), beat(42.5), "power2.out") * 100}% 0 0)`, opacity: 1 - fold }}>
        From the database to the first glance.
      </div>
      {/* The stack, lit as each layer of the request is touched. */}
      <div style={{ position: "absolute", left: 80, top: 1176, width: 920, display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 14, opacity: 1 - fold }}>
        {STACK.map((st) => {
          const on = ramp(t, beat(st.at), beat(st.at) + 0.35, "expo.out");
          return (
            <div key={st.name} style={{ display: "flex", alignItems: "center", gap: 14, font: `400 26px ${F.mono}`, color: on > 0.5 ? P.offwhite : P.steelDim, opacity: 0.35 + 0.65 * on }}>
              <span style={{ width: 10, height: 10, background: on > 0.5 ? P.blue : "transparent", border: `1px solid ${on > 0.5 ? P.blue : P.steelDim}` }} />
              {st.name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
