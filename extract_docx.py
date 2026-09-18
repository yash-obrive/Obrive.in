import docx
import json
import os
import glob

data = {}
for path in glob.glob('casestudies/*.docx'):
    try:
        doc = docx.Document(path)
        content = []
        for child in doc.element.body:
            if child.tag.endswith('p'):
                p = docx.text.paragraph.Paragraph(child, doc)
                if p.text.strip():
                    content.append(p.text.strip())
            elif child.tag.endswith('tbl'):
                tbl = docx.table.Table(child, doc)
                for row in tbl.rows:
                    row_data = [cell.text.strip() for cell in row.cells]
                    content.append(" | ".join(row_data))
        data[os.path.basename(path)] = "\n".join(content)
    except Exception as e:
        data[os.path.basename(path)] = f"ERROR: {str(e)}"

with open('casestudies_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Extraction complete. Index content:")
print(data.get('00_Obrive_Original_Case_Study_Library_Index.docx', ''))
