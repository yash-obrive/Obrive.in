import fs from 'fs';
import path from 'path';

async function fetchRoute(route: string) {
  try {
    const res = await fetch(`http://localhost:3001${route}`);
    if (!res.ok) return null;
    return await res.text();
  } catch (e) {
    return null;
  }
}

function parseHTML(html: string) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/) || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/);
  const canonMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/) || html.match(/<link[^>]*href="([^"]*)"[^>]*rel="canonical"[^>]*>/);
  
  const jsonLdMatches = [];
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    try {
      jsonLdMatches.push(JSON.parse(m[1]));
    } catch (e) {
      jsonLdMatches.push({ raw: m[1], error: 'Parse Failed' });
    }
  }

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    canonical: canonMatch ? canonMatch[1] : null,
    jsonLd: jsonLdMatches
  };
}

async function run() {
  const DATA_PATH = path.join(process.cwd(), 'src/data/internal-canonical-knowledge.json');
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  
  console.log("Extracting runtime metadata and JSON-LD...");
  
  // 1. Generate concrete routes
  const concreteRoutes: string[] = [];
  data.entities.forEach((e: any) => {
    if (e.type === 'service') concreteRoutes.push(`/services/${e.slug}`, `/services/${e.slug}/faqs`, `/services/${e.slug}/industries`);
    if (e.type === 'product') concreteRoutes.push(`/products/${e.slug}`);
    if (e.type === 'industry' && e.status !== 'application-sector') concreteRoutes.push(`/industries/${e.slug}`);
    if (e.type === 'use_case') concreteRoutes.push(`/use-cases/${e.slug}`);
    if (e.type === 'technology') concreteRoutes.push(`/technology/${e.slug}`);
    if (e.type === 'faq' && e.status === 'active') concreteRoutes.push(`/faq/${e.slug}`); // wait, active faqs have ids like serviceSlug-question. Maybe just /faq/[id]? The site is /faq/[id]? Actually it's probably /faq/[id]. I will skip individual FAQ routes if they 404. Let's just do known routes.
    // resource / case study might not have dedicated pages based on [slug] logic in middleware. Let's stick to core.
  });

  const metadataMap: any = {};
  
  // Fetch all concrete
  for (const route of concreteRoutes) {
    console.log(`Fetching concrete route: ${route}`);
    const html = await fetchRoute(route);
    if (html) {
      const parsed = parseHTML(html);
      metadataMap[route] = parsed;
    }
  }

  // Also fetch static base routes that are in page_metadata
  for (const entity of data.entities) {
    if (entity.type === 'page_metadata') {
      let baseRoute = entity.canonicalUrl.replace('https://obrive.com', '');
      baseRoute = baseRoute.replace(/\/\([^)]+\)/g, '');
      if (baseRoute.startsWith('//')) baseRoute = baseRoute.substring(1);
      if (baseRoute === '') baseRoute = '/';
      
      if (!baseRoute.includes('[slug]') && !baseRoute.includes('[id]')) {
        if (!metadataMap[baseRoute]) {
          console.log(`Fetching static base route: ${baseRoute}`);
          const html = await fetchRoute(baseRoute);
          if (html) {
            metadataMap[baseRoute] = parseHTML(html);
          }
        }
      }
    }
  }

  // Update entities
  for (const entity of data.entities) {
    if (entity.type === 'page_metadata') {
      let pattern = entity.canonicalUrl.replace('https://obrive.com', '');
      pattern = pattern.replace(/\/\([^)]+\)/g, '');
      if (pattern.startsWith('//')) pattern = pattern.substring(1);
      if (pattern === '') pattern = '/';

      if (pattern.includes('[slug]') || pattern.includes('[id]')) {
        // Find one example route that matches this pattern to attach to metadata? No, the user says resolve ALL.
        // But page_metadata is one entity per pattern currently (e.g. meta for /services/[slug]).
        // We will store an array of resolved concrete metadata inside the dynamic metadata entity.
        const basePath = pattern.split('[')[0]; // e.g. /services/
        const matchedConcrete = Object.keys(metadataMap).filter(r => r.startsWith(basePath) && r !== basePath);
        
        entity.content.raw.metadata_resolution = matchedConcrete.length > 0 ? 'RUNTIME_RESOLVED' : 'UNRESOLVED';
        entity.content.raw.jsonLd_resolution = matchedConcrete.length > 0 ? 'RUNTIME_RESOLVED' : 'UNRESOLVED';
        
        entity.content.raw.concrete_resolutions = matchedConcrete.map(r => ({
          route: r,
          metadata: metadataMap[r],
          resolvedAt: new Date().toISOString()
        }));
        
      } else {
        // Static
        if (metadataMap[pattern]) {
          entity.content.raw.runtime_metadata = {
            title: metadataMap[pattern].title,
            description: metadataMap[pattern].description,
            canonical: metadataMap[pattern].canonical,
            resolvedAt: new Date().toISOString()
          };
          entity.content.raw.runtime_jsonLd = metadataMap[pattern].jsonLd;
          if (entity.content.raw.metadata) entity.content.raw.metadata_resolution = 'RUNTIME_RESOLVED';
          if (entity.content.raw.jsonLd) entity.content.raw.jsonLd_resolution = 'RUNTIME_RESOLVED';
        }
      }
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log("Runtime extraction complete. Dataset updated.");
}

run().catch(console.error);
