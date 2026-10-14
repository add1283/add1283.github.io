# ahmetdenizdundar.com.tr

Personal portfolio of Ahmet Deniz Dündar, frontend developer and SEO specialist in Istanbul.

The design follows the portfolio film: a technical blueprint in graphite, warm off-white, steel and one electric blue, set in IBM Plex Sans and Mono with Instrument Serif for the psychology voice. The hero sets the two disciplines on one blue line (Psychology × Software); the ADD mark (the initials on the blue signal rule, ending in a node) signs the header and the footer.

In 3D view a wall of blueprint tiles is rendered with Three.js. The front of each tile carries a piece of a technical sheet (grid, registration crosses, the signal line); the back carries a piece of a project screenshot. Scrolling turns the wall to each group of projects, and pointing at or focusing a site turns it to that site; behind the work grid the wall fades into the page. Plain view shows the mark's construction sheet instead.

## Stack

- Angular 20, prerendered to static HTML for `/` (Turkish) and `/en/` (English)
- Three.js, loaded lazily in the browser only; one instanced mesh and a custom shader
- Plain CSS with design tokens; Bricolage Grotesque and IBM Plex Sans, self-hosted
- EmailJS for the contact form, loaded only when someone sends a message
- GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`

## Views

- **3D view** is the default on devices with hardware WebGL.
- **Plain view** shows the same content with screenshots inline. It is used automatically when the visitor prefers reduced motion, when WebGL is missing, or when the browser only has a software renderer. Visitors can switch either way from the header; the choice is remembered.
- Add `?3d=force` to the URL to skip the hardware check while testing.

## Develop

```bash
npm ci
npm start          # http://localhost:4200
npm run build      # static output in dist/add1283.github.io/browser
```

## Content

All copy, projects and links live in `src/app/content.ts`, in both languages. Project screenshots are in `public/img/work/` as `{slug}-800.webp` and `{slug}-1600.webp`, 16:10.

## Contact form

The deploy workflow writes `src/environments/environment.prod.ts` from three repository secrets: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` and `EMAILJS_PUBLIC_KEY`. Without them the form tells visitors to email directly.
