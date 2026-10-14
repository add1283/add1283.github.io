import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The ADD wordmark: the initials set in IBM Plex Sans, on the blue signal rule
 * that ends in a node. The same mark closes the portfolio film.
 */
@Component({
  selector: 'app-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mark', '[class.mark--large]': 'large()' },
  template: `<span class="mark__word">ADD</span><span class="mark__rule" aria-hidden="true"><span class="mark__node"></span></span>`,
})
export class Mark {
  readonly large = input(false);
}
