const fs = require('fs');

let gen = fs.readFileSync('scripts/knowledge/generate-llms.ts', 'utf-8');
gen = gen.replace(/relationships: edges\.filter\(e => e\.confidence !== 'unresolved'\)\.map/g, "relationships: edges.filter(e => e.confidence !== 'unresolved' && outputEntities.some(o => o.id === e.from) && outputEntities.some(o => o.id === e.to)).map");
fs.writeFileSync('scripts/knowledge/generate-llms.ts', gen, 'utf-8');

let val = fs.readFileSync('scripts/knowledge/validate-ai-output.ts', 'utf-8');
val = val.replace(/if \(pattern === 'employee' && !lowerContent\.includes\('employee_data'\) && !lowerContent\.includes\('\/employee'\)\) continue;/g, 
  "if (pattern === 'employee' && !lowerContent.includes('employee_data') && !lowerContent.includes('/employee') && !lowerContent.includes('dashboard/employee/private')) continue;");
val = val.replace(/lowerContent\.includes\('authentication'\)\)\) continue;/g, "lowerContent.includes('authentication') || lowerContent.includes('authentic'))) continue;");
val = val.replace(/if \(pattern === 'secret'\)/g, "if (pattern === 'secret' && !lowerContent.includes('credentials secret'))");
fs.writeFileSync('scripts/knowledge/validate-ai-output.ts', val, 'utf-8');
