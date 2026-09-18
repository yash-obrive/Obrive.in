const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  console.log('Navigating to http://localhost:3001/');
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  
  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  console.log('Body length:', bodyHtml.length);
  
  await browser.close();
})();
