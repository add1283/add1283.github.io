import { BufferGeometry, ExtrudeGeometry, Mesh, Vector3 } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import glyphs from "../data/add-glyphs.json";
import { seeded } from "../lib/ease";

/** World width of the ADD logo. */
export const LOGO_WIDTH = 6;

let logoCache: BufferGeometry | null = null;

/**
 * ADD set in Bricolage Grotesque 800, extruded with a soft bevel. Outlines come
 * from the font in font units.
 */
export const logoGeometry = () => {
  if (logoCache) return logoCache;
  const loader = new SVGLoader();
  const parts: BufferGeometry[] = [];
  for (const g of glyphs.glyphs) {
    // Font outlines are y-up, which is already three.js's orientation.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${g.d}"/></svg>`;
    const data = loader.parse(svg);
    for (const path of data.paths) {
      for (const shape of SVGLoader.createShapes(path)) {
        const geo = new ExtrudeGeometry(shape, {
          depth: 150,
          bevelEnabled: true,
          bevelThickness: 26,
          bevelSize: 12,
          bevelSegments: 8,
          curveSegments: 14,
        });
        geo.translate(g.x, 0, 0);
        parts.push(geo);
      }
    }
  }
  const merged = mergeGeometries(parts, false)!;
  merged.computeBoundingBox();
  const box = merged.boundingBox!;
  const c = new Vector3();
  box.getCenter(c);
  merged.translate(-c.x, -c.y, -c.z);
  const s = LOGO_WIDTH / (box.max.x - box.min.x);
  merged.scale(s, s, s);
  logoCache = merged;
  return merged;
};

/** Points spread over the logo's surface, the same on every render. */
export const sampleLogo = (count: number, seed = 7) => {
  const mesh = new Mesh(logoGeometry());
  const sampler = new MeshSurfaceSampler(mesh);
  // Present in three r186 but missing from @types/three.
  (sampler as unknown as { randomFunction: () => number }).randomFunction = seeded(seed);
  sampler.build();
  const out = new Float32Array(count * 3);
  const p = new Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(p);
    out.set([p.x, p.y, p.z], i * 3);
  }
  return out;
};

/** A small feed-forward network: layer sizes and node positions, centred on the origin. */
export const NEURAL_LAYERS = [4, 7, 9, 7, 3];

export const neuralNodes = () => {
  const rand = seeded(31);
  const nodes: Vector3[] = [];
  const layers: number[][] = [];
  NEURAL_LAYERS.forEach((n, li) => {
    const x = (li - (NEURAL_LAYERS.length - 1) / 2) * 1.55;
    const ids: number[] = [];
    for (let k = 0; k < n; k++) {
      const y = (k - (n - 1) / 2) * 0.95;
      const z = (rand() - 0.5) * 1.6;
      ids.push(nodes.length);
      nodes.push(new Vector3(x, y, z));
    }
    layers.push(ids);
  });
  const edges: [number, number][] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    for (const a of layers[li]) for (const b of layers[li + 1]) edges.push([a, b]);
  }
  return { nodes, edges };
};

/** Points clustered on the network's nodes and strung along its edges. */
export const sampleNeural = (count: number) => {
  const { nodes, edges } = neuralNodes();
  const rand = seeded(77);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let p: Vector3;
    if (rand() < 0.45) {
      const n = nodes[Math.floor(rand() * nodes.length)];
      const r = 0.09 * Math.cbrt(rand());
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      p = new Vector3(
        n.x + r * Math.sin(ph) * Math.cos(th),
        n.y + r * Math.sin(ph) * Math.sin(th),
        n.z + r * Math.cos(ph),
      );
    } else {
      const [a, b] = edges[Math.floor(rand() * edges.length)];
      p = nodes[a].clone().lerp(nodes[b], rand());
      p.x += (rand() - 0.5) * 0.02;
      p.y += (rand() - 0.5) * 0.02;
    }
    out.set([p.x, p.y, p.z], i * 3);
  }
  return out;
};
