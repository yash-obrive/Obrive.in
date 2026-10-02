import os
import re

def main():
    src_dir = 'src'
    count = 0
    # Matches JSX text content that is not purely whitespace, symbols, or numbers
    # Very rudimentary regex: looks for > Text < where Text has at least one letter
    # and isn't a known wrapper.
    jsx_text_pattern = re.compile(r'>\s*([^<>{]*[a-zA-Z][^<>{]*)\s*<')
    
    # Exceptions we can ignore
    ignore_patterns = [
        re.compile(r'^\s*obrive\s*$', re.IGNORECASE),
        re.compile(r'^\s*©\s*\d{4}\s*Obrive.*$', re.IGNORECASE),
        re.compile(r'^\s*[\W\d_]+\s*$'), # Only symbols/numbers
    ]

    for root, dirs, files in os.walk(src_dir):
        # Exclude directories
        if any(ignored in root for ignored in ['/fonts', '/icons', '/assets']):
            continue
            
        for file in files:
            if file.endswith(('.tsx')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                matches = jsx_text_pattern.finditer(content)
                for match in matches:
                    text = match.group(1).strip()
                    if not text:
                        continue
                        
                    # Filter out ignored patterns
                    if any(p.match(text) for p in ignore_patterns):
                        continue
                        
                    # Filter out short strings that are just punctuation or single letters
                    if len(text) < 2 and not text.isalpha():
                        continue
                        
                    print(f"[{file}] Hardcoded Text: '{text}'")
                    count += 1
                    
    print(f"\nFound {count} potential hardcoded text strings in JSX.")

if __name__ == '__main__':
    main()
