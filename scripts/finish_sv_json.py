import json
import os
import translators as ts
from concurrent.futures import ThreadPoolExecutor
import random

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex']

en = json.load(open("src/dictionaries/en.json", "r"))
sv = json.load(open("src/dictionaries/sv.json", "r"))

def safe_translate(text):
    engines = list(ENGINES)
    random.shuffle(engines)
    for engine in engines:
        try:
            return ts.translate_text(text, translator=engine, from_language='en', to_language='sv')
        except:
            continue
    return text

missing = []
for k, v in en.items():
    if k not in sv or sv[k] == v:
        # only add if it actually has english text
        if any(c.isalpha() for c in v):
            missing.append((k, v))

print(f"Found {len(missing)} missing keys in Swedish.")

def process(item):
    k, v = item
    sv[k] = safe_translate(v)

with ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(process, missing)

with open("src/dictionaries/sv.json", "w", encoding='utf-8') as f:
    json.dump(sv, f, ensure_ascii=False, indent=2)

print("Swedish JSON done!")
