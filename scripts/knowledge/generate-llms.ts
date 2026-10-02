/**
 * OBRIVE AI KNOWLEDGE BRAIN — PHASE 6 (FINAL EXPOSURE)
 * AI-Readable Knowledge Delivery Layer Generator
 */

import fs from 'fs';
import path from 'path';
import { resolveServiceMetadata, resolveProductMetadata, resolveIndustryMetadata, resolveUseCaseMetadata, resolveTechnologyMetadata, resolveResourceMetadata } from '../../src/lib/metadata-resolvers';


// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = process.cwd();
const CANONICAL_PATH = path.join(ROOT, 'src/data/internal-canonical-knowledge.json');
const GRAPH_PATH     = path.join(ROOT, 'src/data/obrive-knowledge-graph.json');
const MULTI_PATH     = path.join(ROOT, 'src/data/obrive-multilingual-knowledge.json');
const PUBLIC_DIR     = path.join(ROOT, 'public');
const AI_DIR         = path.join(ROOT, 'public/ai');
const DOCS_DIR       = path.join(ROOT, 'public/ai/documents');

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL = 'https://obrive.com';
const NON_EN_LOCALES = ['ar','es','pt','fr','de','nl','sv','it','zh','ja','ko','ms','id','th'];
const LOCALE_REGEX = new RegExp(`src/content/(${NON_EN_LOCALES.concat(['hi','in']).join('|')})/`);

const PUBLIC_ENTITY_TYPES = new Set([
  'service', 'product', 'industry', 'use_case', 'technology',
  'case_study', 'blog', 'faq', 'company_info', 'contact_info',
  'pricing_package', 'career',
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sanitize(text: any): string {
  if (!text) return '';
  if (typeof text !== 'string') return String(text);
  return text.replace(/\n\n+/g, '\n\n').trim();
}

function heroTitle(entity: any): string {
  const raw = entity.content?.raw || {};
  return raw.hero?.title || raw.title || entity.name || entity.slug || entity.id;
}

function heroDescription(entity: any): string {
  const raw = entity.content?.raw || {};
  return raw.hero?.description || raw.description || '';
}

function canonicalUrl(entity: any): string {
  return entity.canonicalUrl || '';
}

function shortSlug(entityId: string): string {
  return entityId.includes(':') ? entityId.split(':').slice(1).join(':') : entityId;
}

// ─── Metadata Extraction ──────────────────────────────────────────────────────

function buildMetadataMap(entities: any[]): Record<string, any> {
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
}

async function assignMetadata(publicEntities: any[], metaMap: Record<string, any>) {
  for (const e of publicEntities) {
    if (!e.canonicalUrl) continue;
    const url = new URL(e.canonicalUrl);
    let route = url.pathname;
    
    // Exact match from static map
    if (metaMap[route]) {
      e.runtimeMetadata = metaMap[route];
    } else if (route.endsWith('/') && metaMap[route.slice(0, -1)]) {
      e.runtimeMetadata = metaMap[route.slice(0, -1)];
    }

    // Dynamically resolve actual runtime metadata using Next.js shared resolvers
    try {
      const slug = e.id.includes(':') ? e.id.split(':').slice(1).join(':') : e.id;
      let meta: any = null;
      if (e.type === 'service') meta = await resolveServiceMetadata(slug);
      else if (e.type === 'product') meta = await resolveProductMetadata(slug);
      else if (e.type === 'industry' && e.id.startsWith('industry:')) meta = await resolveIndustryMetadata(slug);
      else if (e.type === 'use_case') meta = await resolveUseCaseMetadata(slug);
      else if (e.type === 'technology') meta = await resolveTechnologyMetadata(slug);
      else if (e.type === 'case_study' || e.type === 'blog') meta = await resolveResourceMetadata(slug, 'en');

      if (meta && (meta.title || meta.description)) {
        // Handle Next.js metadata title objects { absolute: "...", default: "..." }
        let titleStr = "";
        if (typeof meta.title === 'string') titleStr = meta.title;
        else if (meta.title?.absolute) titleStr = meta.title.absolute;
        else if (meta.title?.default) titleStr = meta.title.default;

        e.runtimeMetadata = {
          title: titleStr || e.runtimeMetadata?.title,
          description: meta.description || e.runtimeMetadata?.description,
          keywords: meta.keywords || e.runtimeMetadata?.keywords
        };
      }
    } catch(err) {
      console.log(`Failed to resolve metadata for ${e.id}:`, err);
    }
  }
}

// ─── Document Parsing ─────────────────────────────────────────────────────────


function convertMdxToText(rawBody: string): string {
  if (!rawBody) return '';
  if (!rawBody) return '';
  let txt = rawBody;
  
  // Strip frontmatter
  txt = txt.replace(/^---[\s\S]*?---\n/, '');
  
  // Strip import statements
  txt = txt.replace(/^import\s+.*$/gm, '');
  
  // Replace custom components with simpler textual representation
  // E.g. <PageHeader title="X" /> -> # X
  txt = txt.replace(/<PageHeader[^>]*title=["']([^"']+)["'][^>]*\/>/g, '# $1\n');
  txt = txt.replace(/<CompanyInfoSection[^>]*title=["']([^"']+)["'][^>]*>/g, '## $1\n');
  txt = txt.replace(/<CompanyInfoItem[^>]*title=["']([^"']+)["'][^>]*>/g, '### $1\n');
  txt = txt.replace(/<ApproachTable[^>]*title=["']([^"']+)["'][^>]*>/g, '## $1\n');
  txt = txt.replace(/<ApproachPhaseItem[^>]*phase=["']([^"']+)["'][^>]*>/g, '### $1\n');
  
  // Strip remaining HTML/React tags but keep their inner text (a bit naive, but works for basic MDX docs)
  txt = txt.replace(/<\/?(CompanyInfoSection|CompanyInfoItem|ApproachTable|ApproachPhaseItem|div|span|ul|li|a)[^>]*>/g, '');
  
  return sanitize(txt);
}

// ─── Data Loading & Classification ────────────────────────────────────────────

async function loadData() {
  console.log('Loading canonical data...');
  const canonical = JSON.parse(fs.readFileSync(CANONICAL_PATH, 'utf-8'));
  const graph     = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
  const multi     = JSON.parse(fs.readFileSync(MULTI_PATH, 'utf-8'));

  const allEntities: any[] = canonical.entities || [];
  
  const classified = {
    BUSINESS_PUBLIC: [] as any[],
    DOCUMENT_PUBLIC: [] as any[],
    METADATA_ONLY: [] as any[],
    PROVENANCE_ONLY: [] as any[],
    AMBIGUOUS: [] as any[],
    EXCLUDED_FROM_OBRIVE_COM: [] as any[],
    LOCALIZED_DOCUMENT: [] as any[] // Non-English docs
  };

  for (const e of allEntities) {
    if (e.status === 'excluded_from_obrive_com' || e.id === 'contact_info:in' || (e.canonicalUrl || '').includes('/in')) {
      classified.EXCLUDED_FROM_OBRIVE_COM.push(e);
      continue;
    }

    if (e.type === 'page_metadata') {
      classified.METADATA_ONLY.push(e);
    } else if (e.type === 'hardcoded_block') {
      classified.PROVENANCE_ONLY.push(e);
    } else if (e.type === 'ambiguous') {
      classified.AMBIGUOUS.push(e);
    } else if (e.type === 'document') {
      const srcFile = e.sourceRecords?.[0]?.file || '';
      if (LOCALE_REGEX.test(srcFile)) {
        classified.LOCALIZED_DOCUMENT.push(e);
      } else {
        classified.DOCUMENT_PUBLIC.push(e);
      }
    } else if (PUBLIC_ENTITY_TYPES.has(e.type)) {
      
      if ((e.type === 'blog' || e.type === 'case_study') && e.sourceRecords?.[0]?.file) {
        const fp = path.join(ROOT, e.sourceRecords[0].file);
        if (fs.existsSync(fp)) {
          if (fp.endsWith('.json')) {
            const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
            let item = null;
            if (Array.isArray(data)) {
              item = data.find((x: any) => x.slug === e.slug || x.id === e.slug);
            } else if (data[e.slug]) {
              item = data[e.slug];
            }
            if (item) {
              e.content = e.content || {};
              e.content.raw = e.content.raw || {};
              
              // Blogs usually have 'sections' with 'content', case studies have 'overview', 'challenges', etc.
              let text = "";
              if (item.sections) {
                text = item.sections.map((s: any) => `## ${s.heading}\n${(s.content||[]).join('\n')}`).join('\n\n');
              } else if (item.overview || item.challenges) {
                text = `## Overview\n${item.overview || ''}\n\n## Challenges\n${(item.challenges||[]).join('\n')}\n\n## Solutions\n${(item.solutions||[]).join('\n')}\n\n## Results\n${(item.results||[]).join('\n')}`;
              } else {
                text = JSON.stringify(item, null, 2);
              }
              e.content.raw.body = text;
            }
          } else {
            const rawMdx = fs.readFileSync(fp, 'utf-8');
            e.content = e.content || {};
            e.content.raw = e.content.raw || {};
            e.content.raw.body = rawMdx;
          }
        }
      }
      classified.BUSINESS_PUBLIC.push(e);
    } else {
      classified.PROVENANCE_ONLY.push(e);
    }
  }

  // Assign metadata to business public entities
  const metaMap = buildMetadataMap(allEntities);
  await assignMetadata(classified.BUSINESS_PUBLIC, metaMap);

  const entityIndex: Record<string, any> = {};
  allEntities.forEach(e => entityIndex[e.id] = e);

  const edges: any[] = graph.edges || [];
  const edgesBySource: Record<string, any[]> = {};
  const edgesByTarget: Record<string, any[]> = {};
  edges.forEach(edge => {
    (edgesBySource[edge.from] = edgesBySource[edge.from] || []).push(edge);
    (edgesByTarget[edge.to]   = edgesByTarget[edge.to]   || []).push(edge);
  });

  return { classified, entityIndex, edges, edgesBySource, edgesByTarget, multi };
}

// ─── Relationship Helpers ─────────────────────────────────────────────────────

function getRelatedEntities(
  entityId: string,
  edgesBySource: Record<string, any[]>,
  edgesByTarget: Record<string, any[]>,
  entityIndex: Record<string, any>
): { type: string; entity: any; edgeType: string; confidence: string }[] {
  const results: { type: string; entity: any; edgeType: string; confidence: string }[] = [];

  for (const edge of edgesBySource[entityId] || []) {
    if (edge.confidence === 'unresolved') continue;
    const target = entityIndex[edge.to];
    if (target && (PUBLIC_ENTITY_TYPES.has(target.type) || target.type === 'document') && target.status !== 'excluded_from_obrive_com' && target.id !== 'contact_info:in' && !(target.canonicalUrl || '').includes('/in')) {
      results.push({ type: 'outgoing', entity: target, edgeType: edge.type, confidence: edge.confidence });
    }
  }

  for (const edge of edgesByTarget[entityId] || []) {
    if (edge.confidence === 'unresolved') continue;
    const source = entityIndex[edge.from];
    if (source && (PUBLIC_ENTITY_TYPES.has(source.type) || source.type === 'document') && source.status !== 'excluded_from_obrive_com' && source.id !== 'contact_info:in' && !(source.canonicalUrl || '').includes('/in')) {
      results.push({ type: 'incoming', entity: source, edgeType: edge.type, confidence: edge.confidence });
    }
  }

  return results;
}

// ─── Generators ───────────────────────────────────────────────────────────────

function generateDocuments(docs: any[]): Record<string, any> {
  const generatedMap: Record<string, any> = {};
  
  if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });

  for (const doc of docs) {
    const rawBody = doc.content?.raw?.body || '';
    const txt = convertMdxToText(rawBody);
    const slug = shortSlug(doc.slug || doc.id);
    const filename = `${slug}.txt`;
    const filepath = path.join(DOCS_DIR, filename);
    const url = doc.canonicalUrl || `${BASE_URL}/support/${slug}`; // Fallback approximation
    const title = doc.content?.raw?.frontmatter?.title || doc.name || slug;
    
    const content = `# ${title}\n\nCanonical URL: ${url}\nSource: ${doc.sourceRecords?.[0]?.file || 'Unknown'}\n\n---\n\n${txt}\n`;
    
    fs.writeFileSync(filepath, content, 'utf-8');
    
    // Update doc entity to have correct canonicalUrl and AI ref
    doc.canonicalUrl = url;
    doc.aiContentRef = `${BASE_URL}/ai/documents/${filename}`;
    doc.aiTextTitle = title;
    
    generatedMap[doc.id] = doc;
  }
  
  return generatedMap;
}

function generateLlmsTxt(
  businessEntities: any[],
  docEntities: any[]
): string {
  const lines: string[] = [];
  const byType = (type: string) => businessEntities.filter(e => e.type === type);

  lines.push(`# Obrive — AI Knowledge Index`);
  lines.push(`> Obrive Industries is a global technology company specializing in Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (MR), 3D Design, and Spatial Computing development.`);
  lines.push(`> Source: ${BASE_URL}`);
  lines.push(`> AI Knowledge files: ${BASE_URL}/llms.txt | ${BASE_URL}/llms-full.txt | ${BASE_URL}/ai/knowledge.json`);
  lines.push('');

  lines.push('## Company');
  const company = byType('company_info')[0];
  if (company) {
    lines.push(`- **Legal Name:** ${company.content?.raw?.legalName || 'Obrive Industries'}`);
    lines.push(`- **Website:** ${BASE_URL}`);
    lines.push(`- **Contact:** ${BASE_URL}/contact`);
  }
  lines.push('');

  lines.push('## Services');
  for (const svc of byType('service')) {
    lines.push(`### ${heroTitle(svc)}`);
    lines.push(`- URL: ${canonicalUrl(svc)}`);
    lines.push('');
  }

  lines.push('## Products');
  for (const prod of byType('product')) {
    lines.push(`### ${heroTitle(prod)}`);
    lines.push(`- URL: ${canonicalUrl(prod)}`);
    lines.push('');
  }

  lines.push('## Industries');
  const mainIndustries = byType('industry').filter(e => e.id.startsWith('industry:'));
  for (const ind of mainIndustries) {
    lines.push(`- **${heroTitle(ind)}**: ${canonicalUrl(ind)}`);
  }
  lines.push('');
  
  lines.push('## Use Cases');
  for (const uc of byType('use_case')) {
    lines.push(`- **${heroTitle(uc)}**: ${canonicalUrl(uc)}`);
  }
  lines.push('');

  lines.push('## Technologies');
  for (const tech of byType('technology')) {
    lines.push(`- **${heroTitle(tech)}**: ${canonicalUrl(tech)}`);
  }
  lines.push('');

  lines.push('## Case Studies');
  for (const cs of byType('case_study')) {
    lines.push(`- **${cs.content?.raw?.title || cs.name}**: ${canonicalUrl(cs)}`);
  }
  lines.push('');

  lines.push('## FAQs');
  lines.push(`- Full machine-readable FAQs: ${BASE_URL}/llms-full.txt`);
  lines.push('');
  
  // Expose documents
  lines.push('## Public Documentation (Legal, Support, Security, Resources)');
  for (const doc of docEntities) {
    lines.push(`- **${doc.aiTextTitle}**: ${doc.canonicalUrl}`);
    lines.push(`  Full Text: ${doc.aiContentRef}`);
  }
  lines.push('');

  return lines.join('\n');
}

function generateLlmsFullTxt(
  businessEntities: any[],
  docEntities: any[],
  entityIndex: Record<string, any>,
  edgesBySource: Record<string, any[]>,
  edgesByTarget: Record<string, any[]>
): string {
  const lines: string[] = [];

  lines.push(`# Obrive — Full AI Knowledge Document`);
  lines.push(`# Generated from verified canonical knowledge. Source: ${BASE_URL}`);
  lines.push(`# Note: Individual long-form documents are available at ${BASE_URL}/ai/documents/`);
  lines.push('');
  
  const writeEntityBlock = (entity: any, titlePrefix: string) => {
    const raw = entity.content?.raw || {};
    const url = canonicalUrl(entity);
    
    lines.push(`## ${titlePrefix}: ${heroTitle(entity)}`);
    lines.push(`ID: ${entity.id}`);
    if (url) lines.push(`URL: ${url}`);
    
    // Metadata integration
    if (entity.runtimeMetadata) {
      lines.push('### Dynamic Metadata');
      if (entity.runtimeMetadata.title) lines.push(`Title: ${entity.runtimeMetadata.title}`);
      if (entity.runtimeMetadata.description) lines.push(`Description: ${entity.runtimeMetadata.description}`);
      lines.push('');
    }

    if (heroDescription(entity)) {
      lines.push('### Description');
      lines.push(sanitize(heroDescription(entity)));
      lines.push('');
    }

    if (Array.isArray(raw.keyBenefits)) {
      lines.push('### Key Benefits & Capabilities');
      for (const b of raw.keyBenefits) {
        lines.push(`- **${b.title}**: ${sanitize(b.description || '')}`);
      }
      lines.push('');
    }

    if (Array.isArray(raw.processSteps)) {
      lines.push('### Process');
      for (const step of raw.processSteps) {
        lines.push(`- **${step.title || step.step}**: ${sanitize(step.description || '')}`);
      }
      lines.push('');
    }

    
    if (raw.body) {
      lines.push('### Full Content');
      lines.push(convertMdxToText(raw.body));
      lines.push('');
    }

    if (Array.isArray(raw.serviceSections)) {
      lines.push('### Sections');
      for (const section of raw.serviceSections) {
        lines.push(`#### ${section.title}`);
        if (section.description) lines.push(sanitize(section.description));
        if (Array.isArray(section.items)) section.items.forEach((i: string) => lines.push(`- ${i}`));
        lines.push('');
      }
    }

    // Graph relationships
    const related = getRelatedEntities(entity.id, edgesBySource, edgesByTarget, entityIndex);
    const rels: Record<string, any[]> = {};
    related.forEach(r => { (rels[r.entity.type] = rels[r.entity.type] || []).push(r); });

    if (rels['industry'] || related.some(r => r.entity.id.startsWith('ar-sector'))) {
      lines.push('### Associated Sectors / Industries');
      related.filter(r => r.entity.type === 'industry' || r.entity.id.startsWith('ar-sector')).forEach(r => {
        lines.push(`- **${heroTitle(r.entity)}**: ${sanitize(heroDescription(r.entity)).split('\n')[0].slice(0,100)}`);
      });
      lines.push('');
    }

    ['use_case', 'technology', 'product', 'case_study'].forEach(t => {
      if (rels[t]) {
        lines.push(`### Related ${t.replace('_', ' ')}s`);
        rels[t].forEach(r => lines.push(`- ${heroTitle(r.entity)}: ${canonicalUrl(r.entity)}`));
        lines.push('');
      }
    });

    if (rels['faq']) {
      lines.push('### FAQs');
      rels['faq'].forEach(r => {
        const fRaw = r.entity.content?.raw || {};
        if (fRaw.q && fRaw.a) {
          lines.push(`**Q: ${fRaw.q}**\nA: ${sanitize(fRaw.a)}\n`);
        }
      });
    }
    
    lines.push('---');
    lines.push('');
  };

  lines.push('# SERVICES');
  businessEntities.filter(e => e.type === 'service').forEach(e => writeEntityBlock(e, 'Service'));

  lines.push('# PRODUCTS');
  businessEntities.filter(e => e.type === 'product').forEach(e => writeEntityBlock(e, 'Product'));

  lines.push('# INDUSTRIES');
  businessEntities.filter(e => e.type === 'industry' && e.id.startsWith('industry:')).forEach(e => writeEntityBlock(e, 'Industry'));

  lines.push('# USE CASES & TECHNOLOGIES');
  businessEntities.filter(e => e.type === 'use_case' || e.type === 'technology').forEach(e => writeEntityBlock(e, e.type === 'use_case' ? 'Use Case' : 'Technology'));

  
  lines.push('# CASE STUDIES');
  businessEntities.filter(e => e.type === 'case_study').forEach(e => writeEntityBlock(e, 'Case Study'));

  lines.push('# BLOGS');
  businessEntities.filter(e => e.type === 'blog').forEach(e => writeEntityBlock(e, 'Blog'));

  lines.push('# DOCUMENTS REFERENCE');
  lines.push(`The following full-text documents are available at their respective AI URLs:\n`);
  for (const doc of docEntities) {
    lines.push(`- **${doc.aiTextTitle}**: ${doc.aiContentRef} (Canonical: ${doc.canonicalUrl})`);
  }
  lines.push('\n---\n');

  return lines.join('\n');
}

function generateKnowledgeJson(
  businessEntities: any[],
  docEntities: any[],
  entityIndex: Record<string, any>,
  edges: any[],
  edgesBySource: Record<string, any[]>,
  edgesByTarget: Record<string, any[]>,
  multi: any,
  classified: any
): object {
  const outputEntities = [...businessEntities, ...docEntities].map(entity => {
    const related = getRelatedEntities(entity.id, edgesBySource, edgesByTarget, entityIndex);
    const out: any = {
      id: entity.id,
      type: entity.type,
      canonicalUrl: entity.canonicalUrl,
      name: entity.aiTextTitle || heroTitle(entity),
      description: heroDescription(entity).split('\n')[0].slice(0, 500) || null,
      runtimeMetadata: entity.runtimeMetadata || null,
      contentRef: entity.aiContentRef || `${BASE_URL}/llms-full.txt#${entity.id.replace(/[^a-z0-9]/gi, '-')}`,
      relatedEntities: related.map(r => ({ id: r.entity.id, type: r.entity.type, edgeType: r.edgeType })),
    };
    return out;
  });

  return {
    schemaVersion: '6.1',
    generatedAt: new Date().toISOString(),
    entityClassificationReport: {
      BUSINESS_PUBLIC: classified.BUSINESS_PUBLIC.length,
      DOCUMENT_PUBLIC: classified.DOCUMENT_PUBLIC.length,
      METADATA_ONLY: classified.METADATA_ONLY.length,
      PROVENANCE_ONLY: classified.PROVENANCE_ONLY.length,
      AMBIGUOUS: classified.AMBIGUOUS.length,
      LOCALIZED_DOCUMENT: classified.LOCALIZED_DOCUMENT.length,
      EXCLUDED_FROM_OBRIVE_COM: classified.EXCLUDED_FROM_OBRIVE_COM.length,
    },
    entities: outputEntities,
    relationships: edges.filter(e => e.confidence !== 'unresolved' && outputEntities.some(o => o.id === e.from) && outputEntities.some(o => o.id === e.to)).map(e => ({ from: e.from, to: e.to, type: e.type })),
    security: {
      note: 'Verified public info only. No dashboard/employee/private data.',
      indiaExcluded: true,
      excludedScopes: ['excluded_from_obrive_com', 'contact_info:in'],
    }
  };
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('OBRIVE AI KNOWLEDGE BRAIN — FINAL EXPOSURE CLOSURE');
  console.log('====================================================\n');

  const { classified, entityIndex, edges, edgesBySource, edgesByTarget, multi } = await loadData();

  console.log('Entity Classification:');
  console.log(`  BUSINESS_PUBLIC:          ${classified.BUSINESS_PUBLIC.length}`);
  console.log(`  DOCUMENT_PUBLIC:          ${classified.DOCUMENT_PUBLIC.length}`);
  console.log(`  METADATA_ONLY:            ${classified.METADATA_ONLY.length}`);
  console.log(`  PROVENANCE_ONLY:          ${classified.PROVENANCE_ONLY.length}`);
  console.log(`  AMBIGUOUS:                ${classified.AMBIGUOUS.length}`);
  console.log(`  LOCALIZED_DOCUMENT:       ${classified.LOCALIZED_DOCUMENT.length}`);
  console.log(`  EXCLUDED_FROM_OBRIVE_COM: ${classified.EXCLUDED_FROM_OBRIVE_COM.length}\n`);

  console.log('[1/4] Generating /ai/documents/*.txt ...');
  generateDocuments(classified.DOCUMENT_PUBLIC);
  console.log(`  Written: ${classified.DOCUMENT_PUBLIC.length} individual document files`);

  console.log('[2/4] Generating /llms.txt ...');
  const llmsTxt = generateLlmsTxt(classified.BUSINESS_PUBLIC, classified.DOCUMENT_PUBLIC);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf-8');

  console.log('[3/4] Generating /llms-full.txt ...');
  const llmsFullTxt = generateLlmsFullTxt(classified.BUSINESS_PUBLIC, classified.DOCUMENT_PUBLIC, entityIndex, edgesBySource, edgesByTarget);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf-8');

  console.log('[4/4] Generating /ai/knowledge.json ...');
  const knowledgeJson = generateKnowledgeJson(
    classified.BUSINESS_PUBLIC, 
    classified.DOCUMENT_PUBLIC, 
    entityIndex, edges, edgesBySource, edgesByTarget, multi, classified
  );
  fs.writeFileSync(path.join(AI_DIR, 'knowledge.json'), JSON.stringify(knowledgeJson, null, 2), 'utf-8');

  console.log('\nDone.');
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
