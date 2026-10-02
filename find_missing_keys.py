import json

def main():
    with open('src/dictionaries/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    with open('src/dictionaries/hi.json', 'r', encoding='utf-8') as f:
        hi_data = json.load(f)
    
    missing = {}
    for key, value in en_data.items():
        if key not in hi_data:
            missing[key] = value
            
    with open('missing.json', 'w', encoding='utf-8') as f:
        json.dump(missing, f, indent=2, ensure_ascii=False)
        
    print(f"Found {len(missing)} missing keys.")

if __name__ == "__main__":
    main()
