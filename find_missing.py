import json

with open('src/dictionaries/en.json', 'r') as f:
    en_data = json.load(f)

with open('src/dictionaries/nl.json', 'r') as f:
    nl_data = json.load(f)

missing = {}
for key, value in en_data.items():
    if key not in nl_data:
        missing[key] = value

with open('missing.json', 'w') as f:
    json.dump(missing, f, indent=2)

print(f"Found {len(missing)} missing keys.")
