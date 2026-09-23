const fs = require("node:fs");
const { compile } = require("@mdx-js/mdx");

async function main() {
  const code = await compile(
    fs.readFileSync("src/content/resources/spatial-flow.mdx", "utf8"),
    {
      jsx: true,
    },
  );
  console.log(code.value);
}
main();
