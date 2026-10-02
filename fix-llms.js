const fs = require('fs');

let c = fs.readFileSync('scripts/knowledge/generate-llms.ts', 'utf-8');

// Fix Metadata Map
c = c.replace(/function buildMetadataMap[\s\S]*?return metaMap;\n\}/, `function buildMetadataMap(entities: any[]): Record<string, any> {
  const metaMap: Record<string, any> = {};
  const metaEntities = entities.filter(e => e.type === 'page_metadata');
  
  for (const m of metaEntities) {
    if (m.content?.raw?.runtime_metadata && m.canonicalUrl) {
      try {
        const url = new URL(m.canonicalUrl);
        metaMap[url.pathname] = m.content.raw.runtime_metadata;
      } catch(e) {}
    }
    const dynamics = m.content?.raw?.concrete_resolutions || [];
    for (const d of dynamics) {
      if (d.route && d.metadata) {
        metaMap[d.route] = d.metadata;
      }
    }
  }
  return metaMap;
}`);

// Fix Blog/Case Study Full Content
c = c.replace(/function convertMdxToText\(rawBody: string\): string \{/g, `
function convertMdxToText(rawBody: string): string {
  if (!rawBody) return '';`);

c = c.replace(/classified\.BUSINESS_PUBLIC\.push\(e\);/g, `
      if ((e.type === 'blog' || e.type === 'case_study') && e.sourceRecords?.[0]?.file) {
        const fp = path.join(ROOT, e.sourceRecords[0].file);
        if (fs.existsSync(fp)) {
          const rawMdx = fs.readFileSync(fp, 'utf-8');
          e.content = e.content || {};
          e.content.raw = e.content.raw || {};
          e.content.raw.body = rawMdx;
        }
      }
      classified.BUSINESS_PUBLIC.push(e);`);

// Output Blogs and Case Studies with full text in llms-full.txt
c = c.replace(/lines\.push\('# CASE STUDIES'\);\n  businessEntities\.filter\(e => e\.type === 'case_study'\)\.forEach\(e => writeEntityBlock\(e, 'Case Study'\)\);/g, `
  lines.push('# CASE STUDIES');
  businessEntities.filter(e => e.type === 'case_study').forEach(e => writeEntityBlock(e, 'Case Study'));

  lines.push('# BLOGS');
  businessEntities.filter(e => e.type === 'blog').forEach(e => writeEntityBlock(e, 'Blog'));`);

c = c.replace(/if \(Array\.isArray\(raw\.serviceSections\)\)/g, `
    if (raw.body) {
      lines.push('### Full Content');
      lines.push(convertMdxToText(raw.body));
      lines.push('');
    }

    if (Array.isArray(raw.serviceSections))`);


fs.writeFileSync('scripts/knowledge/generate-llms.ts', c, 'utf-8');
