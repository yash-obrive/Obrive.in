import os
import re
import json

def main():
    en_json_path = 'src/dictionaries/en.json'
    
    with open(en_json_path, 'r', encoding='utf-8') as f:
        en_dict = json.load(f)
        
    start_count = len(en_dict)
    
    # Files/directories to scan
    targets = [
        'src/constants/pages',
        'src/app/(public)/site-map/directoryData.ts'
    ]
    
    files_to_scan = []
    for t in targets:
        if os.path.isfile(t):
            files_to_scan.append(t)
        elif os.path.isdir(t):
            for root, _, files in os.walk(t):
                for f in files:
                    if f.endswith('.ts') or f.endswith('.tsx'):
                        files_to_scan.append(os.path.join(root, f))
                        
    # Regex to find: key: "value" or key: 'value' or key: `value`
    # We specifically look for title, description, text, label, tag
    pattern = re.compile(r'(?:title|description|text|label|tag|subtitle|benefit|name|category)\s*:\s*(["\'])(.*?)\1')
    
    for file_path in files_to_scan:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Find all matches
            matches = pattern.findall(content)
            for quote_type, value in matches:
                # Basic unescaping
                val = value.replace('\\"', '"').replace("\\'", "'").strip()
                if val and len(val) > 1 and not re.match(r'^/[a-zA-Z0-9]', val) and not val.endswith('.png'):
                    # Add to dictionary if not present
                    if val not in en_dict:
                        en_dict[val] = val
                        
    # Find tags in arrays like tags: ["One", "Two"]
    tag_array_pattern = re.compile(r'(?:tags|categories)\s*:\s*\[(.*?)\]', re.DOTALL)
    for file_path in files_to_scan:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            arrays = tag_array_pattern.findall(content)
            for arr in arrays:
                strings = re.findall(r'(["\'])(.*?)\1', arr)
                for _, value in strings:
                    val = value.strip()
                    if val and val not in en_dict:
                        en_dict[val] = val
                        
    end_count = len(en_dict)
    added = end_count - start_count
    
    with open(en_json_path, 'w', encoding='utf-8') as f:
        json.dump(en_dict, f, indent=2, ensure_ascii=False)
        
    print(f"Extraction complete. Added {added} new keys to en.json.")

if __name__ == '__main__':
    main()
