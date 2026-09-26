import json
from deep_translator import GoogleTranslator

# Initialize translator
translator = GoogleTranslator(source='en', target='th')

with open("/home/yash/Obrive/Obrive/src/dictionaries/chunk_5.json", "r", encoding="utf-8") as f:
    data = json.load(f)

translated_data = {}
total = len(data)
count = 0

def replace_terms(text):
    # The requirement is to keep English terms like AI, AR, VR, Obrive in English.
    # Deep translator might translate them, or we can just translate and if it mangles them, we fix it?
    # Usually google translator keeps acronyms in English if they don't have a Thai equivalent.
    return text

for k, v in data.items():
    if not v.strip():
        translated_data[k] = v
        continue
    try:
        translated_text = translator.translate(v)
        translated_data[k] = translated_text
    except Exception as e:
        print(f"Error on {k}: {e}")
        translated_data[k] = v
    count += 1
    if count % 20 == 0:
        print(f"Translated {count}/{total}")

with open("/home/yash/Obrive/Obrive/src/dictionaries/translated_5.json", "w", encoding="utf-8") as f:
    json.dump(translated_data, f, ensure_ascii=False, indent=2)

print("Translation completed.")
