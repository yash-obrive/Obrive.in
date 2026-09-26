import fs from "node:fs";
import path from "node:path";

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
for (const dir of contentDirs)
  scanDirectory(path.resolve(process.cwd(), dir), mdxFiles);

mdxFiles.forEach((file) => {
  const _content = fs.readFileSync(file, "utf8");

  // Quick regex to fix over-indented text inside our new components
  // We look for lines starting with more than 4 spaces inside <*Item>
  // Actually, a safer way is to just run `npx prettier --write` on the MDX files!
  // Let's try prettier first since it knows MDX v3 rules.
});
