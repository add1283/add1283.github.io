import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-systems',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().systems;
    @let a = i18n.t().about;
    <section class="systems" id="systems" data-scene="systems" aria-labelledby="systems-title">
      <header class="section-head">
        <p class="label">{{ t.label }}</p>
        <h2 class="section-title" id="systems-title">{{ t.title }}</h2>
      </header>
      <div class="systems__grid">
        @for (c of t.columns; track c.head; let i = $index) {
          <section class="discipline" [attr.aria-labelledby]="'d-' + i">
            <h3 class="discipline__head" [id]="'d-' + i"><span class="label">{{ (i + 1).toString().padStart(2, '0') }}</span>{{ c.head }}</h3>
            <ul class="discipline__list">
              @for (item of c.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </section>
        }
      </div>
      <div class="foundation">
        <p class="foundation__line serif">{{ t.foundation }}</p>
        <p class="foundation__note">{{ t.foundationNote }}</p>
        <p class="label">
          {{ a.languagesTitle.toLowerCase() }} /
          @for (l of a.languages; track l.name; let last = $last) {
            {{ l.name }}, {{ l.level.toLowerCase() }}@if (!last) { / }
          }
        </p>
      </div>
    </section>
  `,
})
export class Systems {
  protected i18n = inject(I18n);
}
