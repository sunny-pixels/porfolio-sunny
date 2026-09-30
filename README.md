# Sunny Prajapati — Portfolio

Single-page portfolio built on the "Release Notes" concept: hero as a version banner, then README, releases, deployments, systems, changelog, manifest, and a terminal-style contact section.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint

node scripts/capture-screenshots.mjs [slug ...]      # re-capture project screenshots into public/projects
node scripts/qa-screens.mjs <outDir> 1440,390 [--reduce]  # scroll-through screenshots + console/overflow report
```

## Where things live

- `lib/content.ts` — all copy, projects, experience, skills (typed)
- `lib/images.ts` — every image with alt text and focal point
- `app/globals.css` — "Dusk" colour tokens and the type scale (`t-hero`, `t-section`, `t-micro`, …)
- `lib/animations/*` — motion recipes; components call these inside `useGSAP` + `gsap.matchMedia()`

## Placeholders to confirm

Search for `TODO: placeholder`:

- Exact stack for Maliha, KK Jewels, Rahul Impex and SLA Monitor
## Link previews (WhatsApp, LinkedIn, X)

- Share image: `app/opengraph-image.jpg` (1200×630, ~60 KB; WhatsApp ignores images over ~300 KB), alt text in `opengraph-image.alt.txt`
- On Vercel the absolute URL comes from `VERCEL_PROJECT_PRODUCTION_URL` automatically. On a custom domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain`.
