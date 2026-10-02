import fs from 'fs';

let c = fs.readFileSync('scripts/knowledge/final-audit.ts', 'utf-8');
c = c.replace(/\{ type: 'industry', path: '\/industries\/manufacturing' \},\n/, "");

fs.writeFileSync('scripts/knowledge/final-audit.ts', c, 'utf-8');
