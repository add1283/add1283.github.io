import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';

/** A fixed index of the page's sections on wide screens, like the film's work rail. */
@Component({
  selector: 'app-rail',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="rail" [attr.aria-label]="i18n.t().nav.menu">
      @for (s of sections(); track s.id; let i = $index) {
        <a class="rail__item" routerLink="." [fragment]="s.id" [class.is-active]="active() === s.id" [attr.aria-current]="active() === s.id ? 'true' : null">
          <span class="rail__num">{{ (i + 1).toString().padStart(2, '0') }}</span>
          <span class="rail__label">{{ s.label }}</span>
        </a>
      }
    </nav>
  `,
})
export class Rail {
  protected i18n = inject(I18n);
  protected active = signal('');
  protected sections = computed(() => {
    const n = this.i18n.t().nav;
    return [
      { id: 'work', label: n.work },
      { id: 'systems', label: n.systems },
      { id: 'civic', label: n.civic },
      { id: 'about', label: n.about },
      { id: 'contact', label: n.contact },
    ];
  });

  constructor() {
    const doc = inject(DOCUMENT);
    let observer: IntersectionObserver | undefined;
    afterNextRender(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const s of this.sections()) {
        const el = doc.getElementById(s.id);
        if (el) observer.observe(el);
      }
    });
    inject(DestroyRef).onDestroy(() => observer?.disconnect());
  }
}
