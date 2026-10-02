const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, '../src/dictionaries/en.json');
const enDict = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

let added = 0;

function extractStrings(obj) {
  if (typeof obj === 'string') {
    if (obj.trim() && !enDict[obj]) {
      enDict[obj] = obj;
      added++;
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(extractStrings);
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) {
      if (key !== 'slug' && key !== 'image' && key !== 'date' && key !== 'icon') {
        extractStrings(obj[key]);
      }
    }
  }
}

const main = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/main-faqs.json'), 'utf8'));
const sol = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/solution-faqs.json'), 'utf8'));

extractStrings(main);
extractStrings(sol);

fs.writeFileSync(enJsonPath, JSON.stringify(enDict, null, 2));
console.log(`Added ${added} strings from FAQ JSON data files.`);
