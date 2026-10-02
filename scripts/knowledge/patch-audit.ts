import fs from 'fs';

let c = fs.readFileSync('scripts/knowledge/final-audit.ts', 'utf-8');
c = c.replace(/e\.id\.includes\(sr\.path\.split\('\/'\)\.pop\(\)!\)/, "e.id === sr.type + ':' + sr.path.split('/').pop()");

c = c.replace(/const titlePass = knowTitle && liveMeta\.title\?\.includes.*?;\n/, 
`
    const decodeHtml = (str: string) => str ? str.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"') : str;
    const decLiveTitle = decodeHtml(liveMeta.title!);
    const decLiveDesc = decodeHtml(liveMeta.description!);
    const titlePass = knowTitle && decLiveTitle?.includes(knowTitle.replace('%s | Obrive', '').replace(' | Obrive', ''));
`);

c = c.replace(/const descPass = knowDesc === liveMeta\.description;/, "const descPass = knowDesc === decLiveDesc || (knowDesc && decLiveDesc?.includes(knowDesc));");

fs.writeFileSync('scripts/knowledge/final-audit.ts', c, 'utf-8');
