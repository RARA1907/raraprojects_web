/**
 * Playwright screenshot script — 34 portfolio site
 * Çalıştırma: node scripts/take-screenshots.js
 *
 * Gereksinim: npx playwright install chromium
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "../public/screenshots");

const sites = [
  // CF Pages
  { url: "alizetemizlik.com.tr" },
  { url: "ar-tes.com.tr" },
  { url: "nuhungemisi-vet.com.tr" },
  { url: "madebyyaso.com" },
  // Hostinger
  { url: "ceyajans.com" },
  { url: "cinnamomo.com" },
  { url: "comimarlik.com" },
  { url: "corpfit.org" },
  { url: "dagprefabrik.com" },
  { url: "efcpartners.com" },
  { url: "efoagac.com.tr" },
  { url: "esconconstruction.com" },
  { url: "esdo.org.tr" },
  { url: "ethosassoc.com" },
  { url: "fatihserdaroglu.com" },
  { url: "filmbahcesi.com" },
  { url: "hairpigmentations.com" },
  { url: "indigolounge.co" },
  { url: "kmseskisehir.com.tr" },
  { url: "kormas.com" },
  { url: "kuzeyliinsaat.com" },
  { url: "masterfresh.com.tr" },
  { url: "minorybaby.com" },
  { url: "muzipo.com" },
  { url: "topcampusa.com" },
  { url: "tursamholding.com" },
  // External
  { url: "kappa.net.tr" },
  { url: "billas.com.tr" },
  { url: "ovakent.com.tr" },
  { url: "olimpa.com.tr" },
  { url: "basaktraktor.com.tr" },
  { url: "645kk.com" },
  { url: "645dukkan.com" },
  { url: "nitenite.com.tr" },
];

function filename(url) {
  return url.replace(/\./g, "-") + ".jpg";
}

async function screenshot(page, url) {
  const outPath = path.join(OUTPUT_DIR, filename(url));

  // Skip if already exists
  if (fs.existsSync(outPath)) {
    console.log(`  ⏭  skip (exists): ${url}`);
    return;
  }

  try {
    await page.goto(`https://${url}`, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });

    // Wait for visual settle — dismiss cookie banners if any
    await page.waitForTimeout(2000);

    // Try to close cookie consent
    for (const sel of [
      'button:has-text("Kabul")',
      'button:has-text("Accept")',
      'button:has-text("OK")',
      '[id*="cookie"] button',
      '[class*="cookie"] button',
    ]) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 500 })) {
          await btn.click();
          await page.waitForTimeout(400);
          break;
        }
      } catch {}
    }

    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 82,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });

    console.log(`  ✅ ${url}`);
  } catch (err) {
    console.log(`  ❌ ${url} — ${err.message.split("\n")[0]}`);
  }
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "tr-TR",
  });
  const page = await context.newPage();

  console.log(`\n📸 ${sites.length} site — screenshots başlıyor...\n`);

  for (const site of sites) {
    await screenshot(page, site.url);
  }

  await browser.close();
  console.log(`\n✅ Tamamlandı! → public/screenshots/\n`);
})();
