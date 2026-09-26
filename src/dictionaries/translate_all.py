import json
import os
import time
import random
from deep_translator import GoogleTranslator

LANGUAGES = ['ar', 'hi', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'th']

# Some google-translator language codes differ slightly from ours (e.g. zh -> zh-CN)
def get_translator_lang(lang):
    if lang == 'zh':
        return 'zh-CN'
    return lang

script_dir = os.path.dirname(os.path.abspath(__file__))
en_path = os.path.join(script_dir, "en.json")
with open(en_path, "r", encoding="utf-8") as f:
    en_dict = json.load(f)

for lang in ['ar', 'hi', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh', 'ja', 'ko', 'ms', 'id', 'th']:
    print(f"\\n--- Translating to {lang} ---")
    translator_lang = get_translator_lang(lang)
    translator = GoogleTranslator(source='en', target=translator_lang)
    
    file_path = os.path.join(script_dir, f"{lang}.json")
    
    # Load existing translations if file exists
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            try:
                lang_dict = json.load(f)
            except:
                lang_dict = {}
    else:
        lang_dict = {}
        
    missing_keys = [k for k in en_dict.keys() if k not in lang_dict]
    print(f"Found {len(missing_keys)} missing keys for {lang}.")
    
    count = 0
    batch_save_count = 0
    
    for key in missing_keys:
        val = en_dict[key]
        if not val or not str(val).strip():
            lang_dict[key] = val
            continue
            
        
        max_retries = 3
        for attempt in range(max_retries):
            try:
                translated_text = translator.translate(val)
                lang_dict[key] = translated_text
                time.sleep(0.1) # slight delay to avoid rate limit
                break
            except Exception as e:
                if attempt < max_retries - 1:
                    sleep_time = (2 ** attempt) + random.uniform(0, 1)
                    print(f"Rate limited on '{key}'. Retrying in {sleep_time:.2f}s...")
                    time.sleep(sleep_time)
                    # Re-initialize translator just in case
                    translator = GoogleTranslator(source='en', target=translator_lang)
                else:
                    print(f"Error translating '{key}': {e}")
                    lang_dict[key] = val # fallback to english
            
        count += 1
        batch_save_count += 1
        
        if count % 50 == 0:
            print(f"Translated {count}/{len(missing_keys)} for {lang}...")
            
        if batch_save_count >= 100:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(lang_dict, f, ensure_ascii=False, indent=2)
            batch_save_count = 0
            time.sleep(1) # rate limit
            
    # Final save
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(lang_dict, f, ensure_ascii=False, indent=2)
    
    print(f"Finished {lang}.")
