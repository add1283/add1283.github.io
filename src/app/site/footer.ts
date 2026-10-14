import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { Mark } from './mark';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Mark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().footer;
    <footer class="foot">
      <app-mark [large]="true" />
      <p class="foot__url">ahmetdenizdundar.com.tr</p>
      <div class="foot__row label">
        <p>© {{ year }} Ahmet Deniz Dündar. {{ t.made }}</p>
        <a class="link" routerLink="." fragment="top">{{ t.top }}</a>
      </div>
    </footer>
  `,
})
export class Footer {
  protected i18n = inject(I18n);
  protected year = new Date().getFullYear();
}
