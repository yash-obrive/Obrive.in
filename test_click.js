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
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

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

  console.log("Attempting to click Call button...");
  await page.evaluate(() => {
    const widget = document.querySelector('elevenlabs-convai');
    if (!widget || !widget.shadowRoot) {
      console.log("No widget or shadow root found.");
      return;
    }
    const callBtn = widget.shadowRoot.querySelector('button[aria-label="Call"]');
    if (callBtn) {
      console.log("Found Call button. Clicking...");
      callBtn.click();
    } else {
      console.log("Call button not found.");
    }
  });

  await new Promise(r => setTimeout(r, 3000));
  console.log("Done waiting after click.");
  
  await browser.close();
})();
