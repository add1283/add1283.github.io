import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { CivicItem } from '../content';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-civic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().civic;
    <section class="civic" id="civic" aria-labelledby="civic-title">
      <header class="section-head">
        <p class="label">{{ t.label }}</p>
        <h2 class="section-title" id="civic-title">{{ t.title }}</h2>
        <p class="section-intro serif civic__intro">{{ t.intro }}</p>
      </header>

      <ol class="civic__list">
        @for (item of t.items; track item.org; let i = $index) {
          <li class="org" [class.org--photos]="item.photos?.length">
            <div class="org__body">
              <p class="label org__meta"><span>{{ (i + 1).toString().padStart(2, '0') }}</span> {{ item.field }} / {{ item.years }}</p>
              <h3 class="org__name">{{ item.org }}</h3>
              <p class="org__role serif">{{ item.role }}</p>
              <ul class="org__points">
                @for (pt of item.points; track $index) {
                  <li>{{ pt }}</li>
                }
              </ul>
              @if (item.quote) {
                <figure class="org__quote">
                  <blockquote class="serif">“{{ item.quote.text }}”</blockquote>
                  <figcaption class="label">{{ item.quote.source }}</figcaption>
                </figure>
              }
              @if (item.link) {
                <a class="link org__link" [href]="item.link.url" target="_blank" rel="noopener">{{ item.link.label }}<span class="visually-hidden">: {{ item.org }}</span></a>
              }
            </div>
            @if (item.photos?.length) {
              <div class="org__photos">
                @for (ph of item.photos; track ph.src; let pi = $index) {
                  <figure class="photo">
                    <button type="button" class="photo__open" (click)="open(item, pi)" [attr.aria-label]="t.lightbox.open + ': ' + ph.alt">
                    <img
                      [src]="'/img/civic/' + ph.src + '-640.webp'"
                      [attr.srcset]="'/img/civic/' + ph.src + '-640.webp 640w' + (hasLarge(ph.src) ? ', /img/civic/' + ph.src + '-1280.webp 1280w' : '')"
                      sizes="(min-width: 960px) 30vw, 80vw"
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                    </button>
                    <figcaption class="label">{{ i18n.t().labels.fig }} {{ i + 2 }}.{{ pi + 1 }}</figcaption>
                  </figure>
                }
              </div>
            }
          </li>
        }
      </ol>

      <div class="writing">
        <h3 class="sub-title">{{ t.writingTitle }}</h3>
        <ol class="writing__list">
          @for (w of t.writing; track w.title) {
            <li class="writing__row">
              <p class="label"><time [attr.datetime]="w.date">{{ month(w.date) }}</time></p>
              <div>
                <p class="writing__title serif">
                  @if (w.url) {
                    <a [href]="w.url" target="_blank" rel="noopener">{{ w.title }}</a>
                  } @else {
                    {{ w.title }}
                  }
                </p>
                <p class="label">{{ w.where }}</p>
              </div>
            </li>
          }
        </ol>
      </div>

      <!-- Lightbox: a native dialog, so focus, Esc and the backdrop come for free. -->
      <dialog #box class="lightbox" (click)="backdrop($event)" (keydown)="keys($event)" (close)="shown.set(null)" [attr.aria-label]="current()?.alt ?? ''">
        @if (current(); as ph) {
          <figure class="lightbox__figure">
            <img [src]="'/img/civic/' + ph.src + (hasLarge(ph.src) ? '-1280' : '-640') + '.webp'" [alt]="ph.alt" />
            <figcaption>
              <span class="label">{{ (shown()!.index + 1).toString().padStart(2, '0') }} / {{ shown()!.photos.length.toString().padStart(2, '0') }}</span>
              <span>{{ ph.alt }}</span>
            </figcaption>
          </figure>
          <div class="lightbox__bar">
            <button type="button" class="tool" (click)="step(-1)" [attr.aria-label]="t.lightbox.prev">←</button>
            <button type="button" class="tool" (click)="step(1)" [attr.aria-label]="t.lightbox.next">→</button>
            <button type="button" class="tool tool--text" (click)="close()">{{ t.lightbox.close }}</button>
          </div>
        }
      </dialog>
    </section>
  `,
})
export class Civic {
  protected i18n = inject(I18n);
  private box = viewChild.required<ElementRef<HTMLDialogElement>>('box');

  /** The photo set and position open in the lightbox, if any. */
  protected shown = signal<{ photos: NonNullable<CivicItem['photos']>; index: number } | null>(null);
  protected current = computed(() => {
    const s = this.shown();
    return s ? s.photos[s.index] : null;
  });

  protected open(item: CivicItem, index: number) {
    if (!item.photos) return;
    this.shown.set({ photos: item.photos, index });
    this.box().nativeElement.showModal();
  }

  protected close() {
    this.box().nativeElement.close();
  }

  protected step(dir: number) {
    const s = this.shown();
    if (!s) return;
    this.shown.set({ ...s, index: (s.index + dir + s.photos.length) % s.photos.length });
  }

  protected keys(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }

  /** A click on the dialog itself, outside the figure and the buttons, is a click on the backdrop. */
  protected backdrop(e: MouseEvent) {
    if (e.target === this.box().nativeElement) this.close();
  }

  /** Photos narrower than 1280 px were only exported at 640. */
  protected hasLarge = (src: string) => src !== 'unifeb-scarf';

  private monthFormat = computed(
    () => new Intl.DateTimeFormat(this.i18n.lang() === 'tr' ? 'tr-TR' : 'en-GB', { month: 'long', year: 'numeric' }),
  );

  protected month(iso: string) {
    const [y, m] = iso.split('-').map(Number);
    return this.monthFormat().format(new Date(Date.UTC(y, m - 1, 1)));
  }
}
