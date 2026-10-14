import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { Prefs } from '../core/prefs';
import { Mark } from './mark';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Mark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <a class="skip" routerLink="." fragment="main" (click)="skip()">{{ t.nav.skip }}</a>
    <header class="bar" (keydown.escape)="open.set(false)">
      <a class="bar__brand" routerLink="." fragment="top" aria-label="Ahmet Deniz Dündar">
        <app-mark />
        <span class="bar__name" aria-hidden="true">Ahmet Deniz Dündar</span>
      </a>

      <nav class="bar__nav" [class.is-open]="open()" [attr.aria-label]="t.nav.menu">
        <a routerLink="." fragment="work" (click)="open.set(false)"><span aria-hidden="true">01</span>{{ t.nav.work }}</a>
        <a routerLink="." fragment="systems" (click)="open.set(false)"><span aria-hidden="true">02</span>{{ t.nav.systems }}</a>
        <a routerLink="." fragment="civic" (click)="open.set(false)"><span aria-hidden="true">03</span>{{ t.nav.civic }}</a>
        <a routerLink="." fragment="about" (click)="open.set(false)"><span aria-hidden="true">04</span>{{ t.nav.about }}</a>
        <a routerLink="." fragment="contact" (click)="open.set(false)"><span aria-hidden="true">05</span>{{ t.nav.contact }}</a>
      </nav>

      <div class="bar__tools">
        <button type="button" class="tool" (click)="prefs.toggleTheme()" [attr.aria-label]="t.toggles.theme" [attr.title]="t.toggles.theme">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            @if (prefs.theme() === 'dark') {
              <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            } @else {
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
            }
          </svg>
        </button>
        <a class="tool tool--text" [href]="i18n.otherHome()" [attr.hreflang]="t.toggles.lang.toLowerCase()" [attr.aria-label]="t.toggles.langLabel">{{ t.toggles.lang }}</a>
        <button type="button" class="tool bar__menu" (click)="open.set(!open())" [attr.aria-expanded]="open()" [attr.aria-label]="t.nav.menu">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path [attr.d]="open() ? 'M6 6l12 12M18 6L6 18' : 'M4 9h16M4 15h16'" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </header>
  `,
})
export class Header {
  protected i18n = inject(I18n);
  protected prefs = inject(Prefs);
  protected open = signal(false);

  /** Move keyboard focus past the header, not just the scroll position. */
  protected skip() {
    document.getElementById('main')?.focus({ preventScroll: true });
  }
}
