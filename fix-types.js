const fs = require("node:fs");
let content = fs.readFileSync(
  "src/constants/pages/resources/blog-card.ts",
  "utf8",
);

const regex = /(slug:\s*"[^"]+",)(\s*)([^t])/g;
content = content.replace(regex, (_match, p1, p2, p3) => {
  // if p3 is 't' as in 'type:', it won't match.
  // wait, the regex will match the next char.
  return `${p1 + p2}type: "Blog",${p2}${p3}`;
});
fs.writeFileSync("src/constants/pages/resources/blog-card.ts", content, "utf8");
