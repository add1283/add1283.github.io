import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CREDENTIALS } from '../content';
import { I18n } from '../core/i18n';
import { openCv } from './cv';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().about;
    <section class="about" id="about" data-scene="about" aria-labelledby="about-title">
      <div class="about__story">
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

      <button type="button" class="button button--quiet" (click)="cv()">{{ t.cv }}</button>
      </div>

      <div class="about__record">
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

      <h3 class="sub-title">{{ t.credentialsTitle }}</h3>
      <ol class="timeline">
        @for (c of credentials; track c.url ?? c.date) {
          <li class="timeline__item">
            <p class="timeline__years"><time [attr.datetime]="c.date">{{ month(c.date) }}</time></p>
            <div>
              <h4 class="timeline__title">{{ c.title[i18n.lang()] }}</h4>
              <p class="timeline__org">{{ c.issuer }}</p>
              @if (c.url) {
                <a class="link timeline__verify" [href]="c.url" target="_blank" rel="noopener">{{ t.verify }}<span class="visually-hidden">: {{ c.title[i18n.lang()] }}</span></a>
              }
            </div>
          </li>
        }
      </ol>

      <h3 class="sub-title">{{ t.languagesTitle }}</h3>
      <dl class="tools">
        @for (l of t.languages; track l.name) {
          <div class="tools__row">
            <dt>{{ l.name }}</dt>
            <dd>{{ l.level }}</dd>
          </div>
        }
      </dl>

      <h3 class="sub-title">{{ t.toolsTitle }}</h3>
      <dl class="tools">
        @for (g of t.tools; track g.group) {
          <div class="tools__row">
            <dt>{{ g.group }}</dt>
            <dd>{{ g.items.join(', ') }}</dd>
          </div>
        }
      </dl>
      </div>
    </section>
  `,
})
export class About {
  protected i18n = inject(I18n);
  protected credentials = CREDENTIALS;

  protected month(iso: string) {
    const [y, m] = iso.split('-').map(Number);
    return new Intl.DateTimeFormat(this.i18n.lang() === 'tr' ? 'tr-TR' : 'en-GB', { month: 'long', year: 'numeric' }).format(
      new Date(Date.UTC(y, m - 1, 1)),
    );
  }

  protected cv() {
    openCv(this.i18n.lang());
  }
}
