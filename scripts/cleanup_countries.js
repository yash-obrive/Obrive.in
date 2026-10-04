const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/config/countries.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update CountryConfig interface
content = content.replace(/\s*phone:\s*string;/g, '');
content = content.replace(/\s*contactEmail:\s*string;/g, '');
content = content.replace(/\s*offices:\s*string\[\];/g, '');

// Update the COUNTRIES object
content = content.replace(/\s*phone:\s*".*",/g, '');
content = content.replace(/\s*contactEmail:\s*".*",/g, '');
content = content.replace(/\s*offices:\s*\[[\s\S]*?\],/g, '');

fs.writeFileSync(filePath, content);
console.log('Cleaned up countries.ts');
