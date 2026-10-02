const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed"></script>
      </head>
      <body>
        <elevenlabs-convai agent-id="agent_4201k6mkfkg0epv9wdr4hdn3fp38" variant="full"></elevenlabs-convai>
      </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 4000));

  const shadowHTML = await page.evaluate(() => {
    const el = document.querySelector('elevenlabs-convai');
    return el && el.shadowRoot ? el.shadowRoot.innerHTML : null;
  });

  console.log("SHADOW DOM START");
  console.log(shadowHTML);
  console.log("SHADOW DOM END");
  await browser.close();
})();
