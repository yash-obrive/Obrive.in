import os
import re

def main():
    src_dirs = ['src/app/(public)', 'src/components/pages', 'src/components/shared']
    count = 0
    
    # Matches JSX text content that is not purely whitespace, symbols, or numbers
    jsx_text_pattern = re.compile(r'>\s*([^<>{]*[a-zA-Z][^<>{]*)\s*<')
    
    ignore_patterns = [
        re.compile(r'^\s*obrive\s*$', re.IGNORECASE),
        re.compile(r'^\s*©\s*\d{4}\s*Obrive.*$', re.IGNORECASE),
        re.compile(r'^\s*[\W\d_]+\s*$'), # Only symbols/numbers
        re.compile(r'^\s*&[a-zA-Z]+;\s*$'), # HTML entities
        re.compile(r'^\s*nbsp\s*$', re.IGNORECASE),
    ]

    for base_dir in src_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith('.tsx'):
                    filepath = os.path.join(root, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Remove all {} blocks to avoid matching TS code inside JSX
                    content_clean = re.sub(r'\{[^}]*\}', '{}', content)
                        
                    matches = jsx_text_pattern.finditer(content_clean)
                    for match in matches:
                        text = match.group(1).strip()
                        if not text:
                            continue
                            
                        if any(p.match(text) for p in ignore_patterns):
                            continue
                            
                        if len(text) < 2 and not text.isalpha():
                            continue
                            
                        # Also ignore pure uppercase codes like 'USD' or 'INR'
                        if text in ['USD', 'INR', 'EUR', 'CNY', 'AED', 'SAR', 'QAR']:
                            continue
                            
                        print(f"[{file}] '{text}'")
                        count += 1
                        
    print(f"\nFound {count} potential hardcoded strings in public components.")

if __name__ == '__main__':
    main()
