import os
import re
import glob

def fix_rtl_classes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Text align
    content = re.sub(r'\btext-left\b', 'text-start', content)
    content = re.sub(r'\btext-right\b', 'text-end', content)
    
    # Margins and Paddings
    def repl(m):
        prefix = m.group(1) or ""
        prop = m.group(2)
        val = m.group(3)
        mapping = {'ml': 'ms', 'mr': 'me', 'pl': 'ps', 'pr': 'pe', 'left': 'start', 'right': 'end'}
        return f"{prefix}{mapping[prop]}-{val}"

    # Group 1: optional prefix, Group 2: prop, Group 3: value
    pattern = r'\b([a-zA-Z0-9-]+:)?(ml|mr|pl|pr|left|right)-([0-9]+|px|auto|\[[^\]]+\])\b'
    
    # Wait, we need to be careful with left-1/2 or translate-x-1/2 (it doesn't match this regex anyway because of 1/2)
    # Actually wait, `left-1/2` shouldn't be matched if we don't include `/` in the regex, which is good.
    # What about negative values like `-ml-4`?
    pattern2 = r'(-)?([a-zA-Z0-9-]+:)?(ml|mr|pl|pr|left|right)-([0-9]+|px|auto|\[[^\]]+\])\b'
    
    def repl2(m):
        neg = m.group(1) or ""
        prefix = m.group(2) or ""
        prop = m.group(3)
        val = m.group(4)
        mapping = {'ml': 'ms', 'mr': 'me', 'pl': 'ps', 'pr': 'pe', 'left': 'start', 'right': 'end'}
        return f"{neg}{prefix}{mapping[prop]}-{val}"
        
    content = re.sub(pattern2, repl2, content)
    
    if original != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file_path}")

target_dirs = ['src/components/', 'src/app/(public)/']
files = []
for d in target_dirs:
    for f in glob.glob(d + '**/*.tsx', recursive=True):
        files.append(f)

for f in files:
    fix_rtl_classes(f)

print("Done fixing RTL classes.")
