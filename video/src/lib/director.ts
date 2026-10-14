import { energy, hatPulse, smoothEnergy } from "./audio";
import { ease, lerp } from "./ease";
import { B, beat, beatPulse, prog } from "./timing";

type V3 = [number, number, number];

export interface Pose {
  pos: V3;
  target: V3;
  fov: number;
  roll: number;
}

export interface State {
  t: number;
  frame: number;
  cam: Pose;
  /** Particle cloud: how much each particle has moved to the logo, the network, or burst outward. */
  logoMix: number;
  neuralMix: number;
  burst: number;
  dustOpacity: number;
  /** Opening big bang: 0 = every particle in one point, 1 = spread through space. */
  bang: number;
  /** Overall particle brightness; lowered under the big words so they read. */
  particleGain: number;
  particleSize: number;
  pulse: number;
  /** Hi-hat flare, used where the bass drops out. */
  hat: number;
  warp: number;
  /** Chrome logo. */
  logoPos: V3;
  logoSolid: number;
  logoSpin: number;
  sweep: number;
  /** Gallery and phone. */
  panels: number;
  phone: number;
  phoneScroll: number;
  phoneSpin: number;
  neuralLines: number;
  /** Shockwave ring at the peak. */
  ring: number;
  /** Post. */
  bloom: number;
  chroma: number;
  flash: number;
  fade: number;
}

/* ── World layout ─────────────────────────────────────────── */

export const PANEL_W = 6.4;
export const PANEL_H = 4;

export const panelPos = (i: number): V3 => [i % 2 ? 1.5 : -1.5, ((i % 3) - 1) * 0.7, -40 - 18 * i];
export const panelRotY = (i: number) => (i % 2 ? -0.22 : 0.22);

/** Phone, network and the closing logo share a stage past the gallery. */
export const STAGE_Z = -215;

/* ── Shots ─────────────────────────────────────────────────── */

interface Shot {
  name: string;
  start: number;
  end: number;
  /** Seconds spent flying in from the previous shot's last pose. 0 = hard cut. */
  blendIn: number;
  pose: (u: number) => Pose;
}

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mix3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const orbit = (center: V3, radius: number, angle: number, y: number): V3 => [
  center[0] + Math.sin(angle) * radius,
  center[1] + y,
  center[2] + Math.cos(angle) * radius,
];

const easeIO = ease("power2.inOut");
const easeOut = ease("power3.out");
const easeIn = ease("power4.in");
const fly = ease("expo.inOut");

const pose = (pos: V3, target: V3, fov = 40, roll = 0): Pose => ({ pos, target, fov, roll });

const projectShot = (i: number, start: number, end: number, rapid: boolean): Shot => {
  const c = panelPos(i);
  const dir = i % 2 ? -1 : 1;
  return {
    name: `project-${i}`,
    start,
    end,
    blendIn: i === 0 ? 0 : rapid ? 0.22 : 0.32,
    pose: (u) => {
      const e = easeOut(u);
      const angle = panelRotY(i) + (rapid ? lerp(dir * 0.32, dir * 0.08, e) : lerp(dir * 0.75, -dir * 0.1, e));
      const radius = rapid ? lerp(13.5, 11.2, u) : lerp(9.2, 12.8, e);
      const y = rapid ? 0.3 : lerp(1.4, 0.35, e);
      // Look slightly below the panel so the caption sits under it.
      return pose(orbit(c, radius, angle, y), add(c, [0, -0.7, 0]), 40, rapid ? 0 : lerp(dir * 0.06, 0, e));
    },
  };
};

const stage: V3 = [0, 0, STAGE_Z];

const SHOTS: Shot[] = [
  {
    name: "dust",
    start: 0,
    end: beat(12),
    blendIn: 0,
    pose: (u) => pose([lerp(0.6, 0, u), lerp(0.4, 0, u), lerp(27, 22, easeIO(u))], [0, 0, 0], 38),
  },
  {
    name: "form",
    start: beat(12),
    end: beat(24),
    blendIn: 1.2,
    pose: (u) => pose(orbit([0, 0, 0], lerp(21, 19, u), lerp(-0.7, -0.12, easeIO(u)), lerp(2.4, 0.6, u)), [0, 0, 0], 40),
  },
  {
    name: "macro",
    start: beat(24),
    end: beat(32),
    blendIn: 0,
    pose: (u) => {
      const e = easeIO(u);
      return pose(mix3([-3.4, 0.7, 4.0], [0, -2.2, 19.5], e), mix3([-2.1, 0.1, 0], [0, -2.2, 0], e), lerp(32, 40, e), lerp(-0.08, 0, e));
    },
  },
  {
    name: "title",
    start: beat(32),
    end: beat(40),
    blendIn: 0,
    pose: (u) => pose([0, -2.2, lerp(19.5, 18.2, u)], [0, -2.2, 0], 40),
  },
  {
    name: "warp",
    start: beat(40),
    end: beat(B.drop),
    blendIn: 0,
    pose: (u) => {
      const e = easeIn(u);
      return pose(mix3([0, -2.2, 18.2], [0, 0, 0.8], e), mix3([0, -2.2, 0], [0, 0, -6], e), lerp(40, 78, e));
    },
  },
  ...B.projects.map((b, i) => projectShot(i, beat(b), beat(b + 8), false)),
  {
    name: "corridor",
    start: beat(B.hover),
    end: beat(B.shift),
    blendIn: 0.45,
    pose: (u) => {
      const e = easeIO(u);
      const p4 = panelPos(4);
      return pose(mix3(add(p4, [7.5, 3.2, 9]), add(p4, [6.2, 2.4, -6]), e), add(panelPos(8), [0, 0, 0]), 44);
    },
  },
  ...B.rapid.map((b, k) => projectShot(5 + k, beat(b), beat(b + 4), true)),
  {
    name: "phone",
    start: beat(B.phone),
    end: beat(B.cert),
    blendIn: 0.5,
    pose: (u) => pose(orbit(stage, lerp(12.5, 10.8, u), lerp(0.55, -0.35, easeIO(u)), lerp(0.9, 0.2, u)), add(stage, [0, 1.1, 0]), 40),
  },
  {
    name: "neural",
    start: beat(B.cert),
    end: beat(B.words[0]),
    blendIn: 0.6,
    pose: (u) => pose(orbit(stage, lerp(11.5, 10.2, u), lerp(-0.3, 0.15, easeIO(u)), lerp(0.4, -0.6, u)), add(stage, [0, -1.5, 0]), 42),
  },
  {
    name: "words",
    start: beat(B.words[0]),
    end: beat(B.logo),
    blendIn: 0.25,
    pose: (u) => pose(orbit(stage, lerp(7, 5.5, u), lerp(0.15, 0.4, u), 0), stage, 46, lerp(0, 0.12, u)),
  },
  {
    name: "logo",
    start: beat(B.logo),
    end: beat(B.peak),
    blendIn: 0,
    pose: (u) => {
      const e = easeIO(u);
      return pose(mix3(add(stage, [-9, 3.5, 13]), add(stage, [0, -2.2, 19.5]), e), add(stage, [0, lerp(-1, -2.2, e), 0]), 40);
    },
  },
  {
    name: "end",
    start: beat(B.peak),
    end: 60.5,
    blendIn: 0,
    pose: (u) => pose(add(stage, [0, -2.2, lerp(19.5, 18.4, u)]), add(stage, [0, -2.2, 0]), 40),
  },
];

const shotAt = (t: number) => {
  let k = 0;
  while (k < SHOTS.length - 1 && t >= SHOTS[k + 1].start) k++;
  return k;
};

const mixPose = (a: Pose, b: Pose, t: number): Pose => ({
  pos: mix3(a.pos, b.pos, t),
  target: mix3(a.target, b.target, t),
  fov: lerp(a.fov, b.fov, t),
  roll: lerp(a.roll, b.roll, t),
});

const cameraAt = (t: number): Pose => {
  const k = shotAt(t);
  const s = SHOTS[k];
  const u = prog(t, s.start, s.end);
  const p = s.pose(u);
  if (k > 0 && s.blendIn > 0 && t - s.start < s.blendIn) {
    const prev = SHOTS[k - 1];
    return mixPose(prev.pose(1), p, fly((t - s.start) / s.blendIn));
  }
  return p;
};

export const shotName = (t: number) => SHOTS[shotAt(t)].name;

/* ── Per-frame state ───────────────────────────────────────── */

/** Three beat-locked waves: the particles that form the logo arrive in thirds. */
const steppedIn = (t: number, beats: number[]) => {
  let v = 0;
  for (const b of beats) v += ease("power3.out")(prog(t, beat(b), beat(b + 2))) / beats.length;
  return v;
};

/** Spikes at the start of each shot that is entered with a cut or a fly-in. */
const cutSpike = (t: number) => {
  let v = 0;
  for (const s of SHOTS) {
    if (s.start <= 0) continue;
    const d = t - s.start;
    if (d >= 0 && d < 0.5) v = Math.max(v, Math.exp(-d * 9));
  }
  return v;
};

export const getState = (frame: number, fps: number): State => {
  const t = frame / fps;
  const bass = smoothEnergy("bass", frame, 3);
  const rms = smoothEnergy("rms", frame, 6);
  const hit = beatPulse(t, 7);
  const inGroove = t >= beat(B.drop) && t < beat(B.shift);
  const cam = cameraAt(t);

  // Kick-driven camera shake in the groove, very small, plus a jolt at the drop.
  const dropJolt = Math.exp(-Math.max(0, t - beat(B.drop)) * 10) * (t >= beat(B.drop) ? 1 : 0);
  const shake = (inGroove ? 0.035 * hit * bass : 0) + 0.25 * dropJolt;
  cam.pos = [
    cam.pos[0] + Math.sin(frame * 1.7) * shake,
    cam.pos[1] + Math.cos(frame * 2.3) * shake,
    cam.pos[2],
  ];

  const logoForm = steppedIn(t, [12, 16, 20]);
  const logoBack = steppedIn(t, [B.logo, B.logo + 2]);
  // Particles leave the logo as the warp builds, and return to it for the finale.
  const logoMix = t < beat(40) ? logoForm : t < beat(B.logo) ? 1 - prog(t, beat(40), beat(42)) : logoBack;
  const neuralMix =
    t < beat(B.cert) ? 0 : t < beat(B.logo) ? steppedIn(t, [B.cert, B.cert + 2, B.cert + 4]) : 1 - logoBack;

  const wordBursts = B.words.reduce((v, b) => v + Math.exp(-Math.max(0, t - beat(b)) * 5) * (t >= beat(b) ? 1 : 0), 0);
  const peakBurst = t >= beat(B.peak) ? ease("expo.out")(prog(t, beat(B.peak), beat(B.peak) + 1.4)) : 0;

  const atStage = t >= beat(B.phone);
  const logoSolid = atStage
    ? prog(t, beat(B.logo + 3), beat(B.logo + 6))
    : prog(t, beat(24), beat(27)) * (1 - prog(t, beat(43.5), beat(B.drop)));

  const sweeps = [26, 28, 30, B.logo + 5, B.peak];
  let sweep = -1;
  for (const b of sweeps) {
    const u = prog(t, beat(b), beat(b + 2));
    if (u > 0 && u < 1) sweep = u;
  }

  const warpBuild = t < beat(B.drop) ? prog(t, beat(40), beat(B.drop)) : 0;
  const bang = t < beat(1) ? 0 : ease("expo.out")(prog(t, beat(1), beat(1) + 2.2));
  const bangKick = t >= beat(1) ? Math.exp(-(t - beat(1)) * 2.2) : 0;
  const warp = Math.max(warpBuild * warpBuild, cutSpike(t) * (inGroove || t >= beat(B.shift) ? 0.6 : 0), bangKick * 0.8);

  const flash =
    Math.max(
      Math.exp(-Math.max(0, t - beat(B.drop)) * 9) * (t >= beat(B.drop) - 0.04 ? 1 : 0) * (t < beat(B.drop) + 1 ? 1 : 0),
      Math.exp(-Math.max(0, t - beat(B.peak)) * 9) * (t >= beat(B.peak) ? 0.55 : 0),
      wordBursts * 0.18,
    ) + prog(t, beat(B.drop) - 0.12, beat(B.drop)) * (t < beat(B.drop) ? 0.5 : 0);

  return {
    t,
    frame,
    cam,
    logoMix,
    neuralMix,
    burst: wordBursts * 0.9 + peakBurst * 3.5,
    bang,
    dustOpacity:
      t < beat(12)
        ? (t < beat(1) ? 1 : lerp(1, 0.7, prog(t, beat(1), beat(1) + 3))) * (0.8 + 0.2 * energy("high", frame))
        : inGroove
          ? 0.35 + 0.35 * bass
          : 0.6,
    particleGain: t >= beat(B.words[0]) && t < beat(B.logo) ? 0.35 : 1,
    particleSize: 1 + 0.55 * hit * (inGroove ? bass : 0.4) + 0.5 * (t >= beat(B.shift) && t < beat(B.peak) ? hatPulse(frame) : 0) + (t >= beat(B.peak) ? 0.6 * (1 - peakBurst) : 0),
    pulse: hit,
    hat: t >= beat(B.shift) && t < beat(B.peak) ? hatPulse(frame) : 0,
    warp,
    logoPos: atStage ? stage : [0, 0, 0],
    logoSolid,
    logoSpin: atStage ? lerp(-0.35, 0, ease("power3.out")(prog(t, beat(B.logo + 2), beat(B.peak)))) : lerp(0.25, 0, ease("power2.out")(prog(t, beat(24), beat(34)))),
    sweep,
    panels: t >= beat(B.drop) - 0.1 && t < beat(B.cert) + 1.5 ? 1 : 0,
    phone: prog(t, beat(B.phone), beat(B.phone + 2)) * (1 - prog(t, beat(B.cert + 1), beat(B.cert + 3))),
    phoneScroll: ease("power2.inOut")(prog(t, beat(B.phone + 1), beat(B.cert))),
    phoneSpin: lerp(0.5, -0.2, prog(t, beat(B.phone), beat(B.cert))),
    neuralLines: prog(t, beat(B.cert + 2), beat(B.cert + 5)) * (1 - prog(t, beat(B.words[0]), beat(B.words[0] + 1))),
    ring: t >= beat(B.peak) ? prog(t, beat(B.peak), beat(B.peak) + 1.2) : 0,
    bloom: 0.55 + 1.8 * bangKick + (t < beat(1) ? 1.2 : 0) + 0.9 * rms + 0.8 * hit * (inGroove ? bass : 0.3) + 1.6 * flashBoost(t),
    chroma: 0.0006 + 0.006 * cutSpike(t) + 0.004 * dropJolt + 0.0015 * hit * (inGroove ? 1 : 0),
    flash: Math.min(1, flash),
    fade: prog(t, 59.4, 60),
  };
};

const flashBoost = (t: number) =>
  Math.exp(-Math.max(0, t - beat(B.peak)) * 6) * (t >= beat(B.peak) ? 0.35 : 0) +
  Math.exp(-Math.max(0, t - beat(B.drop)) * 4) * (t >= beat(B.drop) ? 0.6 : 0);
