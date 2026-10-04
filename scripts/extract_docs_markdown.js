const fs = require('fs');
const path = require('path');

const docsPagePath = path.join(process.cwd(), 'src/app/(company-info)/docs/page.tsx');
let content = fs.readFileSync(docsPagePath, 'utf8');

const markdownMatch = content.match(/const DOCS_MARKDOWN = `([\s\S]*?)`;/);
if (markdownMatch) {
  const markdownContent = markdownMatch[1];
  const docsDir = path.join(process.cwd(), 'src/content/docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(docsDir, 'index.mdx'), markdownContent);
  console.log('Extracted DOCS_MARKDOWN to src/content/docs/index.mdx');
}
