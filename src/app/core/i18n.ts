import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { COPY, CREDENTIALS, EMAIL, Lang, PROJECTS, SITE, SOCIAL } from '../content';

/** Current language, its copy, and everything in <head> that depends on it. */
@Injectable({ providedIn: 'root' })
export class I18n {
  private doc = inject(DOCUMENT);
  private title = inject(Title);
  private meta = inject(Meta);

  readonly lang = signal<Lang>('tr');
  readonly t = computed(() => COPY[this.lang()]);
  /** Home page of the other language, for the language switch. */
  readonly otherHome = computed(() => (this.lang() === 'en' ? '/' : '/en/'));

  use(lang: Lang) {
    this.lang.set(lang);
    const t = COPY[lang];
    const url = lang === 'en' ? `${SITE}/en/` : `${SITE}/`;

    this.doc.documentElement.lang = lang;
    this.title.setTitle(t.meta.title);
    this.meta.updateTag({ name: 'description', content: t.meta.description });
    this.meta.updateTag({ property: 'og:title', content: t.meta.title });
    this.meta.updateTag({ property: 'og:description', content: t.meta.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: t.meta.locale });
    this.meta.updateTag({ name: 'twitter:title', content: t.meta.title });
    this.meta.updateTag({ name: 'twitter:description', content: t.meta.description });

    this.link('canonical', url);
    this.link('alternate', `${SITE}/`, 'tr');
    this.link('alternate', `${SITE}/en/`, 'en');
    this.link('alternate', `${SITE}/`, 'x-default');
    this.jsonLd(lang, url);
  }

  private link(rel: string, href: string, hreflang?: string) {
    const head = this.doc.head;
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
    let el = head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      if (hreflang) el.hreflang = hreflang;
      head.appendChild(el);
    }
    el.href = href;
  }

  private jsonLd(lang: Lang, url: string) {
    const t = COPY[lang];
    const person = {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Ahmet Deniz Dündar',
      url,
      email: `mailto:${EMAIL}`,
      image: `${SITE}/img/profile.webp`,
      jobTitle: t.hero.role,
      worksFor: { '@type': 'Organization', name: 'VBT', url: 'https://vbt.com.tr' },
      address: { '@type': 'PostalAddress', addressLocality: 'Istanbul', addressCountry: 'TR' },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Çukurova Üniversitesi' },
        { '@type': 'CollegeOrUniversity', name: 'Anadolu Üniversitesi' },
      ],
      knowsLanguage: ['tr', 'en'],
      hasCredential: CREDENTIALS.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.title[lang],
        credentialCategory: 'certificate',
        dateCreated: c.date,
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        ...(c.url ? { url: c.url } : {}),
      })),
      knowsAbout: ['Frontend development', 'Search engine optimization', 'Angular', 'Three.js', 'Web performance', 'Data analysis', 'Machine learning'],
      sameAs: SOCIAL.map((s) => s.url),
      subjectOf: PROJECTS.map((p) => ({ '@type': 'WebSite', name: p.name, url: p.url })),
    };
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url,
      name: t.meta.title,
      inLanguage: lang,
      dateModified: '2026-10-14',
      mainEntity: person,
    };
    let el = this.doc.head.querySelector<HTMLScriptElement>('script#ld-person');
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'ld-person';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }
}
