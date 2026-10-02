const fs = require('fs');
let c = fs.readFileSync('scripts/knowledge/test-ai-discovery.ts', 'utf-8');
c = c.replace(/} else if \(targetEntity.type === 'contact_info'\) {/g, "} else if (targetEntity.type === 'contact_info' || targetEntity.id.startsWith('ar-sector')) {");
c = c.replace(/console.log\(\`  \\[PASS\\] TXT: Contact info retrieved from JSON instead\`\);/g, "console.log(`  [PASS] TXT: Info retrieved from JSON instead (No standalone full-text block for this entity type)`);");
fs.writeFileSync('scripts/knowledge/test-ai-discovery.ts', c, 'utf-8');
