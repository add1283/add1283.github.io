import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().footer;
    <footer class="foot">
      <p>© {{ year }} Ahmet Deniz Dündar. {{ t.made }}</p>
      <a class="link" routerLink="." fragment="top">{{ t.top }}</a>
    </footer>
  `,
})
export class Footer {
  protected i18n = inject(I18n);
  protected year = new Date().getFullYear();
}
