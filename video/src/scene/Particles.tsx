import { useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial, Vector3 } from "three";
import type { State } from "../lib/director";
import { seeded } from "../lib/ease";
import { C } from "../lib/palette";
import { sampleLogo, sampleNeural } from "./geometry";

const COUNT = 26000;
/** Dust lives in a box that wraps around the camera, so it never runs out. */
const DUST = 34;

const vertex = /* glsl */ `
  attribute vec3 aLogo;
  attribute vec3 aNeural;
  attribute vec4 aRand;

  uniform float uTime;
  uniform vec3 uCam;
  uniform vec3 uLogoPos;
  uniform vec3 uStage;
  uniform float uLogoMix;
  uniform float uNeuralMix;
  uniform float uBurst;
  uniform float uSize;
  uniform float uWarp;
  uniform float uPixel;
  uniform float uOpacity;
  uniform float uGain;
  uniform float uBang;

  varying float vAlpha;
  varying float vHue;

  // Each particle joins a target in one of three groups, so formations land on beats.
  float staged(float m, float r) {
    float g = floor(r * 3.0) / 3.0;
    return smoothstep(g, g + 0.34, m);
  }

  void main() {
    vec3 dust = mod(position - uCam + ${DUST / 2}.0, ${DUST}.0) - ${DUST / 2}.0 + uCam;
    float t = uTime;
    dust += 0.35 * vec3(sin(t * 0.21 + aRand.x * 40.0), cos(t * 0.17 + aRand.y * 40.0), sin(t * 0.13 + aRand.z * 40.0));
    // Big bang: everything starts in one point at the origin and blows out toward the camera.
    dust = mix(vec3(0.0), dust, uBang);

    vec3 logo = aLogo + uLogoPos + 0.012 * vec3(sin(t * 3.0 + aRand.x * 90.0));
    vec3 neural = aNeural + uStage;

    vec3 p = mix(dust, logo, staged(uLogoMix, aRand.y));
    p = mix(p, neural, staged(uNeuralMix, aRand.z));

    // Burst: fly out along a fixed random direction.
    vec3 dir = normalize(vec3(aRand.x - 0.5, aRand.y - 0.5, aRand.z - 0.5) + 1e-4);
    p += dir * uBurst * (1.5 + aRand.w * 5.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    float size = uSize * (0.6 + aRand.w * 1.4) * uPixel / max(depth, 0.5);
    gl_PointSize = clamp(size * (1.0 + uWarp * 1.5), 1.0, 64.0);

    float formed = max(staged(uLogoMix, aRand.y), staged(uNeuralMix, aRand.z));
    // Loose dust follows the scene's dust level; formed shapes stay bright.
    vAlpha = uGain * mix(uOpacity, 1.0, formed) * smoothstep(60.0, 8.0, depth) * smoothstep(0.2, 1.2, depth);
    vHue = aRand.x;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vAlpha;
  varying float vHue;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    core *= core;
    vec3 col = mix(uA, uB, smoothstep(0.55, 1.0, vHue));
    col = mix(col, vec3(1.0), core * 0.55);
    gl_FragColor = vec4(col * core, core * vAlpha);
  }
`;

export const Particles: React.FC<{ state: State; height: number }> = ({ state, height }) => {
  const { geometry, material } = useMemo(() => {
    const rand = seeded(11);
    const dust = new Float32Array(COUNT * 3);
    const r4 = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      dust.set([(rand() - 0.5) * DUST, (rand() - 0.5) * DUST, (rand() - 0.5) * DUST], i * 3);
      r4.set([rand(), rand(), rand(), rand()], i * 4);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(dust, 3));
    g.setAttribute("aLogo", new BufferAttribute(sampleLogo(COUNT), 3));
    g.setAttribute("aNeural", new BufferAttribute(sampleNeural(COUNT), 3));
    g.setAttribute("aRand", new BufferAttribute(r4, 4));
    const m = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uCam: { value: new Vector3() },
        uLogoPos: { value: new Vector3() },
        uStage: { value: new Vector3() },
        uLogoMix: { value: 0 },
        uNeuralMix: { value: 0 },
        uBurst: { value: 0 },
        uSize: { value: 1 },
        uWarp: { value: 0 },
        uPixel: { value: 1 },
        uOpacity: { value: 1 },
        uGain: { value: 1 },
        uBang: { value: 1 },
        uA: { value: new Color(C.electric) },
        uB: { value: new Color(C.turquoise) },
      },
    });
    return { geometry: g, material: m };
  }, []);

  useLayoutEffect(() => {
    const u = material.uniforms;
    u.uTime.value = state.t;
    u.uCam.value.set(...state.cam.pos);
    u.uLogoPos.value.set(...state.logoPos);
    u.uStage.value.set(0, 0, -215);
    u.uLogoMix.value = state.logoMix;
    u.uNeuralMix.value = state.neuralMix;
    u.uBurst.value = state.burst;
    u.uSize.value = 2.6 * state.particleSize;
    u.uWarp.value = state.warp;
    u.uOpacity.value = state.dustOpacity;
    u.uGain.value = state.particleGain;
    u.uBang.value = state.bang;
    // Point size scales with output height so the look holds at any resolution.
    u.uPixel.value = height / 1920 * 24;
  }, [state, material, height]);

  return <points geometry={geometry} material={material} frustumCulled={false} />;
};
