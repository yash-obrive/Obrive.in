const fs = require("node:fs");
let content = fs.readFileSync(
  "src/constants/pages/resources/blog-card.ts",
  "utf8",
);

// Replace any occurrence of consecutive type: "Blog" lines (ignoring whitespace)
content = content.replace(/(type:\s*"Blog",\s*)+/g, 'type: "Blog",\n');
fs.writeFileSync("src/constants/pages/resources/blog-card.ts", content, "utf8");
