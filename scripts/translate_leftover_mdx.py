import os
import re
import yaml
import glob
import random
import html
from concurrent.futures import ThreadPoolExecutor
import translators as ts

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex', 'caiyun']

def safe_translate(text, target_lang):
    text = str(text)
    if not text or not text.strip(): return text
    leading_ws = text[:len(text) - len(text.lstrip())]
    trailing_ws = text[len(text.rstrip()):]
    core_text = text.strip()
    if not core_text: return text
    
    engines = list(ENGINES)
    random.shuffle(engines)
    for engine in engines:
        try:
            res = ts.translate_text(core_text, translator=engine, from_language='en', to_language=target_lang)
            return leading_ws + html.unescape(res) + trailing_ws
        except Exception:
            continue
    return text

def is_translated(text, lang):
    if lang == "ar": return bool(re.search(r'[\u0600-\u06FF]', str(text)))
    if lang == "ja": return bool(re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', str(text)))
    if lang == "ko": return bool(re.search(r'[\uAC00-\uD7A3]', str(text)))
    if lang in ("zh-CN", "zh"): return bool(re.search(r'[\u4E00-\u9FAF]', str(text)))
    if lang == "th": return bool(re.search(r'[\u0E00-\u0E7F]', str(text)))
    # for roman languages, check if it contains common english words or lacks target language characteristics.
    # Actually, simpler: if it has been translated, we assume it's fine unless we are sure it's English.
    return False

def translate_mdx_file(file_path, target_lang, lang_code):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception: return False
    
    modified = False

    # Only process body attributes and text between tags for now since frontmatter was mostly covered.
    # Wait, frontmatter might have English too if it failed previously.
    parts = content.split('---\n', 2)
    new_frontmatter = ""
    body = content
    if len(parts) >= 3 and content.startswith('---'):
        frontmatter = parts[1]
        body = parts[2]
        try:
            data = yaml.safe_load(frontmatter)
            if data:
                for key in ['title', 'quote', 'seoDescription', 'description', 'headline']:
                    if key in data and isinstance(data[key], str) and not is_translated(data[key], target_lang):
                        if lang_code in ("ar", "ja", "ko", "zh", "th"):
                            # We can strictly check if it's not translated
                            if not is_translated(data[key], lang_code):
                                data[key] = safe_translate(data[key], target_lang)
                                modified = True
                        else:
                            # Harder to detect, we'll force translate if it's clearly english text like "The"
                            pass
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        for k in ['benefit', 'description']:
                            if k in item and not is_translated(item[k], target_lang):
                                if lang_code in ("ar", "ja", "ko", "zh", "th") and not is_translated(item[k], lang_code):
                                    item[k] = safe_translate(item[k], target_lang)
                                    modified = True
                new_frontmatter = "---\n" + yaml.dump(data, allow_unicode=True, sort_keys=False) + "---\n"
        except:
            new_frontmatter = "---\n" + frontmatter + "---\n"

    # Translate attributes
    attr_pattern = re.compile(r'\b(title|phase|header1|header2|quote|footerContent|closingStatement|description|subtitle|finalQuote|content)="([^"]+)"')
    def attr_replacer(match):
        nonlocal modified
        key = match.group(1)
        val = match.group(2)
        if lang_code in ("ar", "ja", "ko", "zh", "th") and not is_translated(val, lang_code) and re.search(r'[a-zA-Z]{3,}', val):
            modified = True
            return f'{key}="{safe_translate(val, target_lang)}"'
        return match.group(0)
    
    body = attr_pattern.sub(attr_replacer, body)
    
    # Text between tags
    def text_replacer(m):
        nonlocal modified
        text = m.group(1)
        if lang_code in ("ar", "ja", "ko", "zh", "th") and not is_translated(text, lang_code) and re.search(r'[a-zA-Z]{3,}', text):
            modified = True
            return ">" + safe_translate(text, target_lang) + "<"
        return m.group(0)
    
    body = re.sub(r'>([^<]+)<', text_replacer, body)
    
    if modified:
        new_content = new_frontmatter + body
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed leftover English in {file_path}")
        return True
    return False

LANGUAGE_MAP = {
    "ar": "ar", "ja": "ja", "ko": "ko", "th": "th", "zh": "zh-CN",
    # Ignoring roman languages for this automatic detection since regex won't reliably tell apart English vs Spanish
}

tasks = []
for lang_code, target_lang in LANGUAGE_MAP.items():
    files = glob.glob(f'src/content/{lang_code}/**/*.mdx', recursive=True)
    for f in files:
        tasks.append((f, target_lang, lang_code))

print(f"Checking {len(tasks)} files for leftover English...")
with ThreadPoolExecutor(max_workers=50) as executor:
    for path, lang, lcode in tasks:
        executor.submit(translate_mdx_file, path, lang, lcode)
        
print("Done checking leftovers.")
