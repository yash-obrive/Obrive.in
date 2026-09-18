import glob
import re
import json

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # We will find `phases={[ ... ]}` and `steps={[ ... ]}` and convert them to json
    # A generic regex for property={[ ... ]}
    
    def repl(m):
        prop_name = m.group(1)
        array_str = m.group(2)
        
        # very simple array extraction
        # assuming the structure is just [{...}, {...}] with strings
        # Let's extract each object manually
        items = []
        for obj_m in re.finditer(r'\{([^{}]*)\}', array_str):
            obj_content = obj_m.group(1)
            # Find key: "value" or key: 'value' or key: value
            obj = {}
            # Match key: "value" 
            for prop_m in re.finditer(r'(\w+):\s*"([^"]*)"', obj_content):
                # replace newlines with actual spaces for valid JSON
                obj[prop_m.group(1)] = prop_m.group(2).replace('\n', ' ')
            items.append(obj)
            
        json_str = json.dumps(items)
        # escape single quotes just in case
        json_str = json_str.replace("'", "\\'")
        
        return f"{prop_name}Json='{json_str}'"
        
    content = re.sub(r'(phases|steps)=\{\[\s*([\s\S]*?)\s*\]\}', repl, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed arrays in {filepath}")

for filepath in glob.glob("src/content/**/*.mdx", recursive=True):
    process_file(filepath)
