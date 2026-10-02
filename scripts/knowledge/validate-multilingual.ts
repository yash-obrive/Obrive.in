/**
 * OBRIVE AI KNOWLEDGE BRAIN — PHASE 5
 * Multilingual Knowledge Validator
 *
 * Validates src/data/obrive-multilingual-knowledge.json
 * against all Phase 5 requirements.
 */

import fs from 'fs';
import path from 'path';
import type { LanguageCode } from '../../src/config/languages';

const NON_ENGLISH_LOCALES: LanguageCode[] = [
  'ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it',
  'zh', 'ja', 'ko', 'ms', 'id', 'th'
];

// Values that are correctly language-neutral (allowed to be same in all locales)
const BRAND_NAMES = new Set(['Obrive', 'OBPARK', 'OBNEST', 'OBNAVI', 'OBMOVE', 'OBCREW',
  'Obpark', 'Obnest', 'Obnavi', 'Obmove', 'Obcrew']);

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  stats: Record<string, any>;
}

async function main() {
  console.log('OBRIVE AI KNOWLEDGE BRAIN — PHASE 5: MULTILINGUAL VALIDATION');
  console.log('=============================================================\n');

  const multiPath = path.join(process.cwd(), 'src/data/obrive-multilingual-knowledge.json');
  const canonicalPath = path.join(process.cwd(), 'src/data/internal-canonical-knowledge.json');
  const graphPath = path.join(process.cwd(), 'src/data/obrive-knowledge-graph.json');

  let totalErrors = 0;
  let totalWarnings = 0;
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // --- CHECK 1: Files Exist ---
  console.log('CHECK 1: File existence');
  for (const fp of [multiPath, canonicalPath, graphPath]) {
    if (!fs.existsSync(fp)) {
      console.error(`  FAIL: File not found: ${fp}`);
      process.exit(1);
    }
  }
  console.log('  PASS: All required files exist\n');

  const multiData = JSON.parse(fs.readFileSync(multiPath, 'utf-8'));
  const canonicalData = JSON.parse(fs.readFileSync(canonicalPath, 'utf-8'));
  const graphData = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

  const canonicalEntities: any[] = canonicalData.entities || [];
  const canonicalIds = new Set(canonicalEntities.map((e: any) => e.id));
  const graphEntityIds = new Set(Object.keys(graphData.entities || {}));

  // Build canonical type map
  const typeMap: Record<string, string> = {};
  canonicalEntities.forEach((e: any) => typeMap[e.id] = e.type);

  // --- CHECK 2: Schema Version ---
  console.log('CHECK 2: Schema version');
  if (multiData.schemaVersion !== '5.0') {
    allErrors.push(`Schema version mismatch: expected 5.0, got ${multiData.schemaVersion}`);
    console.log('  FAIL: Schema version mismatch');
  } else {
    console.log('  PASS: Schema version 5.0\n');
  }

  // --- CHECK 3: India Excluded ---
  console.log('CHECK 3: India exclusion');
  if (!multiData.indiaExcluded) {
    allErrors.push('India exclusion flag not set');
    console.log('  FAIL: indiaExcluded not set');
  }
  if (multiData.excludedLocales && !multiData.excludedLocales.includes('hi')) {
    allErrors.push('Hindi (hi) not in excludedLocales');
    console.log('  FAIL: hi not in excludedLocales');
  }
  // Verify no in/hi entity localizations
  const entityIds = Object.keys(multiData.entityLocalizations || {});
  let indiaLeakCount = 0;
  for (const [entityId, locs] of Object.entries(multiData.entityLocalizations || {})) {
    if ((locs as any)['hi'] || (locs as any)['in']) {
      indiaLeakCount++;
    }
  }
  if (indiaLeakCount > 0) {
    allErrors.push(`${indiaLeakCount} entities have hi/in locale representations`);
    console.log(`  FAIL: ${indiaLeakCount} entities have India locale leak`);
  } else {
    console.log('  PASS: India excluded, no hi/in locale leakage\n');
  }

  // --- CHECK 4: All Canonical IDs Exist ---
  console.log('CHECK 4: Canonical entity ID integrity');
  let missingIds = 0;
  for (const entityId of Object.keys(multiData.entityLocalizations || {})) {
    if (!canonicalIds.has(entityId)) {
      allErrors.push(`Localization references non-existent canonical entity: ${entityId}`);
      missingIds++;
      if (missingIds <= 5) console.log(`  FAIL: Unknown canonical ID: ${entityId}`);
    }
  }
  if (missingIds > 5) console.log(`  ... and ${missingIds - 5} more`);
  if (missingIds === 0) {
    console.log('  PASS: All localization entity IDs match canonical entities\n');
  }

  // --- CHECK 5: Relationship IDs Language-Independent ---
  console.log('CHECK 5: Relationship ID language-independence');
  const graphEdges = graphData.edges || [];
  let langDependentEdge = 0;
  // ar-sector-* are canonical content hash IDs, NOT locale-prefixed IDs.
  // Language-dependent IDs would look like: ar-augmented-reality-development, es-service-x, etc.
  // (locale + hyphen + canonical slug, NOT random hash)
  const localeIds = new Set(['ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh', 'ja', 'ko', 'ms', 'id', 'th']);
  for (const edge of graphEdges) {
    // A language-dependent ID would be: <locale>-<canonical-slug> where canonical-slug is also a known entity
    const checkId = (id: string) => {
      if (!id) return false;
      const parts = id.split('-');
      if (parts.length < 2) return false;
      const prefix = parts[0];
      if (!localeIds.has(prefix)) return false;
      // Verify it's not just a random hash (ar-sector-xxxxxxxx is a hash, not locale-prefixed slug)
      const remainder = parts.slice(1).join('-');
      if (remainder.startsWith('sector-')) return false; // ar-sector-* = content hash
      // Check if there's a canonical entity that this ID is derived from (would be a locale-slug collision)
      return graphData.entities && graphData.entities[`service:${remainder}`] != null;
    };
    if (checkId(edge.from) || checkId(edge.to)) {
      langDependentEdge++;
      allErrors.push(`Language-dependent edge found: ${edge.from} -> ${edge.to}`);
    }
  }
  if (langDependentEdge === 0) {
    console.log('  PASS: All relationship IDs are language-independent (ar-sector-* are canonical content hashes)\n');
  } else {
    console.log(`  FAIL: ${langDependentEdge} language-dependent edges found`);
  }

  // --- CHECK 6: Arabic Direction ---
  console.log('CHECK 6: Arabic RTL direction');
  let arRtlFail = 0;
  for (const [entityId, locs] of Object.entries(multiData.entityLocalizations || {})) {
    const arLoc = (locs as any)['ar'];
    if (arLoc && arLoc.direction !== 'rtl') {
      arRtlFail++;
      if (arRtlFail <= 3) allErrors.push(`Arabic entity ${entityId} has direction=${arLoc.direction} (expected rtl)`);
    }
    // Check other locales are ltr
    for (const locale of NON_ENGLISH_LOCALES.filter(l => l !== 'ar')) {
      const loc = (locs as any)[locale];
      if (loc && loc.direction !== 'ltr') {
        allErrors.push(`${locale} entity ${entityId} has direction=${loc.direction} (expected ltr)`);
      }
    }
  }
  if (arRtlFail === 0) {
    console.log('  PASS: Arabic direction is correctly set to rtl\n');
  } else {
    console.log(`  FAIL: ${arRtlFail} Arabic entities have incorrect direction`);
  }

  // --- CHECK 7: No Duplicate Locale Representations ---
  console.log('CHECK 7: No duplicate locale representations');
  let duplicateLocales = 0;
  for (const [entityId, locs] of Object.entries(multiData.entityLocalizations || {})) {
    const localeKeys = Object.keys(locs as object);
    const uniqueLocales = new Set(localeKeys);
    if (localeKeys.length !== uniqueLocales.size) {
      duplicateLocales++;
      allErrors.push(`Entity ${entityId} has duplicate locale representations`);
    }
  }
  if (duplicateLocales === 0) {
    console.log('  PASS: No duplicate locale representations\n');
  }

  // --- CHECK 8: English Fallback Detection (for non-English locales) ---
  console.log('CHECK 8: English fallback / leakage detection');
  const ALLOWED_ENGLISH_IN_NON_EN = BRAND_NAMES;
  let englishFallbackCount = 0;
  const englishFallbackSamples: string[] = [];

  function detectEnglishFallback(obj: any, entityId: string, locale: string, path: string) {
    if (!obj || typeof obj !== 'object') return;
    if ('status' in obj && 'value' in obj && 'sourceKey' in obj) {
      // A localized field
      const field = obj as any;
      if (field.status === 'translated' && field.value && field.sourceKey) {
        // Check if the translated value equals the English source key (silent English passthrough)
        if (field.value === field.sourceKey && !ALLOWED_ENGLISH_IN_NON_EN.has(field.value)) {
          englishFallbackCount++;
          if (englishFallbackSamples.length < 5) {
            englishFallbackSamples.push(`  [${locale}] ${entityId} at ${path}: "${String(field.value).slice(0, 60)}"`);
          }
        }
      }
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => detectEnglishFallback(item, entityId, locale, `${path}[${i}]`));
    } else {
      for (const [k, v] of Object.entries(obj)) {
        if (!['entityId','locale','direction','translationSource','publicRoute','canonicalUrl',
              'overallStatus','translatedCount','missingCount','languageNeutralCount'].includes(k)) {
          detectEnglishFallback(v, entityId, locale, `${path}.${k}`);
        }
      }
    }
  }

  // Sample check: check all services and products (the most important entities)
  const importantTypes = new Set(['service', 'product', 'industry', 'use_case', 'technology', 'case_study']);
  let checkedEntities = 0;
  for (const [entityId, locs] of Object.entries(multiData.entityLocalizations || {})) {
    if (!importantTypes.has(typeMap[entityId])) continue;
    checkedEntities++;
    for (const locale of NON_ENGLISH_LOCALES) {
      const loc = (locs as any)[locale];
      if (loc) detectEnglishFallback(loc, entityId, locale, '');
    }
  }

  if (englishFallbackCount === 0) {
    console.log(`  PASS: No English fallback detected in ${checkedEntities} important entity types (across all non-EN locales)\n`);
  } else {
    console.log(`  WARNING: ${englishFallbackCount} potential English fallbacks detected (may include intentional technical terms)`);
    englishFallbackSamples.forEach(s => console.log(s));
    allWarnings.push(`${englishFallbackCount} potential English fallback fields`);
    console.log();
  }

  // --- CHECK 9: No Private Data ---
  console.log('CHECK 9: Private data exclusion');
  const PRIVATE_PATTERNS = ['password', 'secret', 'api_key', 'token', 'otp', 'credential',
    'prisma', 'supabase_service', 'internal_api', 'dashboard', 'employee'];
  let privateDataFound = 0;
  // Quick check on entity IDs
  for (const entityId of Object.keys(multiData.entityLocalizations || {})) {
    if (PRIVATE_PATTERNS.some(p => entityId.toLowerCase().includes(p))) {
      privateDataFound++;
      allErrors.push(`Potentially private entity in multilingual data: ${entityId}`);
    }
  }
  if (privateDataFound === 0) {
    console.log('  PASS: No private data patterns detected\n');
  } else {
    console.log(`  FAIL: ${privateDataFound} potentially private entities found`);
  }

  // --- CHECK 10: Locale Completeness Table ---
  console.log('CHECK 10: Locale completeness report');
  console.log(`\n${'Locale'.padEnd(8)} | ${'Entities'.padEnd(10)} | ${'Complete'.padEnd(10)} | ${'Partial'.padEnd(10)} | ${'Missing'.padEnd(10)} | Coverage`);
  console.log('-'.repeat(70));

  for (const locale of ['en', ...NON_ENGLISH_LOCALES] as LanguageCode[]) {
    let total = 0, complete = 0, partial = 0, missing = 0;
    for (const [entityId, locs] of Object.entries(multiData.entityLocalizations || {})) {
      // Only count localizable types
      if (!importantTypes.has(typeMap[entityId])) continue;
      const loc = (locs as any)[locale];
      if (!loc) { missing++; total++; continue; }
      total++;
      if (loc.overallStatus === 'complete') complete++;
      else if (loc.overallStatus === 'partial') partial++;
      else missing++;
    }
    const pct = total > 0 ? ((complete + partial) / total * 100).toFixed(0) : '0';
    console.log(
      `${locale.padEnd(8)} | ${String(total).padEnd(10)} | ${String(complete).padEnd(10)} | ${String(partial).padEnd(10)} | ${String(missing).padEnd(10)} | ${pct}%`
    );
  }

  // --- CHECK 11: Country-Language Mapping ---
  console.log('\nCHECK 11: Country-language mapping integrity');
  const countryMap = multiData.countryLanguageMap || {};
  const inCountry = countryMap['in'];
  if (inCountry && !inCountry.excluded) {
    allErrors.push('India (in) is in countryLanguageMap but not marked as excluded');
    console.log('  FAIL: India not excluded in countryLanguageMap');
  } else {
    console.log('  PASS: Country-language mapping verified, India excluded\n');
  }

  // --- FINAL REPORT ---
  console.log('\n=== VALIDATION SUMMARY ===');
  totalErrors = allErrors.length;
  totalWarnings = allWarnings.length;
  console.log(`Total Errors:   ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  
  if (allErrors.length > 0) {
    console.log('\nERRORS:');
    allErrors.slice(0, 20).forEach(e => console.log('  ERROR:', e));
    if (allErrors.length > 20) console.log(`  ... and ${allErrors.length - 20} more`);
  }

  if (allWarnings.length > 0) {
    console.log('\nWARNINGS:');
    allWarnings.forEach(w => console.log('  WARN:', w));
  }

  // --- STATS ---
  const stats = multiData.summary || {};
  console.log('\n=== KEY STATISTICS ===');
  console.log('Canonical entity count:', multiData.canonicalEntityCount);
  console.log('Total entity localizations:', stats.totalEntityLocalizations);
  console.log('Localized locales:', (multiData.localizedLocales || []).join(', '));
  console.log('Excluded locales:', (multiData.excludedLocales || []).join(', '));
  console.log('India excluded:', multiData.indiaExcluded);
  console.log('Schema version:', multiData.schemaVersion);
  console.log('Generated at:', multiData.generatedAt);

  if (totalErrors === 0) {
    console.log('\n✓ VALIDATION PASSED');
    process.exit(0);
  } else {
    console.log(`\n✗ VALIDATION FAILED with ${totalErrors} error(s)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
