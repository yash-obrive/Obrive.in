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
    # Extract frontmatter
    frontmatter = ""
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter_content = parts[1]
            body = parts[2]
            
            # translate specific fields in frontmatter
            new_fm_lines = []
            for line in frontmatter_content.split('\n'):
                if any(line.startswith(p) for p in ["title:", "description:", "seoTitle:", "seoDescription:", "quote:"]):
                    key, val = line.split(":", 1)
                    val = val.strip()
                    # Remove surrounding quotes safely
                    if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                        val = val[1:-1]
                    trans_val = safe_translate(val, target_lang)
                    # escape double quotes
                    trans_val = trans_val.replace('"', '\\"')
                    new_fm_lines.append(f'{key}: "{trans_val}"')
                elif line.strip().startswith("- benefit:") or line.strip().startswith("description:"):
                    # For impactMetrics
                    # e.g. "  - benefit: Process Efficiency"
                    # e.g. "    description: Workflow completion time reduced by 45%"
                    prefix, text = line.split(":", 1)
                    text = text.strip()
                    if (text.startswith("'") and text.endswith("'")) or (text.startswith('"') and text.endswith('"')):
                        text = text[1:-1]
                    trans_val = safe_translate(text, target_lang)
                    new_fm_lines.append(f'{prefix}: "{trans_val}"')
                else:
                    new_fm_lines.append(line)
            frontmatter = "---\n" + "\n".join(new_fm_lines) + "---"

    lines = body.split('\n')
    translated_lines = []
    
    in_code_block = False
    in_jsx_tag = False
    
    translatable_attrs = ['title', 'quote', 'content', 'author', 'closingStatement', 'phase']

    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue
            
        if in_code_block or stripped == "" or stripped.startswith("import ") or stripped.startswith("export "):
            translated_lines.append(line)
            continue
            
        if stripped.startswith("</"):
            translated_lines.append(line)
            continue

        # If we are inside a multi-line JSX tag (e.g. properties)
        if in_jsx_tag:
            for attr in translatable_attrs:
                pattern = rf'{attr}="(.*?)"'
                def repl(m):
                    return f'{attr}="{safe_translate(m.group(1), target_lang)}"'
                line = re.sub(pattern, repl, line)
                
            translated_lines.append(line)
            if stripped.endswith("/>") or stripped.endswith(">"):
                in_jsx_tag = False
            continue

        # If it's the start of a JSX tag
        if stripped.startswith("<"):
            # Translate attributes if present on the same line
            for attr in translatable_attrs:
                pattern = rf'{attr}="(.*?)"'
                def repl(m):
                    return f'{attr}="{safe_translate(m.group(1), target_lang)}"'
                line = re.sub(pattern, repl, line)
                
            # Translate inner text if it's a one-liner like <Tag>Text</Tag>
            if "</" in line:
                match = re.search(r'>([^<]+)</', line)
                if match and match.group(1).strip():
                    t = safe_translate(match.group(1), target_lang)
                    line = line.replace(match.group(1), t)
            
            translated_lines.append(line)
            
            # If it's NOT a self-closing or complete tag on the same line, we enter in_jsx_tag
            if not (stripped.endswith("/>") or stripped.endswith(">")):
                in_jsx_tag = True
                
            continue

        # Regular text
        if line.startswith("#"):
            match = re.match(r'^#+\s*', line)
            if match:
                prefix = match.group(0)
                text = line[len(prefix):]
                translated_lines.append(prefix + safe_translate(text, target_lang))
            else:
                translated_lines.append(safe_translate(line, target_lang))
            continue
            
        # Lists
        match = re.match(r'^(\s*[-*]\s+)(.*)', line)
        if match:
            prefix = match.group(1)
            text = match.group(2)
            if text.strip() and not text.strip().startswith("<"):
                translated_lines.append(prefix + safe_translate(text, target_lang))
            else:
                translated_lines.append(line)
            continue
            
        # Normal text paragraph
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
    langs = ['de']
    
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
