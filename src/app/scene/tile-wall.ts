import {
  BoxGeometry,
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Object3D,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * A wall of glazed İznik tiles. The front of every tile carries a piece of a
 * star-and-cross pattern; the back carries a piece of a project screenshot.
 * Scrolling drives `state`: 0 is the pattern, 1..n are projects. Between two
 * whole states the tiles flip in a diagonal wave from one face to the other.
 */

export interface TileWallOptions {
  canvas: HTMLCanvasElement;
  textures: string[];
  dark: boolean;
  /** Small screens get a coarser grid. */
  narrow: boolean;
  /** Called once the first frame has been drawn. */
  onReady?: () => void;
}

/** Where the camera and wall sit for a given part of the page. */
export interface Pose {
  wallX: number;
  wallY: number;
  wallRotY: number;
  wallRotX: number;
  camZ: number;
  scatter: number;
}

const COLS_WIDE = 32;
const ROWS_WIDE = 20;
const COLS_NARROW = 16;
const ROWS_NARROW = 10;
const WALL_W = 16;
const WALL_H = 10;

const vertex = /* glsl */ `
  attribute vec2 aCell;
  attribute float aRand;

  uniform float uTime;
  uniform float uFlip;
  uniform float uScatter;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uMotion;

  varying vec2 vLocal;
  varying vec2 vCell;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vFace;

  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0., -s, c, 0., 0., 0., 1.); }

  void main() {
    vCell = aCell;
    vLocal = position.xy + 0.5;
    vFace = normal.z;

    // Diagonal wave: top-left tiles turn first.
    float delay = (aCell.x * 0.62 + (1.0 - aCell.y) * 0.38) * 0.6 + aRand * 0.08;
    float t = clamp((uFlip - delay) / 0.32, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    float angle = t * 3.14159265;

    vec3 centre = (instanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    vec3 scale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));

    // Pointer pushes tiles back and tilts them away from it.
    vec2 d = centre.xy - uPointer.xy;
    float near = exp(-dot(d, d) * 0.8) * uPointerStrength * uMotion;
    float lift = sin(angle) * 0.9 + near * -0.3;
    float breathe = sin(uTime * 0.7 + aCell.x * 6.0 + aCell.y * 4.0) * 0.04 * uMotion;

    mat3 r = rotY(angle) * rotX(-d.y * near * 0.35) * rotY(d.x * near * 0.35);

    // Scatter: tiles drift into a loose cloud.
    vec3 drift = vec3(
      (aRand - 0.5) * 5.0 + sin(aRand * 40.0) * 1.5,
      (fract(aRand * 7.31) - 0.5) * 7.0,
      (fract(aRand * 3.17) - 0.5) * 12.0 + 2.0
    );
    float s = smoothstep(0.0, 1.0, uScatter);
    mat3 tumble = rotX(s * (aRand * 6.0 + uTime * 0.15 * uMotion)) * rotZ(s * fract(aRand * 5.0) * 4.0);

    vec3 p = tumble * (r * (position * scale));
    // The cloud is narrower than the wall so it stays clear of the text column.
    vec3 squeeze = vec3(mix(1.0, 0.4, s), mix(1.0, 0.85, s), 1.0);
    vec3 world = centre * squeeze + p + vec3(0., 0., lift + breathe) + drift * s;

    vec4 mv = modelViewMatrix * vec4(world, 1.0);
    vNormal = normalize(normalMatrix * (tumble * (r * normal)));
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexFront;
  uniform sampler2D uTexBack;
  uniform float uFrontIsPattern;
  uniform float uBackIsPattern;
  uniform vec2 uGrid;
  uniform vec3 uPorcelain;
  uniform vec3 uCobalt;
  uniform vec3 uTurquoise;
  uniform vec3 uFog;
  uniform float uFogNear;

  varying vec2 vLocal;
  varying vec2 vCell;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vFace;

  // Signed distance to an eight-pointed star (two overlapping squares).
  float sdBox(vec2 p, float r) { vec2 q = abs(p) - r; return max(q.x, q.y); }
  float star(vec2 p, float r) {
    float a = sdBox(p, r);
    vec2 q = vec2(p.x + p.y, p.y - p.x) * 0.70710678;
    return min(a, sdBox(q, r));
  }

  vec3 pattern(vec2 g) {
    // One motif repeats every four tiles: a cobalt star, crosses between.
    vec2 cell = g * 0.25;
    vec2 f = fract(cell) - 0.5;
    vec2 h = fract(cell + 0.5) - 0.5;
    float aa = 0.006;

    float st = star(f, 0.3);
    float ring = star(f, 0.215);
    float core = length(f) - 0.075;
    // Cross between four stars: two short bars.
    float bars = min(sdBox(h * vec2(1.0, 3.2), 0.16), sdBox(h * vec2(3.2, 1.0), 0.16));

    vec3 col = uPorcelain;
    col = mix(col, uCobalt, smoothstep(aa, 0.0, st));
    col = mix(col, uPorcelain, smoothstep(aa, 0.0, ring));
    col = mix(col, uCobalt, smoothstep(aa, 0.0, star(f, 0.15)));
    col = mix(col, uTurquoise, smoothstep(aa, 0.0, core));
    col = mix(col, uTurquoise, smoothstep(aa, 0.0, bars));
    return col;
  }

  vec3 face(sampler2D tex, float isPattern, vec2 local, bool mirrored) {
    vec2 l = mirrored ? vec2(1.0 - local.x, local.y) : local;
    vec2 uv = (vCell * (uGrid - 1.0) + l) / uGrid;
    if (isPattern > 0.5) return pattern(uv * uGrid);
    return texture2D(tex, uv).rgb;
  }

  void main() {
    vec3 n = normalize(vNormal);
    if (!gl_FrontFacing) n = -n;
    vec3 v = normalize(vView);

    vec3 base;
    if (vFace > 0.5) base = face(uTexFront, uFrontIsPattern, vLocal, false);
    else if (vFace < -0.5) base = face(uTexBack, uBackIsPattern, vLocal, true);
    else base = uPorcelain * 0.92;

    // Glaze: soft key light, wrap, and a tight specular sheen.
    vec3 l = normalize(vec3(-0.45, 0.6, 0.75));
    float diff = max(dot(n, l), 0.0) * 0.35 + 0.7;
    vec3 hv = normalize(l + v);
    float spec = pow(max(dot(n, hv), 0.0), 80.0) * 0.25;
    float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0) * 0.1;

    // Bevel darkening near each tile's edge reads as grout.
    vec2 e = min(vLocal, 1.0 - vLocal);
    float bevel = smoothstep(0.0, 0.06, min(e.x, e.y));
    vec3 col = base * diff * mix(0.78, 1.0, bevel) + spec + fres;

    // Distance fog toward the page colour.
    float depth = length(vView);
    col = mix(col, uFog, smoothstep(uFogNear, uFogNear + 30.0, depth) * 0.9);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export class TileWall {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(32, 1, 0.1, 100);
  private mesh!: InstancedMesh;
  private material!: ShaderMaterial;
  private textures: (Texture | null)[] = [];
  private timer = new Timer();
  private raf = 0;
  private visible = true;
  private running = false;
  private readied = false;
  private disposed = false;

  private pointer = new Vector2(10, 10);
  private pointerWorld = new Vector3(100, 100, 0);
  private pointerStrength = 0;
  private raycaster = new Raycaster();
  private plane = new Plane(new Vector3(0, 0, 1), 0);
  private inverse = new Matrix4();
  private hit = new Vector3();

  /** Target and eased state. */
  private stateTarget = 0;
  private state = 0;
  private poseTarget: Pose = { wallX: 0, wallY: 0, wallRotY: 0, wallRotX: 0, camZ: 24, scatter: 0 };
  private pose: Pose = { ...this.poseTarget };
  private motion = 1;

  constructor(private opts: TileWallOptions) {
    this.renderer = new WebGLRenderer({ canvas: opts.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.build(opts.dark);
    this.loadTextures();
    this.resize();
  }

  setState(value: number) {
    // One past the last project turns the wall back to the pattern.
    this.stateTarget = Math.max(0, Math.min(this.opts.textures.length + 1, value));
  }

  setPose(p: Partial<Pose>) {
    Object.assign(this.poseTarget, p);
  }

  /** Jump straight to the target, e.g. on first paint or reduced motion. */
  settle() {
    this.state = this.stateTarget;
    this.pose = { ...this.poseTarget };
  }

  setReducedMotion(reduced: boolean) {
    this.motion = reduced ? 0 : 1;
  }

  setDark(dark: boolean) {
    const u = this.material.uniforms;
    const pal = palette(dark);
    u['uPorcelain'].value.set(pal.porcelain);
    u['uFog'].value.set(pal.fog);
  }

  setPointer(clientX: number, clientY: number) {
    const r = this.opts.canvas.getBoundingClientRect();
    this.pointer.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
  }

  clearPointer() {
    this.pointer.set(10, 10);
  }

  setVisible(v: boolean) {
    this.visible = v;
    if (v) this.start();
  }

  resize() {
    const c = this.opts.canvas;
    const w = c.clientWidth || window.innerWidth;
    const h = c.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.timer.update();
    const loop = () => {
      if (!this.visible) {
        this.running = false;
        return;
      }
      this.raf = requestAnimationFrame(loop);
      this.frame();
    };
    loop();
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.running = false;
    this.visible = false;
    this.disposed = true;
    this.textures.forEach((t) => t?.dispose());
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    this.timer.dispose();
  }

  private build(dark: boolean) {
    const cols = this.opts.narrow ? COLS_NARROW : COLS_WIDE;
    const rows = this.opts.narrow ? ROWS_NARROW : ROWS_WIDE;
    const size = WALL_W / cols;
    const gap = size * 0.06;

    const geo = new BoxGeometry(1, 1, 0.14);
    const pal = palette(dark);
    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uFlip: { value: 0 },
        uScatter: { value: 0 },
        uPointer: { value: this.pointerWorld },
        uPointerStrength: { value: 0 },
        uMotion: { value: 1 },
        uGrid: { value: new Vector2(cols, rows) },
        uTexFront: { value: null },
        uTexBack: { value: null },
        uFrontIsPattern: { value: 1 },
        uBackIsPattern: { value: 0 },
        uPorcelain: { value: new Color(pal.porcelain) },
        uCobalt: { value: new Color('#2346A0') },
        uTurquoise: { value: new Color('#1FA39A') },
        uFog: { value: new Color(pal.fog) },
        uFogNear: { value: 30 },
      },
    });

    const count = cols * rows;
    this.mesh = new InstancedMesh(geo, this.material, count);
    const cell = new Float32Array(count * 2);
    const rand = new Float32Array(count);
    const o = new Object3D();
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        o.position.set(-WALL_W / 2 + size * (x + 0.5), WALL_H / 2 - size * (y + 0.5), 0);
        o.scale.set(size - gap, size - gap, size);
        o.updateMatrix();
        this.mesh.setMatrixAt(i, o.matrix);
        // Row 0 is the top of the wall but the bottom of the texture.
        cell[i * 2] = x / (cols - 1);
        cell[i * 2 + 1] = (rows - 1 - y) / (rows - 1);
        rand[i] = Math.random();
        i++;
      }
    }
    geo.setAttribute('aCell', new InstancedBufferAttribute(cell, 2));
    geo.setAttribute('aRand', new InstancedBufferAttribute(rand, 1));
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  private loadTextures() {
    const loader = new TextureLoader();
    this.textures = this.opts.textures.map(() => null);
    // Load in order so the first project is ready first.
    const next = (i: number) => {
      if (this.disposed || i >= this.opts.textures.length) return;
      loader.load(
        this.opts.textures[i],
        (t) => {
          // A texture that lands after dispose() would never be freed.
          if (this.disposed) {
            t.dispose();
            return;
          }
          t.colorSpace = SRGBColorSpace;
          t.anisotropy = 4;
          this.textures[i] = t;
          next(i + 1);
        },
        undefined,
        () => next(i + 1),
      );
    };
    next(0);
  }

  private frame() {
    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.05);
    const u = this.material.uniforms;
    const k = this.motion ? 1 - Math.pow(0.0025, dt) : 1;

    this.state += (this.stateTarget - this.state) * k;
    for (const key of Object.keys(this.pose) as (keyof Pose)[]) {
      this.pose[key] += (this.poseTarget[key] - this.pose[key]) * k;
    }

    // Front shows whole state `a`, back shows `a + 1`; fraction drives the flip.
    const a = Math.floor(this.state + 1e-4);
    const f = this.state - a;
    const tex = (s: number) => (s <= 0 || s > this.textures.length ? null : (this.textures[s - 1] ?? null));
    const front = tex(a);
    const back = tex(a + 1);
    u['uTexFront'].value = front;
    u['uTexBack'].value = back;
    u['uFrontIsPattern'].value = front ? 0 : 1;
    u['uBackIsPattern'].value = back ? 0 : 1;
    u['uFlip'].value = f;
    u['uTime'].value += dt;
    u['uMotion'].value = this.motion;
    u['uScatter'].value = this.pose.scatter;
    // Fog starts just behind the wall wherever the camera is.
    u['uFogNear'].value = this.pose.camZ + 6;

    this.mesh.position.set(this.pose.wallX, this.pose.wallY, 0);
    this.mesh.rotation.set(this.pose.wallRotX, this.pose.wallRotY, 0);
    this.mesh.updateMatrixWorld();

    // Gentle parallax from the pointer.
    const px = this.pointer.x > 5 ? 0 : this.pointer.x;
    const py = this.pointer.y > 5 ? 0 : this.pointer.y;
    this.camera.position.set(px * 0.6 * this.motion, py * 0.4 * this.motion, this.pose.camZ);
    this.camera.lookAt(0, 0, 0);

    // Pointer in the wall's local space.
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.inverse.copy(this.mesh.matrixWorld).invert();
    const ray = this.raycaster.ray.applyMatrix4(this.inverse);
    const hit = ray.intersectPlane(this.plane, this.hit);
    const want = hit && this.pointer.x < 5 ? 1 : 0;
    this.pointerStrength += (want - this.pointerStrength) * Math.min(1, dt * 6);
    if (hit) this.pointerWorld.lerp(hit, Math.min(1, dt * 10));
    u['uPointerStrength'].value = this.pointerStrength;

    this.renderer.render(this.scene, this.camera);
    if (!this.readied) {
      this.readied = true;
      this.opts.onReady?.();
    }
  }
}

function palette(dark: boolean) {
  return dark
    ? { porcelain: '#E4E8EF', fog: '#0C1324' }
    : { porcelain: '#F7F8FA', fog: '#F3F5F8' };
}
