import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    original = content
    
    # 1. Remove <StyledText> from data arrays inside TheImpactTable
    # We find data={[ ... ]} and replace <StyledText>Text</StyledText> with "Text"
    def data_repl(m):
        data_content = m.group(1)
        # Replace <StyledText>Something</StyledText> with "Something" (make sure to add quotes)
        # Actually it's written like: feature: <StyledText>Accessibility</StyledText>
        # So we should replace `<StyledText>Text</StyledText>` with `"Text"`
        clean_data = re.sub(r'<StyledText>([\s\S]*?)</StyledText>', r'"\1"', data_content)
        return f"data={{{clean_data}}}"

    content = re.sub(r'data=\{([\s\S]*?)\}', data_repl, content)

    # 2. Add bold: true to the first column if firstColumnBold={false} is used
    # Or just inject bold: true to the first column of columns={[ ... ]}
    def col_repl(m):
        cols_content = m.group(1)
        # If it doesn't already have bold: true, add it to the first object
        if 'bold: true' not in cols_content:
            cols_content = re.sub(r'(\{\s*key:\s*"[^"]*",\s*header:\s*"[^"]*",\s*width:\s*"[^"]*",)', r'\1\n      bold: true,', cols_content, count=1)
        return f"columns={{{cols_content}}}"

    content = re.sub(r'columns=\{([\s\S]*?)\}', col_repl, content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for filepath in glob.glob("src/content/resources/*.mdx"):
    fix_file(filepath)

print("Done fixing TheImpactTable data!")
