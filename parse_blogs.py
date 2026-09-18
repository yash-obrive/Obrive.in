import re
import json

def parse_blogs():
    with open('blogs/blogs.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    # The doc has an index at the beginning. 
    # The actual blogs start with "1. The Complete Guide to Augmented Reality Development in 2026..."
    # We can split by regex matching "^\d+\. " to find each blog.
    # But wait, there might be numbered lists inside the blogs.
    # Let's split by "Suggested SEO & Publishing Metadata" which marks the end of a blog.
    
    parts = text.split("Suggested SEO & Publishing Metadata")
    
    blogs = []
    
    for i in range(len(parts)-1):
        # parts[i] contains the body of blog i, except the first part which also contains the index.
        # The metadata for blog i is in the FIRST few lines of parts[i+1].
        
        # Let's extract metadata from parts[i+1]
        meta_lines = parts[i+1].strip().split('\n')[:10]
        slug = ""
        cta = ""
        for line in meta_lines:
            if line.startswith("Suggested slug:"):
                slug = line.replace("Suggested slug:", "").strip()
            elif line.startswith("Suggested CTA:"):
                cta = line.replace("Suggested CTA:", "").strip()
                
        # Now let's process parts[i] to get the body.
        body_text = parts[i]
        
        # If this is the first part, we need to cut out the index.
        # We can find where the blog actually starts. It starts with "1. " and the title, followed by "BLOG •".
        # Let's use "BLOG •" as a reliable anchor to find the title.
        
        blog_marker_idx = body_text.rfind("BLOG •")
        if blog_marker_idx == -1:
            print(f"Could not find 'BLOG •' in part {i}")
            continue
            
        # The title is the line before "BLOG •"
        lines_before_marker = body_text[:blog_marker_idx].strip().split('\n')
        title = lines_before_marker[-1].strip()
        # Remove the leading number e.g. "1. "
        title = re.sub(r'^\d+\.\s*', '', title)
        
        # Parse the meta line: BLOG • 8–12 minute read | Author: Arjun Patel | Category: Augmented Reality Development
        lines_after_marker = body_text[blog_marker_idx:].split('\n')
        meta_line = lines_after_marker[0]
        
        read_time = ""
        author = ""
        category = ""
        if " • " in meta_line:
            rest = meta_line.split(" • ")[1]
            if "|" in rest:
                meta_parts = [p.strip() for p in rest.split("|")]
                read_time = meta_parts[0]
                for mp in meta_parts[1:]:
                    if mp.startswith("Author:"):
                        author = mp.replace("Author:", "").strip()
                    elif mp.startswith("Category:"):
                        category = mp.replace("Category:", "").strip()
                        
        # Now parse the content blocks: Introduction, Conclusion, FAQs, etc.
        # Everything after the Disclaimer is content.
        content_lines = lines_after_marker[1:]
        
        # Combine lines back and split by headers. We know the standard headers:
        # "Introduction", "Conclusion", "Frequently Asked Questions"
        content_text = "\n".join(content_lines)
        
        # Skip disclaimer
        if "Disclaimer:" in content_text:
            content_text = content_text[content_text.find("Disclaimer:"):]
            # skip the disclaimer paragraph
            content_text = content_text[content_text.find("\n")+1:]
            
        # We can just store the content as a markdown-like structure or HTML.
        # The easiest is to store it as structured sections or just raw paragraphs.
        # Let's structure it simply: intro, body, conclusion, faqs
        
        # Find Introduction
        intro_idx = content_text.find("Introduction")
        conc_idx = content_text.find("Conclusion")
        faq_idx = content_text.find("Frequently Asked Questions")
        
        intro = ""
        body = ""
        conclusion = ""
        faqs = []
        
        if intro_idx != -1 and conc_idx != -1:
            intro_raw = content_text[intro_idx+12:conc_idx].strip()
            # body is everything inside intro_raw except the first paragraph which is the actual intro?
            # Actually, "Introduction" is a header. Then there are other headers.
            # Let's just store the entire body as a list of sections.
            # We'll split by double newline or single newline to get paragraphs.
            pass
            
        # A more robust way to handle the content:
        # Store it as an array of { type: "h2" | "p" | "list", content: ... }
        
        sections = []
        current_section = {"title": "", "content": []}
        
        for line in content_text.split('\n'):
            line = line.strip()
            if not line:
                continue
                
            # If line is short and doesn't end with punctuation, it might be a header.
            # Let's assume headers are lines without periods at the end and < 100 chars
            if len(line) < 100 and not line.endswith('.') and not line.endswith('?') and not line.endswith(':'):
                if current_section["title"] or current_section["content"]:
                    sections.append(current_section)
                current_section = {"title": line, "content": []}
            else:
                current_section["content"].append(line)
                
        if current_section["title"] or current_section["content"]:
            sections.append(current_section)
            
        # Filter out empty sections
        sections = [s for s in sections if s["title"] or s["content"]]
        
        blog_obj = {
            "slug": slug,
            "title": title,
            "read_time": read_time,
            "author": author,
            "category": category,
            "cta": cta,
            "sections": sections
        }
        
        blogs.append(blog_obj)

    print(f"Parsed {len(blogs)} blogs")
    with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
        json.dump(blogs, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    parse_blogs()
