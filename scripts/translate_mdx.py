import os
import shutil
import glob
import re
import random
import html
import translators as ts
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

os.environ["translators_default_region"] = "EN"
ENGINES = ['google', 'bing', 'alibaba', 'yandex']

def safe_translate(text, target_lang):
    if not text.strip():
        return text
    engines = list(ENGINES)
    random.shuffle(engines)
    for engine in engines:
        try:
            res = ts.translate_text(text, translator=engine, from_language='en', to_language=target_lang)
            if res:
                res = html.unescape(res)
                return res
        except Exception:
            pass
    return text

def translate_mdx_content(content, target_lang):
    # This is a very simplistic translation that just tries to translate text outside of tags and frontmatter.
    # To do this safely for MDX, we can split by lines and translate text that looks like prose.
    # Given the complexity of MDX, translating line by line.
    
    # Extract frontmatter
    frontmatter = ""
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter_content = parts[1]
            body = parts[2]
            
            # translate specific fields in frontmatter (title, description)
            new_fm_lines = []
            for line in frontmatter_content.split('\n'):
                if line.startswith("title:") or line.startswith("description:"):
                    key, val = line.split(":", 1)
                    val = val.strip().strip("'").strip('"')
                    trans_val = safe_translate(val, target_lang)
                    new_fm_lines.append(f'{key}: "{trans_val}"')
                else:
                    new_fm_lines.append(line)
            frontmatter = "---\n" + "\n".join(new_fm_lines) + "---"

    lines = body.split('\n')
    translated_lines = []
    
    # A simple block tracking
    in_code_block = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue
            
        if in_code_block or line.strip() == "" or line.strip().startswith("<") or line.strip().startswith("import ") or line.strip().startswith("export "):
            # We don't translate components directly here unless it's text inside tags, 
            # but for safety we just skip lines starting with <.
            # Realistically we should translate text inside <CompanyInfoItem>
            
            # Simple regex to translate text inside <CompanyInfoItem>...</CompanyInfoItem>
            if "<CompanyInfoItem>" in line and "</CompanyInfoItem>" in line:
                match = re.search(r'<CompanyInfoItem>(.*?)</CompanyInfoItem>', line)
                if match:
                    t = safe_translate(match.group(1), target_lang)
                    line = line.replace(match.group(1), t)
            elif "<li>" in line and "</li>" in line:
                match = re.search(r'<li>(.*?)</li>', line)
                if match:
                    t = safe_translate(match.group(1), target_lang)
                    line = line.replace(match.group(1), t)
            
            translated_lines.append(line)
            continue
            
        # If it's a markdown heading
        if line.startswith("#"):
            prefix = re.match(r'^#+\s*', line).group(0)
            text = line[len(prefix):]
            translated_lines.append(prefix + safe_translate(text, target_lang))
            continue
            
        # Regular text
        translated_lines.append(safe_translate(line, target_lang))

    return frontmatter + "\n".join(translated_lines)

def translate_file(src_path, target_path, target_lang):
    if os.path.exists(target_path):
        return
    
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    translated = translate_mdx_content(content, target_lang)
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(translated)
    print(f"Translated {src_path} -> {target_lang}")

def main():
    base_dirs = ['career', 'docs', 'faq', 'legal', 'resources', 'security', 'support']
    langs = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'pt', 'sv', 'th', 'zh', 'ru']
    
    tasks = []
    
    for bdir in base_dirs:
        src_dir = os.path.join("src/content", bdir)
        if not os.path.exists(src_dir):
            continue
            
        files = glob.glob(f"{src_dir}/**/*.mdx", recursive=True)
        
        for file in files:
            rel_path = os.path.relpath(file, src_dir)
            
            for lang in langs:
                target_path = os.path.join("src/content", lang, bdir, rel_path)
                tasks.append((file, target_path, lang))

    print(f"Total MDX translation tasks: {len(tasks)}")
    
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(translate_file, src, tgt, lang) for src, tgt, lang in tasks]
        for _ in as_completed(futures):
            pass
            
    print(f"Finished MDX translation in {time.time() - start_time:.2f} seconds!")

if __name__ == "__main__":
    main()
