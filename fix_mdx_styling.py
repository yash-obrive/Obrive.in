import os
import re

out_dir = "src/content/legal"
files_to_fix = [
    ("refund-policy.mdx", "Refund Policy — All Services"),
    ("gst-taxes-policy.mdx", "GST & Taxes Policy — All Services"),
    ("service-policy.mdx", "Service Policy — All Services")
]

for filename, title in files_to_fix:
    path = os.path.join(out_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter from body
    parts = content.split("---")
    if len(parts) >= 3:
        frontmatter = "---" + parts[1] + "---"
        body = "---".join(parts[2:]).strip()
    else:
        continue

    # Remove standard imports just to replace them cleanly
    body = re.sub(r'import { StyledText } from "@/components/shared/StyledText";\n', '', body)
    body = re.sub(r'import { ButtonLink } from "@/components/ui/ButtonLink";\n', '', body)

    lines = body.split("\n")
    
    new_body = [
        "",
        'import { StyledText } from "@/components/shared/StyledText";',
        'import { ButtonLink } from "@/components/ui/ButtonLink";',
        "",
        "<PageHeader",
        f'  title="{title}"',
        '  company="Obrive Industries Private Limited"',
        '  date="September 15, 2026"',
        '  lastUpdated="September 15, 2026"',
        "/>",
        "",
        "<CompanyInfoSection>"
    ]
    
    in_section = True
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        if stripped.startswith("## ") and not stripped.startswith("### "):
            heading_text = stripped[3:].strip()
            # If we are in a section, close it
            if in_section:
                new_body.append("</CompanyInfoSection>")
                new_body.append("")
            
            # Start new section
            new_body.append(f'<CompanyInfoSection title="{heading_text}">')
            in_section = True
        elif stripped.startswith("### "):
            heading_text = stripped[4:].strip()
            new_body.append(f"\n<h3>{heading_text}</h3>\n")
        else:
            # Check if it's already an HTML tag
            if stripped.startswith("<"):
                new_body.append(line)
            else:
                # Wrap text in <p>
                # Also handle basic bold syntax if needed, but MDX can handle **bold** inside JSX sometimes?
                # Actually, standard MDX handles markdown inside components if there are blank lines, but standard JSX needs actual tags if mixed tightly.
                # Let's just use standard MDX paragraph or raw <p>
                # For safety with MDX parsing, we can just leave it as plain text if it's separated by blank lines, or wrap it in <p>.
                # Let's wrap in <p>
                # Convert **bold** to <strong>bold</strong>
                formatted_line = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', stripped)
                new_body.append(f"  <p>{formatted_line}</p>")

    if in_section:
        new_body.append("</CompanyInfoSection>")
        
    final_content = frontmatter + "\n" + "\n".join(new_body)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(final_content)
    
    print(f"Fixed {path}")

