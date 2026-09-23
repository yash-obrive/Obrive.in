import fs from "node:fs";
import path from "node:path";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (filePath.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const contentDirs = [
  "src/content/resources",
  "src/content/career",
  "src/content/security",
  "src/content/support",
  "src/content/faq",
  "src/content/legal",
];

const mdxFiles = [];
for (const dir of contentDirs) {
  scanDirectory(path.resolve(process.cwd(), dir), mdxFiles);
}

const incompatiblePatterns = {};

for (const file of mdxFiles) {
  const code = fs.readFileSync(file, "utf8");
  try {
    const ast = fromMarkdown(code, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });

    // Simple tree traversal
    const traverse = (node) => {
      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        const name = node.name;
        for (const attr of node.attributes) {
          if (
            attr.type === "mdxJsxAttribute" &&
            attr.value &&
            attr.value.type === "mdxJsxAttributeValueExpression"
          ) {
            // It's a JS expression like items={[...]}
            const propName = attr.name;
            // Let's store the pattern ComponentName + PropName
            const key = `${name}.${propName}`;
            if (!incompatiblePatterns[key]) {
              incompatiblePatterns[key] = {
                count: 0,
                files: new Set(),
                examples: [],
              };
            }
            incompatiblePatterns[key].count++;
            incompatiblePatterns[key].files.add(file);
            if (incompatiblePatterns[key].examples.length < 1) {
              incompatiblePatterns[key].examples.push(attr.value.value);
            }
          }
        }
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    traverse(ast);
  } catch (err) {
    console.error(`Error parsing ${file}:`, err.message);
  }
}

console.log("Incompatible Patterns Found:");
for (const [key, data] of Object.entries(incompatiblePatterns)) {
  console.log(
    `\n--- Pattern: <${key.split(".")[0]} ${key.split(".")[1]}={...} /> ---`,
  );
  console.log(`Count: ${data.count}`);
  console.log(`Files affected: ${data.files.size}`);
  console.log(`Example: ${data.examples[0].substring(0, 150)}...`);
}
