import os
import json
import re
from docx import Document

base_dir = "Obrive Industries Content"

mapping = {
    "3D Design Service": "3d-design-development",
    "AEO Service": "aeo-service",
    "AI Consulting": "ai-consulting",
    "Augumented Reality Service": "augmented-reality-development",
    "Content Marketing Service": "content-marketing-service",
    "GEO Service": "geo-service",
    "Mixed Reality Service": "mixed-reality-development",
    "Mobile App Design Service": "mobile-app-design-service",
    "Mobile App Development": "mobile-app-development",
    "SEO Service": "seo-service",
    "Spatial Computing Service": "spatial-computing-app-development",
    "Virtual Reality Service": "virtual-reality-development",
    "Web App & Saas MVP Development": "web-app-saas-mvp-development",
    "Website Design Service": "website-design-service",
    "Website Development Service": "website-development-service",
}

output_data = {}

for folder, slug in mapping.items():
    folder_path = os.path.join(base_dir, folder)
    if not os.path.exists(folder_path):
        continue

    faq_doc_path = None
    for file in os.listdir(folder_path):
        if "FAQ" in file and file.endswith(".docx") and not file.startswith("~"):
            faq_doc_path = os.path.join(folder_path, file)
            break
            
    if not faq_doc_path:
        continue
        
    try:
        doc = Document(faq_doc_path)
        lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
        
        categories = {}
        current_category = "General Information"
        categories[current_category] = []
        
        current_q = None
        current_a = []
        
        for line in lines:
            upper_line = line.upper()
            
            # Detect Category
            if "CATEGORY" in upper_line:
                # Save previous Q&A if exists
                if current_q:
                    categories[current_category].append({"q": current_q, "a": "\n\n".join(current_a).strip()})
                    current_q = None
                    current_a = []
                    
                # Clean up category name (e.g. "CATEGORY 01 — GENERAL AR QUESTIONS" -> "General AR Questions")
                cat_match = re.search(r'CATEGORY[A-Z0-9\s]+[-—]\s*(.*)', upper_line, re.IGNORECASE)
                if cat_match:
                    # Title case the category name for better presentation
                    current_category = cat_match.group(1).strip().title()
                else:
                    # Remove any leading numbers or dots
                    clean_line = re.sub(r'^[\d\.\s]*CATEGORY[A-Z0-9\s]*[-—]*\s*', '', upper_line, flags=re.IGNORECASE)
                    current_category = clean_line.strip().title()
                
                if current_category not in categories:
                    categories[current_category] = []
                continue
                
            # Skip metadata and titles at the top
            if upper_line == "META DESCRIPTION" or upper_line == "TITLE" or upper_line == "H1" or upper_line.startswith("SUGGESTED URL"):
                continue
                
            # If line is a question
            if line.endswith("?") and len(line) < 250:
                if current_q:
                    categories[current_category].append({"q": current_q, "a": "\n\n".join(current_a).strip()})
                current_q = line
                current_a = []
            elif current_q is not None:
                current_a.append(line)
                
        # Append the last one
        if current_q:
            categories[current_category].append({"q": current_q, "a": "\n\n".join(current_a).strip()})
            
        # Clean up empty categories
        output_data[slug] = {k: v for k, v in categories.items() if len(v) > 0}
        
    except Exception as e:
        print(f"Error parsing {faq_doc_path}: {e}")

output_path = "src/data/solution-faqs.json"
with open(output_path, "w") as f:
    json.dump(output_data, f, indent=2)

print(f"Saved categorized FAQs to {output_path}")
