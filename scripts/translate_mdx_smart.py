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
    # Preserve whitespace at start and end
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
    return False

def translate_mdx_file(file_path, target_lang):
    print(f"Processing {file_path} into {target_lang}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

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
                        data[key] = safe_translate(data[key], target_lang)
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        if 'benefit' in item and not is_translated(item['benefit'], target_lang):
                            item['benefit'] = safe_translate(item['benefit'], target_lang)
                        if 'description' in item and not is_translated(item['description'], target_lang):
                            item['description'] = safe_translate(item['description'], target_lang)
                new_frontmatter = "---\n" + yaml.dump(data, allow_unicode=True, sort_keys=False) + "---\n"
        except:
            new_frontmatter = "---\n" + frontmatter + "---\n"
    
    # Process body
    # 1. Translate specific JSX attributes
    attr_pattern = re.compile(r'\b(title|phase|header1|header2|quote|footerContent|closingStatement|description|subtitle|finalQuote|content)="([^"]+)"')
    def attr_replacer(match):
        key = match.group(1)
        val = match.group(2)
        if not is_translated(val, target_lang) and re.search(r'[a-zA-Z]', val):
            return f'{key}="{safe_translate(val, target_lang)}"'
        return match.group(0)
    body = attr_pattern.sub(attr_replacer, body)

    # 2. Translate body text
    # We need to split by lines, but wait, some tags wrap lines.
    # If a line does NOT contain `<` or `{` and DOES contain English words, translate it.
    new_lines = []
    for line in body.split('\n'):
        # If line contains JSX component tags or imports, don't raw translate it, just leave it (attributes already translated above)
        if '<' in line or '>' in line or '{' in line or '}' in line or line.startswith(('import ', 'export ')):
            # Wait, what if it's `<StyledText>English</StyledText>`?
            # We can use regex to replace text between > and <
            def text_between_tags_replacer(m):
                text = m.group(1)
                if re.search(r'[a-zA-Z]{2,}', text) and not is_translated(text, target_lang):
                    return ">" + safe_translate(text, target_lang) + "<"
                return m.group(0)
            
            line = re.sub(r'>([^<]+)<', text_between_tags_replacer, line)
            new_lines.append(line)
        else:
            if re.search(r'[a-zA-Z]{2,}', line) and not is_translated(line, target_lang):
                new_lines.append(safe_translate(line, target_lang))
            else:
                new_lines.append(line)

    new_content = new_frontmatter + '\n'.join(new_lines)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Done {file_path}")

target_files = [
    "ar-vr-mr-differences-business-use-cases-2025.mdx",
    "ar-powered-car-parking-systems-urban-mobility-challenges.mdx",
    "future-augmented-reality-business-trends-2025.mdx",
    "ar-onboarding.mdx",
    "spatial-flow.mdx",
    "bringing-onboarding-to-life.mdx"
]

LANGUAGE_MAP = {
    "ar": "ar", "de": "de", "es": "es", "fr": "fr", "id": "id",
    "it": "it", "ja": "ja", "ko": "ko", "ms": "ms", "nl": "nl",
    "pt": "pt", "sv": "sv", "th": "th", "zh": "zh-CN",
}

tasks = []
for lang_code, target_lang in LANGUAGE_MAP.items():
    if lang_code == "en": continue
    for fname in target_files:
        path = f"src/content/{lang_code}/resources/{fname}"
        if os.path.exists(path):
            tasks.append((path, target_lang))

with ThreadPoolExecutor(max_workers=20) as executor:
    for path, lang in tasks:
        executor.submit(translate_mdx_file, path, lang)

print("Finished targeted files.")
