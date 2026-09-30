// Visual QA: scrolls the running site at several widths and captures
// viewport screenshots at intervals, plus console errors and overflow.
// Usage: node scripts/qa-screens.mjs <outDir> [widths] [--reduce]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = process.argv[2] ?? "qa";
const widths = (process.argv[3] ?? "1440,390").split(",").map(Number);
const reduce = process.argv.includes("--reduce");
const URL = process.env.QA_URL ?? "http://localhost:3000/";
const HEIGHTS = { 1920: 1080, 1440: 900, 1024: 768, 768: 1024, 390: 844, 360: 740 };

await mkdir(out, { recursive: true });
const browser = await chromium.launch();

for (const w of widths) {
  const h = HEIGHTS[w] ?? 900;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    reducedMotion: reduce ? "reduce" : "no-preference",
    hasTouch: w < 800,
    isMobile: w < 800,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(4200);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  let i = 0;
  for (let y = 0; y < total; y += Math.round(h * 0.85)) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.mouse.wheel(0, 1);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: path.join(out, `${w}-${String(i++).padStart(2, "0")}.png`) });
  }
  console.log(`${w}px  height=${total}  overflowX=${overflow}  shots=${i}`);
  errors.forEach((e) => console.log("  console:", e.slice(0, 200)));
  await ctx.close();
}
await browser.close();
