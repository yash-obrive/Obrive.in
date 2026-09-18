import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const mdxFiles = [
  'src/content/resources/client-immersive-onboarding.mdx',
  'src/content/resources/spatial-flow.mdx',
  'src/content/resources/web-vr-vs-app-vr-enterprises.mdx',
  'src/content/resources/ar-vr-mr-differences-business-use-cases-2025.mdx',
  'src/content/resources/webar-vs-app-ar-business-solution.mdx',
  'src/content/resources/ar-onboarding.mdx'
];

for (const filePath of mdxFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let hasChanges = false;
  
  // We need to do this carefully. Since the AST migrator works on the full file, we will find TheImpactTable
  // and manually slice/replace it.
  
  const pseudoWrapper = `export default function MDX() { return (<>\n`;
  const pseudoCode = `${pseudoWrapper}${content}\n</>); }`;
  const wrapperLength = pseudoWrapper.length;
  
  const sourceFile = ts.createSourceFile('temp.tsx', pseudoCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  
  const replacements = [];
  
  function extractJsxText(text) {
    if (text.startsWith('<>') && text.endsWith('</>')) {
      return text.substring(2, text.length - 3);
    }
    if (text.startsWith('{') && text.endsWith('}')) {
      const inner = text.substring(1, text.length - 1).trim();
      if (inner.startsWith('<') && inner.endsWith('>')) return inner;
      if (inner.startsWith('`') && inner.endsWith('`')) return inner.substring(1, inner.length - 1);
      return text;
    }
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.substring(1, text.length - 1);
    }
    return text;
  }
  
  function visit(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = ts.isJsxElement(node) ? node.openingElement.tagName.getText(sourceFile) : node.tagName.getText(sourceFile);
      if (tagName === 'TheImpactTable' || tagName === 'ResourceTheImpactTable') {
        const attributes = ts.isJsxElement(node) ? node.openingElement.attributes.properties : node.attributes.properties;
        let metricsAttr = null;
        let dataAttr = null;
        let columnsAttr = null;
        
        for (const attr of attributes) {
          if (!ts.isJsxAttribute(attr)) continue;
          const name = attr.name.getText(sourceFile);
          if (name === 'metrics') metricsAttr = attr;
          if (name === 'data') dataAttr = attr;
          if (name === 'columns') columnsAttr = attr;
        }
        
        if (metricsAttr || dataAttr) {
          // We have a table to migrate
          let newChildrenText = '';
          
          if (metricsAttr) {
            const arrayLiteral = metricsAttr.initializer.expression;
            if (ts.isArrayLiteralExpression(arrayLiteral)) {
              for (const el of arrayLiteral.elements) {
                if (ts.isObjectLiteralExpression(el)) {
                  let metric = '', before = '', after = '';
                  for (const prop of el.properties) {
                    if (ts.isPropertyAssignment(prop)) {
                      const propName = prop.name.getText(sourceFile);
                      const propInit = prop.initializer.getText(sourceFile);
                      if (propName === 'metric') metric = propInit;
                      if (propName === 'beforeObrive') before = propInit;
                      if (propName === 'afterObrive') after = propInit;
                    }
                  }
                  newChildrenText += `\n  <ImpactTableMetric\n    metric={${metric}}\n    beforeObrive={${before}}\n    afterObrive={${after}}\n  />`;
                }
              }
            }
            newChildrenText += '\n';
          } else if (dataAttr && columnsAttr) {
            // dynamic mode
            const columnsArray = columnsAttr.initializer.expression;
            const headersMap = {}; // key -> header string
            if (ts.isArrayLiteralExpression(columnsArray)) {
              for (const el of columnsArray.elements) {
                if (ts.isObjectLiteralExpression(el)) {
                  let key = '', header = '';
                  for (const prop of el.properties) {
                    if (ts.isPropertyAssignment(prop)) {
                      const propName = prop.name.getText(sourceFile);
                      const propInit = prop.initializer.getText(sourceFile);
                      if (propName === 'key') key = extractJsxText(propInit);
                      if (propName === 'header') header = propInit;
                    }
                  }
                  headersMap[key] = header;
                }
              }
            }
            
            const dataArray = dataAttr.initializer.expression;
            if (ts.isArrayLiteralExpression(dataArray)) {
              for (const el of dataArray.elements) {
                if (ts.isObjectLiteralExpression(el)) {
                  newChildrenText += `\n  <ImpactTableRow>`;
                  for (const prop of el.properties) {
                    if (ts.isPropertyAssignment(prop)) {
                      const propName = prop.name.getText(sourceFile);
                      const propInit = extractJsxText(prop.initializer.getText(sourceFile));
                      const headerVal = headersMap[propName] || `"${propName}"`;
                      newChildrenText += `\n    <ImpactTableCell header={${headerVal}}>\n      ${propInit}\n    </ImpactTableCell>`;
                    }
                  }
                  newChildrenText += `\n  </ImpactTableRow>`;
                }
              }
            }
            newChildrenText += '\n';
          }
          
          // Now we replace the node!
          let originalOpeningText = '';
          if (ts.isJsxElement(node)) {
            originalOpeningText = node.openingElement.getText(sourceFile);
          } else {
            originalOpeningText = node.getText(sourceFile);
            // remove trailing '/>'
            originalOpeningText = originalOpeningText.substring(0, originalOpeningText.length - 2).trim();
            originalOpeningText += '>';
          }
          
          // Remove the metrics and data attributes
          if (metricsAttr) {
            originalOpeningText = originalOpeningText.replace(metricsAttr.getText(sourceFile), '');
          }
          if (dataAttr) {
            originalOpeningText = originalOpeningText.replace(dataAttr.getText(sourceFile), '');
          }
          
          // Fix spacing
          originalOpeningText = originalOpeningText.replace(/\s+>/g, '>');
          
          const newJsx = `${originalOpeningText}${newChildrenText}</${tagName}>`;
          
          // The node text includes the pseudo wrapper offset, so we just use the string matching on the original content.
          // Or we can calculate position exactly if we account for the pseudo code shift.
          const start = node.getStart(sourceFile) - wrapperLength;
          const end = node.getEnd() - wrapperLength;
          
          replacements.push({ start, end, newText: newJsx });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  if (replacements.length > 0) {
    // apply from back to front
    replacements.sort((a, b) => b.start - a.start);
    for (const rep of replacements) {
      content = content.substring(0, rep.start) + rep.newText + content.substring(rep.end);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Migrated ${filePath}`);
  }
}
