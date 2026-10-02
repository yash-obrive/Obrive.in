import json
import os
import re

with open('public_hardcoded.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

file_strings = {}
for line in lines:
    parts = line.split(': ', 1)
    if len(parts) == 2:
        file = parts[0]
        string = parts[1].strip()
        if file not in file_strings:
            file_strings[file] = []
        file_strings[file].append(string)

# Load existing en.json
en_path = 'src/dictionaries/en.json'
with open(en_path, 'r', encoding='utf-8') as f:
    en_dict = json.load(f)

new_keys_added = 0
for file, strings in file_strings.items():
    if not os.path.exists(file):
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    modified = False
    
    for s in strings:
        # Avoid double replacing or replacing inside imports
        if s not in en_dict:
            en_dict[s] = s
            new_keys_added += 1
            
        # We need to replace > String < with > <Translate text="String" /> <
        # Since string could have newlines or spacing, this is tricky. 
        # A simpler way is to replace the exact string in context.
        # Let's try string replacement
        escaped_s = s.replace('"', '\\"')
        
        # If the string spans multiple lines in the source, it's harder, but public_hardcoded.txt only captures one line at a time.
        # Let's use a regex to match the string between tags
        # Just simple replacement for now, if it's surrounded by > and <
        pattern = r'>(\s*)' + re.escape(s) + r'(\s*)<'
        replacement = r'>\1<Translate text="' + escaped_s + r'" />\2<'
        new_content, count = re.subn(pattern, replacement, content)
        if count > 0:
            content = new_content
            modified = True
            
    if modified:
        if 'import Translate from' not in content:
            # Add to top
            content = 'import Translate from "@/components/shared/Translate";\n' + content
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_dict, f, indent=2, ensure_ascii=False)
    
print(f"Added {new_keys_added} new keys to en.json")
