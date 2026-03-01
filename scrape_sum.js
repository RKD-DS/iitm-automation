const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const seeds = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
  let totalSum = 0;

  for (const seed of seeds) {
    await page.goto(`https://sanand0.github.io/tdsdata/table/${seed}.html`);
    
    // Scrape all table data cells
    const values = await page.$$eval('td', cells => 
      cells.map(cell => {
        const text = cell.innerText.trim();
        return parseFloat(text);
      }).filter(num => !isNaN(num))
    );
    
    totalSum += values.reduce((a, b) => a + b, 0);
  }

  // THIS LINE IS CRITICAL - DO NOT CHANGE THE PREFIX
  console.log(`FINAL_TOTAL_SUM: ${totalSum}`);
  
  await browser.close();
})();
