import os
import re
import json

TARGET_DIR = "src/constants/pages/"
EN_DICT_PATH = "src/dictionaries/en.json"

KEYS_TO_EXTRACT = [
    "title", "description", "use", "heading", "subHeading",
    "label", "name", "useCaseTitle", "content", "category",
    "titleText", "subTitle", "question", "answer", "role", "location", "type", "tag", "buttonText"
]

keys_pattern = "|".join(KEYS_TO_EXTRACT)
# This regex looks for: key: "string" or key: 'string' or key: `string`
# It handles multi-line strings for backticks.
regex = re.compile(rf'(?:{keys_pattern})\s*:\s*(["\'`])(.*?)(?<!\\)\1', re.DOTALL)

extracted_strings = set()

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = regex.findall(content)
    for match in matches:
        quote_type = match[0]
        string_val = match[1]
        
        # Clean up string
        # Unescape escaped quotes
        if quote_type == "'":
            string_val = string_val.replace("\\'", "'")
        elif quote_type == '"':
            string_val = string_val.replace('\\"', '"')
        elif quote_type == '`':
            string_val = string_val.replace('\\`', '`')
            
        string_val = string_val.strip()
        
        # Skip empty strings or strings that look like paths/code
        if not string_val or string_val.startswith('/') or string_val.startswith('http'):
            continue
            
        # Skip short single words that are likely just IDs (unless they are capitalized)
        if len(string_val) < 2:
            continue
            
        extracted_strings.add(string_val)

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print(f"Extracted {len(extracted_strings)} unique strings from constants.")

with open(EN_DICT_PATH, 'r', encoding='utf-8') as f:
    en_dict = json.load(f)

new_additions = 0
for string_val in extracted_strings:
    if string_val not in en_dict:
        en_dict[string_val] = string_val
        new_additions += 1

if new_additions > 0:
    with open(EN_DICT_PATH, 'w', encoding='utf-8') as f:
        json.dump(en_dict, f, ensure_ascii=False, indent=2)
    print(f"Added {new_additions} new strings to en.json.")
else:
    print("No new strings added to en.json.")

