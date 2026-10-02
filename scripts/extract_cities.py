import re
import json

def main():
    en_json_path = 'src/dictionaries/en.json'
    
    with open(en_json_path, 'r', encoding='utf-8') as f:
        en_dict = json.load(f)
        
    start_count = len(en_dict)
    
    pattern = re.compile(r'(?:cities|region)\s*:\s*(["\'])(.*?)\1')
    
    with open('src/components/pages/global/globalData.ts', 'r', encoding='utf-8') as f:
        content = f.read()
        matches = pattern.findall(content)
        for _, value in matches:
            val = value.replace('\\"', '"').replace("\\'", "'").strip()
            if val and val not in en_dict:
                en_dict[val] = val
                
    end_count = len(en_dict)
    added = end_count - start_count
    
    with open(en_json_path, 'w', encoding='utf-8') as f:
        json.dump(en_dict, f, indent=2, ensure_ascii=False)
        
    print(f"Extraction complete. Added {added} new keys to en.json.")

if __name__ == '__main__':
    main()
