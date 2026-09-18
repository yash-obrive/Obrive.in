const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: 'screenshot.png' });
  
  const bodyStyles = await page.evaluate(() => {
    const style = window.getComputedStyle(document.body);
    return { display: style.display, opacity: style.opacity, visibility: style.visibility };
  });
  console.log('Body styles:', bodyStyles);
  
  const nextStyles = await page.evaluate(() => {
    const next = document.getElementById('__next') || document.body.firstElementChild;
    if (!next) return 'No first element';
    const style = window.getComputedStyle(next);
    return { display: style.display, opacity: style.opacity, visibility: style.visibility, height: style.height };
  });
  console.log('Root styles:', nextStyles);
  
  await browser.close();
})();
