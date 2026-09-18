import os
import glob
from docx import Document

base_dir = "Obrive Industries Content"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if "FAQ" in file and file.endswith(".docx"):
            filepath = os.path.join(root, file)
            print(f"Found FAQ doc: {filepath}")
            
            try:
                doc = Document(filepath)
                text_content = [p.text for p in doc.paragraphs if p.text.strip()]
                print(f"  Extracted {len(text_content)} lines of text.")
                print(f"  Sample: {text_content[:2]}")
            except Exception as e:
                print(f"  Error reading {filepath}: {e}")
