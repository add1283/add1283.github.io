import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

/**
 * The theme lives on <html data-theme>. An inline script in index.html sets it
 * before first paint; this service reads and changes it.
 */
@Injectable({ providedIn: 'root' })
export class Prefs {
  private doc = inject(DOCUMENT);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>('light');

  constructor() {
    if (!this.browser) return;
    this.theme.set(this.doc.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light');
  }

  toggleTheme() {
    const value: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(value);
    this.doc.documentElement.dataset['theme'] = value;
    try {
      localStorage.setItem('add-theme', value);
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
  }
}
