import os

LANGUAGE_MAP = {
    "ar": "ar", "es": "es", "pt": "pt", "fr": "fr", "de": "de",
    "nl": "nl", "sv": "sv", "it": "it", "zh": "zh-CN", "ja": "ja",
    "ko": "ko", "ms": "ms", "id": "id", "th": "th"
}

def main():
    base_content_dir = 'src/content'
    base_files = []
    
    # Get all base mdx files (excluding language directories)
    for root, dirs, files in os.walk(base_content_dir):
        # Exclude language directories from the walk
        dirs[:] = [d for d in dirs if d not in LANGUAGE_MAP.keys()]
        for file in files:
            if file.endswith('.mdx'):
                rel_path = os.path.relpath(os.path.join(root, file), base_content_dir)
                base_files.append(rel_path)
                
    missing = []
    for lang in LANGUAGE_MAP.keys():
        for base_file in base_files:
            target_path = os.path.join(base_content_dir, lang, base_file)
            if not os.path.exists(target_path):
                missing.append(f"[{lang}] Missing: {base_file}")
                
    if missing:
        print(f"Found {len(missing)} missing translated MDX files:")
        for m in missing[:20]:
            print(m)
        if len(missing) > 20:
            print(f"... and {len(missing) - 20} more.")
    else:
        print(f"All {len(base_files)} MDX files are fully translated across all {len(LANGUAGE_MAP)} languages (Total {len(base_files) * len(LANGUAGE_MAP)} localized files).")

if __name__ == '__main__':
    main()
