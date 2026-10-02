import json
import re

en_path = 'src/dictionaries/en.json'
with open(en_path, 'r', encoding='utf-8') as f:
    en_dict = json.load(f)

countries_path = 'src/config/countries.ts'
with open(countries_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all offices lists
offices_lists = re.findall(r'offices:\s*\[(.*?)\]', content, re.DOTALL)
all_cities = []
for lst in offices_lists:
    cities = re.findall(r'"([^"]+)"', lst)
    all_cities.extend(cities)

all_cities.extend(["Bengaluru, Karnataka, India", "Mumbai, Maharashtra, India", "Ahmedabad, Gujarat, India"])

for city in all_cities:
    if city not in en_dict:
        en_dict[city] = city
        print(f"Added {city} to en.json")

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_dict, f, ensure_ascii=False, indent=2)

print("Finished updating en.json")
