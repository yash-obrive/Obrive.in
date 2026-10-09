const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let issues = {
  missingAlt: [],
  rawImg: [],
  rawA: [],
  consoleLogs: [],
  tsIgnore: [],
  anyType: []
};

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (filePath.endsWith('.tsx')) {
    // Missing alt on next/image
    if (/<Image[^>]+>/.test(content)) {
      const images = content.match(/<Image[^>]+>/g) || [];
      images.forEach(img => {
        if (!img.includes('alt=')) issues.missingAlt.push(filePath);
      });
    }
    // raw img tag
    if (/<img\b/.test(content)) issues.rawImg.push(filePath);
    // console.log
    if (/console\.log\(/.test(content)) issues.consoleLogs.push(filePath);
  }

  if (/@ts-ignore/.test(content)) issues.tsIgnore.push(filePath);
});

console.log(JSON.stringify({
  missingAlt: [...new Set(issues.missingAlt)].length,
  rawImg: [...new Set(issues.rawImg)].length,
  consoleLogs: [...new Set(issues.consoleLogs)].length,
  tsIgnore: [...new Set(issues.tsIgnore)].length,
}, null, 2));
