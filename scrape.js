const { chromium } = require('playwright');

const seeds = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
const BASE = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    await page.goto(BASE + seed);
    await page.waitForSelector('table');

    const sum = await page.evaluate(() => {
      let total = 0;
      document.querySelectorAll('td, th').forEach(cell => {
        const val = parseFloat(cell.innerText.trim());
        if (!isNaN(val)) total += val;
      });
      return total;
    });

    console.log(`Seed ${seed}: ${sum}`);
    grandTotal += sum;
  }

  await browser.close();
  console.log(`Total: ${grandTotal}`);
})();
