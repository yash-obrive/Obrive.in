import glob
import re

for filepath in glob.glob("src/content/**/*.mdx", recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    matches = re.finditer(r'<([A-Z]\w+)[^>]*(phases|steps)=\{\[', content)
    for m in matches:
        print(f"{filepath}: {m.group(1)} (prop: {m.group(2)})")
