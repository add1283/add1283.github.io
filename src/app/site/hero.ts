import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CREDENTIALS, EMAIL } from '../content';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().hero;
    <section class="hero" id="top" data-scene="hero" aria-labelledby="hero-title">
      <div class="labels" aria-hidden="true">
        <span>ahmetdenizdundar.com.tr</span>
        <span>{{ t.kicker }}</span>
      </div>

      <div class="hero__copy">
        <!-- The two disciplines meet on one blue line, as in the film's first seconds. -->
        <p class="hook">
          <span class="hook__mind">{{ t.mind }}</span>
          <span class="visually-hidden"> × </span>
          <span class="hook__line" aria-hidden="true"><span class="hook__x">×</span></span>
          <span class="hook__code">{{ t.code }}</span>
        </p>
        <p class="hero__tagline">{{ t.tagline }}</p>

        <h1 class="hero__name" id="hero-title">Ahmet Deniz Dündar</h1>
        <p class="hero__role">
          <span class="serif">{{ t.grad }}</span>
          <span>{{ t.role }}.</span>
        </p>
        <p class="hero__lead">{{ t.lead }}</p>
        <p class="hero__now label">{{ t.now }}</p>
        <p class="hero__cred">
          <span class="hero__node" aria-hidden="true"></span>
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

      <!-- Plain view: the mark's construction sheet. 3D view: the tile wall takes this place. -->
      <figure class="sheet only-plain" aria-hidden="true">
        <span class="sheet__label">mark / sheet 01</span>
        <span class="sheet__spec">IBM Plex Sans 600 / #4A7DFF</span>
        <span class="sheet__word">
          <i class="sheet__cap"><span>cap</span></i>
          <i class="sheet__base"><span>base</span></i>
          <i class="sheet__dim"><span>A · D · D</span></i>
          <span data-n="ahmet">A</span><span data-n="deniz">D</span><span data-n="dündar">D</span>
          <i class="sheet__rule"><i class="mark__node"></i></i>
        </span>
      </figure>

      <p class="hero__hint only-3d" aria-hidden="true"><span class="hero__hint-line"></span>{{ t.scroll }}</p>
    </section>
  `,
})
export class Hero {
  protected i18n = inject(I18n);
  protected email = EMAIL;
  /** The YÖK AI and machine learning certificate, featured above the fold. */
  protected featured = CREDENTIALS[0];
}
