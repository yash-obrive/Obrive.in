import fs from "node:fs";
import path from "node:path";
import MagicString from "magic-string";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import ts from "typescript";

const MIGRATION_MAP = {
  ResourceStrategicApproachSection: {
    targetItemTag: "StrategicStepItem",
    arrayProp: "steps",
    contentProp: "description",
    isArray: true,
  },
  StrategicApproachSection: {
    targetItemTag: "StrategicStepItem",
    arrayProp: "steps",
    contentProp: "description",
    isArray: true,
  },
  ResourceChallengeSection: { singleProp: "content", isSingle: true },
  ChallengeSection: { singleProp: "content", isSingle: true },
};

function transformJsxSnippet(jsxString, _config) {
  const sourceFile = ts.createSourceFile(
    "snippet.tsx",
    jsxString,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let modified = false;

  function extractContent(expr) {
    while (ts.isParenthesizedExpression(expr)) expr = expr.expression;
    if (ts.isJsxFragment(expr)) {
      return expr.children.map((c) => {
        if (ts.isJsxText(c)) {
          const dedented = c.text
            .split("\n")
            .map((line) => line.replace(/^[ \t]+/, ""))
            .join("\n");
          return ts.factory.createJsxText(dedented);
        }
        return c;
      });
    } else if (ts.isJsxElement(expr)) return [expr];
    else if (
      ts.isStringLiteral(expr) ||
      ts.isNoSubstitutionTemplateLiteral(expr)
    )
      return [ts.factory.createJsxText(expr.text)];
    else return [ts.factory.createJsxExpression(undefined, expr)];
  }

  function visit(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = ts.isJsxElement(node)
        ? node.openingElement.tagName.getText()
        : node.tagName.getText();
      const cfg = MIGRATION_MAP[tagName];

      if (cfg) {
        const attributes = ts.isJsxElement(node)
          ? node.openingElement.attributes
          : node.attributes;
        const newAttributes = [];
        const newChildren = ts.isJsxElement(node) ? [...node.children] : [];
        let transformed = false;

        attributes.properties.forEach((attr) => {
          if (
            cfg.isArray &&
            ts.isJsxAttribute(attr) &&
            attr.name.getText() === cfg.arrayProp
          ) {
            transformed = true;
            const initializer = attr.initializer;
            let expr = initializer;
            if (ts.isJsxExpression(initializer)) expr = initializer.expression;

            if (ts.isArrayLiteralExpression(expr)) {
              expr.elements.forEach((element, index) => {
                if (ts.isObjectLiteralExpression(element)) {
                  const itemProps = [];
                  const itemChildren = [];
                  itemProps.push(
                    ts.factory.createJsxAttribute(
                      ts.factory.createIdentifier("stepNumber"),
                      ts.factory.createStringLiteral(String(index + 1)),
                    ),
                  );

                  element.properties.forEach((prop) => {
                    if (ts.isPropertyAssignment(prop)) {
                      const propName = prop.name.getText();
                      if (propName === cfg.contentProp) {
                        itemChildren.push(...extractContent(prop.initializer));
                      } else {
                        const attrValue = ts.isStringLiteral(prop.initializer)
                          ? prop.initializer
                          : ts.factory.createJsxExpression(
                              undefined,
                              prop.initializer,
                            );
                        itemProps.push(
                          ts.factory.createJsxAttribute(
                            ts.factory.createIdentifier(propName),
                            attrValue,
                          ),
                        );
                      }
                    }
                  });
                  const itemElement = ts.factory.createJsxElement(
                    ts.factory.createJsxOpeningElement(
                      ts.factory.createIdentifier(cfg.targetItemTag),
                      undefined,
                      ts.factory.createJsxAttributes(itemProps),
                    ),
                    itemChildren,
                    ts.factory.createJsxClosingElement(
                      ts.factory.createIdentifier(cfg.targetItemTag),
                    ),
                  );
                  newChildren.push(ts.factory.createJsxText("\n"));
                  newChildren.push(itemElement);
                  newChildren.push(ts.factory.createJsxText("\n"));
                }
              });
            }
          } else if (
            cfg.isSingle &&
            ts.isJsxAttribute(attr) &&
            attr.name.getText() === cfg.singleProp
          ) {
            transformed = true;
            const initializer = attr.initializer;
            let expr = initializer;
            if (ts.isJsxExpression(initializer)) expr = initializer.expression;

            newChildren.push(ts.factory.createJsxText("\n"));
            newChildren.push(...extractContent(expr));
            newChildren.push(ts.factory.createJsxText("\n"));
          } else {
            newAttributes.push(attr);
          }
        });

        if (transformed) {
          modified = true;
          return ts.factory.createJsxElement(
            ts.factory.createJsxOpeningElement(
              ts.factory.createIdentifier(tagName),
              undefined,
              ts.factory.createJsxAttributes(newAttributes),
            ),
            newChildren,
            ts.factory.createJsxClosingElement(
              ts.factory.createIdentifier(tagName),
            ),
          );
        }
      }
    }
    return ts.visitEachChild(node, visit, undefined);
  }

  const result = ts.visitNode(sourceFile, visit);
  if (modified) {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer
      .printNode(ts.EmitHint.Unspecified, result.statements[0], sourceFile)
      .replace(/;$/, "");
  }
  return null;
}

function processFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  let ast;
  try {
    ast = fromMarkdown(code, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });
  } catch (e) {
    console.error("Error parsing", filePath, e);
    return;
  }

  const ms = new MagicString(code);
  let changed = false;

  const traverse = (node) => {
    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      if (MIGRATION_MAP[node.name]) {
        const snippet = code.substring(
          node.position.start.offset,
          node.position.end.offset,
        );
        const transformedSnippet = transformJsxSnippet(
          snippet,
          MIGRATION_MAP[node.name],
        );
        if (transformedSnippet) {
          changed = true;
          ms.overwrite(
            node.position.start.offset,
            node.position.end.offset,
            transformedSnippet,
          );
        }
      }
    }
    if (node.children) node.children.forEach(traverse);
  };

  traverse(ast);

  if (changed) {
    fs.writeFileSync(filePath, ms.toString());
    console.log(`[MIGRATED BATCH 2]: ${filePath}`);
  }
}

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

mdxFiles.forEach(processFile);
console.log("Batch 2 migration completed.");
