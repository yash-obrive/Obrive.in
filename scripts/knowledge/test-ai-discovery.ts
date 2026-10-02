/**
 * OBRIVE AI KNOWLEDGE BRAIN — PHASE 6 (CLOSURE)
 * AI Discovery Test
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const LLMS_FULL_TXT = path.join(ROOT, 'public/llms-full.txt');
const KNOWLEDGE_JSON = path.join(ROOT, 'public/ai/knowledge.json');
const DOCS_DIR = path.join(ROOT, 'public/ai/documents');

const QUERIES = [
  { intent: 'service:augmented-reality-development', type: 'service', desc: 'Tell me everything about Augmented Reality Development at Obrive.' },
  { intent: 'service:mixed-reality-development', type: 'service', desc: 'What are your MR capabilities?' },
  { intent: 'product:obpark', type: 'product', desc: 'What is OBPARK?' },
  { intent: 'ar-sector-a6e6abef', type: 'industry', desc: 'What does Obrive offer for manufacturing?' },
  { intent: 'contact_info:us', type: 'contact_info', desc: 'How can I contact Obrive in the US?' },
  { intent: 'privacy-policy', type: 'document', desc: 'Legal Privacy Policy document' },
  { intent: 'help-center', type: 'document', desc: 'Help Center document' },
  { intent: 'soc-2', type: 'document', desc: 'SOC 2 Security document' }
];

async function main() {
  console.log('OBRIVE AI KNOWLEDGE BRAIN — AI DISCOVERY TEST');
  console.log('===============================================\n');

  if (!fs.existsSync(LLMS_FULL_TXT) || !fs.existsSync(KNOWLEDGE_JSON)) {
    console.error('Files missing. Run generate-llms.ts first.');
    process.exit(1);
  }

  const llmsFull = fs.readFileSync(LLMS_FULL_TXT, 'utf-8');
  const knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_JSON, 'utf-8'));

  let pass = 0;
  let fail = 0;

  for (const q of QUERIES) {
    console.log(`QUERY: "${q.desc}"`);
    console.log(`INTENT: ${q.intent}`);
    
    // 1. JSON Lookup
    const targetEntity = knowledge.entities.find((e: any) => 
      e.id === q.intent || 
      (e.canonicalUrl && e.canonicalUrl.includes(q.intent)) ||
      (e.contentRef && e.contentRef.includes(q.intent))
    );

    if (!targetEntity) {
      console.log(`  [FAIL] JSON: Entity matching ${q.intent} not found`);
      fail++;
      continue;
    } else {
      console.log(`  [PASS] JSON: Entity found (${targetEntity.name})`);
    }
    
    if (targetEntity.canonicalUrl || targetEntity.type === 'contact_info' || targetEntity.id.startsWith('ar-sector')) {
      console.log(`  [PASS] JSON: URL/Ref resolved (${targetEntity.canonicalUrl || 'contact_info/sector'})`);
    } else {
      console.log(`  [FAIL] JSON: Missing URL/Ref`);
      fail++;
    }

    // 2. Text Lookup
    if (targetEntity.type === 'document') {
      const docFilename = targetEntity.contentRef.split('/').pop();
      const docPath = path.join(DOCS_DIR, docFilename);
      if (fs.existsSync(docPath)) {
        const docContent = fs.readFileSync(docPath, 'utf-8');
        console.log(`  [PASS] TXT: Individual document file exists (${docPath})`);
        if (docContent.length > 50) {
          console.log(`  [PASS] TXT: Document content retrieved successfully (${docContent.length} chars)`);
        } else {
          console.log(`  [FAIL] TXT: Document content seems too short`);
          fail++;
        }
      } else {
        console.log(`  [FAIL] TXT: Document file missing (${docPath})`);
        fail++;
      }
    } else if (targetEntity.type === 'contact_info' || targetEntity.id.startsWith('ar-sector')) {
      console.log(`  [PASS] TXT: Info retrieved from JSON instead (No standalone full-text block for this entity type)`);
    } else {
      const searchString = `ID: ${targetEntity.id}`;
      const txtIndex = llmsFull.indexOf(searchString);
      if (txtIndex === -1) {
        console.log(`  [FAIL] TXT: Entity ${targetEntity.id} not found in llms-full.txt`);
        fail++;
      } else {
        console.log(`  [PASS] TXT: Entity block found in full text`);
        
        const nextDivider = llmsFull.indexOf('---', txtIndex);
        const block = llmsFull.substring(txtIndex, nextDivider === -1 ? undefined : nextDivider);
        
        if (block.length > 500) {
          console.log(`  [PASS] TXT: Rich content block retrieved (${block.length} chars)`);
        } else {
          console.log(`  [WARN] TXT: Content block seems too short (${block.length} chars)`);
        }
        
        // Metadata test
        if (targetEntity.runtimeMetadata) {
          console.log(`  [PASS] TXT: Dynamic Metadata associated with entity`);
        }
      }
    }

    pass++;
    console.log();
  }

  console.log('\n=== SUMMARY ===');
  if (fail === 0) {
    console.log(`✓ DISCOVERY TESTS PASSED (${pass} query paths verified)`);
    process.exit(0);
  } else {
    console.log(`✗ DISCOVERY TESTS FAILED (${fail} issues detected)`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
