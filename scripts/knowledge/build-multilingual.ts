/**
 * OBRIVE AI KNOWLEDGE BRAIN — PHASE 5
 * Multilingual Knowledge Builder
 *
 * Builds src/data/obrive-multilingual-knowledge.json
 * by cross-referencing canonical entities with existing locale dictionaries.
 *
 * Rules:
 * - Dictionary is value-keyed: English text → translated text
 * - Never invent translations
 * - Never substitute English and call it translated
 * - Mark missing with translationStatus = 'missing'
 * - India excluded from Obrive.com scope
 * - Canonical entity IDs never change by locale
 * - Relationships remain language-independent
 */

import fs from 'fs';
import path from 'path';
import type { LanguageCode } from '../../src/config/languages';
import type {
  EntityLocalizations,
  LocalizedEntityRepresentation,
  LocalizedField,
  MultilingualKnowledge,
  TranslationStatus,
} from '../../src/lib/knowledge/multilingual-types';

// ─── Configuration ────────────────────────────────────────────────────────────

const NON_ENGLISH_LOCALES: LanguageCode[] = [
  'ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it',
  'zh', 'ja', 'ko', 'ms', 'id', 'th'
];

const ALL_LOCALES: LanguageCode[] = ['en', ...NON_ENGLISH_LOCALES];

const ENTITY_TYPES_TO_LOCALIZE = new Set([
  'service', 'product', 'industry', 'use_case', 'technology',
  'case_study', 'blog', 'faq', 'pricing_package', 'contact_info',
  'page_metadata', 'company_info', 'career', 'document', 'hardcoded_block'
]);

// Language-neutral values: do not translate these
const LANGUAGE_NEUTRAL_PATTERNS = [
  /^https?:\/\//,         // URLs
  /^[a-zA-Z0-9._%+\-]+@/, // emails
  /^\+[\d\s\-().]+$/,     // phone numbers
  /^[A-Z]{2,5}$/,         // acronyms (USD, AED, etc.)
];

// Brand names that should not be translated
const BRAND_NAMES = new Set([
  'Obrive', 'OBPARK', 'OBNEST', 'OBNAVI', 'OBMOVE', 'OBCREW',
  'Obpark', 'Obnest', 'Obnavi', 'Obmove', 'Obcrew',
  'ARKit', 'RealityKit', 'ARCore', 'WebXR', 'WebAR',
  'Unity', 'Unreal', 'HoloLens', 'Meta Quest',
]);

// Country → language mapping (from countries.ts)
const COUNTRY_LANGUAGE_MAP: Record<string, { country: string; defaultLanguage: LanguageCode; supportedLanguages: LanguageCode[]; hreflang: string; excluded: boolean }> = {
  us:  { country: 'United States',          defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-US', excluded: false },
  ca:  { country: 'Canada',                 defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-CA', excluded: false },
  mx:  { country: 'Mexico',                 defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'es-MX', excluded: false },
  br:  { country: 'Brazil',                 defaultLanguage: 'pt', supportedLanguages: ['pt', 'en'], hreflang: 'pt-BR', excluded: false },
  uae: { country: 'United Arab Emirates',   defaultLanguage: 'ar', supportedLanguages: ['ar', 'en'], hreflang: 'en-AE', excluded: false },
  sa:  { country: 'Saudi Arabia',           defaultLanguage: 'ar', supportedLanguages: ['ar', 'en'], hreflang: 'ar-SA', excluded: false },
  qa:  { country: 'Qatar',                  defaultLanguage: 'ar', supportedLanguages: ['ar', 'en'], hreflang: 'ar-QA', excluded: false },
  bh:  { country: 'Bahrain',                defaultLanguage: 'ar', supportedLanguages: ['ar', 'en'], hreflang: 'ar-BH', excluded: false },
  uk:  { country: 'United Kingdom',         defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-GB', excluded: false },
  de:  { country: 'Germany',                defaultLanguage: 'de', supportedLanguages: ['de', 'en'], hreflang: 'de-DE', excluded: false },
  fr:  { country: 'France',                 defaultLanguage: 'fr', supportedLanguages: ['fr', 'en'], hreflang: 'fr-FR', excluded: false },
  nl:  { country: 'Netherlands',            defaultLanguage: 'nl', supportedLanguages: ['nl', 'en'], hreflang: 'nl-NL', excluded: false },
  ch:  { country: 'Switzerland',            defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'de-CH', excluded: false },
  se:  { country: 'Sweden',                 defaultLanguage: 'sv', supportedLanguages: ['sv', 'en'], hreflang: 'sv-SE', excluded: false },
  es:  { country: 'Spain',                  defaultLanguage: 'es', supportedLanguages: ['es', 'en'], hreflang: 'es-ES', excluded: false },
  it:  { country: 'Italy',                  defaultLanguage: 'it', supportedLanguages: ['it', 'en'], hreflang: 'it-IT', excluded: false },
  cn:  { country: 'China',                  defaultLanguage: 'zh', supportedLanguages: ['zh', 'en'], hreflang: 'zh-CN', excluded: false },
  sg:  { country: 'Singapore',              defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-SG', excluded: false },
  au:  { country: 'Australia',              defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-AU', excluded: false },
  nz:  { country: 'New Zealand',            defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-NZ', excluded: false },
  jp:  { country: 'Japan',                  defaultLanguage: 'ja', supportedLanguages: ['ja', 'en'], hreflang: 'ja-JP', excluded: false },
  kr:  { country: 'South Korea',            defaultLanguage: 'ko', supportedLanguages: ['ko', 'en'], hreflang: 'ko-KR', excluded: false },
  my:  { country: 'Malaysia',               defaultLanguage: 'ms', supportedLanguages: ['ms', 'en'], hreflang: 'en-MY', excluded: false },
  id:  { country: 'Indonesia',              defaultLanguage: 'id', supportedLanguages: ['id', 'en'], hreflang: 'id-ID', excluded: false },
  th:  { country: 'Thailand',               defaultLanguage: 'th', supportedLanguages: ['th', 'en'], hreflang: 'th-TH', excluded: false },
  za:  { country: 'South Africa',           defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-ZA', excluded: false },
  in:  { country: 'India',                  defaultLanguage: 'en', supportedLanguages: ['en'],       hreflang: 'en-IN', excluded: true },
};

const LOCALE_DIRECTION: Record<LanguageCode, 'ltr' | 'rtl'> = {
  en: 'ltr', ar: 'rtl', es: 'ltr', pt: 'ltr', fr: 'ltr',
  de: 'ltr', nl: 'ltr', sv: 'ltr', it: 'ltr', zh: 'ltr',
  ja: 'ltr', ko: 'ltr', ms: 'ltr', id: 'ltr', th: 'ltr',
};

// ─── Dictionary Loader ─────────────────────────────────────────────────────────

class DictionaryLoader {
  private cache: Map<LanguageCode, Record<string, string>> = new Map();

  load(locale: LanguageCode): Record<string, string> {
    if (this.cache.has(locale)) return this.cache.get(locale)!;
    const dictPath = path.join(process.cwd(), `src/dictionaries/${locale}.json`);
    if (!fs.existsSync(dictPath)) {
      console.warn(`  [WARN] Dictionary not found for locale: ${locale}`);
      this.cache.set(locale, {});
      return {};
    }
    const dict = JSON.parse(fs.readFileSync(dictPath, 'utf-8')) as Record<string, string>;
    this.cache.set(locale, dict);
    return dict;
  }
}

// ─── Field Localization ────────────────────────────────────────────────────────

function isLanguageNeutral(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  if (BRAND_NAMES.has(text.trim())) return true;
  if (LANGUAGE_NEUTRAL_PATTERNS.some(p => p.test(text.trim()))) return true;
  // Very short numeric/code values
  if (/^[\d\s.,+\-$€£¥₹%]+$/.test(text.trim())) return true;
  return false;
}

function localizeField(
  englishText: string | undefined | null,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): LocalizedField {
  if (!englishText || typeof englishText !== 'string') {
    return { value: null, status: 'missing', sourceKey: '' };
  }

  // Check if inherently language-neutral
  if (locale === 'en') {
    return { value: englishText, status: 'translated', sourceKey: englishText, dictFile };
  }

  if (isLanguageNeutral(englishText)) {
    return { value: englishText, status: 'language_neutral', sourceKey: englishText };
  }

  const translated = dict[englishText];
  if (translated && translated !== englishText) {
    return { value: translated, status: 'translated', sourceKey: englishText, dictFile };
  }

  // Check if the translated value equals the English (untranslated pass-through)
  if (translated && translated === englishText) {
    // Could be intentional (e.g. brand name that happens to be in dict as-is) 
    // or genuinely untranslated. Mark as missing to be safe for non-English locales.
    return { value: null, status: 'missing', sourceKey: englishText, dictFile };
  }

  return { value: null, status: 'missing', sourceKey: englishText, dictFile };
}

// ─── Entity-specific Localizers ─────────────────────────────────────────────

function buildCounters(rep: Partial<LocalizedEntityRepresentation>): {
  translatedCount: number;
  missingCount: number;
  languageNeutralCount: number;
} {
  let translated = 0, missing = 0, neutral = 0;

  function walk(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    if ('status' in obj && 'value' in obj) {
      if (obj.status === 'translated') translated++;
      else if (obj.status === 'missing') missing++;
      else if (obj.status === 'language_neutral') neutral++;
    } else if (Array.isArray(obj)) {
      obj.forEach(walk);
    } else {
      Object.values(obj).forEach(walk);
    }
  }

  walk(rep);
  return { translatedCount: translated, missingCount: missing, languageNeutralCount: neutral };
}

function localizeServiceOrSimilar(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  const hero = raw.hero || {};
  const localizedHero = {
    title: L(hero.title),
    description: L(hero.description),
    description2: hero.description2 ? L(hero.description2) : undefined,
    ctaButtons: hero.ctaButtons ? {
      primary: L(hero.ctaButtons.primary),
      secondary: L(hero.ctaButtons.secondary),
    } : undefined,
  };

  const localizedKeyBenefits = Array.isArray(raw.keyBenefits)
    ? raw.keyBenefits.map((b: any) => ({
        title: L(b.title),
        description: L(b.description),
      }))
    : undefined;

  const localizedProcessSteps = Array.isArray(raw.processSteps)
    ? raw.processSteps.map((s: any) => ({
        step: s.step,
        title: L(s.title),
        description: L(s.description),
      }))
    : undefined;

  const localizedServiceSections = Array.isArray(raw.serviceSections)
    ? raw.serviceSections.map((section: any) => ({
        id: section.id,
        title: L(section.title),
        subtitle: section.subtitle ? L(section.subtitle) : undefined,
        description: L(section.description),
        items: Array.isArray(section.items)
          ? section.items.map((item: string) => L(item))
          : undefined,
        footer: section.footer ? L(section.footer) : undefined,
      }))
    : undefined;

  const sidebarLinks = Array.isArray(raw.sidebarLinks)
    ? raw.sidebarLinks.map((link: any) => ({
        id: link.id,
        label: L(link.label),
      }))
    : undefined;

  const localizedName = L(entity.name || raw.hero?.title || entity.slug);
  const localizedDescription = L(hero.description);

  return {
    localizedName,
    localizedDescription,
    localizedHero,
    localizedKeyBenefits,
    localizedProcessSteps,
    localizedServiceSections,
    sidebarLinks,
  };
}

function localizeFAQ(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  const q = raw.q || raw.question || '';
  const a = raw.a || raw.answer || '';

  return {
    localizedName: L(q),
    localizedDescription: L(a),
    localizedFAQ: {
      question: L(q),
      answer: L(a),
    },
  };
}

function localizeCaseStudy(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  return {
    localizedName: L(raw.title),
    localizedDescription: L(raw.overview),
    localizedCaseStudy: {
      title: L(raw.title),
      overview: raw.overview ? L(raw.overview) : undefined,
      challenge: raw.challenge ? L(raw.challenge) : undefined,
      approach: raw.approach ? L(raw.approach) : undefined,
      outcome_snapshot: raw.outcome_snapshot ? L(raw.outcome_snapshot) : undefined,
      testimonial: raw.testimonial ? L(raw.testimonial) : undefined,
    },
  };
}

function localizeBlog(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  return {
    localizedName: L(raw.title),
    localizedDescription: { value: null, status: 'missing', sourceKey: 'blog.description' },
    localizedBlog: {
      title: L(raw.title),
    },
  };
}

function localizeIndustry(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  // AR sectors have simple structure: id, title, description
  if (entity.id.startsWith('ar-sector')) {
    return {
      localizedName: L(raw.title),
      localizedDescription: L(raw.description),
    };
  }

  // Main industries follow same structure as services
  return localizeServiceOrSimilar(entity, locale, dict, dictFile);
}

function localizeGeneric(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): Partial<LocalizedEntityRepresentation> {
  const raw = entity.content?.raw || {};
  const L = (text: any) => localizeField(text, locale, dict, dictFile);

  // Try hero title/desc first
  const title = raw.hero?.title || raw.title || raw.name || entity.name || '';
  const desc = raw.hero?.description || raw.description || '';

  return {
    localizedName: L(title),
    localizedDescription: L(desc),
  };
}

// ─── Main Build Logic ─────────────────────────────────────────────────────────

function buildLocaleRepresentation(
  entity: any,
  locale: LanguageCode,
  dict: Record<string, string>,
  dictFile: string
): LocalizedEntityRepresentation {
  let partial: Partial<LocalizedEntityRepresentation>;

  switch (entity.type) {
    case 'service':
    case 'product':
    case 'use_case':
    case 'technology':
      partial = localizeServiceOrSimilar(entity, locale, dict, dictFile);
      break;
    case 'industry':
      partial = localizeIndustry(entity, locale, dict, dictFile);
      break;
    case 'faq':
      partial = localizeFAQ(entity, locale, dict, dictFile);
      break;
    case 'case_study':
      partial = localizeCaseStudy(entity, locale, dict, dictFile);
      break;
    case 'blog':
      partial = localizeBlog(entity, locale, dict, dictFile);
      break;
    default:
      partial = localizeGeneric(entity, locale, dict, dictFile);
      break;
  }

  const { translatedCount, missingCount, languageNeutralCount } = buildCounters(partial);

  let overallStatus: LocalizedEntityRepresentation['overallStatus'];
  if (translatedCount === 0 && missingCount > 0) {
    overallStatus = 'missing';
  } else if (missingCount === 0) {
    overallStatus = 'complete';
  } else {
    overallStatus = 'partial';
  }

  return {
    entityId: entity.id,
    locale,
    direction: LOCALE_DIRECTION[locale],
    translationSource: {
      file: dictFile,
      method: 'dictionary_lookup',
    },
    ...partial,
    publicRoute: entity.canonicalUrl || '',
    canonicalUrl: entity.canonicalUrl || '',
    overallStatus,
    translatedCount,
    missingCount,
    languageNeutralCount,
  } as LocalizedEntityRepresentation;
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function main() {
  console.log('OBRIVE AI KNOWLEDGE BRAIN — PHASE 5: MULTILINGUAL BUILD');
  console.log('=========================================================\n');

  const dataPath = path.join(process.cwd(), 'src/data/internal-canonical-knowledge.json');
  const outPath = path.join(process.cwd(), 'src/data/obrive-multilingual-knowledge.json');

  const canonicalData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const allEntities: any[] = canonicalData.entities || [];

  console.log(`Loaded ${allEntities.length} canonical entities`);

  const loader = new DictionaryLoader();
  const entityLocalizations: Record<string, EntityLocalizations> = {};
  
  // Summary counters
  const summaryByLocale: Record<string, { total: number; complete: number; partial: number; missing: number }> = {};
  ALL_LOCALES.forEach(l => {
    summaryByLocale[l] = { total: 0, complete: 0, partial: 0, missing: 0 };
  });

  // Process entities that are in scope for localization
  const entitiesToProcess = allEntities.filter(e => {
    // Exclude India scope
    if (e.status === 'excluded_from_obrive_com') return false;
    // Only localize relevant types
    return ENTITY_TYPES_TO_LOCALIZE.has(e.type);
  });

  console.log(`Entities in scope for localization: ${entitiesToProcess.length}`);
  console.log(`Building representations for ${ALL_LOCALES.length} locales...\n`);

  let entityIdx = 0;
  for (const entity of entitiesToProcess) {
    entityLocalizations[entity.id] = {};
    entityIdx++;
    if (entityIdx % 200 === 0) {
      process.stdout.write(`  Processed ${entityIdx}/${entitiesToProcess.length}...\r`);
    }

    for (const locale of ALL_LOCALES) {
      const dictFile = `src/dictionaries/${locale}.json`;
      const dict = loader.load(locale);

      const rep = buildLocaleRepresentation(entity, locale, dict, dictFile);
      entityLocalizations[entity.id][locale] = rep;

      summaryByLocale[locale].total++;
      summaryByLocale[locale][rep.overallStatus === 'excluded' ? 'missing' : rep.overallStatus]++;
    }
  }

  console.log(`\nBuilt localizations for ${entitiesToProcess.length} entities across ${ALL_LOCALES.length} locales`);

  const totalLocalizations = Object.values(entityLocalizations).reduce((sum, locs) => sum + Object.keys(locs).length, 0);

  const output: MultilingualKnowledge = {
    schemaVersion: '5.0',
    generatedAt: new Date().toISOString(),
    canonicalEntityCount: allEntities.length,
    localizedLocales: ALL_LOCALES,
    excludedLocales: ['hi', 'in'],
    entityLocalizations,
    countryLanguageMap: COUNTRY_LANGUAGE_MAP,
    indiaExcluded: true,
    summary: {
      totalEntityLocalizations: totalLocalizations,
      byLocale: summaryByLocale,
    },
  };

  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nMultilingual knowledge saved to: ${outPath}`);
  console.log(`File size: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(1)} MB`);

  // Print summary
  console.log('\n=== LOCALE SUMMARY ===');
  console.log(`${'Locale'.padEnd(8)} ${'Total'.padEnd(8)} ${'Complete'.padEnd(10)} ${'Partial'.padEnd(10)} ${'Missing'.padEnd(10)}`);
  for (const locale of ALL_LOCALES) {
    const s = summaryByLocale[locale];
    const completePct = s.total > 0 ? ((s.complete / s.total) * 100).toFixed(0) : '0';
    console.log(
      `${locale.padEnd(8)} ${String(s.total).padEnd(8)} ${String(s.complete).padEnd(10)} ${String(s.partial).padEnd(10)} ${String(s.missing).padEnd(10)} (${completePct}% complete)`
    );
  }
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
