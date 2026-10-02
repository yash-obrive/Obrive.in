import os
import re
import yaml
import glob
import random
import html
from concurrent.futures import ThreadPoolExecutor
import translators as ts

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex']

LANGUAGE_MAP = {
    "ar": "ar", "de": "de", "es": "es", "fr": "fr", "id": "id",
    "it": "it", "ja": "ja", "ko": "ko", "ms": "ms", "nl": "nl",
    "pt": "pt", "sv": "sv", "th": "th", "zh": "zh-CN",
}

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
            res = html.unescape(res)
            # STRIP DANGEROUS JSX CHARACTERS FROM THE TRANSLATION!
            res = res.replace('"', '').replace("'", "").replace("<", "").replace(">", "").replace("{", "").replace("}", "")
            return leading_ws + res + trailing_ws
        except Exception:
            continue
    return text

def is_translated(text, lang_code):
    if lang_code == "ar": return bool(re.search(r'[\u0600-\u06FF]', str(text)))
    if lang_code == "ja": return bool(re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', str(text)))
    if lang_code == "ko": return bool(re.search(r'[\uAC00-\uD7A3]', str(text)))
    if lang_code in ("zh-CN", "zh"): return bool(re.search(r'[\u4E00-\u9FAF]', str(text)))
    if lang_code == "th": return bool(re.search(r'[\u0E00-\u0E7F]', str(text)))
    return False

def process_file(file_path):
    parts_path = file_path.split('/')
    lang_code = parts_path[2]
    target_lang = LANGUAGE_MAP[lang_code]

    print(f"Translating {file_path} to {target_lang}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception: return False
    
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
                    if key in data and isinstance(data[key], str):
                        if lang_code in ("ar", "ja", "ko", "zh", "th") and is_translated(data[key], lang_code):
                            continue
                        data[key] = safe_translate(data[key], target_lang)
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        for k in ['benefit', 'description']:
                            if k in item:
                                if lang_code in ("ar", "ja", "ko", "zh", "th") and is_translated(item[k], lang_code):
                                    continue
                                item[k] = safe_translate(item[k], target_lang)
                new_frontmatter = "---\n" + yaml.dump(data, allow_unicode=True, sort_keys=False) + "---\n"
        except:
            new_frontmatter = "---\n" + frontmatter + "---\n"

    # Attributes
    attr_pattern = re.compile(r'\b(title|phase|header1|header2|quote|footerContent|closingStatement|description|subtitle|finalQuote|content)="([^"]+)"')
    def attr_replacer(match):
        key = match.group(1)
        val = match.group(2)
        if lang_code in ("ar", "ja", "ko", "zh", "th") and is_translated(val, lang_code):
            return match.group(0)
        if re.search(r'[a-zA-Z]{2,}', val):
            return f'{key}="{safe_translate(val, target_lang)}"'
        return match.group(0)
    
    body = attr_pattern.sub(attr_replacer, body)
    
    # Text between tags
    def text_replacer(m):
        text = m.group(1)
        if lang_code in ("ar", "ja", "ko", "zh", "th") and is_translated(text, lang_code):
            return m.group(0)
        if re.search(r'[a-zA-Z]{2,}', text):
            return ">" + safe_translate(text, target_lang) + "<"
        return m.group(0)
    
    body = re.sub(r'>([^<]+)<', text_replacer, body)

    # Naked lines (no tags at all)
    new_lines = []
    for line in body.split('\n'):
        if '<' not in line and '>' not in line and '{' not in line and '}' not in line and not line.startswith(('import ', 'export ', '`')):
            if lang_code in ("ar", "ja", "ko", "zh", "th") and is_translated(line, lang_code):
                new_lines.append(line)
            elif re.search(r'[a-zA-Z]{2,}', line):
                new_lines.append(safe_translate(line, target_lang))
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    new_content = new_frontmatter + '\n'.join(new_lines)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished {file_path}")

target_files = [
    "ar-vr-mr-differences-business-use-cases-2025.mdx",
    "ar-powered-car-parking-systems-urban-mobility-challenges.mdx",
    "future-augmented-reality-business-trends-2025.mdx",
    "ar-onboarding.mdx",
    "spatial-flow.mdx",
    "bringing-onboarding-to-life.mdx"
]

tasks = []
for lang_code in LANGUAGE_MAP.keys():
    for fname in target_files:
        p = f"src/content/{lang_code}/resources/{fname}"
        if os.path.exists(p):
            tasks.append(p)

with ThreadPoolExecutor(max_workers=20) as executor:
    executor.map(process_file, tasks)

print("Done ALL fixes.")
