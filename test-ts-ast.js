const ts = require("typescript");

const code = `
<WhyItWorkedSection
  title="Test"
  items={[
    {
      title: "Item 1",
      description: (
        <>
          Some <strong>bold</strong> text.
        </>
      )
    },
    {
      description: "String desc"
    }
  ]}
/>
`;

const sourceFile = ts.createSourceFile(
  "test.tsx",
  code,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

function visit(node) {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    const tagName = ts.isJsxElement(node)
      ? node.openingElement.tagName.getText()
      : node.tagName.getText();
    if (tagName === "WhyItWorkedSection") {
      const attributes = ts.isJsxElement(node)
        ? node.openingElement.attributes
        : node.attributes;
      const newAttributes = [];
      const newChildren = [];
      let itemsPropFound = false;

      attributes.properties.forEach((attr) => {
        if (ts.isJsxAttribute(attr) && attr.name.getText() === "items") {
          itemsPropFound = true;
          const initializer = attr.initializer;
          if (
            ts.isJsxExpression(initializer) &&
            ts.isArrayLiteralExpression(initializer.expression)
          ) {
            initializer.expression.elements.forEach((element) => {
              if (ts.isObjectLiteralExpression(element)) {
                const itemProps = [];
                const itemChildren = [];
                element.properties.forEach((prop) => {
                  if (ts.isPropertyAssignment(prop)) {
                    const propName = prop.name.getText();
                    const propValue = prop.initializer;

                    if (propName === "description") {
                      if (
                        ts.isJsxElement(propValue) ||
                        ts.isJsxFragment(propValue)
                      ) {
                        // Extract children of fragment or element
                        if (ts.isJsxFragment(propValue)) {
                          itemChildren.push(...propValue.children);
                        } else {
                          itemChildren.push(propValue);
                        }
                      } else if (
                        ts.isStringLiteral(propValue) ||
                        ts.isNoSubstitutionTemplateLiteral(propValue)
                      ) {
                        itemChildren.push(
                          ts.factory.createJsxText(propValue.text),
                        );
                      } else {
                        // fallback for other expressions
                        itemChildren.push(
                          ts.factory.createJsxExpression(undefined, propValue),
                        );
                      }
                    } else {
                      // other props like title become JSX attributes
                      let attrValue;
                      if (ts.isStringLiteral(propValue)) {
                        attrValue = propValue;
                      } else {
                        attrValue = ts.factory.createJsxExpression(
                          undefined,
                          propValue,
                        );
                      }
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
                    ts.factory.createIdentifier("WhyItWorkedItem"),
                    undefined,
                    ts.factory.createJsxAttributes(itemProps),
                  ),
                  itemChildren,
                  ts.factory.createJsxClosingElement(
                    ts.factory.createIdentifier("WhyItWorkedItem"),
                  ),
                );
                newChildren.push(itemElement);
              }
            });
          }
        } else {
          newAttributes.push(attr);
        }
      });

      if (itemsPropFound) {
        // Create new node
        const newNode = ts.factory.createJsxElement(
          ts.factory.createJsxOpeningElement(
            ts.factory.createIdentifier(tagName),
            undefined,
            ts.factory.createJsxAttributes(newAttributes),
          ),
          [...newChildren],
          ts.factory.createJsxClosingElement(
            ts.factory.createIdentifier(tagName),
          ),
        );
        return newNode;
      }
    }
  }
  return ts.visitEachChild(node, visit, undefined);
}

const result = ts.visitNode(sourceFile, visit);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
console.log(printer.printNode(ts.EmitHint.Unspecified, result, sourceFile));
