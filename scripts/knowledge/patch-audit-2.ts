import fs from 'fs';

let c = fs.readFileSync('scripts/knowledge/final-audit.ts', 'utf-8');
c = c.replace(/const titlePass = knowTitle && decLiveTitle\?\.includes.*?;\n/, 
`
    const titlePass = knowTitle && decLiveTitle === knowTitle;
`);

c = c.replace(/if \(allJson\.includes\('contact_info:in'\)\)/, 
`if (allJson.includes('"id": "contact_info:in"'))`);

fs.writeFileSync('scripts/knowledge/final-audit.ts', c, 'utf-8');
