import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { staticFile } from "remotion";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  FogExp2,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Shape,
  ShapeGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PANEL_H, PANEL_W, STAGE_Z, panelPos, panelRotY, type State } from "../lib/director";
import { seeded } from "../lib/ease";
import { C } from "../lib/palette";
import { logoGeometry, neuralNodes } from "./geometry";
import { Particles } from "./Particles";
import { useTextures } from "./textures";

export const PROJECT_SLUGS = ["12punto", "heroty", "add", "disnet", "avrupadan", "kpay", "vbt", "serberker", "flerpi"];

/* ── Camera and environment ───────────────────────────────── */

const CameraRig: React.FC<{ state: State }> = ({ state }) => {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  useLayoutEffect(() => {
    const { pos, target, fov, roll } = state.cam;
    camera.near = 0.05;
    camera.far = 400;
    camera.fov = fov;
    camera.position.set(...pos);
    camera.up.set(0, 1, 0);
    camera.lookAt(new Vector3(...target));
    camera.rotateZ(roll);
    camera.updateProjectionMatrix();
  }, [camera, state]);
  return null;
};

const Environment: React.FC = () => {
  const { gl, scene } = useThree();
  useLayoutEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
    scene.environment = env;
    scene.background = new Color(C.void);
    scene.fog = new FogExp2(C.void, 0.018);
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

/* ── Chrome logo and its lights ───────────────────────────── */

const Logo: React.FC<{ state: State }> = ({ state }) => {
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#dfe5f2"),
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.35,
        transparent: true,
      }),
    [],
  );
  useLayoutEffect(() => {
    material.opacity = state.logoSolid;
    material.depthWrite = state.logoSolid > 0.98;
  }, [material, state.logoSolid]);

  const sweepX = state.sweep < 0 ? 0 : -7 + state.sweep * 14;
  return (
    <group position={state.logoPos} visible={state.logoSolid > 0.002}>
      <mesh geometry={logoGeometry()} material={material} rotation={[0, state.logoSpin, 0]} />
      {/* Rim lights in the brand colours, and a light that sweeps across on beats. */}
      <pointLight position={[-6, 2.5, 3]} color={C.cobalt} intensity={60} distance={30} />
      <pointLight position={[6, -1.5, 2.5]} color={C.turquoise} intensity={40} distance={30} />
      <pointLight position={[sweepX, 1.2, 2.2]} color="#ffffff" intensity={state.sweep < 0 ? 0 : 90} distance={9} />
    </group>
  );
};

/* ── Gallery of project screens ───────────────────────────── */

const haloMaterial = () =>
  new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uColor: { value: new Color(C.cobalt) }, uStrength: { value: 0.5 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uStrength; varying vec2 vUv;
      void main(){
        vec2 d = abs(vUv - 0.5) * 2.0;
        float box = max(d.x * 0.92, d.y);
        float glow = smoothstep(1.0, 0.55, box);
        gl_FragColor = vec4(uColor * glow * uStrength, glow * uStrength);
      }`,
  });

const Panels: React.FC<{ state: State }> = ({ state }) => {
  const textures = useTextures(PROJECT_SLUGS.map((s) => staticFile(`work/${s}-1600.webp`)));
  const frame = useMemo(() => new RoundedBoxGeometry(PANEL_W + 0.22, PANEL_H + 0.22, 0.16, 4, 0.09), []);
  const screen = useMemo(() => new PlaneGeometry(PANEL_W, PANEL_H), []);
  const halo = useMemo(() => new PlaneGeometry(PANEL_W * 1.9, PANEL_H * 2.1), []);
  const frameMat = useMemo(
    () => new MeshPhysicalMaterial({ color: "#11172a", metalness: 0.9, roughness: 0.22, clearcoat: 1, envMapIntensity: 1 }),
    [],
  );
  const halos = useMemo(() => PROJECT_SLUGS.map(() => haloMaterial()), []);
  const screens = useMemo(() => PROJECT_SLUGS.map(() => new MeshBasicMaterial({ toneMapped: false })), []);

  useLayoutEffect(() => {
    if (!textures) return;
    screens.forEach((m, i) => {
      m.map = textures[i];
      m.needsUpdate = true;
    });
  }, [textures, screens]);

  useLayoutEffect(() => {
    // Screens breathe with the music: a little brighter on each kick.
    halos.forEach((m, i) => {
      m.uniforms.uStrength.value = 0.35 + 0.45 * state.pulse;
      m.uniforms.uColor.value.set(i % 2 ? C.turquoise : C.cobalt);
    });
    screens.forEach((m) => m.color.setScalar(0.8 + 0.1 * state.pulse));
  }, [state.pulse, halos, screens]);

  if (!textures) return null;
  return (
    <group visible={state.panels > 0}>
      {PROJECT_SLUGS.map((slug, i) => (
        <group key={slug} position={panelPos(i)} rotation={[0, panelRotY(i), 0]}>
          <mesh geometry={halo} material={halos[i]} position={[0, 0, -0.4]} />
          <mesh geometry={frame} material={frameMat} />
          <mesh geometry={screen} material={screens[i]} position={[0, 0, 0.085]} />
        </group>
      ))}
    </group>
  );
};

/* ── Phone showing the site in dark mode ──────────────────── */

const roundedRect = (w: number, h: number, r: number) => {
  const s = new Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
};

const SCREEN_W = 2.78;
const SCREEN_H = 5.98;
/** The capture is 780 × 7020 px; the screen shows a window of it. */
const SITE_ASPECT = 780 / 7020;

const Phone: React.FC<{ state: State }> = ({ state }) => {
  const textures = useTextures([staticFile("site/site-dark.jpg")]);
  const body = useMemo(() => new RoundedBoxGeometry(3.04, 6.26, 0.34, 8, 0.44), []);
  const bodyMat = useMemo(
    () => new MeshPhysicalMaterial({ color: "#1a2033", metalness: 1, roughness: 0.28, clearcoat: 1, envMapIntensity: 1.4 }),
    [],
  );
  const screen = useMemo(() => {
    const g = new ShapeGeometry(roundedRect(SCREEN_W, SCREEN_H, 0.36), 12);
    // Map shape coordinates to 0..1 UVs.
    const pos = g.getAttribute("position");
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = pos.getX(i) / SCREEN_W + 0.5;
      uv[i * 2 + 1] = pos.getY(i) / SCREEN_H + 0.5;
    }
    g.setAttribute("uv", new BufferAttribute(uv, 2));
    return g;
  }, []);
  const screenMat = useMemo(() => new MeshBasicMaterial({ toneMapped: false }), []);

  useLayoutEffect(() => {
    const tex = textures?.[0];
    if (!tex) return;
    const visible = (SCREEN_H / SCREEN_W) * SITE_ASPECT;
    tex.repeat.set(1, visible);
    // Scroll from the top of the page down through the projects.
    tex.offset.set(0, 1 - visible - state.phoneScroll * 0.62);
    screenMat.map = tex;
    screenMat.needsUpdate = true;
  }, [textures, screenMat, state.phoneScroll]);

  if (!textures || state.phone <= 0.001) return null;
  const rise = (1 - state.phone) * -6;
  return (
    <group position={[0, rise, STAGE_Z]} rotation={[0.08, state.phoneSpin, -0.04]} scale={0.6 + 0.4 * state.phone}>
      <mesh geometry={body} material={bodyMat} />
      <mesh geometry={screen} material={screenMat} position={[0, 0, 0.175]} />
    </group>
  );
};

/* ── Neural network edges, with pulses that run along them ── */

const NeuralLines: React.FC<{ state: State }> = ({ state }) => {
  const { geometry, material } = useMemo(() => {
    const { nodes, edges } = neuralNodes();
    const rand = seeded(5);
    const pos = new Float32Array(edges.length * 6);
    const t = new Float32Array(edges.length * 2);
    const seed = new Float32Array(edges.length * 2);
    edges.forEach(([a, b], i) => {
      pos.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], i * 6);
      t.set([0, 1], i * 2);
      const s = rand();
      seed.set([s, s], i * 2);
    });
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aT", new BufferAttribute(t, 1));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    const m = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uA: { value: new Color(C.cobalt) }, uB: { value: new Color(C.turquoise) } },
      vertexShader: `attribute float aT; attribute float aSeed; varying float vT; varying float vSeed;
        void main(){ vT = aT; vSeed = aSeed; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float uTime; uniform float uOpacity; uniform vec3 uA; uniform vec3 uB; varying float vT; varying float vSeed;
        void main(){
          float head = fract(uTime * 0.9 + vSeed);
          float pulse = smoothstep(0.12, 0.0, abs(vT - head));
          vec3 col = mix(uA, uB, pulse);
          gl_FragColor = vec4(col * (0.25 + 1.6 * pulse), (0.18 + 0.9 * pulse) * uOpacity);
        }`,
    });
    return { geometry: g, material: m };
  }, []);

  useLayoutEffect(() => {
    material.uniforms.uTime.value = state.t;
    material.uniforms.uOpacity.value = state.neuralLines;
  }, [material, state]);

  return <lineSegments geometry={geometry} material={material} position={[0, 0, STAGE_Z]} visible={state.neuralLines > 0.001} />;
};

/* ── Warp streaks for the build and the cuts ──────────────── */

const WarpLines: React.FC<{ state: State }> = ({ state }) => {
  const { geometry, material } = useMemo(() => {
    const n = 1400;
    const rand = seeded(19);
    const pos = new Float32Array(n * 6);
    const tail = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2;
      const r = 1.2 + rand() * 9;
      const z = (rand() - 0.5) * 60;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      pos.set([x, y, z, x, y, z], i * 6);
      tail.set([0, 1], i * 2);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aTail", new BufferAttribute(tail, 1));
    const m = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uWarp: { value: 0 }, uCam: { value: new Vector3() }, uFwd: { value: new Vector3(0, 0, -1) }, uColor: { value: new Color(C.electric) } },
      vertexShader: `attribute float aTail; uniform float uWarp; uniform vec3 uCam; uniform vec3 uFwd; varying float vTail;
        void main(){
          vec3 p = position;
          p.z = mod(p.z + 30.0, 60.0) - 30.0;
          // Orient the tube of streaks along the camera's view direction.
          vec3 f = normalize(uFwd);
          vec3 up = abs(f.y) > 0.9 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
          vec3 r = normalize(cross(f, up));
          vec3 u = cross(r, f);
          vec3 w = uCam + r * p.x + u * p.y + f * p.z;
          w += f * aTail * uWarp * 9.0;
          vTail = aTail;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(w, 1.0);
        }`,
      fragmentShader: `uniform vec3 uColor; uniform float uWarp; varying float vTail;
        void main(){ float a = mix(0.9, 0.0, vTail) * uWarp; gl_FragColor = vec4(mix(vec3(1.0), uColor, vTail) * a, a); }`,
    });
    return { geometry: g, material: m };
  }, []);

  useLayoutEffect(() => {
    const { pos, target } = state.cam;
    material.uniforms.uWarp.value = state.warp;
    material.uniforms.uCam.value.set(...pos);
    material.uniforms.uFwd.value.set(target[0] - pos[0], target[1] - pos[1], target[2] - pos[2]);
  }, [material, state]);

  return <lineSegments geometry={geometry} material={material} frustumCulled={false} visible={state.warp > 0.01} />;
};

/* ── Shockwave ring at the peak ───────────────────────────── */

const Shockwave: React.FC<{ state: State }> = ({ state }) => {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
        uniforms: { uR: { value: 0 }, uA: { value: 0 }, uColor: { value: new Color(C.electric) } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform float uR; uniform float uA; uniform vec3 uColor; varying vec2 vUv;
          void main(){
            float d = length(vUv - 0.5) * 2.0;
            float ring = exp(-pow((d - uR) * 18.0, 2.0)) + 0.35 * exp(-pow((d - uR * 0.82) * 9.0, 2.0));
            gl_FragColor = vec4(mix(vec3(1.0), uColor, 0.5) * ring * uA, ring * uA);
          }`,
      }),
    [],
  );
  const geo = useMemo(() => new PlaneGeometry(40, 40), []);
  useLayoutEffect(() => {
    material.uniforms.uR.value = 0.05 + state.ring * 0.95;
    material.uniforms.uA.value = state.ring > 0 ? (1 - state.ring) * 1.4 : 0;
  }, [material, state.ring]);
  return <mesh geometry={geo} material={material} position={[0, 0, STAGE_Z - 0.5]} visible={state.ring > 0 && state.ring < 1} />;
};

/* ── Everything ───────────────────────────────────────────── */

export const World: React.FC<{ state: State; height: number }> = ({ state, height }) => (
  <>
    <Environment />
    <CameraRig state={state} />
    <ambientLight intensity={0.25} />
    <directionalLight position={[3, 6, 8]} intensity={1.6} />
    <Logo state={state} />
    <Panels state={state} />
    <Phone state={state} />
    <NeuralLines state={state} />
    <Particles state={state} height={height} />
    <WarpLines state={state} />
    <Shockwave state={state} />
  </>
);
