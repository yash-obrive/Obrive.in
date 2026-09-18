import os
from docx import Document

base_dir = "Payment Gate Policy Page Content"

for f in os.listdir(base_dir):
    if f.endswith('.docx') and not f.startswith('~'):
        path = os.path.join(base_dir, f)
        doc = Document(path)
        print("=== " + f + " ===")
        for i, p in enumerate(doc.paragraphs):
            if i > 10: break
            if p.text.strip():
                print(p.text.strip())
