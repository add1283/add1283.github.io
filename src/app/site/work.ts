import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
      <header class="section-head">
        <p class="label">{{ t.label }}</p>
        <h2 class="section-title" id="work-title">{{ t.title }}</h2>
        <p class="section-intro">{{ t.intro }}</p>
      </header>

      @for (g of groups(); track g.title; let gi = $index) {
        <section class="group" [attr.data-step]="projectIndex(g.slugs[0])" [attr.aria-labelledby]="'g-' + gi">
          <header class="group__head">
            <p class="label">{{ (gi + 1).toString().padStart(2, '0') }} / 03</p>
            <h3 class="group__title" [id]="'g-' + gi">{{ g.title }}</h3>
            <p class="group__mind serif">{{ g.mind }}</p>
          </header>
          <ol class="group__list">
            @for (p of g.projects; track p.slug; let pi = $index) {
              <li class="site" [attr.data-project]="projectIndex(p.slug)">
                <p class="site__index label"><span>{{ (gi * 3 + pi + 1).toString().padStart(2, '0') }}</span> {{ p.domain }}</p>
                <a class="phone" [href]="p.url" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
                  <img
                    [src]="'/img/phone/' + p.slug + '-330.webp'"
                    [attr.srcset]="'/img/phone/' + p.slug + '-330.webp 330w, /img/phone/' + p.slug + '-660.webp 660w'"
                    sizes="(min-width: 960px) 300px, 70vw"
                    width="660"
                    height="1431"
                    loading="lazy"
                    decoding="async"
                    alt=""
                  />
                </a>
                <h4 class="site__name">{{ p.name }}</h4>
                <p class="site__kind">{{ p.kind[lang] }}</p>
                <p class="site__summary">{{ p.summary[lang] }}</p>
                <ul class="tags">
                  @for (s of p.stack; track s) {
                    <li>{{ s }}</li>
                  }
                </ul>
                <a class="link site__link" [href]="p.url" target="_blank" rel="noopener">{{ t.open }}<span class="visually-hidden">: {{ p.name }}, {{ p.domain }}</span></a>
              </li>
            }
          </ol>
        </section>
      }

      <p class="work__next">{{ t.next }} <a class="link" routerLink="." fragment="contact">{{ t.nextLink }}</a></p>
    </section>
  `,
})
export class Work {
  protected i18n = inject(I18n);
  /** The 3D wall numbers projects in content order, from 1. */
  protected projectIndex = (slug: string) => PROJECTS.findIndex((p) => p.slug === slug) + 1;
  protected groups = computed(() =>
    this.i18n.t().work.groups.map((g) => ({ ...g, projects: g.slugs.map((s) => PROJECTS.find((p) => p.slug === s)!) })),
  );
}
