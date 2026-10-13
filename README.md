# ahmetdenizdundar.com.tr

Personal portfolio of Ahmet Deniz Dündar, frontend developer and SEO specialist in Istanbul.

The page is built around a wall of İznik tiles rendered with Three.js. The front of each tile carries a piece of a star-and-cross pattern; the back carries a piece of a project screenshot. As you scroll, the tiles turn in a wave to show each of nine live sites, scatter behind the About section, and settle back into the pattern at Contact.

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
