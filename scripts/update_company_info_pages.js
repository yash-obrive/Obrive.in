const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/(company-info)/security/page.tsx',
  'src/app/(company-info)/security/[slug]/page.tsx',
  'src/app/(company-info)/terms-accessibility/page.tsx',
  'src/app/(company-info)/support/[slug]/page.tsx',
  'src/app/(company-info)/legal/[slug]/page.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has headers import
    if (!content.includes('import { headers } from "next/headers";')) {
      // Find the last import and insert after it
      const lastImportMatch = [...content.matchAll(/^import .*?;?\n/gm)].pop();
      if (lastImportMatch) {
        const insertIndex = lastImportMatch.index + lastImportMatch[0].length;
        content = content.slice(0, insertIndex) + `import { headers } from "next/headers";\nimport { type LanguageCode } from "@/config/languages";\n` + content.slice(insertIndex);
      }
    }

    // Replace getCompanyInfoBySlug calls
    const functionMatch = content.match(/export default async function \w+\((.*?)\) \{/);
    if (functionMatch) {
      const funcStart = functionMatch.index + functionMatch[0].length;
      const getLang = `\n  const headerList = await headers();\n  const language = (headerList.get("x-obrive-language") as LanguageCode) || "en";\n`;
      if (!content.includes('headerList.get("x-obrive-language")')) {
        content = content.slice(0, funcStart) + getLang + content.slice(funcStart);
      }
    }

    // Update the getCompanyInfoBySlug call to include language
    content = content.replace(/(getCompanyInfoBySlug\("[^"]+",\s*"[^"]+")\)/g, '$1, language)');
    content = content.replace(/(getCompanyInfoBySlug\(slug,\s*"[^"]+")\)/g, '$1, language)');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
