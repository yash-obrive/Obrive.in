import glob
import re

def fix_section(match, item_tag):
    # match.group(1) is everything before items=
    # match.group(2) is the content inside items={[ ... ]}
    
    before_items = match.group(1).rstrip()
    items_content = match.group(2)
    
    # We will extract each object.
    # An object starts with { and ends with },
    # but description can have ( ... ), <ul>...</ul>, etc.
    # We will just split by `{` and `}` carefully?
    # Better: use regex to find title: "..." and description: "..." or description: ( ... )
    
    # Let's find all items. Each item is essentially:
    # {
    #   title: "...",
    #   description: ...
    # },
    
    item_pattern = r'\{\s*(?:title:\s*"([^"]*)",\s*)?description:\s*(?:"([^"]*)"|\(\s*([\s\S]*?)\s*\))\s*,?\s*\}'
    
    children = []
    
    for item_match in re.finditer(item_pattern, items_content):
        title = item_match.group(1)
        desc_str = item_match.group(2)
        desc_jsx = item_match.group(3)
        
        inner = desc_str if desc_str is not None else desc_jsx
        
        if title:
            children.append(f'  <{item_tag} title="{title}">\n{inner}\n  </{item_tag}>')
        else:
            children.append(f'  <{item_tag}>\n{inner}\n  </{item_tag}>')
            
    children_str = "\n\n".join(children)
    
    if before_items.endswith(">"):
        return f"{before_items}\n{children_str}\n</{item_tag.replace('Item', 'Section')}>"
    else:
        return f"{before_items}\n  >\n{children_str}\n</{item_tag.replace('Item', 'Section')}>"

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
        
    original = content
    
    # Fix CareerSection
    content = re.sub(
        r'(<CareerSection[\s\S]*?)\s*items=\{\[([\s\S]*?)\]\}\s*/>',
        lambda m: fix_section(m, "CareerItem"),
        content
    )
    
    # Fix CompanyInfoSection
    content = re.sub(
        r'(<CompanyInfoSection[\s\S]*?)\s*items=\{\[([\s\S]*?)\]\}\s*/>',
        lambda m: fix_section(m, "CompanyInfoItem"),
        content
    )
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for filepath in glob.glob("src/content/**/*.mdx", recursive=True):
    process_file(filepath)
