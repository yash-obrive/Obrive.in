const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/(company-info)/docs/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace everything from const DOCS_MARKDOWN = ... down to the end of the file.
content = content.replace(/const DOCS_MARKDOWN = `[\s\S]*$/, `import { headers } from "next/headers";
import { type LanguageCode } from "@/config/languages";
import { notFound } from "next/navigation";
import { getCompanyInfoBySlug, sharedMdxOptions } from "@/lib/mdx";

export default async function DocsPage() {
  const headerList = await headers();
  const language = (headerList.get("x-obrive-language") as LanguageCode) || "en";

  const docsDoc = await getCompanyInfoBySlug("index", "docs", language);

  if (!docsDoc) {
    notFound();
  }

  const components = createCompanyInfoMDXComponents(docsDoc.metadata);

  return (
    <div className="bg-white min-h-screen">
      <CompanyInfoTemplate metadata={{ title: "Documentation" }} type="docs">
        <MDXRemote 
          source={docsDoc.content} 
          components={components} 
          options={sharedMdxOptions}
        />
      </CompanyInfoTemplate>
    </div>
  );
}
`);

fs.writeFileSync(filePath, content);
console.log('Updated docs page.');
