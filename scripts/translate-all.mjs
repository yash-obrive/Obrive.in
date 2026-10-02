import { Project, SyntaxKind } from 'ts-morph';
import { translate } from '@vitalets/google-translate-api';
import fs from 'fs';
import path from 'path';

const project = new Project();
project.addSourceFilesAtPaths([
  'src/app/(public)/**/*.tsx',
  'src/components/pages/**/*.tsx',
  'src/components/shared/**/*.tsx',
]);

const stringsToTranslate = new Set();
const EXCLUDE_TERMS = ["Obrive", "Obpark", "Obcrew", "Obnavi", "Obnest", "Obmove", "AI", "AR", "VR", "MR"];

function shouldTranslate(text) {
  text = text.trim();
  if (!text) return false;
  if (/^[0-9\W]+$/.test(text)) return false; // only numbers and symbols
  if (EXCLUDE_TERMS.includes(text)) return false;
  return true;
}

function escapeHtml(str) {
  return str.replace(/"/g, '&quot;');
}

async function run() {
  const sourceFiles = project.getSourceFiles();

  for (const file of sourceFiles) {
    if (file.getFilePath().includes('TranslationContext') || file.getFilePath().includes('Translate.tsx')) continue;

    let modified = false;

    // Handle JSX Text
    const jsxTexts = file.getDescendantsOfKind(SyntaxKind.JsxText);
    for (const jsxText of jsxTexts) {
      const text = jsxText.getLiteralText().trim();
      if (shouldTranslate(text)) {
        stringsToTranslate.add(text);
        
        // Ensure import exists
        if (!file.getImportDeclaration(decl => decl.getModuleSpecifierValue() === '@/components/shared/Translate')) {
          file.addImportDeclaration({
            defaultImport: 'Translate',
            moduleSpecifier: '@/components/shared/Translate'
          });
        }
        
        jsxText.replaceWithText(` <Translate text="${escapeHtml(text)}" /> `);
        modified = true;
      }
    }

    if (modified) {
      file.saveSync();
      console.log(`Modified: ${file.getFilePath()}`);
    }
  }

  const enDict = {};
  for (const text of stringsToTranslate) {
    enDict[text] = text;
  }
  
  fs.writeFileSync('src/dictionaries/en.json', JSON.stringify(enDict, null, 2));
  console.log(`Extracted ${stringsToTranslate.size} strings.`);

  // Translation phase
  const languages = ["hi", "ar", "es", "pt", "fr", "de", "nl", "sv", "it", "zh-CN", "ja", "ko", "ms", "id", "th"];
  const targetMap = { "zh-CN": "zh" }; // map for our locale codes

  for (const lang of languages) {
    const locale = targetMap[lang] || lang;
    console.log(`Translating to ${locale}...`);
    const dict = {};
    for (const text of stringsToTranslate) {
      try {
        const res = await translate(text, { to: lang });
        dict[text] = res.text;
      } catch (e) {
        console.error(`Failed to translate "${text}" to ${lang}`);
        dict[text] = text; // fallback
      }
    }
    fs.writeFileSync(`src/dictionaries/${locale}.json`, JSON.stringify(dict, null, 2));
  }

  console.log("Done!");
}

run();
