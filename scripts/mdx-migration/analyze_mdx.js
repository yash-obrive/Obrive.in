const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "../../src/content");
const mdxFiles = [];

function findMdx(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findMdx(fullPath);
    } else if (fullPath.endsWith(".mdx")) {
      mdxFiles.push(fullPath);
    }
  }
}
findMdx(contentDir);

const analysis = mdxFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  const { data, content: body } = matter(content);

  const components = new Set();
  const componentRegex = /<([A-Z][a-zA-Z0-9]*)/g;
  let match;
  while ((match = componentRegex.exec(body)) !== null) {
    components.add(match[1]);
  }

  const hasHtml = /<[a-z]+[^>]*>/i.test(body);
  const hasMarkdownTable = /\|.*\|/.test(body);

  return {
    file: file.replace(__dirname, ""),
    components: Array.from(components),
    hasHtml,
    hasMarkdownTable,
  };
});

console.log(JSON.stringify(analysis, null, 2));
