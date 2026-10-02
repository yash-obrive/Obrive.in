const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed"></script>
      </head>
      <body>
        <elevenlabs-convai></elevenlabs-convai>
      </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 2000));
  
  const attrs = await page.evaluate(() => {
    const el = document.querySelector('elevenlabs-convai');
    // Get all defined properties on the element's prototype
    const props = [];
    let obj = el;
    while (obj) {
      props.push(...Object.getOwnPropertyNames(obj));
      obj = Object.getPrototypeOf(obj);
    }
    return props.filter(p => !p.startsWith('on') && p !== 'constructor');
  });

  console.log(attrs.join(', '));
  await browser.close();
})();
