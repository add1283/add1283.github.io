import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { openCv } from './cv';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().about;
    <section class="about" id="about" data-scene="about" aria-labelledby="about-title">
      <header class="section-head">
        <p class="label">{{ t.label }}</p>
        <h2 class="section-title" id="about-title">{{ t.title }}</h2>
      </header>

      <div class="about__grid">
        <div class="about__story">
          <figure class="figure">
            <img src="/img/profile.webp" width="320" height="320" alt="Ahmet Deniz Dündar" loading="lazy" decoding="async" />
            <figcaption class="label">fig. 1</figcaption>
          </figure>
          <dl class="spec">
            @for (row of t.spec; track row[0]) {
              <div class="spec__row">
                <dt class="label">{{ row[0] }}</dt>
                <dd>{{ row[1] }}</dd>
              </div>
            }
          </dl>
          <div class="prose">
            @for (p of t.paragraphs; track $index) {
              <p>{{ p }}</p>
            }
          </div>
          <figure class="quote">
            <blockquote class="serif">{{ t.quote }}</blockquote>
            <figcaption class="label">{{ t.quoteBy }}</figcaption>
          </figure>
          <button type="button" class="button button--quiet" (click)="cv()">{{ t.cv }}</button>
          <figure class="film">
            <p class="label">{{ t.film.label }}</p>
            <video class="film__video" src="/video/add-portfolio-60.mp4" poster="/video/add-portfolio-poster.webp" width="540" height="960" controls muted playsinline preload="none"></video>
            <figcaption class="film__caption serif">{{ t.film.caption }}</figcaption>
          </figure>
        </div>

        <div class="about__path">
          <h3 class="sub-title">{{ t.pathTitle }}</h3>
          <p class="path__legend label" aria-hidden="true"><span class="is-mind">mind</span> → <span class="is-code">code</span></p>
          <ol class="path">
            @for (r of t.path; track r.what) {
              <li class="path__row" [attr.data-kind]="r.kind">
                <p class="path__years label">{{ r.years }}</p>
                <div>
                  <p class="path__what" [class.serif]="r.kind === 'mind'">{{ r.what }}</p>
                  <p class="path__where">{{ r.where }}</p>
                  @if (r.url) {
                    <a class="link path__verify" [href]="r.url" target="_blank" rel="noopener">{{ t.verify }}<span class="visually-hidden">: {{ r.what }}</span></a>
                  }
                </div>
              </li>
            }
          </ol>
        </div>
      </div>

      <p class="method">
        <span class="method__mind serif">{{ t.method[0] }}</span>
        <span class="method__code">{{ t.method[1] }}</span>
      </p>
    </section>
  `,
})
export class About {
  protected i18n = inject(I18n);

  protected cv() {
    openCv(this.i18n.lang());
  }
}
