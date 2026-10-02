import { Project, SyntaxKind } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

const project = new Project();
project.addSourceFilesAtPaths("src/constants/pages/**/*.ts");
project.addSourceFilesAtPaths("src/constants/*.ts");

const enDictPath = path.join(process.cwd(), "src/dictionaries/en.json");
const enDict = JSON.parse(fs.readFileSync(enDictPath, "utf-8"));

// Keys to ignore (we don't want to translate URLs or IDs)
const ignoreKeys = new Set(["id", "href", "url", "icon", "className", "slug", "date", "path", "author"]);

let addedCount = 0;

for (const sourceFile of project.getSourceFiles()) {
  console.log(`Scanning ${sourceFile.getFilePath()}`);
  
  const propertyAssignments = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
  
  for (const prop of propertyAssignments) {
    const nameNode = prop.getNameNode();
    let keyName = "";
    
    if (nameNode.getKind() === SyntaxKind.Identifier) {
      keyName = nameNode.getText();
    } else if (nameNode.getKind() === SyntaxKind.StringLiteral) {
      keyName = nameNode.getText().replace(/['"]/g, "");
    }
    
    if (ignoreKeys.has(keyName)) {
      continue;
    }
    
    const initializer = prop.getInitializer();
    if (initializer && initializer.getKind() === SyntaxKind.StringLiteral) {
      const stringLiteral = initializer.asKind(SyntaxKind.StringLiteral);
      if (!stringLiteral) continue;
      // Need to safely evaluate the string literal (handling escapes)
      let text = stringLiteral.getLiteralValue();
      
      if (text.startsWith("/") || text.startsWith("http")) continue;
      if (text.length < 2) continue;
      // Skip pure numbers or single words that are likely internal keys
      if (/^[a-zA-Z0-9_-]+$/.test(text) && !text.includes(' ') && text.length < 15 && keyName !== 'title' && keyName !== 'category' && keyName !== 'heading') continue;
      
      if (!enDict[text]) {
        enDict[text] = text;
        addedCount++;
      }
    }
  }
}

console.log(`Added ${addedCount} new strings to en.json`);
fs.writeFileSync(enDictPath, JSON.stringify(enDict, null, 2));
