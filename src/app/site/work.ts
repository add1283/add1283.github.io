import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../content';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-work',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().work;
    @let lang = i18n.lang();
    <section class="work" id="work" aria-labelledby="work-title">
      <header class="work__head">
        <h2 class="section-title" id="work-title">{{ t.title }}</h2>
        <p class="work__intro">{{ t.intro }}</p>
      </header>

      <ol class="work__list">
        @for (p of projects; track p.slug; let i = $index) {
          <li class="step" data-step>
            <article class="step__body" [attr.aria-labelledby]="'p-' + p.slug">
              <p class="step__count" aria-hidden="true">{{ t.count(i + 1, projects.length) }}</p>
              <h3 class="step__name" [id]="'p-' + p.slug">{{ p.name }}</h3>
              <p class="step__kind">{{ p.kind[lang] }}</p>
              <p class="step__summary">{{ p.summary[lang] }}</p>
              <ul class="tags">
                @for (s of p.stack; track s) {
                  <li>{{ s }}</li>
                }
              </ul>
              <a class="link step__link" [href]="p.url" target="_blank" rel="noopener">
                {{ t.open }}<span class="visually-hidden">: {{ p.domain }}</span>
                <span class="step__domain" aria-hidden="true">{{ p.domain }}</span>
              </a>
            </article>
            <img
              class="step__shot"
              [src]="'/img/work/' + p.slug + '-800.webp'"
              [attr.srcset]="'/img/work/' + p.slug + '-800.webp 800w, /img/work/' + p.slug + '-1600.webp 1600w'"
              sizes="(min-width: 960px) 50vw, 100vw"
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
              [alt]="p.name + ', ' + p.domain"
            />
          </li>
        }
      </ol>

      <p class="work__next">{{ t.next }} <a class="link" routerLink="." fragment="contact">{{ t.nextLink }}</a></p>
    </section>
  `,
})
export class Work {
  protected i18n = inject(I18n);
  protected projects = PROJECTS;
}
