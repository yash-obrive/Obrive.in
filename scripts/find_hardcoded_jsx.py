import os
import re

def find_hardcoded_text(start_dir):
    jsx_text_pattern = re.compile(r'>\s*([a-zA-Z][^<>{}]*[a-zA-Z0-9.?!])\s*<')
    
    for root, dirs, files in os.walk(start_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    try:
                        content = f.read()
                        matches = jsx_text_pattern.finditer(content)
                        for match in matches:
                            text = match.group(1).strip()
                            if text and len(text) > 1 and not text.startswith("Translate text="):
                                print(f"{filepath}: {text}")
                    except Exception as e:
                        pass

find_hardcoded_text('src/app/(public)')
find_hardcoded_text('src/components')
