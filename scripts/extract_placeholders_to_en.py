import json
import re

files_with_placeholders = [
    'src/app/(public)/checkout/components/CheckoutForm.tsx',
    'src/app/(public)/contact/components/ContactForm.tsx',
    'src/app/(public)/site-map/components/DirectorySearch.tsx',
    'src/components/pages/apply/Details.tsx'
]

pattern = re.compile(r'placeholder=\{dict\["([^"]+)"\]')

en_path = 'src/dictionaries/en.json'
with open(en_path, 'r', encoding='utf-8') as f:
    en_dict = json.load(f)

for file_path in files_with_placeholders:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = pattern.finditer(content)
        for match in matches:
            key = match.group(1)
            if key not in en_dict:
                en_dict[key] = key
                print(f"Added placeholder key: {key}")
    except Exception as e:
        print(e)
        
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_dict, f, indent=2, ensure_ascii=False)
