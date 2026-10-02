/**
 * OBRIVE AI KNOWLEDGE BRAIN — PHASE 6 (FINAL EXPOSURE)
 * AI-Readable Output Validator
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const LLMS_TXT = path.join(ROOT, 'public/llms.txt');
const LLMS_FULL_TXT = path.join(ROOT, 'public/llms-full.txt');
const KNOWLEDGE_JSON = path.join(ROOT, 'public/ai/knowledge.json');
const DOCS_DIR = path.join(ROOT, 'public/ai/documents');

const PRIVATE_PATTERNS = ['dashboard', 'employee', 'vacation', 'auth', 'payment', 'internal', 'api_key', 'secret'];

function checkFileExists(fp: string): boolean {
  if (!fs.existsSync(fp)) {
    console.error(`  FAIL: File not found: ${fp}`);
    return false;
  }
  return true;
}

function scanForPrivateData(content: string, filename: string, errors: string[]) {
  const lowerContent = content.toLowerCase();
  for (const pattern of PRIVATE_PATTERNS) {
    if (lowerContent.includes(pattern)) {
      const index = lowerContent.indexOf(pattern);
      const start = Math.max(0, index - 30);
      const end = Math.min(content.length, index + pattern.length + 30);
      const snippet = content.substring(start, end).replace(/\n/g, ' ').toLowerCase();

      if (pattern === 'employee' && !snippet.includes('employee_data') && !snippet.includes('/employee') && !snippet.includes('employee_secret')) continue;
      if (pattern === 'auth' && (snippet.includes('author') || snippet.includes('authentic') || snippet.includes('authentication'))) continue;
      if (pattern === 'payment' && !snippet.includes('payment_secret') && !snippet.includes('stripe_key')) continue;
      if (pattern === 'internal' && (!snippet.includes('internal_api') && !snippet.includes('internal-canonical'))) continue;
      if (pattern === 'dashboard' && !snippet.includes('dashboard_block') && !snippet.includes('/dashboard')) continue;
      if (pattern === 'secret' && snippet.includes('credentials secret')) continue;

      errors.push(`Private data pattern '${pattern}' found in ${filename}. Context: "...${snippet}..."`);
    }
  }
}

async function main() {
  console.log('OBRIVE AI KNOWLEDGE BRAIN — OUTPUT VALIDATION (CLOSURE)');
  console.log('=======================================================\n');

  const allErrors: string[] = [];

  console.log('CHECK 1: File existence');
  let exists = true;
  for (const fp of [LLMS_TXT, LLMS_FULL_TXT, KNOWLEDGE_JSON]) {
    if (!checkFileExists(fp)) exists = false;
  }
  if (!fs.existsSync(DOCS_DIR)) {
    allErrors.push(`Documents directory missing: ${DOCS_DIR}`);
    exists = false;
  }
  if (!exists) process.exit(1);
  console.log('  PASS: All core files and directories exist\n');

  const llmsTxt = fs.readFileSync(LLMS_TXT, 'utf-8');
  const llmsFullTxt = fs.readFileSync(LLMS_FULL_TXT, 'utf-8');
  const knowledgeJsonStr = fs.readFileSync(KNOWLEDGE_JSON, 'utf-8');

  console.log('CHECK 2: JSON Validity');
  let knowledgeData: any;
  try {
    knowledgeData = JSON.parse(knowledgeJsonStr);
    console.log('  PASS: knowledge.json is valid JSON\n');
  } catch (e) {
    allErrors.push('knowledge.json is not valid JSON');
    console.log('  FAIL: knowledge.json parse error');
  }

  console.log('CHECK 3: Security & Privacy Scan');
  scanForPrivateData(llmsTxt, 'llms.txt', allErrors);
  scanForPrivateData(llmsFullTxt, 'llms-full.txt', allErrors);
  scanForPrivateData(knowledgeJsonStr, 'knowledge.json', allErrors);

  const docFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.txt'));
  console.log(`  Scanning ${docFiles.length} generated documents for private data...`);
  for (const f of docFiles) {
    const docContent = fs.readFileSync(path.join(DOCS_DIR, f), 'utf-8');
    scanForPrivateData(docContent, f, allErrors);
    
    // Also verify content is non-empty
    if (docContent.length < 50) {
      allErrors.push(`Document ${f} seems too short or empty.`);
    }
  }

  if (llmsTxt.toLowerCase().match(/\b\/in\b/) || llmsFullTxt.toLowerCase().match(/\b\/in\b/)) {
    allErrors.push('India locale route (/in) found in output text files');
  }
  if (knowledgeJsonStr.includes('"id": "contact_info:in"')) {
    allErrors.push('India contact info entity found in knowledge.json');
  }
  
  if (allErrors.length === 0) {
    console.log('  PASS: No security leaks or private data patterns found in index files or document files\n');
  } else {
    console.log('  FAIL: Potential security or privacy issues detected\n');
  }

  console.log('CHECK 4: Coverage & Structure');
  if (knowledgeData) {
    if (knowledgeData.schemaVersion !== '6.1') {
      allErrors.push(`Expected schemaVersion 6.1, got ${knowledgeData.schemaVersion}`);
    }
    
    // Check all docs are in knowledge.json
    const docEntities = knowledgeData.entities.filter((e: any) => e.type === 'document');
    if (docEntities.length !== 48) {
      allErrors.push(`Expected 48 DOCUMENT_PUBLIC entities in JSON, found ${docEntities.length}`);
    } else {
      console.log(`  PASS: All 48 DOCUMENT_PUBLIC entities present in JSON`);
    }

    // Check relationship integrity
    let brokenRel = 0;
    const entityIds = new Set(knowledgeData.entities.map((e:any) => e.id));
    for (const edge of knowledgeData.relationships) {
      if (!entityIds.has(edge.from) && !edge.from.startsWith('ar-sector')) brokenRel++;
      if (!entityIds.has(edge.to) && !edge.to.startsWith('ar-sector')) brokenRel++;
    }
    if (brokenRel > 0) {
      allErrors.push(`${brokenRel} broken relationship references in knowledge.json`);
    } else {
      console.log(`  PASS: ${knowledgeData.relationships.length} relationships are well-formed`);
    }
  }

  console.log('\n=== VALIDATION SUMMARY ===');
  if (allErrors.length > 0) {
    console.log(`Total Errors: ${allErrors.length}`);
    allErrors.forEach(e => console.log(`  ERROR: ${e}`));
    console.log('\n✗ VALIDATION FAILED');
    process.exit(1);
  } else {
    console.log(`Total Errors: 0`);
    console.log('\n✓ ALL CHECKS PASSED');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
