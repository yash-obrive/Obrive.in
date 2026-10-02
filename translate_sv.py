import json
import time
import translators as ts
import re

def protect_terms(text):
    # Just to be safe, we temporarily wrap important terms in something that won't be translated, or simply rely on Bing.
    # Bing usually respects acronyms. Let's just rely on Bing for now, but we'll fix Obrive if it's altered.
    return text

def main():
    with open("src/dictionaries/en.json", "r", encoding="utf-8") as f:
        en_data = json.load(f)
    
    with open("src/dictionaries/sv.json", "r", encoding="utf-8") as f:
        sv_data = json.load(f)

    # Order keys properly: we want to keep the original en.json order.
    # missing keys:
    missing_keys = [k for k in en_data if k not in sv_data]
    print(f"Total missing keys to translate: {len(missing_keys)}")
    
    chunk_size = 20
    delim = "\n\n@@@\n\n"
    
    for i in range(0, len(missing_keys), chunk_size):
        chunk_keys = missing_keys[i:i+chunk_size]
        chunk_vals = [en_data[k] for k in chunk_keys]
        
        text_to_translate = delim.join(chunk_vals)
        
        try:
            translated_text = ts.translate_text(text_to_translate, translator="bing", to_language="sv")
            translated_vals = translated_text.split(delim)
            
            # Clean up whitespace
            translated_vals = [v.strip() for v in translated_vals]
            
            if len(translated_vals) == len(chunk_vals):
                for k, v in zip(chunk_keys, translated_vals):
                    sv_data[k] = v
            else:
                # If delimiter got lost or messed up, fallback to individual
                print(f"Delimiter mismatch on chunk {i}. Expected {len(chunk_vals)}, got {len(translated_vals)}. Falling back to individual.")
                for k in chunk_keys:
                    try:
                        sv_data[k] = ts.translate_text(en_data[k], translator="bing", to_language="sv")
                    except Exception as e_ind:
                        print(f"Error on individual key '{k}': {e_ind}")
                        sv_data[k] = en_data[k]
        except Exception as e:
            print(f"Error on chunk {i}: {e}. Retrying individually.")
            for k in chunk_keys:
                try:
                    sv_data[k] = ts.translate_text(en_data[k], translator="bing", to_language="sv")
                except Exception as e_ind:
                    print(f"Error on individual key '{k}': {e_ind}")
                    sv_data[k] = en_data[k]
        
        # Save progress
        # To ensure the final output retains order of en.json:
        final_sv_data = {}
        for k in en_data:
            if k in sv_data:
                final_sv_data[k] = sv_data[k]
                
        with open("src/dictionaries/sv.json", "w", encoding="utf-8") as f:
            json.dump(final_sv_data, f, ensure_ascii=False, indent=2)
            
        print(f"Translated {min(i + chunk_size, len(missing_keys))} / {len(missing_keys)}")
        time.sleep(1)

if __name__ == "__main__":
    main()
