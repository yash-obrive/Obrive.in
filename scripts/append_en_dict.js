const fs = require('fs');
const path = require('path');
const dictPath = path.join(__dirname, '../src/dictionaries/en.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const newStrings = [
  "John Doe",
  "john@example.com",
  "+1 (555) 000-0000",
  "Acme Corp",
  "e.g., E-commerce AR Viewer, Corporate Website Redesign",
  "Tell us about your goals, timeline, and any specific requirements..."
];

for (const s of newStrings) {
  if (!dict[s]) {
    dict[s] = s;
  }
}

fs.writeFileSync(dictPath, JSON.stringify(dict, null, 2), 'utf8');
console.log('Appended', newStrings.length, 'strings to en.json');
