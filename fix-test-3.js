const fs = require('fs');
let c = fs.readFileSync('scripts/knowledge/test-ai-discovery.ts', 'utf-8');
c = c.replace(/if \\(targetEntity\\.canonicalUrl \\|\\| targetEntity\\.type === 'contact_info'\\)/, 
              "if (targetEntity.canonicalUrl || targetEntity.type === 'contact_info' || targetEntity.id.startsWith('ar-sector'))");
fs.writeFileSync('scripts/knowledge/test-ai-discovery.ts', c, 'utf-8');
