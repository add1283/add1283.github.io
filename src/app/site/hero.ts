import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CREDENTIALS, EMAIL } from '../content';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().hero;
    <section class="hero" id="top" data-scene="hero" aria-labelledby="hero-title">
      <div class="hero__copy">
        <h1 class="hero__name" id="hero-title">
          <span>Ahmet Deniz</span>
          <span>Dündar</span>
        </h1>
        <p class="hero__role">{{ t.role }}</p>
        <p class="hero__lead">{{ t.lead }}</p>
        <p class="hero__now">{{ t.now }}</p>
        <p class="hero__cred">
          <svg class="hero__star" viewBox="-10 -10 20 20" width="18" height="18" aria-hidden="true">
            <rect x="-6.5" y="-6.5" width="13" height="13" />
            <rect x="-6.5" y="-6.5" width="13" height="13" transform="rotate(45)" />
            <circle r="2.6" class="hero__star-core" />
          </svg>
          <span>
            {{ t.credential }}
            <a class="link hero__verify" [href]="featured.url" target="_blank" rel="noopener">{{ t.verify }}<span class="visually-hidden">: {{ t.credential }}</span></a>
          </span>
        </p>
        <div class="hero__actions">
          <a class="button" routerLink="." fragment="work">{{ t.primary }}</a>
          <a class="link" href="mailto:{{ email }}">{{ t.secondary }}</a>
        </div>
      </div>
      <p class="hero__hint only-3d" aria-hidden="true">
        <span class="hero__hint-line"></span>{{ t.scroll }}
      </p>
    </section>
  `,
})
export class Hero {
  protected i18n = inject(I18n);
  protected email = EMAIL;
  /** The YÖK AI and machine learning certificate, featured above the fold. */
  protected featured = CREDENTIALS[0];
}
