import json
import os
import random
import html
import translators as ts

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex']

missing_strings = [
    "Obcrew",
    "Obnavi",
    "Obmove"
]

LANGUAGE_MAP = {
    "ar": "ar", "de": "de", "es": "es", "fr": "fr", "id": "id",
    "it": "it", "ja": "ja", "ko": "ko", "ms": "ms", "nl": "nl",
    "pt": "pt", "sv": "sv", "th": "th", "zh": "zh-CN"
}

def safe_translate(text, target_lang):
    if target_lang == "en":
        return text
    engines = list(ENGINES)
    random.shuffle(engines)
    for engine in engines:
        try:
            res = ts.translate_text(text, translator=engine, from_language='en', to_language=target_lang)
            res = html.unescape(res)
            # Remove quotes just in case
            res = res.replace('\"', '').replace("'", "")
            return res
        except Exception:
            continue
    return text

# Update EN first
en_path = "src/dictionaries/en.json"
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

for s in missing_strings:
    en_data[s] = s

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print("Updated en.json")

# Update others
for lang_code, target_lang in LANGUAGE_MAP.items():
    p = f"src/dictionaries/{lang_code}.json"
    with open(p, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for s in missing_strings:
        if s not in data or data[s] == s: # Not translated yet
            trans = safe_translate(s, target_lang)
            data[s] = trans
            
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Updated {lang_code}.json")

print("All dictionaries updated!")
