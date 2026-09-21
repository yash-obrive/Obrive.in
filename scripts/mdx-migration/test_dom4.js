const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  
  const secondInfo = await page.evaluate(() => {
    const next = document.body.children[1];
    if (!next) return 'No second element';
    const style = window.getComputedStyle(next);
    return {
      tagName: next.tagName,
      className: next.className,
      display: style.display,
      opacity: style.opacity,
      visibility: style.visibility,
      height: style.height,
      innerHTML: next.innerHTML.substring(0, 200)
    };
  });
  console.log('Second Element Info:', secondInfo);
  
  await browser.close();
})();
