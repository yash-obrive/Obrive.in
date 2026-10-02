import os
import re
import translators as ts
import yaml

os.environ["translators_default_region"] = "EN"

def safe_translate(text):
    if not text or not text.strip(): return text
    try:
        return ts.translate_text(text, translator='google', from_language='en', to_language='ar')
    except Exception as e:
        print("Error translating:", text, e)
        return text

def translate_mdx(file_path):
    print(f"Reading {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('---\n')
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = '---\n'.join(parts[2:])
        
        data = yaml.safe_load(frontmatter)
        if data:
            for key in ['title', 'quote', 'seoDescription', 'description', 'headline']:
                if key in data and isinstance(data[key], str):
                    data[key] = safe_translate(data[key])
            if 'impactMetrics' in data:
                for item in data['impactMetrics']:
                    if 'benefit' in item: item['benefit'] = safe_translate(item['benefit'])
                    if 'description' in item: item['description'] = safe_translate(item['description'])
            
            new_frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False)
    else:
        new_frontmatter = ""
        body = content

    new_lines = []
    for line in body.split('\n'):
        if 'title="' in line:
            match = re.search(r'title="([^"]+)"', line)
            if match:
                orig = match.group(1)
                trans = safe_translate(orig)
                line = line.replace(f'title="{orig}"', f'title="{trans}"')
        
        if 'description="' in line:
            match = re.search(r'description="([^"]+)"', line)
            if match:
                orig = match.group(1)
                trans = safe_translate(orig)
                line = line.replace(f'description="{orig}"', f'description="{trans}"')

        stripped = line.strip()
        if stripped and not stripped.startswith(('<', 'import ', 'export ', '{', '}', '-', '#', '`')):
            line = safe_translate(line)
        
        new_lines.append(line)
            
    new_content = "---\n" + new_frontmatter + "---\n" + '\n'.join(new_lines)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished {file_path}")

translate_mdx("src/content/ar/resources/future-augmented-reality-business-trends-2025.mdx")
translate_mdx("src/content/ar/resources/client-immersive-onboarding.mdx")
