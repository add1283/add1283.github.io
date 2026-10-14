import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lang } from '../content';
import { I18n } from '../core/i18n';
import { About } from './about';
import { Contact } from './contact';
import { Footer } from './footer';
import { Header } from './header';
import { Hero } from './hero';
import { SceneCanvas } from './scene-canvas';
import { Systems } from './systems';
import { Work } from './work';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Work, Systems, About, Contact, Footer, SceneCanvas],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-scene-canvas />
    <app-header />
    <main id="main" class="page" tabindex="-1">
      <app-hero />
      <app-work />
      <app-systems />
      <app-about />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class Home {
  constructor() {
    const lang = inject(ActivatedRoute).snapshot.data['lang'] as Lang;
    inject(I18n).use(lang);
  }
}
