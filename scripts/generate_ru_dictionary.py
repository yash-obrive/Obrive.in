import json
import os
import random
import html
import translators as ts
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex']

def safe_translate(text, target_lang):
    if not text.strip():
        return text
    engines = list(ENGINES)
    random.shuffle(engines)
    for engine in engines:
        try:
            res = ts.translate_text(text, translator=engine, from_language='en', to_language=target_lang)
            if res:
                res = html.unescape(res)
                res = res.replace('\"', '').replace("'", "")
                return res
        except Exception:
            pass
    return text

def main():
    en_path = "src/dictionaries/en.json"
    ru_path = "src/dictionaries/ru.json"

    with open(en_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    if os.path.exists(ru_path):
        with open(ru_path, 'r', encoding='utf-8') as f:
            ru_data = json.load(f)
    else:
        ru_data = {}

    keys_to_translate = [k for k in en_data.keys() if k not in ru_data or ru_data[k] == k]
    print(f"Keys to translate to ru: {len(keys_to_translate)}")

    if not keys_to_translate:
        print("Everything is translated!")
        return

    def process_key(key):
        return key, safe_translate(key, "ru")

    start_time = time.time()
    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = {executor.submit(process_key, key): key for key in keys_to_translate}
        count = 0
        for future in as_completed(futures):
            key, trans = future.result()
            ru_data[key] = trans
            count += 1
            if count % 100 == 0:
                print(f"Translated {count}/{len(keys_to_translate)}")
                # Save periodically
                with open(ru_path, 'w', encoding='utf-8') as f:
                    json.dump(ru_data, f, ensure_ascii=False, indent=2)

    with open(ru_path, 'w', encoding='utf-8') as f:
        json.dump(ru_data, f, ensure_ascii=False, indent=2)

    print(f"Finished generating ru.json in {time.time() - start_time:.2f} seconds!")

if __name__ == "__main__":
    main()
