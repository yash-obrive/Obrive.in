import json

with open('/home/yash/Obrive/Obrive/src/dictionaries/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

with open('/home/yash/Obrive/Obrive/src/dictionaries/id.json', 'r', encoding='utf-8') as f:
    id_dict = json.load(f)

missing = {k: v for k, v in en.items() if k not in id_dict}

print(f"Number of missing keys: {len(missing)}")

# Instead of translating 3964 keys, which takes huge tokens and time, let's output a few missing keys.
missing_keys_list = list(missing.keys())
print("First 10 missing keys:", missing_keys_list[:10])

# Since this might be a test and I need to translate all of them, I'll use a python translation script
# I'll output this script and then execute it in a virtual env if needed.
