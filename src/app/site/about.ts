import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { openCv } from './cv';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().about;
    <section class="about" id="about" data-scene="about" aria-labelledby="about-title">
      <div class="about__intro">
        <img class="about__photo" src="/img/profile.webp" width="320" height="320" alt="Ahmet Deniz Dündar" loading="lazy" decoding="async" />
        <h2 class="section-title" id="about-title">{{ t.title }}</h2>
      </div>
      <div class="prose">
        @for (p of t.paragraphs; track $index) {
          <p>{{ p }}</p>
        }
      </div>

      <figure class="quote">
        <blockquote>{{ t.quote }}</blockquote>
        <figcaption>{{ t.quoteBy }}</figcaption>
      </figure>

      <h3 class="sub-title">{{ t.experienceTitle }}</h3>
      <ol class="timeline">
        @for (r of t.experience; track r.title) {
          <li class="timeline__item">
            <p class="timeline__years">{{ r.years }}</p>
            <div>
              <h4 class="timeline__title">{{ r.title }}</h4>
              <p class="timeline__org">{{ r.org }}</p>
              <ul class="timeline__points">
                @for (pt of r.points; track $index) {
                  <li>{{ pt }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>

      <h3 class="sub-title">{{ t.educationTitle }}</h3>
      <ol class="timeline">
        @for (r of t.education; track r.title) {
          <li class="timeline__item">
            <p class="timeline__years">{{ r.years }}</p>
            <div>
              <h4 class="timeline__title">{{ r.title }}</h4>
              <p class="timeline__org">{{ r.org }}</p>
            </div>
          </li>
        }
      </ol>

      <h3 class="sub-title">{{ t.toolsTitle }}</h3>
      <dl class="tools">
        @for (g of t.tools; track g.group) {
          <div class="tools__row">
            <dt>{{ g.group }}</dt>
            <dd>{{ g.items.join(', ') }}</dd>
          </div>
        }
      </dl>

      <button type="button" class="button button--quiet" (click)="cv()">{{ t.cv }}</button>
    </section>
  `,
})
export class About {
  protected i18n = inject(I18n);

  protected cv() {
    openCv(this.i18n.lang());
  }
}
