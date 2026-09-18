import os

out_dir = "src/content/legal"
files = ["refund-policy.mdx", "gst-taxes-policy.mdx", "service-policy.mdx"]

for filename in files:
    path = os.path.join(out_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    cleaned_lines = []
    for line in lines:
        if 'H2 —' in line or 'H1:' in line or 'SEO Title' in line or 'Primary Keyword' in line or 'Secondary Keyword' in line or 'H1 —' in line:
            # Reached the junk section
            break
        cleaned_lines.append(line)
        
    # Remove any trailing empty <CompanyInfoSection> or unclosed ones if we broke early
    # Since the junk is mostly at the end, let's just make sure the file ends nicely.
    # We will strip empty lines from the end and close the last section if needed
    while cleaned_lines and not cleaned_lines[-1].strip():
        cleaned_lines.pop()
        
    # If the last line is an empty <CompanyInfoSection>, remove it
    if cleaned_lines and cleaned_lines[-1].strip() == "<CompanyInfoSection>":
        cleaned_lines.pop()
        
    if cleaned_lines and cleaned_lines[-1].strip() != "</CompanyInfoSection>":
        cleaned_lines.append("</CompanyInfoSection>\n")
        
    with open(path, "w", encoding="utf-8") as f:
        f.write("".join(cleaned_lines))
        
    print(f"Cleaned {path}")
