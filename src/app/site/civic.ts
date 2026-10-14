import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
              @if (item.link) {
                <a class="link org__link" [href]="item.link.url" target="_blank" rel="noopener">{{ item.link.label }}<span class="visually-hidden">: {{ item.org }}</span></a>
              }
            </div>
            @if (item.photos?.length) {
              <div class="org__photos">
                @for (ph of item.photos; track ph.src; let pi = $index) {
                  <figure class="photo">
                    <img
                      [src]="'/img/civic/' + ph.src + '-640.webp'"
                      [attr.srcset]="'/img/civic/' + ph.src + '-640.webp 640w' + (hasLarge(ph.src) ? ', /img/civic/' + ph.src + '-1280.webp 1280w' : '')"
                      sizes="(min-width: 960px) 30vw, 80vw"
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
                      [alt]="ph.alt"
                    />
                    <figcaption class="label">fig. {{ i + 2 }}.{{ pi + 1 }}</figcaption>
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
    </section>
  `,
})
export class Civic {
  protected i18n = inject(I18n);

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
