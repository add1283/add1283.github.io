import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EMAIL, SOCIAL } from '../content';
import { I18n } from '../core/i18n';
import { environment } from '../../environments/environment';

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'missing' | 'notConfigured';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().contact;
    <section class="contact" id="contact" data-scene="contact" aria-labelledby="contact-title">
      <h2 class="section-title" id="contact-title">{{ t.title }}</h2>
      <p class="contact__lead">{{ t.lead }}</p>
      <a class="contact__email" href="mailto:{{ email }}">{{ email }}</a>

      <form class="form" (ngSubmit)="send()" novalidate>
        <h3 class="sub-title">{{ t.formTitle }}</h3>
        <div class="form__row">
          <label class="field">
            <span>{{ t.name }}</span>
            <input name="name" autocomplete="name" required [(ngModel)]="model.name" />
          </label>
          <label class="field">
            <span>{{ t.email }}</span>
            <input name="email" type="email" autocomplete="email" required [(ngModel)]="model.email" />
          </label>
        </div>
        <label class="field">
          <span>{{ t.subject }}</span>
          <input name="subject" required [(ngModel)]="model.subject" />
        </label>
        <label class="field">
          <span>{{ t.message }}</span>
          <textarea name="message" rows="5" required [(ngModel)]="model.message"></textarea>
        </label>
        <div class="form__foot">
          <button class="button" type="submit" [disabled]="status() === 'sending'">
            {{ status() === 'sending' ? t.sending : t.send }}
          </button>
          <p class="form__status" [class.is-ok]="status() === 'sent'" role="status" aria-live="polite">
            @switch (status()) {
              @case ('sent') { {{ t.sent }} }
              @case ('failed') { {{ t.failed }} }
              @case ('missing') { {{ t.missing }} }
              @case ('notConfigured') { {{ t.notConfigured }} }
            }
          </p>
        </div>
      </form>

      <h3 class="sub-title">{{ t.elsewhere }}</h3>
      <ul class="social">
        @for (s of social; track s.url) {
          <li><a class="link" [href]="s.url" target="_blank" rel="me noopener">{{ s.label }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class Contact {
  protected i18n = inject(I18n);
  protected email = EMAIL;
  protected social = SOCIAL;
  protected status = signal<Status>('idle');
  protected model = { name: '', email: '', subject: '', message: '' };

  protected async send() {
    const m = this.model;
    if (![m.name, m.email, m.subject, m.message].every((v) => v.trim()) || !/^\S+@\S+\.\S+$/.test(m.email)) {
      this.status.set('missing');
      return;
    }
    const { serviceId, templateId, publicKey } = environment.emailjs;
    if (!serviceId || !templateId || !publicKey) {
      this.status.set('notConfigured');
      return;
    }
    this.status.set('sending');
    try {
      const { send } = await import('@emailjs/browser');
      await send(
        serviceId,
        templateId,
        {
          from_name: m.name,
          from_email: m.email,
          subject: m.subject,
          message: m.message,
          to_email: EMAIL,
          reply_to: m.email,
        },
        { publicKey },
      );
      this.model = { name: '', email: '', subject: '', message: '' };
      this.status.set('sent');
    } catch {
      this.status.set('failed');
    }
  }
}
