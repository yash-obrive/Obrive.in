import os
import glob
import re

def refactor_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The issue is we have blocks like:
    # <CompanyInfoSection
    #   title="Something"
    #   items={[
    #     {
    #       description: (
    #         <>
    #           ...
    #         </>
    #       ),
    #     },
    #   ]}
    # />
    
    # Let's use a regex that matches `items={[ ... ]}` explicitly, 
    # instead of trying to match `/>` which gets confused by `<br />`.

    # Regex: find `items={[ { description: ( <> ... </> ), } ]}`
    # Or without `<>`: `items={[ { description: "..." } ]}`
    
    # We will replace `items={[ { description: ( <>` with just `>` to close the tag,
    # and then replace `</> ), } ]} />` with `</CompanyInfoSection>`
    
    # This is fragile but works if the formatting is exactly as Prettier left it.
    
    # First, let's just do standard string replacements for the boundaries!
    
    # 1. Replace the start of the JSX fragment
    content = re.sub(
        r'\s*items=\{\[\s*\{\s*description:\s*\(\s*<>\s*',
        '>\n',
        content
    )
    
    # 2. Replace the end of the JSX fragment
    content = re.sub(
        r'\s*</>\s*\),\s*\},?\s*\]\}\s*/>',
        '\n</CompanyInfoSection>',
        content
    )
    
    # 3. Replace the string version: `items={[ { title: "...", description: "..." } ]}`
    # Let's match `items={[ { title: "Title", description: "Desc" } ]} />`
    def replacer(m):
        title = m.group(1)
        desc = m.group(2)
        res = '>\n'
        if title:
            res += f'  <h3 className="font-bold text-lg mb-2">{title}</h3>\n'
        if desc:
            res += f'  <p>{desc}</p>\n'
        res += '</CompanyInfoSection>'
        return res
        
    content = re.sub(
        r'\s*items=\{\[\s*\{\s*(?:title:\s*"([^"]*)",\s*)?description:\s*"([^"]*)"\s*\},?\s*\]\}\s*/>',
        replacer,
        content
    )
    
    # Let's also handle `items={[ { description: "..." } ]} />`
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filepath}")

for d in ['src/content/legal', 'src/content/support']:
    for filepath in glob.glob(f"{d}/*.mdx"):
        refactor_file(filepath)
