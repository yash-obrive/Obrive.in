import os
import re
import json
import time
import argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from deep_translator import GoogleTranslator

# Ensure pip dependencies
try:
    import frontmatter
except ImportError:
    import subprocess
    subprocess.run(["pip", "install", "python-frontmatter"], check=True)
    import frontmatter

LANGUAGE_MAP = {
    "ar": "ar", "es": "es", "pt": "pt", "fr": "fr", "de": "de",
    "nl": "nl", "sv": "sv", "it": "it", "zh": "zh-CN", "ja": "ja",
    "ko": "ko", "ms": "ms", "id": "id", "th": "th"
}

def translate_markdown(text, target_lang):
    if not text.strip():
        return text
    translator = GoogleTranslator(source='en', target=target_lang)
    
    # We translate line by line to somewhat preserve structure
    lines = text.split('\n')
    translated_lines = []
    
    in_code_block = False
    
    for line in lines:
        if line.startswith('```'):
            in_code_block = not in_code_block
            translated_lines.append(line)
            continue
            
        if in_code_block or not line.strip() or line.startswith('<') or line.strip() == '---':
            translated_lines.append(line)
            continue
            
        # Very basic markdown link preservation hack (not perfect, but works for simple text)
        try:
            # We don't want to translate URLs
            if re.match(r'^[#\-*>]', line.strip()):
                # It's a list item or heading, preserve the prefix
                prefix_match = re.match(r'^([#\-*>\s]+)(.*)', line)
                if prefix_match:
                    prefix = prefix_match.group(1)
                    content = prefix_match.group(2)
                    if content.strip():
                        translated = translator.translate(content)
                        translated_lines.append(f"{prefix}{translated}")
                    else:
                        translated_lines.append(line)
                else:
                    translated_lines.append(translator.translate(line))
            else:
                translated_lines.append(translator.translate(line))
        except Exception as e:
            # Fallback to original if translation fails
            translated_lines.append(line)
            
    return '\n'.join(translated_lines)

def process_file(file_path, target_lang, lang_code, base_content_dir):
    rel_path = os.path.relpath(file_path, base_content_dir)
    # Target path: src/content/{lang_code}/{rel_path}
    target_path = os.path.join(base_content_dir, lang_code, rel_path)
    
    if os.path.exists(target_path):
        return  # Skip if already exists
        
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    try:
        post = frontmatter.load(file_path)
        
        # Translate frontmatter
        translator = GoogleTranslator(source='en', target=target_lang)
        for key in ['title', 'description', 'quote', 'author']:
            if key in post.metadata and isinstance(post.metadata[key], str) and post.metadata[key].strip():
                try:
                    post.metadata[key] = translator.translate(post.metadata[key])
                except Exception:
                    pass
                    
        # Translate body
        translated_body = translate_markdown(post.content, target_lang)
        post.content = translated_body
        
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
            
    except Exception as e:
        print(f"Error processing {file_path} for {lang_code}: {e}")

def main():
    base_content_dir = 'src/content'
    mdx_files = []
    
    # Collect all root English MDX files (ignoring already created lang folders)
    for root, dirs, files in os.walk(base_content_dir):
        # Skip language folders
        dirs[:] = [d for d in dirs if d not in LANGUAGE_MAP.keys()]
        
        for file in files:
            if file.endswith('.mdx'):
                mdx_files.append(os.path.join(root, file))
                
    print(f"Found {len(mdx_files)} MDX files to translate.")
    
    for lang_code, target_lang in LANGUAGE_MAP.items():
        print(f"Translating to {lang_code}...")
        with ThreadPoolExecutor(max_workers=5) as executor:
            for mdx_file in mdx_files:
                executor.submit(process_file, mdx_file, target_lang, lang_code, base_content_dir)
                
    print("Done MDX translation!")

if __name__ == '__main__':
    main()
