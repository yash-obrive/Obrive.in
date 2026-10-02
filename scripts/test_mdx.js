const fs = require('fs');
const glob = require('glob');
const mdx = require('@mdx-js/mdx');

const files = glob.sync('src/content/ar/resources/*.mdx');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  try {
    mdx.compileSync(content);
  } catch (err) {
    console.error('Error compiling:', file);
    console.error(err.message);
  }
}
