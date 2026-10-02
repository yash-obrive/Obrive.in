const fs = require('fs');
const { compileSync } = require('@mdx-js/mdx');
const { execSync } = require('child_process');

let files = [];
const walkSync = function(dir, filelist) {
  if (!fs.existsSync(dir)) return filelist;
  const list = fs.readdirSync(dir);
  filelist = filelist || [];
  list.forEach(function(file) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      filelist = walkSync(fullPath, filelist);
    } else if (fullPath.endsWith('.mdx')) {
      filelist.push(fullPath);
    }
  });
  return filelist;
};

const langs = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'pt', 'sv', 'th', 'zh'];
for (const lang of langs) {
  files = files.concat(walkSync(`src/content/${lang}`, []));
}

let errors = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  try {
    compileSync(content);
  } catch (err) {
    errors.push(file);
  }
}

console.log(`${errors.length} files have errors out of ${files.length}.`);
if (errors.length > 0) {
    console.log("Restoring broken files to English...");
    for (const file of errors) {
        try {
            // Find the original english file path
            // e.g. src/content/ar/resources/xyz.mdx -> src/content/resources/xyz.mdx
            const parts = file.split('/');
            const lang = parts[2];
            parts.splice(2, 1); // remove lang
            const origPath = parts.join('/');
            if (fs.existsSync(origPath)) {
                fs.copyFileSync(origPath, file);
                console.log(`Restored ${file}`);
            }
        } catch(e) {
            console.error(`Failed to restore ${file}`);
        }
    }
}
