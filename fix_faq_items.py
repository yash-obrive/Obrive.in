import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # We need to find <FAQItem question="..." answer="..." />
    # and <FAQItem question="..." answer={<>...</>} />
    # Note: question could be before or after answer, but based on our previous script it's question="...", answer="..."
    
    # Match both string answers and JSX answers
    # This handles both cases because we group either the string or the JSX content
    pattern = r'<FAQItem\s+question="([^"]*)"\s+answer=(?:"([^"]*)"|\{<>\s*([\s\S]*?)\s*</>\})\s*/>'
    
    def repl(m):
        q = m.group(1)
        a_str = m.group(2)
        a_jsx = m.group(3)
        
        # a_str will be not None if it was a string
        # a_jsx will be not None if it was JSX
        inner = a_str if a_str is not None else a_jsx
        
        return f'<FAQItem question="{q}">\n{inner}\n</FAQItem>'
        
    content = re.sub(pattern, repl, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for d in ['src/content/faq', 'src/content/resources']:
    for filepath in glob.glob(f"{d}/*.mdx"):
        fix_file(filepath)

print("Done fixing FAQItems!")
