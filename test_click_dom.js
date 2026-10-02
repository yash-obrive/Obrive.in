const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream'
    ] 
  });
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

  await page.evaluate(() => {
    const widget = document.querySelector('elevenlabs-convai');
    const callBtn = widget.shadowRoot.querySelector('button[aria-label="Call"]');
    if (callBtn) callBtn.click();
  });

  await new Promise(r => setTimeout(r, 2000));
  
  const shadowHTML = await page.evaluate(() => {
    const el = document.querySelector('elevenlabs-convai');
    return el && el.shadowRoot ? el.shadowRoot.innerHTML : null;
  });

  console.log("SHADOW DOM AFTER CLICK:");
  console.log(shadowHTML);
  await browser.close();
})();
