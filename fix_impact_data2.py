import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    original = content
    
    # We will just replace exactly what we need
    content = re.sub(r'aspect:\s*<StyledText>([^<]+)</StyledText>', r'aspect: "\1"', content)
    content = re.sub(r'feature:\s*<StyledText>([^<]+)</StyledText>', r'feature: "\1"', content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for filepath in glob.glob("src/content/resources/*.mdx"):
    fix_file(filepath)

print("Done fixing TheImpactTable data!")
