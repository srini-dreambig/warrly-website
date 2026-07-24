import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const out = path.resolve("tmp-deck-shots");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
await page.goto("http://localhost:5173/investors", { waitUntil: "networkidle" });
await page.waitForSelector(".ppt-slide");

const totalText = await page.locator(".deck-meta span").first().textContent();
const total = parseInt(totalText.split("/")[1].trim(), 10);
console.log("total", total);

for (let i = 0; i < total; i++) {
  await page.waitForTimeout(200);
  const title = ((await page.locator(".ppt-title").first().textContent()) || "slide").trim();
  const file = path.join(out, `${String(i + 1).padStart(2, "0")}.png`);
  await page.locator(".ppt-frame").screenshot({ path: file });
  console.log(i + 1, title.slice(0, 70));
  if (i < total - 1) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(250);
  }
}

await browser.close();
console.log("done");
