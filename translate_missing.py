import urllib.request
import urllib.parse
import json
import time
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def translate_text(text):
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = urllib.request.urlopen(req, context=ctx)
            data = json.loads(response.read().decode("utf-8"))
            return "".join([x[0] for x in data[0] if x[0]])
        except Exception as e:
            if "HTTP Error 429" in str(e) or "Too Many Requests" in str(e):
                time.sleep(2 ** attempt)
            else:
                time.sleep(1)
    return ""

def main():
    with open("missing_keys.json") as f:
        missing = json.load(f)
    
    translated = {}
    if os.path.exists("missing_keys_translated.json"):
        with open("missing_keys_translated.json") as f:
            translated = json.load(f)
            
    keys = [k for k in missing.keys() if k not in translated]
    print(f"Total keys to translate: {len(keys)}")
    
    batch_size = 20
    for i in range(0, len(keys), batch_size):
        batch_keys = keys[i:i+batch_size]
        text_to_translate = " \n ~||~ \n ".join(batch_keys)
        
        print(f"Translating batch {i//batch_size + 1}/{len(keys)//batch_size + 1}...")
        res = translate_text(text_to_translate)
        
        parts = [p.strip() for p in res.split("~||~")]
        
        if len(parts) == len(batch_keys):
            for k, v in zip(batch_keys, parts):
                translated[k] = v
        else:
            print("Mismatch in batch, translating individually...")
            for k in batch_keys:
                translated[k] = translate_text(k).strip()
                time.sleep(0.5)
                
        with open("missing_keys_translated.json", "w", encoding="utf-8") as f:
            json.dump(translated, f, ensure_ascii=False, indent=2)
            
        time.sleep(1.5)
        
    print("Translation complete!")

if __name__ == "__main__":
    main()
