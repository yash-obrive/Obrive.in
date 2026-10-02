import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import crypto from 'crypto';

// Register hooks to mock SVG and image imports so `tsx` doesn't crash on Next.js asset imports
['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'].forEach(ext => {
  require.extensions[ext] = (module: any, filename: string) => {
    module.exports = filename; // Just export the filename as a string
  };
});

const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string) {
  if (/\.(svg|png|jpg|jpeg|gif|webp)$/.test(id)) {
    return id;
  }
  return originalRequire.apply(this, arguments);
};

import { extractMetadataAndJsonLD } from './extract-metadata';

// --- TYPED CONTENT SCHEMAS ---
export type EntityType = 'service' | 'product' | 'industry' | 'use_case' | 'technology' | 'case_study' | 'blog' | 'faq' | 'document' | 'hardcoded_block' | 'ambiguous' | 'career' | 'pricing_package' | 'contact_info' | 'company_info' | 'page_metadata';

export interface BaseContent {
  raw: any;
}

export interface ServiceContent extends BaseContent {}
export interface ProductContent extends BaseContent {}
export interface IndustryContent extends BaseContent {}
export interface UseCaseContent extends BaseContent {}
export interface TechnologyContent extends BaseContent {}
export interface FAQContent extends BaseContent {}
export interface CaseStudyContent extends BaseContent {}
export interface BlogContent extends BaseContent {}
export interface ResourceContent extends BaseContent {}
export interface CareerContent extends BaseContent {}
export interface HardcodedContent extends BaseContent {}
export interface PricingPackageContent extends BaseContent {}
export interface ContactInfoContent extends BaseContent {}
export interface CompanyInfoContent extends BaseContent {}

export interface MDXContent extends BaseContent {
  rawMdx: string;
  normalizedText: string;
  structuredBlocks: any[];
}

export interface SourceRecord {
  file: string;
  type: 'registry' | 'json' | 'mdx' | 'hardcoded' | 'ui-reference' | 'translation' | 'jsonld';
  path?: string; // specific property path
}

export interface CanonicalEntity {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  canonicalUrl: string;
  sourceRecords: SourceRecord[];
  content: BaseContent;
  relationships: any[];
  metadata?: any;
  localization?: any;
  provenance: string;
  status: 'active' | 'ambiguous' | 'duplicate' | 'unresolved' | 'standalone' | 'candidate-industry' | 'application-sector' | 'alias' | 'excluded_from_obrive_com';
}

const registry: Map<string, CanonicalEntity> = new Map();
let totalSourceRecords = 0;

function createDeterministicId(prefix: string, content: string): string {
  const hash = crypto.createHash('sha256').update(content).digest('hex').substring(0, 8);
  return `${prefix}-${hash}`;
}

function register(entity: CanonicalEntity) {
  if (registry.has(entity.id)) {
    const existing = registry.get(entity.id)!;
    existing.sourceRecords.push(...entity.sourceRecords);
    
    // Merge raw if they are distinct sources of truth
    if (typeof entity.content.raw === 'object' && typeof existing.content.raw === 'object') {
      existing.content.raw = { ...existing.content.raw, ...entity.content.raw };
    }
  } else {
    registry.set(entity.id, entity);
  }
}

// Strip MDX basic logic
function parseMDX(rawMdx: string) {
  // Strip import/export, keep just text
  const textOnly = rawMdx.replace(/import .*? from .*?;?/g, '').replace(/export const .*?;?/g, '');
  // Strip React component tags (approximate)
  const normalizedText = textOnly.replace(/<[^>]+>/g, '').trim();
  const structuredBlocks = normalizedText.split('\n\n').filter(Boolean).map(b => ({
    type: b.startsWith('#') ? 'heading' : (b.startsWith('-') ? 'list' : 'paragraph'),
    content: b
  }));

  return { rawMdx, normalizedText, structuredBlocks };
}

async function extract() {
  console.log("Starting Phase 3 Extraction...");

  const DATA_DIR = path.join(process.cwd(), 'src/data');

  // 1. SERVICES
  const { getAllSolutions } = require('@/lib/services');
  const services = getAllSolutions();
  services.forEach((svc: any) => {
    totalSourceRecords++;
    register({
      id: `service:${svc.slug}`, type: 'service', name: svc.slug, slug: svc.slug, canonicalUrl: `https://obrive.com/services/${svc.slug}`,
      sourceRecords: [{ file: `src/lib/services.ts`, type: 'registry' }],
      content: { raw: svc } as ServiceContent,
      relationships: [], provenance: "registry", status: 'active'
    });
  });

  // 2. PRODUCTS
  const { getAllProducts } = require('@/lib/products');
  const products = getAllProducts();
  products.forEach((p: any) => {
    totalSourceRecords++;
    register({
      id: `product:${p.slug}`, type: 'product', name: p.slug, slug: p.slug, canonicalUrl: `https://obrive.com/products/${p.slug}`,
      sourceRecords: [{ file: `src/lib/products.ts`, type: 'registry' }],
      content: { raw: p } as ProductContent,
      relationships: [], provenance: "registry", status: 'active'
    });
  });

  // 3. INDUSTRIES
  const { getAllIndustries } = require('@/lib/industries');
  const industries = getAllIndustries();
  industries.forEach((ind: any) => {
    totalSourceRecords++;
    register({
      id: `industry:${ind.slug}`, type: 'industry', name: ind.hero.title, slug: ind.slug, canonicalUrl: `https://obrive.com/industries/${ind.slug}`,
      sourceRecords: [{ file: `src/lib/industries.ts`, type: 'registry' }],
      content: { raw: ind } as IndustryContent,
      relationships: [], provenance: "registry", status: 'active'
    });
  });

  // AR Application Sectors (preservation)
  const { AR_DEVELOPMENT_INDUSTRIES } = require('@/constants/pages/services/ar-development');
  if (AR_DEVELOPMENT_INDUSTRIES && AR_DEVELOPMENT_INDUSTRIES.industries) {
    AR_DEVELOPMENT_INDUSTRIES.industries.forEach((val: any) => {
      totalSourceRecords++;
      const id = createDeterministicId('ar-sector', val.title || '');
      register({
        id, type: 'industry', name: val.title, slug: id, canonicalUrl: '',
        sourceRecords: [{ file: `src/constants/pages/services/ar-development.ts`, type: 'hardcoded', path: `AR_DEVELOPMENT_INDUSTRIES` }],
        content: { raw: val },
        relationships: [],
        provenance: "ar-development.ts", status: 'application-sector'
      });
    });
  }

  // 4. USE CASES
  const { getAllUseCases } = require('@/lib/use-cases');
  const usecases = getAllUseCases();
  usecases.forEach((u: any) => {
    totalSourceRecords++;
    register({
      id: `use_case:${u.slug}`, type: 'use_case', name: u.hero.title, slug: u.slug, canonicalUrl: `https://obrive.com/use-cases/${u.slug}`,
      sourceRecords: [{ file: `src/lib/use-cases.ts`, type: 'registry' }],
      content: { raw: u } as UseCaseContent,
      relationships: [], provenance: "registry", status: 'active'
    });
  });

  // 5. TECHNOLOGIES
  const { getAllTechnologies } = require('@/lib/technology');
  const techs = getAllTechnologies();
  techs.forEach((t: any) => {
    totalSourceRecords++;
    register({
      id: `technology:${t.slug}`, type: 'technology', name: t.hero.title, slug: t.slug, canonicalUrl: `https://obrive.com/technologies/${t.slug}`,
      sourceRecords: [{ file: `src/lib/technology.ts`, type: 'registry' }],
      content: { raw: t } as TechnologyContent,
      relationships: [], provenance: "registry", status: 'active'
    });
  });

  // 6. FAQS
  const mainFaqs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'main-faqs.json'), 'utf-8'));
  Object.keys(mainFaqs).forEach(category => {
    mainFaqs[category].forEach((faq: any) => {
      totalSourceRecords++;
      const id = createDeterministicId('faq-global', `${category}-${faq.q.toLowerCase()}`);
      register({
        id, type: 'faq', name: faq.q, slug: id, canonicalUrl: '',
        sourceRecords: [{ file: 'src/data/main-faqs.json', type: 'json', path: `category:${category}` }],
        content: { raw: faq } as FAQContent,
        relationships: [], provenance: 'main-faqs.json', status: 'standalone'
      });
    });
  });

  const solutionFaqs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'solution-faqs.json'), 'utf-8'));
  Object.keys(solutionFaqs).forEach(serviceSlug => {
    Object.keys(solutionFaqs[serviceSlug]).forEach(cat => {
      solutionFaqs[serviceSlug][cat].forEach((faq: any) => {
        totalSourceRecords++;
        const id = createDeterministicId('faq', `${serviceSlug}-${faq.q.toLowerCase()}`);
        register({
          id, type: 'faq', name: faq.q, slug: id, canonicalUrl: '',
          sourceRecords: [{ file: 'src/data/solution-faqs.json', type: 'json', path: `service:${serviceSlug}` }],
          content: { raw: faq } as FAQContent,
          relationships: [{ from: id, type: 'belongs-to', to: serviceSlug, provenance: { source: 'solution-faqs.json' } }],
          provenance: 'solution-faqs.json', status: 'active'
        });
      });
    });
  });

  // 7. CASE STUDIES
  const caseStudies = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'case-studies.json'), 'utf-8'));
  caseStudies.forEach((cs: any) => {
    totalSourceRecords++;
    const id = cs.slug || createDeterministicId('case-study', cs.title);
    register({
      id, type: 'case_study', name: cs.title, slug: id, canonicalUrl: `https://obrive.com/case-studies/${id}`,
      sourceRecords: [{ file: 'src/data/case-studies.json', type: 'json' }],
      content: { raw: cs } as CaseStudyContent,
      relationships: [{ from: id, type: 'related-service', to: cs.service }],
      provenance: 'case-studies.json', status: 'active'
    });
  });

  // 8. BLOGS
  const blogs = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'blogs.json'), 'utf-8'));
  blogs.forEach((b: any) => {
    totalSourceRecords++;
    const id = b.slug || createDeterministicId('blog', b.title);
    register({
      id, type: 'blog', name: b.title, slug: b.slug, canonicalUrl: `https://obrive.com/blog/${b.slug}`,
      sourceRecords: [{ file: 'src/data/blogs.json', type: 'json' }],
      content: { raw: b } as BlogContent,
      relationships: [], provenance: 'blogs.json', status: 'active'
    });
  });

  // 9. MDX
  const mdxFiles = globSync('src/content/**/*.mdx', { cwd: process.cwd() });
  mdxFiles.forEach((file) => {
    totalSourceRecords++;
    const relativePath = path.relative(process.cwd(), file);
    const id = createDeterministicId('mdx', relativePath);
    const rawMdx = fs.readFileSync(file, 'utf-8');
    const { normalizedText, structuredBlocks } = parseMDX(rawMdx);

    register({
      id, type: 'document', name: relativePath, slug: path.basename(file, '.mdx'), canonicalUrl: '',
      sourceRecords: [{ file: relativePath, type: 'mdx' }],
      content: { raw: { frontmatter: {}, body: rawMdx }, rawMdx, normalizedText, structuredBlocks } as MDXContent,
      relationships: [], provenance: 'glob', status: 'standalone'
    });
  });

  // 10. OBCREW
  const obcrewSources = [
    'src/app/(company-info)/docs/page.tsx',
    'src/constants/Footer.ts',
    'src/dictionaries/en.json'
  ];
  obcrewSources.forEach(f => {
    totalSourceRecords++;
    register({
      id: 'obcrew', type: 'ambiguous', name: 'OBCREW', slug: 'obcrew', canonicalUrl: 'https://obrive.com/products/obcrew',
      sourceRecords: [{ file: f, type: 'ui-reference' }],
      content: { raw: { description: 'workforce and operations platform' } },
      relationships: [], provenance: 'Manual extraction', status: 'ambiguous'
    });
  });

  // 11. HARDCODED (PARTNERS / WHITE LABEL)
  const { WHITE_LABEL_HERO, WHITE_LABEL_PROCESS_STEPS, WHITE_LABEL_SERVICE_SECTIONS } = require('@/constants/pages/services/white-label-partnerships');
  totalSourceRecords += 3;
  register({
    id: 'white-label-content', type: 'hardcoded_block', name: 'White Label Constants', slug: 'white-label-content', canonicalUrl: 'https://obrive.com/partners',
    sourceRecords: [
      { file: 'src/constants/pages/services/white-label-partnerships.ts', type: 'hardcoded', path: 'WHITE_LABEL_HERO' },
      { file: 'src/constants/pages/services/white-label-partnerships.ts', type: 'hardcoded', path: 'WHITE_LABEL_PROCESS_STEPS' },
      { file: 'src/constants/pages/services/white-label-partnerships.ts', type: 'hardcoded', path: 'WHITE_LABEL_SERVICE_SECTIONS' }
    ],
    content: { raw: { hero: WHITE_LABEL_HERO, process: WHITE_LABEL_PROCESS_STEPS, sections: WHITE_LABEL_SERVICE_SECTIONS } } as HardcodedContent,
    relationships: [], provenance: 'constants', status: 'active'
  });

  // 12. HARDCODED (CAREERS)
  const { CAREER_CARD } = require('@/constants/pages/career/career-card');
  const { JOIN_TEAM_CARD } = require('@/constants/pages/career/join-team-card');
  totalSourceRecords += 2;
  register({
    id: 'careers-info', type: 'career', name: 'Careers Data', slug: 'careers', canonicalUrl: 'https://obrive.com/career',
    sourceRecords: [
      { file: 'src/constants/pages/career/career-card.ts', type: 'hardcoded', path: 'CAREER_CARD' },
      { file: 'src/constants/pages/career/join-team-card.ts', type: 'hardcoded', path: 'JOIN_TEAM_CARD' }
    ],
    content: { raw: { careers: CAREER_CARD, joinTeam: JOIN_TEAM_CARD } } as CareerContent,
    relationships: [], provenance: 'constants', status: 'active'
  });

  // 13. PRICING PACKAGES
  const { PRICING_STREAMS } = require('@/constants/pages/pricingData');
  if (PRICING_STREAMS) {
    PRICING_STREAMS.forEach((stream: any) => {
      stream.packages.forEach((pkg: any) => {
        totalSourceRecords++;
        register({
          id: `pricing:${pkg.id}`, type: 'pricing_package', name: pkg.name, slug: pkg.id, canonicalUrl: `https://obrive.com/servicecharges`,
          sourceRecords: [
            { file: 'src/constants/pages/pricingData.ts', type: 'registry', path: `stream:${stream.id},pkg:${pkg.id}` },
            { file: 'src/app/(public)/checkout/components/CheckoutForm.tsx', type: 'ui-reference' },
            { file: 'src/app/(public)/servicecharges/components/PricingSection.tsx', type: 'ui-reference' }
          ],
          content: { 
            raw: { 
              ...pkg, 
              streamTitle: stream.title, 
              streamSubtitle: stream.subtitle,
              taxNote: "GST on Service @ 18%", 
              gatewayFee: "Payment Gateway Fee @ 2%",
              security: "Secured by Razorpay · 256-bit SSL"
            } 
          } as PricingPackageContent,
          relationships: [], provenance: 'pricingData.ts', status: 'active'
        });
      });
    });
  }

  // 14. CONTACT INFO / COMPANY INFO
  const { COUNTRIES, DEFAULT_COUNTRY } = require('@/config/countries');
  if (COUNTRIES) {
    Object.keys(COUNTRIES).forEach(code => {
      totalSourceRecords++;
      const country = COUNTRIES[code];
      const status = (code === 'in' || code === 'hi') ? 'excluded_from_obrive_com' : 'active';
      register({
        id: `contact_info:${code}`, type: 'contact_info', name: `${country.name} Contact`, slug: code, canonicalUrl: `https://obrive.com/contact`,
        sourceRecords: [
          { file: 'src/config/countries.ts', type: 'registry', path: code },
          { file: 'src/app/(public)/contact/page.tsx', type: 'ui-reference' },
          { file: 'src/components/shared/layout/FooterContact.tsx', type: 'ui-reference' }
        ],
        content: { raw: country } as ContactInfoContent,
        relationships: [], provenance: 'countries.ts', status
      });
    });

    totalSourceRecords++;
    register({
      id: `company_info:hq`, type: 'company_info', name: 'Obrive Industries Private Limited', slug: 'hq', canonicalUrl: `https://obrive.com/about`,
      sourceRecords: [
        { file: 'src/config/countries.ts', type: 'registry' },
        { file: 'src/app/(public)/contact/components/ContactForm.tsx', type: 'ui-reference' }
      ],
      content: { raw: { 
        legalName: "Obrive Industries Private Limited", 
        hqAddress: "Sree Gururaya Mansion, JP Nagar, Bangalore, Karnataka, India", 
        googleMapsQuery: "Obrive Industries Private Limited, Sree Gururaya Mansion, JP Nagar, Bangalore"
      } } as CompanyInfoContent,
      relationships: [], provenance: 'ContactForm.tsx', status: 'active'
    });
  }

  // 15. METADATA & JSON-LD
  extractMetadataAndJsonLD((entity) => {
    totalSourceRecords++;
    register(entity);
  });

  // Write output
  const output = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalSourceRecords,
      totalCanonicalEntities: registry.size
    },
    entities: Array.from(registry.values())
  };

  fs.writeFileSync(path.join(DATA_DIR, 'internal-canonical-knowledge.json'), JSON.stringify(output, null, 2));
  console.log(`Wrote internal-canonical-knowledge.json with ${registry.size} entities.`);
}

extract().catch(console.error);
