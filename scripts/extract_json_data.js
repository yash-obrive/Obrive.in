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
      if (key !== 'slug' && key !== 'image' && key !== 'date') {
        extractStrings(obj[key]);
      }
    }
  }
}

const blogs = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/blogs.json'), 'utf8'));
const caseStudies = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/case-studies.json'), 'utf8'));

extractStrings(blogs);
extractStrings(caseStudies);

fs.writeFileSync(enJsonPath, JSON.stringify(enDict, null, 2));
console.log(`Added ${added} strings from JSON data files.`);
