import os
import re
import yaml
import translators as ts

os.environ["translators_default_region"] = "EN"
engine = 'google'

def process(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('---\n', 2)
    frontmatter = parts[1]
    body = parts[2]
    
    try:
        data = yaml.safe_load(frontmatter)
        for key in ['title', 'quote', 'seoDescription', 'description', 'headline']:
            if key in data and isinstance(data[key], str):
                data[key] = ts.translate_text(data[key], translator=engine, from_language='en', to_language='ar')
        if 'impactMetrics' in data:
            for item in data['impactMetrics']:
                for k in ['benefit', 'description']:
                    if k in item:
                        item[k] = ts.translate_text(item[k], translator=engine, from_language='en', to_language='ar')
        new_frontmatter = "---\n" + yaml.dump(data, allow_unicode=True, sort_keys=False) + "---\n"
    except Exception as e:
        print("YAML error:", e)
        new_frontmatter = "---\n" + frontmatter + "---\n"

    # Attributes
    attr_pattern = re.compile(r'\b(title|phase|header1|header2|quote|footerContent|closingStatement|description|subtitle|finalQuote|content)="([^"]+)"')
    def attr_replacer(match):
        key = match.group(1)
        val = match.group(2)
        if re.search(r'[a-zA-Z]{2,}', val):
            res = ts.translate_text(val, translator=engine, from_language='en', to_language='ar')
            res = res.replace('"', '').replace("'", "").replace("<", "").replace(">", "").replace("{", "").replace("}", "")
            return f'{key}="{res}"'
        return match.group(0)
    
    body = attr_pattern.sub(attr_replacer, body)
    
    # Text between tags
    def text_replacer(m):
        text = m.group(1)
        if re.search(r'[a-zA-Z]{2,}', text):
            res = ts.translate_text(text, translator=engine, from_language='en', to_language='ar')
            return ">" + res + "<"
        return m.group(0)
    
    body = re.sub(r'>([^<]+)<', text_replacer, body)

    new_content = new_frontmatter + body
    with open('/tmp/test_mdx.mdx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Done")

process("src/content/ar/resources/ar-onboarding.mdx")
