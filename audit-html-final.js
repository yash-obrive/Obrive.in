const cheerio = require('cheerio');
const http = require('http');

const urls = [
  '/services',
  '/services/augmented-reality-development',
  '/services/mixed-reality-development',
  '/services/ai-consulting',
  '/industries/real-estate',
  '/use-cases/ar-product-visualization',
  '/technology/augmented-reality',
  '/products/obpark',
  '/in/services/ai-consulting',
  '/us/services/ai-consulting',
  '/ae/services/ai-consulting'
];

async function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3333${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => reject(err));
  });
}

async function run() {
  console.log("WAITING FOR SERVER...");
  await new Promise(r => setTimeout(r, 2000));
  
  for (const path of urls) {
    console.log(`\n==================================================`);
    console.log(`URL: ${path}`);
    
    try {
      const { status, data } = await fetchUrl(path);
      console.log(`HTTP STATUS: ${status}`);
      if (status !== 200) continue;

      const $ = cheerio.load(data);
      
      const title = $('title').text();
      const desc = $('meta[name="description"]').attr('content');
      const canonical = $('link[rel="canonical"]').attr('href');
      const robots = $('meta[name="robots"]').attr('content') || 'Not specified';
      
      console.log(`TITLE: ${title}`);
      console.log(`DESCRIPTION: ${desc}`);
      console.log(`CANONICAL: ${canonical}`);
      console.log(`ROBOTS: ${robots}`);
      
      const hreflangs = [];
      let xDefault = 'None';
      $('link[rel="alternate"][hreflang]').each((_, el) => {
        const h = $(el).attr('hreflang');
        const href = $(el).attr('href');
        hreflangs.push(`${h} -> ${href}`);
        if (h === 'x-default') xDefault = href;
      });
      console.log(`HREFLANGS (${hreflangs.length}):\n  ${hreflangs.join('\n  ')}`);
      console.log(`X-DEFAULT: ${xDefault}`);
      
      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogDesc = $('meta[property="og:description"]').attr('content');
      const ogSiteName = $('meta[property="og:site_name"]').attr('content');
      const ogUrl = $('meta[property="og:url"]').attr('content');
      console.log(`OG:TITLE: ${ogTitle}`);
      console.log(`OG:SITE_NAME: ${ogSiteName}`);
      console.log(`OG:URL: ${ogUrl}`);
      
      const twCard = $('meta[name="twitter:card"]').attr('content');
      const twTitle = $('meta[name="twitter:title"]').attr('content');
      console.log(`TWITTER:CARD: ${twCard}`);
      console.log(`TWITTER:TITLE: ${twTitle}`);
      
      const h1 = $('h1').first().text().trim().replace(/\s+/g, ' ');
      console.log(`H1: ${h1}`);
      
      const jsonLds = [];
      let hasBreadcrumb = false;
      let obriveInDomainFound = false;
      let brandOrProvider = new Set();
      
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const content = $(el).html();
          if (content.includes('obrive.in') || content.includes('www.obrive.in')) {
            obriveInDomainFound = true;
          }
          const parsed = JSON.parse(content);
          
          const processSchema = (schema) => {
            if (schema['@type']) jsonLds.push(schema['@type']);
            if (schema['@type'] === 'BreadcrumbList') hasBreadcrumb = true;
            if (schema.provider && schema.provider.name) brandOrProvider.add(schema.provider.name);
            if (schema.brand && schema.brand.name) brandOrProvider.add(schema.brand.name);
          };

          if (Array.isArray(parsed)) {
            parsed.forEach(processSchema);
          } else {
            processSchema(parsed);
          }
        } catch (e) {
          // ignore parsing error
        }
      });
      
      console.log(`JSON-LD TYPES: ${jsonLds.join(', ')}`);
      console.log(`HAS BREADCRUMBS: ${hasBreadcrumb}`);
      console.log(`BRAND/PROVIDER NAMES: ${Array.from(brandOrProvider).join(', ')}`);
      console.log(`CONTAINS obrive.in IN JSON-LD?: ${obriveInDomainFound}`);
      
      const links = $('a[href]').length;
      console.log(`INTERNAL LINKS COUNT (total <a> tags): ${links}`);

    } catch (err) {
      console.error(`Error fetching ${path}:`, err.message);
    }
  }
}

run();
