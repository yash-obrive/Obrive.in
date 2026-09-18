import os
import glob
import re

def refactor_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Match JSX fragment with optional title
    # items={[ { title: "...", description: ( <> ...
    def replacer_jsx(m):
        title = m.group(1)
        res = '>\n'
        if title:
            res += f'  <h3 className="font-bold text-lg mb-2">{title}</h3>\n'
        return res

    content = re.sub(
        r'\s*items=\{\[\s*\{\s*(?:title:\s*"([^"]*)",\s*)?description:\s*\(\s*<>\s*',
        replacer_jsx,
        content
    )
    
    # End of JSX fragment (already handled correctly by previous script but just in case)
    content = re.sub(
        r'\s*</>\s*\),\s*\},?\s*\]\}\s*/>',
        '\n</CompanyInfoSection>',
        content
    )

    # 2. Match string description with optional title
    # items={[ { title: "...", description: "..." } ]} />
    def replacer_str(m):
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
        replacer_str,
        content
    )

    # 3. Match missing items with arrays like:
    # items={[ { title: "Title" } ]}
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filepath}")

for d in ['src/content/legal', 'src/content/support']:
    for filepath in glob.glob(f"{d}/*.mdx"):
        refactor_file(filepath)
