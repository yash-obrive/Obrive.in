import json
import re

data = json.load(open('casestudies_data.json'))
fields_set = set()

for filename, text in data.items():
    if filename == '00_Obrive_Original_Case_Study_Library_Index.docx':
        continue
    # Extract headers (lines that are short and have no punctuation at the end, or all caps)
    lines = text.split('\n')
    for line in lines:
        if len(line) < 60 and not line.endswith('.') and not line.endswith(',') and line.strip() != '':
            if ' | ' in line: # Metadata line
                pass
            elif line.isupper() or line.title() == line or line.istitle():
                fields_set.add(line.strip())

print(list(fields_set)[:30])
