const fs = require('fs');
const { compileSync } = require('@mdx-js/mdx');

// Check if glob exists, if not use native fs
let files = [];
const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      filelist = walkSync(fullPath, filelist);
    } else if (fullPath.endsWith('.mdx')) {
      filelist.push(fullPath);
    }
  });
  return filelist;
};

files = walkSync('src/content/ar/resources', []);

let errors = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  try {
    compileSync(content);
  } catch (err) {
    console.error('Error compiling:', file);
    console.error(err.message);
    errors++;
  }
}
if (errors === 0) console.log("All AR resources MDX files valid!");
else console.log(errors, "files have errors.");
