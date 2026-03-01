const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const seeds = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
  let totalSum = 0;

  for (const seed of seeds) {
    await page.goto(`https://sanand0.github.io/tdsdata/table/${seed}.html`);
    
    // Extract all text from table cells, convert to numbers, and sum
    const values = await page.$$eval('td', cells => 
      cells.map(cell => parseFloat(cell.innerText)).filter(num => !isNaN(num))
    );
    
    const pageSum = values.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log(`FINAL_TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
