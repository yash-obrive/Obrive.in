import os
import re
import translators as ts
import yaml
import glob
import random
from concurrent.futures import ThreadPoolExecutor

os.environ["translators_default_region"] = "EN"

ENGINES = ['google', 'bing', 'alibaba', 'yandex']

LANGUAGE_MAP = {
    "ar": "ar",
    "de": "de",
    "es": "es",
    "fr": "fr",
    "id": "id",
    "it": "it",
    "ja": "ja",
    "ko": "ko",
    "ms": "ms",
    "nl": "nl",
    "pt": "pt",
    "sv": "sv",
    "th": "th",
    "zh": "zh-CN",
}

def is_translated(text, lang):
    # Rough heuristic to check if a string is already translated
    if lang == "ar": return bool(re.search(r'[\u0600-\u06FF]', str(text)))
    if lang == "ja": return bool(re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', str(text)))
    if lang == "ko": return bool(re.search(r'[\uAC00-\uD7A3]', str(text)))
    if lang == "zh-CN" or lang == "zh": return bool(re.search(r'[\u4E00-\u9FAF]', str(text)))
    if lang == "th": return bool(re.search(r'[\u0E00-\u0E7F]', str(text)))
    return False

def safe_translate(text, target_lang):
    if not text or not str(text).strip(): return text
    
    engines = list(ENGINES)
    random.shuffle(engines)
    
    for engine in engines:
        try:
            return ts.translate_text(str(text), translator=engine, from_language='en', to_language=target_lang)
        except Exception as e:
            continue
            
    print(f"All engines failed for {target_lang}:", str(text)[:50])
    return text

def translate_mdx(args):
    file_path, lang_code, target_lang = args
    print(f"Reading {file_path} [{lang_code}]...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    parts = content.split('---\n')
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = '---\n'.join(parts[2:])
        
        try:
            data = yaml.safe_load(frontmatter)
            if data:
                for key in ['title', 'quote', 'seoDescription', 'description', 'headline']:
                    if key in data and isinstance(data[key], str):
                        if not is_translated(data[key], lang_code):
                            data[key] = safe_translate(data[key], target_lang)
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        if 'benefit' in item and not is_translated(item['benefit'], lang_code): 
                            item['benefit'] = safe_translate(item['benefit'], target_lang)
                        if 'description' in item and not is_translated(item['description'], lang_code): 
                            item['description'] = safe_translate(item['description'], target_lang)
                
                new_frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
        except Exception as e:
            new_frontmatter = frontmatter
    else:
        new_frontmatter = ""
        body = content

    new_lines = []
    for line in body.split('\n'):
        if 'title="' in line:
            match = re.search(r'title="([^"]+)"', line)
            if match:
                orig = match.group(1)
                if not is_translated(orig, lang_code):
                    trans = safe_translate(orig, target_lang)
                    line = line.replace(f'title="{orig}"', f'title="{trans}"')
        
        if 'description="' in line:
            match = re.search(r'description="([^"]+)"', line)
            if match:
                orig = match.group(1)
                if not is_translated(orig, lang_code):
                    trans = safe_translate(orig, target_lang)
                    line = line.replace(f'description="{orig}"', f'description="{trans}"')

        stripped = line.strip()
        if stripped and not stripped.startswith(('<', 'import ', 'export ', '{', '}', '-', '#', '`')):
            if not bool(re.match(r'^[\W_]+$', stripped)):
                if not is_translated(line, lang_code):
                    line = safe_translate(line, target_lang)
        
        new_lines.append(line)
            
    if new_frontmatter:
        new_content = "---\n" + new_frontmatter + "---\n" + '\n'.join(new_lines)
    else:
        new_content = '\n'.join(new_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished {file_path} [{lang_code}]")

tasks = []
for lang_code, target_lang in LANGUAGE_MAP.items():
    if lang_code == "en": continue
    files = glob.glob(f'src/content/{lang_code}/**/*.mdx', recursive=True)
    for f in files:
        tasks.append((f, lang_code, target_lang))

print(f"Found {len(tasks)} MDX files to translate across {len(LANGUAGE_MAP)} languages.")

with ThreadPoolExecutor(max_workers=30) as executor:
    executor.map(translate_mdx, tasks)
