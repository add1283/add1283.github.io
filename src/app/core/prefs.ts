import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type View = '3d' | 'plain';

/**
 * Theme and view live on <html data-theme / data-view>. An inline script in
 * index.html sets them before first paint; this service reads and changes them.
 */
@Injectable({ providedIn: 'root' })
export class Prefs {
  private doc = inject(DOCUMENT);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>('light');
  readonly view = signal<View>('3d');

  constructor() {
    if (!this.browser) return;
    const html = this.doc.documentElement;
    this.theme.set(html.dataset['theme'] === 'dark' ? 'dark' : 'light');
    this.view.set(html.dataset['view'] === 'plain' ? 'plain' : '3d');
  }

  toggleTheme() {
    this.set('theme', this.theme() === 'dark' ? 'light' : 'dark');
  }

  toggleView() {
    this.set('view', this.view() === '3d' ? 'plain' : '3d');
  }

  /** WebGL can fail at runtime; fall back without remembering the choice. */
  forcePlain() {
    this.view.set('plain');
    this.doc.documentElement.dataset['view'] = 'plain';
  }

  private set(key: 'theme' | 'view', value: string) {
    (key === 'theme' ? this.theme : this.view).set(value as never);
    this.doc.documentElement.dataset[key] = value;
    try {
      localStorage.setItem(`add-${key}`, value);
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
  }
}
