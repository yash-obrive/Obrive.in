import os, glob

def fix(content):
    # This is a very specific string replacer that replaces the exact items={[ { ... } ]} patterns
    
    # Let's replace the outer items array structure
    content = content.replace("  items={[\n", "")
    content = content.replace("  items={[\n", "")
    
    # For single items without title
    content = content.replace("    {\n      description: (\n        <>\n", "")
    content = content.replace("    {\n      description:\n        ", "")
    
    # For items with title
    import re
    # Match: { \n title: "Title", \n description: ( \n <> \n
    content = re.sub(
        r'\s*\{\s*title:\s*"([^"]*)",\s*description:\s*\(\s*<>\s*',
        r'\n  <h3 className="font-bold text-lg mb-2">\1</h3>\n',
        content
    )
    
    # Match: { \n title: "Title", \n description: "Desc", \n },
    content = re.sub(
        r'\s*\{\s*title:\s*"([^"]*)",\s*description:\s*"([^"]*)"\s*\},',
        r'\n  <h3 className="font-bold text-lg mb-2">\1</h3>\n  <p>\2</p>\n',
        content
    )
    
    # Match: { \n description: "Desc", \n },
    content = re.sub(
        r'\s*\{\s*description:\s*"([^"]*)"\s*\},',
        r'\n  <p>\1</p>\n',
        content
    )
    
    # Close tags
    content = content.replace("        </>\n      ),\n    },\n  ]}\n/>", "</CompanyInfoSection>")
    content = content.replace("        </>\n      ),\n    },\n", "")
    content = content.replace("      ),\n    },\n", "")
    content = content.replace("  ]}\n/>", "</CompanyInfoSection>")
    content = content.replace("  ]}\n", "")
    
    # Open tags that were <CompanyInfoSection \n title="...">
    content = re.sub(
        r'<CompanyInfoSection\s*title="([^"]*)"',
        r'<CompanyInfoSection title="\1">',
        content
    )
    content = content.replace('<CompanyInfoSection\n>', '<CompanyInfoSection>')
    content = content.replace('<CompanyInfoSection\n  title', '<CompanyInfoSection title')
    
    # Final cleanup of any remaining />
    # We want to replace <CompanyInfoSection> ... /> with <CompanyInfoSection> ... </CompanyInfoSection>
    # Actually, we already changed /> to </CompanyInfoSection> for the ones that had ]} \n />
    
    return content

for d in ['src/content/legal', 'src/content/support']:
    for filepath in glob.glob(f"{d}/*.mdx"):
        with open(filepath, 'r') as f:
            c = f.read()
            
        # We need to make sure <CompanyInfoSection> is opened properly
        c = c.replace('<CompanyInfoSection\n  items={[', '<CompanyInfoSection>')
        
        c = fix(c)
        with open(filepath, 'w') as f:
            f.write(c)

