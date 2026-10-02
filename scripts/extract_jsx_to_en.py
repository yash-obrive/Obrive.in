import os
import re
import json

def main():
    en_dict_path = 'src/dictionaries/en.json'
    with open(en_dict_path, 'r', encoding='utf-8') as f:
        en_dict = json.load(f)
        
    initial_count = len(en_dict)

    # regex for <Translate text="..."/>
    translate_pattern = re.compile(r'<Translate\s+text=["\'](.*?)["\']\s*/>', re.DOTALL)
    
    src_dirs = ['src/app/(public)', 'src/components']
    
    found_keys = set()
    
    for base_dir in src_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith('.tsx'):
                    filepath = os.path.join(root, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    matches = translate_pattern.finditer(content)
                    for match in matches:
                        text = match.group(1).replace('\n', ' ')
                        # fix multiple spaces from newlines
                        text = re.sub(r'\s+', ' ', text).strip()
                        if text:
                            found_keys.add(text)
                            
    # add missing keys to en_dict
    added = 0
    for key in found_keys:
        if key not in en_dict:
            en_dict[key] = key
            added += 1
            
    if added > 0:
        with open(en_dict_path, 'w', encoding='utf-8') as f:
            json.dump(en_dict, f, indent=2, ensure_ascii=False)
        print(f"Added {added} new keys to en.json. Total keys: {len(en_dict)}")
    else:
        print("No new keys found to add.")

if __name__ == '__main__':
    main()
