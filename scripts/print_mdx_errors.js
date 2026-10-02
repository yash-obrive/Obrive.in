const fs = require('fs');
const glob = require('glob');
const { compile } = require('@mdx-js/mdx');

async function check() {
  const files = glob.sync('src/content/ar/**/*.mdx');
  for (const file of files) {
    try {
      const code = fs.readFileSync(file, 'utf8');
      await compile(code, {
        jsx: true,
        development: false
      });
    } catch (e) {
      console.log(`Error in ${file}:`);
      console.log(e.message);
      console.log("---");
    }
  }
}
check();
