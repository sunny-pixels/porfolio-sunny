// Captures the landing view of every showcased project into public/projects.
// Usage: node scripts/capture-screenshots.mjs [slug ...]
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/projects");

const SITES = [
  { slug: "maliha", url: "https://maliha-designs.vercel.app/" },
  { slug: "kk-jewels", url: "https://kk-jewels.vercel.app/" },
  { slug: "almirah", url: "https://almirah-gallery.vercel.app/" },
  { slug: "blitz", url: "https://blitzinfocom.com/" },
  { slug: "onyx", url: "https://onyxllc-ebon.vercel.app/" },
  { slug: "dev-tours", url: "https://dev-tours-and-travels.vercel.app/" },
  { slug: "rahul-impex", url: "https://rahul-impex.vercel.app/" },
  { slug: "shipdoc", url: "https://ultra-doc-theta.vercel.app/" },
  { slug: "sla-monitor", url: "https://sla-monitoring-dashboard-web.vercel.app/" },
  { slug: "career-lens", url: "https://job-search-seven-rose.vercel.app/" },
];

const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const site of SITES.filter((s) => !only.length || only.includes(s.slug))) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
    // Let loaders and hero intros finish.
    await page.waitForTimeout(6000);
    const png = await page.screenshot({ type: "png" });
    await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT, `${site.slug}.webp`));
    console.log("ok  ", site.slug);
  } catch (err) {
    console.log("FAIL", site.slug, err.message.split("\n")[0]);
  } finally {
    await page.close();
  }
}

await browser.close();
