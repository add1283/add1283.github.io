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

/* ── ACT I · THE SIGNAL ───────────────────────────────────── */

/** Fragments of the site's own interface, set at three depths. */
const LAYERS: { z: number; x: number; y: number; w: number; kind: "shot" | "frame" | "code"; crop?: number; text?: string }[] = [
  { z: -1700, x: 600, y: 300, w: 360, kind: "shot", crop: 0.1 },
  { z: -1700, x: 600, y: 980, w: 340, kind: "frame" },
  { z: -1150, x: 560, y: 380, w: 420, kind: "code", text: "<header class=\"bar\">" },
  { z: -1150, x: 120, y: 1180, w: 360, kind: "shot", crop: 0.3 },
  { z: -650, x: 660, y: 1240, w: 300, kind: "code", text: "font: 600 168px Plex" },
  { z: -650, x: 90, y: 330, w: 300, kind: "frame" },
];

export const ActSignal: React.FC = () => {
  const t = useT();
  const end = beat(ACT.identity);
  if (t > end + 0.1) return null;
  const line = ramp(t, beat(1), beat(1) + 0.9, "expo.out");
  const gridOpen = ramp(t, beat(1) + 0.2, beat(4), "power2.out");
  // Camera dolly through the layers.
  const dolly = lerp(0, 1500, ramp(t, 0.6, end, "power2.inOut"));
  const statementIn = ramp(t, beat(6), beat(6) + 1.1, "linear");
  const statementOut = ramp(t, end - 0.45, end, "linear");
  return (
    <AbsoluteFill>
      {/* The grid only exists where the light has passed. */}
      <AbsoluteFill style={{ clipPath: `inset(${50 - gridOpen * 50}% 0 ${50 - gridOpen * 50}% 0)` }}>
        <BaselineGrid p={gridOpen} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <VLine key={i} x={80 + i * 153.3} y={260} h={1280} p={gridOpen} color="rgba(236,233,226,0.05)" />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ perspective: 1100, perspectiveOrigin: "50% 50%" }}>
        <AbsoluteFill style={{ transformStyle: "preserve-3d", translate: `0 0 ${dolly}px` }}>
          {LAYERS.map((l, i) => {
            const z = l.z + dolly;
            const vis = ramp(t, beat(2 + i * 0.5), beat(3 + i * 0.5), "power2.out") * (1 - ramp(z, -200, 250, "linear"));
            return (
              <div key={i} style={{ position: "absolute", left: l.x, top: l.y, width: l.w, translate: `0 0 ${l.z}px`, opacity: vis }}>
                {l.kind === "shot" && (
                  <div style={{ height: l.w * 0.9, overflow: "hidden", outline: `1px solid ${P.steelDim}`, outlineOffset: 8 }}>
                    <Img src={staticFile("site/site-dark.jpg")} style={{ width: "100%", translate: `0 ${-(l.crop ?? 0) * 100}%` }} />
                  </div>
                )}
                {l.kind === "frame" && (
                  <div style={{ height: l.w * 0.62, border: `1px solid ${P.steelDim}` }}>
                    <div style={{ margin: 24, height: 18, width: "55%", background: P.steelDim }} />
                    <div style={{ margin: "0 24px", height: 10, width: "80%", background: "rgba(139,147,158,0.35)" }} />
                    <div style={{ margin: "14px 24px", height: 10, width: "70%", background: "rgba(139,147,158,0.35)" }} />
                  </div>
                )}
                {l.kind === "code" && <div style={{ font: `400 30px ${F.mono}`, color: P.steel }}>{l.text}</div>}
              </div>
            );
          })}
        </AbsoluteFill>
      </AbsoluteFill>

      <HLine x={0} y={959} w={1080} p={line * (1 - ramp(t, beat(5), beat(6), "power2.in") * 0.4)} color={P.blue} glow />
      <Label x={80} y={250} p={ramp(t, beat(2), beat(3.5), "linear")}>ahmetdenizdundar.com.tr</Label>
      <Statement lines={["BEYOND THE", "INTERFACE."]} x={76} y={760} size={124} p={statementIn} out={statementOut} tracking="-0.035em" />
    </AbsoluteFill>
  );
};

/* ── ACT II · THE IDENTITY ─────────────────────────────────── */

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
      <Statement lines={["WEB ENGINEERING · SEO · AI"]} x={80} y={1284} size={34} weight={500} tracking="0.06em" p={ramp(t, beat(18), beat(19.5), "linear")} out={out} />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1344,
          width: 760,
          font: `400 32px/1.45 ${F.plex}`,
          color: P.steel,
          clipPath: `inset(0 0 ${100 - ramp(t, beat(20), beat(22), "power2.out") * 100}% 0)`,
          opacity: fade,
        }}
      >
        Building useful digital experiences through engineering, design and optimization.
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
    x: lerp(80, 340, fold),
    y: lerp(340, 345, fold),
    w: lerp(920, 400, fold),
    h: lerp(760, 400 * (932 / 430), fold),
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

      {/* The stack, lit as each layer of the request is touched. */}
      <div style={{ position: "absolute", left: 80, top: 1170, width: 920, display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 18, opacity: 1 - fold }}>
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
