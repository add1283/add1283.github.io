import { COPY, EMAIL, Lang, PROJECTS, SITE } from '../content';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Opens a print-ready one-page CV built from the site content. */
export function openCv(lang: Lang) {
  const t = COPY[lang];
  const a = t.about;
  const w = window.open('', '_blank');
  if (!w) {
    location.href = `mailto:${EMAIL}`;
    return;
  }

  const roles = (list: typeof a.experience) =>
    list
      .map(
        (r) => `<div class="item"><div class="row"><strong>${esc(r.title)}</strong><span>${esc(r.years)}</span></div>
        <div class="org">${esc(r.org)}</div>${r.points.length ? `<ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}</div>`,
      )
      .join('');

  const work = PROJECTS.map(
    (p) => `<div class="item"><div class="row"><strong>${esc(p.name)}</strong><span>${esc(p.domain)}</span></div>
      <p>${esc(p.summary[lang])}</p></div>`,
  ).join('');

  w.document.write(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<title>CV · Ahmet Deniz Dündar</title>
<style>
  @font-face { font-family: Plex; src: url(${location.origin}/fonts/ibm-plex-sans-latin-400-normal.woff2) format('woff2'); }
  @font-face { font-family: Plex; font-weight: 600; src: url(${location.origin}/fonts/ibm-plex-sans-latin-600-normal.woff2) format('woff2'); }
  @page { margin: 16mm; }
  body { font: 10.5pt/1.5 Plex, system-ui, sans-serif; color: #141A2E; margin: 0 auto; max-width: 720px; }
  h1 { font-size: 22pt; margin: 0; letter-spacing: -0.01em; }
  .role { color: #2346A0; margin: 2px 0 8px; font-weight: 600; }
  .contact { color: #4A5368; margin: 0 0 14px; }
  h2 { font-size: 11pt; color: #2346A0; border-bottom: 1px solid #D5DBE6; padding-bottom: 3px; margin: 18px 0 8px; }
  .item { margin-bottom: 8px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .row span, .org { color: #4A5368; }
  p { margin: 2px 0 0; }
  ul { margin: 4px 0 0; padding-left: 18px; }
</style></head><body>
<h1>Ahmet Deniz Dündar</h1>
<p class="role">${esc(t.hero.role)}</p>
<p class="contact">${EMAIL}, ${SITE.replace('https://', '')}, Istanbul</p>
<p>${esc(a.paragraphs[1])}</p>
<h2>${esc(a.experienceTitle)}</h2>${roles(a.experience)}
<h2>${esc(t.work.title)}</h2>${work}
<h2>${esc(a.educationTitle)}</h2>${roles(a.education)}
<h2>${esc(a.toolsTitle)}</h2>
${a.tools.map((g) => `<p><strong>${esc(g.group)}:</strong> ${esc(g.items.join(', '))}</p>`).join('')}
<script>document.fonts.ready.then(() => setTimeout(() => print(), 150));</script>
</body></html>`);
  w.document.close();
}
