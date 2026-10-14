import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { PROJECTS } from '../content';
import { Prefs } from '../core/prefs';
import type { Pose, TileWall } from '../scene/tile-wall';

type PoseName = 'hero' | 'work' | 'systems' | 'about' | 'contact';

interface Anchor {
  el: Element;
  state: number;
  pose: PoseName;
}

// Beside the hero copy the wall is the figure; behind the work grid it recedes into the page.
const WIDE: Record<PoseName, Pose> = {
  hero: { wallX: 5.1, wallY: -0.2, wallRotY: -0.5, wallRotX: 0.06, camZ: 25, scatter: 0, dim: 0 },
  work: { wallX: 0, wallY: 0, wallRotY: -0.12, wallRotX: 0.04, camZ: 24, scatter: 0, dim: 0.86 },
  systems: { wallX: 5.8, wallY: 0, wallRotY: 0.3, wallRotX: 0, camZ: 27, scatter: 1, dim: 0.78 },
  about: { wallX: 6.6, wallY: 0, wallRotY: 0.25, wallRotX: 0, camZ: 27, scatter: 1, dim: 0.82 },
  contact: { wallX: 6.4, wallY: -0.4, wallRotY: -0.55, wallRotX: 0.12, camZ: 28, scatter: 0, dim: 0.3 },
};

const NARROW: Record<PoseName, Pose> = {
  hero: { wallX: 0, wallY: 8.4, wallRotY: -0.25, wallRotX: 0.35, camZ: 46, scatter: 0, dim: 0 },
  work: { wallX: 0, wallY: 0, wallRotY: 0, wallRotX: 0.1, camZ: 30, scatter: 0, dim: 0.88 },
  systems: { wallX: 0, wallY: 3, wallRotY: 0.2, wallRotX: 0, camZ: 40, scatter: 1, dim: 0.85 },
  about: { wallX: 0, wallY: 3, wallRotY: 0.2, wallRotX: 0, camZ: 40, scatter: 1, dim: 0.85 },
  contact: { wallX: 0, wallY: 9, wallRotY: -0.3, wallRotX: 0.35, camZ: 46, scatter: 0, dim: 0.3 },
};

const isNarrow = () => window.innerWidth < 760;

/** Ease within a segment so the wall rests on each whole state while reading. */
const hold = (t: number) => {
  const x = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  return x * x * (3 - 2 * x);
};

/**
 * Fixed canvas behind the page. Loads three.js only in the browser, only in
 * 3D view, and maps scroll position onto the tile wall's state and pose.
 */
@Component({
  selector: 'app-scene-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true" [class.is-ready]="ready()"></canvas>`,
  styles: `
    :host { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block; opacity: 0; transition: opacity 1.2s ease; }
    canvas.is-ready { opacity: 1; }
    @media (prefers-reduced-motion: reduce) { canvas { transition: none; } }
  `,
})
export class SceneCanvas {
  private doc = inject(DOCUMENT);
  private prefs = inject(Prefs);
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  protected ready = signal(false);
  private wall: TileWall | null = null;
  private loading = false;
  private anchors: Anchor[] = [];
  /** A project the pointer or keyboard focus is on; it overrides the scroll state. */
  private focusState: number | null = null;
  private frame = 0;
  private cleanup: (() => void)[] = [];
  private destroyed = false;

  constructor() {
    const browser = signal(false);
    afterNextRender(() => browser.set(true));

    effect(() => {
      if (!browser()) return;
      const view = this.prefs.view();
      untracked(() => (view === '3d' ? this.boot() : this.teardown()));
    });

    effect(() => {
      const dark = this.prefs.theme() === 'dark';
      untracked(() => this.wall?.setDark(dark));
    });

    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.teardown();
    });
  }

  private async boot() {
    if (this.wall || this.loading) return;
    if (!hasWebGL()) {
      this.prefs.forcePlain();
      return;
    }
    this.loading = true;
    try {
      const { TileWall } = await import('../scene/tile-wall');
      // The view may have changed, or the component gone, while three.js loaded.
      if (this.destroyed || this.prefs.view() !== '3d') return;
      const narrow = isNarrow();
      this.wall = new TileWall({
        canvas: this.canvas().nativeElement,
        textures: PROJECTS.map((p) => `/img/work/${p.slug}-${narrow ? 800 : 1600}.webp`),
        dark: this.prefs.theme() === 'dark',
        narrow,
        onReady: () => this.ready.set(true),
      });
    } catch {
      this.prefs.forcePlain();
      return;
    } finally {
      this.loading = false;
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.wall.setReducedMotion(reduced.matches);
    this.collect();
    this.update();
    this.wall.settle();
    this.wall.start();

    const onScroll = () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.update());
    };
    const onResize = () => {
      this.wall?.resize();
      onScroll();
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') this.wall?.setPointer(e.clientX, e.clientY);
    };
    const onLeave = () => this.wall?.clearPointer();
    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.('[data-project]');
      const next = el ? Number(el.getAttribute('data-project')) : null;
      if (next === this.focusState) return;
      this.focusState = next;
      onScroll();
    };
    const onVisibility = () => this.wall?.setVisible(this.doc.visibilityState === 'visible');
    const onMotion = () => this.wall?.setReducedMotion(reduced.matches);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    this.doc.addEventListener('pointerover', onOver, { passive: true });
    this.doc.addEventListener('focusin', onOver);
    this.doc.documentElement.addEventListener('pointerleave', onLeave);
    this.doc.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onMotion);
    this.cleanup.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      this.doc.removeEventListener('pointerover', onOver);
      this.doc.removeEventListener('focusin', onOver);
      this.doc.documentElement.removeEventListener('pointerleave', onLeave);
      this.doc.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onMotion);
    });
  }

  private teardown() {
    if (!this.wall && !this.cleanup.length) return;
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    cancelAnimationFrame(this.frame);
    this.wall?.dispose();
    this.wall = null;
    this.ready.set(false);
  }

  /** Page landmarks that pin a wall state and pose to a scroll position. */
  private collect() {
    const q = (s: string) => this.doc.querySelector(s);
    const n = PROJECTS.length;
    const list: (Anchor | null)[] = [
      q('[data-scene="hero"]') && { el: q('[data-scene="hero"]')!, state: 0, pose: 'hero' },
      // Each group of three opens on its first project.
      ...Array.from(this.doc.querySelectorAll('[data-step]')).map(
        (el): Anchor => ({ el, state: Number(el.getAttribute('data-step')) || 1, pose: 'work' }),
      ),
      q('[data-scene="systems"]') && { el: q('[data-scene="systems"]')!, state: n + 0.5, pose: 'systems' },
      q('[data-scene="about"]') && { el: q('[data-scene="about"]')!, state: n + 0.5, pose: 'about' },
      q('[data-scene="contact"]') && { el: q('[data-scene="contact"]')!, state: n + 1, pose: 'contact' },
    ];
    this.anchors = list.filter((a): a is Anchor => !!a);
  }

  private update() {
    if (!this.wall || !this.anchors.length) return;
    const mid = window.innerHeight * 0.5;
    const poses = isNarrow() ? NARROW : WIDE;
    const ys = this.anchors.map((a) => {
      const r = a.el.getBoundingClientRect();
      // Tall sections anchor near their top so the change happens on entry.
      return r.top + Math.min(r.height * 0.5, window.innerHeight * 0.45);
    });

    let i = 0;
    while (i < ys.length - 1 && ys[i + 1] <= mid) i++;
    const a = this.anchors[i];
    const b = this.anchors[Math.min(i + 1, this.anchors.length - 1)];
    const span = ys[Math.min(i + 1, ys.length - 1)] - ys[i];
    const t = a === b || span <= 0 ? 0 : hold((mid - ys[i]) / span);

    const inWork = a.pose === 'work' || b.pose === 'work';
    this.wall.setState(inWork && this.focusState !== null ? this.focusState : a.state + (b.state - a.state) * t);
    const pa = poses[a.pose];
    const pb = poses[b.pose];
    const pose = {} as Pose;
    for (const k of Object.keys(pa) as (keyof Pose)[]) pose[k] = pa[k] + (pb[k] - pa[k]) * t;
    this.wall.setPose(pose);
  }
}

/**
 * True when a hardware-accelerated WebGL context is available. Software
 * renderers (SwiftShader, llvmpipe) draw the wall on the CPU and stall the
 * page, so those devices get the plain view. `?3d=force` skips the check.
 */
function hasWebGL() {
  try {
    if (new URLSearchParams(location.search).get('3d') === 'force') return true;
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}
