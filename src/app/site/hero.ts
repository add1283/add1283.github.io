import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EMAIL } from '../content';
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
}
