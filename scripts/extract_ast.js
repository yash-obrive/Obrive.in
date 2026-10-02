const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const TARGET_DIR = path.join(__dirname, '../src/constants/pages');
const EN_DICT_PATH = path.join(__dirname, '../src/dictionaries/en.json');

const extractedStrings = new Set();

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
    );

    function visit(node) {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const text = node.text.trim();
            // Basic heuristic to avoid extracting IDs, paths, or code
            if (
                text.length >= 2 &&
                !text.startsWith('/') &&
                !text.startsWith('http') &&
                !text.match(/^[a-z0-9-]+$/) // Skip kebab-case IDs
            ) {
                extractedStrings.add(text);
            }
        }
        ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
}

walkDir(TARGET_DIR);

console.log(`Extracted ${extractedStrings.size} strings from AST.`);

const enDict = JSON.parse(fs.readFileSync(EN_DICT_PATH, 'utf8'));

let added = 0;
for (const str of extractedStrings) {
    if (!enDict[str]) {
        enDict[str] = str;
        added++;
    }
}

if (added > 0) {
    fs.writeFileSync(EN_DICT_PATH, JSON.stringify(enDict, null, 2) + '\n');
    console.log(`Added ${added} NEW strings to en.json!`);
} else {
    console.log("No new strings to add.");
}
