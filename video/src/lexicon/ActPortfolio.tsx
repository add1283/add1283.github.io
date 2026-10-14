import React from "react";
import { AbsoluteFill } from "remotion";
import { SERIF } from "./ActsOpening";
import { F } from "./fonts";
import { GROUP_BEATS, Label, PHONE_RATIO, Phone, Statement, beat, lerp, ramp, useT } from "./lib";
import { P, PROJECTS } from "./tokens";

/** What I did on each project, condensed from the project text on the website. */
const ROLE: Record<string, string> = {
  add: "Custom content flows for news and archives, structured for search.",
  heroty: "Coded the interface, with a GSAP walkthrough of the product.",
  "12punto": "Mobile-first feeds, page speed and fast indexing of new stories.",
  disnet: "Pages for its BMC Software ITSM and cloud automation offering.",
  avrupadan: "Mobile-first layouts and search visibility across European markets.",
  kpay: "An interface that explains each product plainly to merchants.",
  vbt: "Solution pages and investor content, built with the UI team.",
  serberker: "Services and regulatory content, organised so people find them.",
  flerpi: "A flexible page system that introduces each module on its own.",
};

/** A slow drift down the page only where the page allows it: further down, news sites carry unrelated headlines. */
const SCROLL: Record<string, number> = { add: 0.05, "12punto": 0.02, avrupadan: 0.06, serberker: 0.08 };

/** Three screens, three projects each: one shared idea per screen, in both voices. */
const GROUPS: { title: string; mind: string; slugs: string[] }[] = [
  { title: "News and editorial", mind: "Read in seconds: scanned, not studied.", slugs: ["add", "12punto", "avrupadan"] },
  { title: "Products and platforms", mind: "One promise first, then the next step.", slugs: ["heroty", "kpay", "flerpi"] },
  { title: "Corporate and enterprise", mind: "Calm, credible and clear.", slugs: ["vbt", "disnet", "serberker"] },
];

/** Phone columns: kept left of the Reels action buttons. */
export const COLUMN = { xs: [80, 385, 690], y: 470, w: 270 };

const project = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;

export const ActPortfolio: React.FC = () => {
  const t = useT();
  const s = beat(GROUP_BEATS[0]);
  const e = beat(GROUP_BEATS[3]);
  if (t < s - 0.05 || t > e + 0.6) return null;

  let g = 0;
  while (g < 2 && t >= beat(GROUP_BEATS[g + 1])) g++;
  const a = beat(GROUP_BEATS[g]);
  const b = beat(GROUP_BEATS[g + 1]);
  const group = GROUPS[g];
  const local = t - a;
  const dur = b - a;
  const leave = ramp(t, b - 0.4, b - 0.05, "power3.in");
  const exitAct = ramp(t, e - 0.2, e + 0.5, "power3.inOut");
  const h = COLUMN.w * PHONE_RATIO;

  return (
    <AbsoluteFill style={{ opacity: 1 - exitAct }}>
      <Label x={80} y={250} p={ramp(local, 0, 0.5, "linear")}>
        work / {String(g + 1).padStart(2, "0")} of 03
      </Label>
      <Label right={80} y={250} p={ramp(local, 0.1, 0.6, "linear")} align="right">
        nine live sites
      </Label>

      {/* The screen's idea: a heading in Plex and the psychology note in the serif. */}
      <Statement lines={[group.title]} x={80} y={292} size={62} tracking="-0.025em" p={ramp(local, 0.05, 0.75, "linear")} out={leave} />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 372,
          font: SERIF(42),
          color: P.steel,
          clipPath: `inset(0 ${100 - ramp(local, 0.45, 1.3, "power2.out") * 100}% 0 0)`,
          opacity: 1 - leave,
        }}
      >
        {group.mind}
      </div>

      {group.slugs.map((slug, k) => {
        const proj = project(slug);
        const x = COLUMN.xs[k];
        // The first screen opens out of the Act III outline (the middle phone); later screens wipe in, one phone at a time.
        const reveal = g === 0 ? (k === 1 ? 1 : ramp(local, 0.1 + (k === 0 ? 0 : 0.12), 0.8 + (k === 0 ? 0 : 0.12), "expo.out")) : 1;
        const next = g < 2 ? GROUPS[g + 1].slugs[k] : undefined;
        const wipe = next ? ramp(t, b - 0.55 + k * 0.1, b - 0.05 + k * 0.1, "power3.inOut") : 0;
        const scroll = (SCROLL[slug] ?? 0) * ramp(local, 0.8, dur, "power1.inOut");
        const cap = (d: number) => ramp(local, 0.5 + k * 0.22 + d, 1.0 + k * 0.22 + d, "power2.out") * (1 - leave);
        return (
          <React.Fragment key={slug}>
            <Label x={x} y={COLUMN.y - 52} p={cap(0)} size={19} color={P.steel}>
              <span style={{ color: P.blue }}>{String(g * 3 + k + 1).padStart(2, "0")}</span> {proj.domain}
            </Label>
            <Phone
              x={x}
              y={COLUMN.y}
              w={COLUMN.w}
              src={`mobile/${slug}-long.jpg`}
              scroll={scroll}
              reveal={reveal}
              frameOpacity={reveal}
              incoming={next ? { src: `mobile/${next}-long.jpg`, p: wipe } : undefined}
            />
            <div style={{ position: "absolute", left: x, top: COLUMN.y + h + 34, width: COLUMN.w }}>
              <div style={{ overflow: "hidden", paddingTop: 6, marginTop: -6 }}>
                <div style={{ font: `600 ${proj.name.length > 14 ? 31 : 40}px/1.05 ${F.plex}`, letterSpacing: "-0.02em", color: P.offwhite, translate: `0 ${(1 - cap(0)) * 105}%` }}>{proj.name}</div>
              </div>
              <div style={{ marginTop: 10, font: `500 23px/1.3 ${F.plex}`, color: P.offwhite, opacity: cap(0.1) }}>{proj.what}</div>
              <div style={{ marginTop: 8, font: `400 21px/1.38 ${F.plex}`, color: "rgba(236,233,226,0.72)", opacity: cap(0.25) }}>{ROLE[slug]}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginTop: 12, font: `400 18px ${F.mono}`, color: P.steel, opacity: cap(0.4) }}>
                {proj.stack.map((st) => (
                  <span key={st} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 7, height: 7, background: P.blue }} />
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Progress through the nine: a rail that fills one segment per project. */}
      <div style={{ position: "absolute", left: 80, top: 1470, width: 880, display: "flex", gap: 8, opacity: 1 - exitAct }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const on = i < g * 3 ? 1 : i < g * 3 + 3 ? ramp(local, 0.5 + (i - g * 3) * 0.22, 1.0 + (i - g * 3) * 0.22, "power2.out") : 0;
          return <div key={i} style={{ flex: 1, height: 3, background: P.steelDim, overflow: "hidden" }}><div style={{ height: "100%", width: `${lerp(0, 100, on)}%`, background: P.blue }} /></div>;
        })}
      </div>
    </AbsoluteFill>
  );
};
