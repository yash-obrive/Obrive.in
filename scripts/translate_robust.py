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

def safe_translate(text):
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
            res = ts.translate_text(core_text, translator=engine, from_language='en', to_language='ar')
            res = html.unescape(res)
            # STRIP DANGEROUS JSX CHARACTERS FROM THE TRANSLATION!
            res = res.replace('"', '').replace("'", "").replace("<", "").replace(">", "").replace("{", "").replace("}", "")
            return leading_ws + res + trailing_ws
        except Exception:
            continue
    return text

def is_translated(text):
    return bool(re.search(r'[\u0600-\u06FF]', str(text)))

def process_file(file_path):
    print(f"Translating {file_path}...")
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
                    if key in data and isinstance(data[key], str) and not is_translated(data[key]):
                        data[key] = safe_translate(data[key])
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        for k in ['benefit', 'description']:
                            if k in item and not is_translated(item[k]):
                                item[k] = safe_translate(item[k])
                new_frontmatter = "---\n" + yaml.dump(data, allow_unicode=True, sort_keys=False) + "---\n"
        except:
            new_frontmatter = "---\n" + frontmatter + "---\n"

    # Attributes
    attr_pattern = re.compile(r'\b(title|phase|header1|header2|quote|footerContent|closingStatement|description|subtitle|finalQuote|content)="([^"]+)"')
    def attr_replacer(match):
        key = match.group(1)
        val = match.group(2)
        if not is_translated(val) and re.search(r'[a-zA-Z]{2,}', val):
            return f'{key}="{safe_translate(val)}"'
        return match.group(0)
    
    body = attr_pattern.sub(attr_replacer, body)
    
    # Text between tags
    def text_replacer(m):
        text = m.group(1)
        if not is_translated(text) and re.search(r'[a-zA-Z]{2,}', text):
            return ">" + safe_translate(text) + "<"
        return m.group(0)
    
    body = re.sub(r'>([^<]+)<', text_replacer, body)

    # Naked lines (no tags at all)
    new_lines = []
    for line in body.split('\n'):
        if '<' not in line and '>' not in line and '{' not in line and '}' not in line and not line.startswith(('import ', 'export ', '`')):
            if re.search(r'[a-zA-Z]{2,}', line) and not is_translated(line):
                new_lines.append(safe_translate(line))
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

tasks = [f"src/content/ar/resources/{fname}" for fname in target_files]

with ThreadPoolExecutor(max_workers=6) as executor:
    executor.map(process_file, tasks)

print("Done Arabic fixes.")
