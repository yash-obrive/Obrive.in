import json
import time
from deep_translator import GoogleTranslator

def process_translation(text):
    # Ensure specific words are in English
    replacements = {
        'एआई': 'AI', 'ए.आई': 'AI', 'ए.आई.': 'AI',
        'एआर': 'AR', 'ए.आर': 'AR', 'ए.आर.': 'AR',
        'वीआर': 'VR', 'वी.आर': 'VR', 'वी.आर.': 'VR',
        'एमआर': 'MR', 'एम.आर': 'MR', 'एम.आर.': 'MR',
        'ऑब्रिव': 'Obrive', 'ओब्राइव': 'Obrive', 'ऑब्राइव': 'Obrive', 'ओब्रिव': 'Obrive',
        'ओबीपार्क': 'OBPARK', 'ओबीनेस्ट': 'OBNEST'
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text

def main():
    with open('src/dictionaries/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    with open('src/dictionaries/hi.json', 'r', encoding='utf-8') as f:
        hi_data = json.load(f)
    
    missing_keys = [k for k in en_data.keys() if k not in hi_data]
    print(f"Total missing keys: {len(missing_keys)}")
    
    translator = GoogleTranslator(source='en', target='hi')
    
    batch_keys = []
    batch_values = []
    current_len = 0
    DELIMITER = " \n~|~ "
    
    def translate_and_save(b_keys, b_values):
        if not b_keys: return
        text_to_translate = DELIMITER.join(b_values)
        try:
            translated_text = translator.translate(text_to_translate)
            translated_parts = [p.strip() for p in translated_text.split("~|~")]
            
            # If mismatch due to some translation issue, fallback to individual translation
            if len(translated_parts) != len(b_keys):
                print(f"Mismatch in batch translation. Fallback to individual for {len(b_keys)} items.")
                for k, v in zip(b_keys, b_values):
                    try:
                        t = translator.translate(v)
                        hi_data[k] = process_translation(t)
                    except Exception as e:
                        print(f"Error translating {k}: {e}")
                        hi_data[k] = v # fallback to english
            else:
                for k, t in zip(b_keys, translated_parts):
                    hi_data[k] = process_translation(t)
            
            with open('src/dictionaries/hi.json', 'w', encoding='utf-8') as f:
                json.dump(hi_data, f, indent=2, ensure_ascii=False)
                
        except Exception as e:
            print(f"Batch translation failed: {e}")
            for k, v in zip(b_keys, b_values):
                hi_data[k] = v

    for i, key in enumerate(missing_keys):
        val = en_data[key]
        if not isinstance(val, str):
            val = str(val)
            
        if current_len + len(val) + len(DELIMITER) > 4000:
            print(f"Translating batch up to {i}/{len(missing_keys)}...")
            translate_and_save(batch_keys, batch_values)
            batch_keys = []
            batch_values = []
            current_len = 0
            time.sleep(1) # prevent rate limit
            
        batch_keys.append(key)
        batch_values.append(val)
        current_len += len(val) + len(DELIMITER)
        
    if batch_keys:
        print(f"Translating final batch...")
        translate_and_save(batch_keys, batch_values)
        
    print("Translation complete.")

if __name__ == "__main__":
    main()
