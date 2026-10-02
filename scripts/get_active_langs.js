const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const content = fs.readFileSync(path.join(__dirname, '../src/config/countries.ts'), 'utf8');
const regex = /defaultLanguage:\s*["']([^"']+)["']/g;
const activeLangs = new Set();
let match;
while ((match = regex.exec(content)) !== null) {
    if (match[1] !== 'en') {
        activeLangs.add(match[1]);
    }
}
console.log(Array.from(activeLangs).join(' '));
