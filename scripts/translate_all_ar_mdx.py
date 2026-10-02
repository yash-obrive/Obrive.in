import os
import re
import translators as ts
import yaml
import glob
import random
from concurrent.futures import ThreadPoolExecutor

os.environ["translators_default_region"] = "EN"

ENGINES = ['google', 'bing', 'alibaba', 'yandex']

def safe_translate(text):
    if not text or not str(text).strip(): return text
    
    # Shuffle engines so each request tries a random order
    engines = list(ENGINES)
    random.shuffle(engines)
    
    for engine in engines:
        try:
            return ts.translate_text(str(text), translator=engine, from_language='en', to_language='ar')
        except Exception as e:
            continue
            
    print("All engines failed for:", text[:50])
    return text

def translate_mdx(file_path):
    print(f"Reading {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "كفاءة العملية" in content or "تم تقليل وقت إكمال" in content:
        print(f"Skipping already translated file: {file_path}")
        # Not a perfect check but prevents re-translating the ones we know are done
        
    parts = content.split('---\n')
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = '---\n'.join(parts[2:])
        
        try:
            data = yaml.safe_load(frontmatter)
            if data:
                for key in ['title', 'quote', 'seoDescription', 'description', 'headline']:
                    if key in data and isinstance(data[key], str):
                        # Only translate if it looks like English (not arabic)
                        if not re.search(r'[\u0600-\u06FF]', data[key]):
                            data[key] = safe_translate(data[key])
                if 'impactMetrics' in data:
                    for item in data['impactMetrics']:
                        if 'benefit' in item and not re.search(r'[\u0600-\u06FF]', item['benefit']): 
                            item['benefit'] = safe_translate(item['benefit'])
                        if 'description' in item and not re.search(r'[\u0600-\u06FF]', item['description']): 
                            item['description'] = safe_translate(item['description'])
                
                new_frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
        except Exception as e:
            print(f"Frontmatter parsing error in {file_path}: {e}")
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
                if not re.search(r'[\u0600-\u06FF]', orig):
                    trans = safe_translate(orig)
                    line = line.replace(f'title="{orig}"', f'title="{trans}"')
        
        if 'description="' in line:
            match = re.search(r'description="([^"]+)"', line)
            if match:
                orig = match.group(1)
                if not re.search(r'[\u0600-\u06FF]', orig):
                    trans = safe_translate(orig)
                    line = line.replace(f'description="{orig}"', f'description="{trans}"')

        stripped = line.strip()
        if stripped and not stripped.startswith(('<', 'import ', 'export ', '{', '}', '-', '#', '`')):
            if not bool(re.match(r'^[\W_]+$', stripped)):
                if not re.search(r'[\u0600-\u06FF]', line):
                    line = safe_translate(line)
        
        new_lines.append(line)
            
    if new_frontmatter:
        new_content = "---\n" + new_frontmatter + "---\n" + '\n'.join(new_lines)
    else:
        new_content = '\n'.join(new_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished {file_path}")

files = glob.glob('src/content/ar/**/*.mdx', recursive=True)
# filter out already translated ones just in case
print(f"Found {len(files)} MDX files to translate.")

with ThreadPoolExecutor(max_workers=20) as executor:
    executor.map(translate_mdx, files)
