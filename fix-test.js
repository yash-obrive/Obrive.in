const fs = require('fs');
let c = fs.readFileSync('scripts/knowledge/test-ai-discovery.ts', 'utf-8');
c = c.replace(/const entity = knowledge.entities.find\(\(e: any\) => e.id === q.intent\);/, 
              "const entity = knowledge.entities.find((e: any) => e.id === q.intent || (e.canonicalUrl && e.canonicalUrl.includes(q.intent)));");
fs.writeFileSync('scripts/knowledge/test-ai-discovery.ts', c, 'utf-8');
