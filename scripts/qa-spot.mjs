// Spot-check: top of page, then each selector, then the very end.
// Usage: node scripts/qa-spot.mjs <outPrefix> <width> <height> [selector ...]
import { chromium } from "playwright";

const [out, w, h, ...sels] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
page.on("console", (m) => ["error", "warning"].includes(m.type()) && errors.push(m.text()));
await page.goto(process.env.QA_URL ?? "http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(4500);
await page.screenshot({ path: `${out}-top.png` });
for (const s of sels) {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 60);
  }, s);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}-${s.replace(/[^a-z0-9]/gi, "")}.png` });
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);
await page.screenshot({ path: `${out}-end.png` });
console.log(errors.join("\n") || "no console errors");
await browser.close();
