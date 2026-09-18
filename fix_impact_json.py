import glob
import re
import json
import ast

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    original = content
    
    # We will find <TheImpactTable ... />
    # Extract columns={[...]} and data={[...]}
    # Convert them to valid JSON and replace the prop with columnsJson='...' and dataJson='...'
    
    def repl_table(m):
        full_match = m.group(0)
        
        # Extract columns
        columns_match = re.search(r'columns=\{\[([\s\S]*?)\]\}', full_match)
        if columns_match:
            cols_str = "[" + columns_match.group(1) + "]"
            # It's JS, not strict JSON (keys lack quotes). We can parse it by adding quotes.
            # But the easiest way is to use python's regex to fix keys
            cols_str = re.sub(r'(\w+):', r'"\1":', cols_str)
            # Remove trailing commas
            cols_str = re.sub(r',\s*\}', r'}', cols_str)
            cols_str = re.sub(r',\s*\]', r']', cols_str)
            
            # replace single quotes with double quotes inside strings?
            # actually json.dumps will handle the dictionary. Let's parse with AST if possible.
            try:
                # ast.literal_eval requires python syntax, true -> True
                cols_str_py = cols_str.replace('true', 'True').replace('false', 'False')
                cols_list = ast.literal_eval(cols_str_py)
                cols_json = json.dumps(cols_list)
                # Escape single quotes if we use single quotes for prop
                cols_json_escaped = cols_json.replace("'", "&#39;")
                full_match = full_match.replace(columns_match.group(0), f"columnsJson='{cols_json_escaped}'")
            except Exception as e:
                print(f"Failed to parse columns in {filepath}: {e}")

        # Extract data
        data_match = re.search(r'data=\{\[([\s\S]*?)\]\}', full_match)
        if data_match:
            data_str = "[" + data_match.group(1) + "]"
            data_str = re.sub(r'(\w+):', r'"\1":', data_str)
            data_str = re.sub(r',\s*\}', r'}', data_str)
            data_str = re.sub(r',\s*\]', r']', data_str)
            try:
                data_str_py = data_str.replace('true', 'True').replace('false', 'False')
                data_list = ast.literal_eval(data_str_py)
                data_json = json.dumps(data_list)
                data_json_escaped = data_json.replace("'", "&#39;")
                full_match = full_match.replace(data_match.group(0), f"dataJson='{data_json_escaped}'")
            except Exception as e:
                print(f"Failed to parse data in {filepath}: {e}")

        return full_match

    content = re.sub(r'<TheImpactTable[\s\S]*?/>', repl_table, content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for filepath in glob.glob("src/content/resources/*.mdx"):
    fix_file(filepath)

print("Done converting to JSON props!")
