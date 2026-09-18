const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3001/servicecharges', { waitUntil: 'networkidle0' });
  
  const innerHTML = await page.evaluate(() => {
    const next = document.body.firstElementChild;
    return next ? next.innerHTML.substring(0, 500) : 'No next';
  });
  console.log('Root HTML snippet for servicecharges:', innerHTML);
  
  await browser.close();
})();
