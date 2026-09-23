import fs from "node:fs";
import ts from "typescript";

const mdxFiles = [
  "src/content/resources/client-immersive-onboarding.mdx",
  "src/content/resources/spatial-flow.mdx",
  "src/content/resources/web-vr-vs-app-vr-enterprises.mdx",
  "src/content/resources/ar-vr-mr-differences-business-use-cases-2025.mdx",
  "src/content/resources/webar-vs-app-ar-business-solution.mdx",
  "src/content/resources/ar-onboarding.mdx",
];

const inventory = {};

for (const filePath of mdxFiles) {
  const content = fs.readFileSync(filePath, "utf-8");
  const pseudoCode = `export default function MDX() { return (<>\n${content}\n</>); }`;

  const sourceFile = ts.createSourceFile(
    "temp.tsx",
    pseudoCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const tablesInFile = [];

  function visit(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = ts.isJsxElement(node)
        ? node.openingElement.tagName.getText(sourceFile)
        : node.tagName.getText(sourceFile);

      if (
        tagName === "TheImpactTable" ||
        tagName === "ResourceTheImpactTable"
      ) {
        const attributes = ts.isJsxElement(node)
          ? node.openingElement.attributes.properties
          : node.attributes.properties;

        const tableData = {
          mode: "unknown",
          title: "",
          metrics: [],
          columns: [],
          data: [],
        };

        for (const attr of attributes) {
          if (!ts.isJsxAttribute(attr)) continue;
          const name = attr.name.getText(sourceFile);
          const initializer = attr.initializer;
          if (!initializer) continue;

          if (name === "title" && ts.isStringLiteral(initializer)) {
            tableData.title = initializer.text;
          }

          if (
            (name === "metrics" || name === "columns" || name === "data") &&
            ts.isJsxExpression(initializer)
          ) {
            const arrayLiteral = initializer.expression;
            if (arrayLiteral && ts.isArrayLiteralExpression(arrayLiteral)) {
              const elements = arrayLiteral.elements;
              const parsedArray = [];
              for (const el of elements) {
                if (ts.isObjectLiteralExpression(el)) {
                  const obj = {};
                  for (const prop of el.properties) {
                    if (ts.isPropertyAssignment(prop)) {
                      const propName = prop.name.getText(sourceFile);
                      const propInit = prop.initializer.getText(sourceFile);
                      obj[propName] = propInit;
                    }
                  }
                  parsedArray.push(obj);
                }
              }
              if (name === "metrics") tableData.metrics = parsedArray;
              if (name === "columns") tableData.columns = parsedArray;
              if (name === "data") tableData.data = parsedArray;
            }
          }
        }

        if (tableData.metrics.length > 0) {
          tableData.mode = "legacy";
        } else if (tableData.columns.length > 0) {
          tableData.mode = "dynamic";
        }

        tablesInFile.push(tableData);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (tablesInFile.length > 0) {
    inventory[filePath] = tablesInFile;
  }
}

fs.writeFileSync("batch4_inventory.json", JSON.stringify(inventory, null, 2));
console.log("Inventory saved to batch4_inventory.json");
