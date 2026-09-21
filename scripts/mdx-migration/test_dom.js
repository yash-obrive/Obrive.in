const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  
  const rootInfo = await page.evaluate(() => {
    const next = document.body.firstElementChild;
    if (!next) return 'No first element';
    return {
      tagName: next.tagName,
      id: next.id,
      className: next.className,
      style: next.getAttribute('style')
    };
  });
  console.log('Root Element Info:', rootInfo);
  
  await browser.close();
})();
