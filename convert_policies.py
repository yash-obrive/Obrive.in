import os
from docx import Document

base_dir = "Payment Gate Policy Page Content"
out_dir = "src/content/legal"

files_to_process = [
    ("Obrive_Refund_Policy_All_Services.docx", "refund-policy", "Refund Policy", "Learn about Obrive's refund, cancellation, credit, and payment policies for all services."),
    ("Obrive_GST_Taxes_Policy_All_Services.docx", "gst-taxes-policy", "GST & Taxes Policy", "Understand the general tax treatment and GST applicable to services supplied by Obrive."),
    ("Obrive_Service_Policy_All_Services.docx", "service-policy", "Service Policy", "Review Obrive's service delivery, scope, engagement, and support policies.")
]

for filename, slug, title, description in files_to_process:
    path = os.path.join(base_dir, filename)
    if not os.path.exists(path):
        continue
        
    doc = Document(path)
    
    # Start building MDX
    mdx_content = [
        "---",
        f'title: "{title}"',
        f'description: "{description}"',
        'lastUpdated: "September 15, 2026"',
        f'category: "Policies"',
        'priority: "high"',
        "---",
        "",
        'import { StyledText } from "@/components/shared/StyledText";',
        'import { ButtonLink } from "@/components/ui/ButtonLink";',
        ""
    ]
    
    for p in doc.paragraphs:
        text = p.text.strip()
        if not text:
            continue
            
        # Very basic heuristic for headings:
        # If it's short, doesn't end with a period, and is Title Cased or all caps, it's a heading.
        # Alternatively, rely on docx styles if they are consistent.
        style_name = p.style.name.lower()
        
        if 'heading 1' in style_name or text.startswith('Obrive Industries |'):
            # Skip the main title, we have it in frontmatter
            continue
        elif 'heading 2' in style_name or (len(text) < 100 and text.title() == text and not text.endswith('.')):
            mdx_content.append(f"\n## {text}\n")
        elif 'heading 3' in style_name:
            mdx_content.append(f"\n### {text}\n")
        elif text.startswith("Effective Date:"):
            # Skip effective date, we have lastUpdated
            continue
        else:
            # Check for bold text within paragraph for basic formatting
            formatted_text = ""
            for run in p.runs:
                run_text = run.text.replace("\n", " ").strip()
                if not run_text:
                    if run.text == " ":
                        formatted_text += " "
                    continue
                    
                if run.bold:
                    formatted_text += f"**{run_text}** "
                elif run.italic:
                    formatted_text += f"*{run_text}* "
                else:
                    formatted_text += f"{run_text} "
            
            # Use original text if formatting parsing resulted in empty or weird string
            # Just do basic cleanup
            final_text = formatted_text.strip() if formatted_text.strip() else text
            
            if final_text:
                mdx_content.append(f"{final_text}\n")
                
    out_path = os.path.join(out_dir, f"{slug}.mdx")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(mdx_content))
        
    print(f"Generated {out_path}")
