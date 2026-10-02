import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from deep_translator import GoogleTranslator
import frontmatter

LANGUAGE_MAP = {
    "ar": "ar", "es": "es", "pt": "pt", "fr": "fr", "de": "de",
    "nl": "nl", "sv": "sv", "it": "it", "zh": "zh-CN", "ja": "ja",
    "ko": "ko", "ms": "ms", "id": "id", "th": "th"
}

def translate_chunk(text, target_lang):
    if not text.strip():
        return text
    retries = 3
    for attempt in range(retries):
        try:
            translator = GoogleTranslator(source='en', target=target_lang)
            time.sleep(0.3)
            return translator.translate(text)
        except Exception as e:
            time.sleep(2)
    return text

def translate_markdown_fast(text, target_lang):
    if not text.strip():
        return text
        
    paragraphs = text.split('\n\n')
    chunks = []
    current_chunk = []
    current_len = 0
    
    for p in paragraphs:
        if current_len + len(p) > 3500:
            chunks.append('\n\n'.join(current_chunk))
            current_chunk = [p]
            current_len = len(p)
        else:
            current_chunk.append(p)
            current_len += len(p) + 2
            
    if current_chunk:
        chunks.append('\n\n'.join(current_chunk))
        
    translated_chunks = []
    for chunk in chunks:
        if chunk.strip().startswith('```') and chunk.strip().endswith('```'):
            translated_chunks.append(chunk)
            continue
        translated_chunks.append(translate_chunk(chunk, target_lang))
        
    return '\n\n'.join(translated_chunks)

def process_file(file_path, target_lang, lang_code, base_content_dir):
    rel_path = os.path.relpath(file_path, base_content_dir)
    target_path = os.path.join(base_content_dir, lang_code, rel_path)
    
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        return
        
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    try:
        post = frontmatter.load(file_path)
        for key in ['title', 'description', 'quote', 'author']:
            if key in post.metadata and isinstance(post.metadata[key], str) and post.metadata[key].strip():
                post.metadata[key] = translate_chunk(post.metadata[key], target_lang)
                    
        post.content = translate_markdown_fast(post.content, target_lang)
        
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(frontmatter.dumps(post))
            
        print(f"✓ [{lang_code}] {rel_path}", flush=True)
    except Exception as e:
        print(f"✗ [{lang_code}] Error {rel_path}: {e}", flush=True)
        if os.path.exists(target_path):
            os.remove(target_path)

def main():
    base_content_dir = 'src/content'
    mdx_files = []
    for root, dirs, files in os.walk(base_content_dir):
        dirs[:] = [d for d in dirs if d not in LANGUAGE_MAP.keys()]
        for file in files:
            if file.endswith('.mdx'):
                mdx_files.append(os.path.join(root, file))
                
    print(f"Found {len(mdx_files)} MDX files to translate.", flush=True)
    
    tasks = []
    # 5 workers max to respect 5 requests/sec global rate limit
    with ThreadPoolExecutor(max_workers=5) as executor:
        for lang_code, target_lang in LANGUAGE_MAP.items():
            for mdx_file in mdx_files:
                tasks.append(executor.submit(process_file, mdx_file, target_lang, lang_code, base_content_dir))
                
        completed = 0
        total = len(tasks)
        for _ in as_completed(tasks):
            completed += 1
            if completed % 10 == 0:
                print(f"Progress: {completed}/{total} MDX files translated.", flush=True)
                
    print("Done MDX translation!", flush=True)

if __name__ == '__main__':
    main()
