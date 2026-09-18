import re

with open("src/content/legal/gst-taxes-policy.mdx", "r") as f:
    content = f.read()

# Extract the FAQ section
faq_match = re.search(r'<CompanyInfoSection title="Frequently Asked Questions">.*?</CompanyInfoSection>', content, re.DOTALL)
if faq_match:
    faq_text = faq_match.group(0)
    # Remove it from its current position
    content = content.replace(faq_text, "")
    
    # Add it to the very end
    content = content.strip() + "\n\n" + faq_text + "\n"
    
    with open("src/content/legal/gst-taxes-policy.mdx", "w") as f:
        f.write(content)
    print("Moved FAQs to the bottom.")
else:
    print("FAQ section not found.")
