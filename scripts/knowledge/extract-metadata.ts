import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { globSync } from 'glob';

// Simple naive JSON-LD AST extractor for specific known patterns.
// Real AST parsing for complex dynamic generation is hard, so we capture the static exports.
export function extractMetadataAndJsonLD(register: (entity: any) => void) {
  let jsonLdCount = 0;
  let metadataCount = 0;

  const files = globSync('src/app/**/*.tsx');

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const hasJsonLd = content.includes('application/ld+json');
    const hasMetadata = content.includes('export const metadata') || content.includes('export function generateMetadata');

    if (!hasJsonLd && !hasMetadata) return;

    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);

    let extractedMetadata: any = null;
    let extractedJsonLd: any = null;

    // Extremely basic fallback AST extraction: We'll record manual review needed for complex metadata.
    // Instead of actually evaluating TS at runtime, we record the existence and the fact it's there.
    // For zero-loss, if we can't extract it statically, we store it as a stringified node or note it.
    ts.forEachChild(sourceFile, node => {
      if (ts.isVariableStatement(node) && node.getText().includes('export const metadata')) {
        extractedMetadata = { source: 'static metadata block', content: node.getText() };
        metadataCount++;
      } else if (ts.isFunctionDeclaration(node) && node.name?.text === 'generateMetadata') {
        extractedMetadata = { source: 'generateMetadata()', content: node.getText(), MANUAL_REVIEW_REQUIRED: true };
        metadataCount++;
      }
    });

    if (hasJsonLd) {
      extractedJsonLd = { source: 'application/ld+json script tag in JSX', content: 'Extracting literal JSX tags via AST is complex; marking for manual AST expansion', MANUAL_REVIEW_REQUIRED: true };
      jsonLdCount++;
    }

    if (extractedMetadata || extractedJsonLd) {
      const route = '/' + path.relative('src/app', path.dirname(file)).replace(/\\/g, '/').replace(/\/\([^)]+\)/g, ''); // strip grouped routes
      
      const crypto = require('crypto');
      const hash = crypto.createHash('sha256').update(file).digest('hex').substring(0, 8);
      
      register({
        id: `page_metadata:${hash}`, 
        type: 'page_metadata', 
        name: `Metadata for ${route || '/'}`, 
        slug: `meta-${hash}`, 
        canonicalUrl: `https://obrive.com${route}`,
        sourceRecords: [{ file, type: 'ui-reference' }],
        content: { raw: { metadata: extractedMetadata, jsonLd: extractedJsonLd } },
        relationships: [], provenance: 'extract-metadata.ts AST', status: 'active'
      });
    }
  });

  console.log(`Extracted ${metadataCount} metadata nodes and ${jsonLdCount} JSON-LD nodes.`);
}
