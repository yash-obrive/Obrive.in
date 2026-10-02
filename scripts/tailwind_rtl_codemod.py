import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # Regex replacements for Tailwind classes
    # We use a positive lookbehind (?<=...) to ensure the class is preceded by a space, quote, or backtick
    
    replacements = [
        # Margin
        (r'(?<=[\s"\'`])ml-', 'ms-'),
        (r'(?<=[\s"\'`])mr-', 'me-'),
        (r'(?<=[\s"\'`])-ml-', '-ms-'),
        (r'(?<=[\s"\'`])-mr-', '-me-'),
        
        # Padding
        (r'(?<=[\s"\'`])pl-', 'ps-'),
        (r'(?<=[\s"\'`])pr-', 'pe-'),
        
        # Text Alignment
        (r'(?<=[\s"\'`])text-left(?=[\s"\'`])', 'text-start'),
        (r'(?<=[\s"\'`])text-right(?=[\s"\'`])', 'text-end'),
        
        # Positioning
        (r'(?<=[\s"\'`])left-', 'start-'),
        (r'(?<=[\s"\'`])right-', 'end-'),
        (r'(?<=[\s"\'`])-left-', '-start-'),
        (r'(?<=[\s"\'`])-right-', '-end-'),
        
        # Border
        (r'(?<=[\s"\'`])border-l(?=[\s"\'`-])', 'border-s'),
        (r'(?<=[\s"\'`])border-r(?=[\s"\'`-])', 'border-e'),
        
        # Border Radius
        (r'(?<=[\s"\'`])rounded-l(?=[\s"\'`-])', 'rounded-s'),
        (r'(?<=[\s"\'`])rounded-r(?=[\s"\'`-])', 'rounded-e'),
        (r'(?<=[\s"\'`])rounded-tl(?=[\s"\'`-])', 'rounded-ss'),
        (r'(?<=[\s"\'`])rounded-tr(?=[\s"\'`-])', 'rounded-se'),
        (r'(?<=[\s"\'`])rounded-bl(?=[\s"\'`-])', 'rounded-es'),
        (r'(?<=[\s"\'`])rounded-br(?=[\s"\'`-])', 'rounded-ee'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

def main():
    updated_files = 0
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    updated_files += 1
                    print(f"Updated {filepath}")
    
    print(f"\nSuccessfully modified {updated_files} files for RTL layout.")

if __name__ == '__main__':
    main()
