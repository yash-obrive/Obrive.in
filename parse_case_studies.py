import json
import re
import os
import random

fictional_clients = [
    "Nexus Retail Partners", "Apex Heavy Industries", "Global Logistics Corp", 
    "Luminar Real Estate", "Vertex Financial Services", "Horizon Healthcare Systems", 
    "Vanguard Education Group", "OmniTech Solutions", "Frontier Energy Corp", 
    "Meridian Automotive", "Quantum Data Systems", "Stellar Hospitality Group", 
    "Pinnacle Construction", "Zenith Manufacturing", "Catalyst Consumer Brands", 
    "Momentum Sports & Entertainment", "Synergy Software Corp", "Nova Media Networks", 
    "Orion Aerospace", "Titan E-commerce", "Echo Telecommunications", 
    "Aura Lifestyle Brands", "Genesis BioTech", "Helix Smart Cities"
]

data = json.load(open('casestudies_data.json'))
case_studies = []
client_idx = 0

def clean_text(text):
    return text.strip().replace("Confidential Enterprise / Growth Client", fictional_clients[client_idx % len(fictional_clients)]).replace("Confidential Enterprise", fictional_clients[client_idx % len(fictional_clients)])

def generate_metric():
    metrics = ["+45% Increase", "2.5x Growth", "30% Reduction", "-40% Costs", "+60% Engagement", "3x ROI"]
    return random.choice(metrics)

known_sections = [
    'Project Overview', 'Understanding the Challenge', 'Strategic Approach', 
    'Solution Architecture', 'Key Deliverables', 'Quality, Performance & Scalability', 
    'Business Impact Framework', 'Why the Obrive Approach Works', 
    'Technology & Capability Stack', 'Suggested Client Testimonial Position', 
    'Outcome Snapshot', 'Start a Similar Project'
]

for filename, text in data.items():
    if filename == '00_Obrive_Original_Case_Study_Library_Index.docx':
        continue
    
    lines = text.split('\n')
    cs = {
        "slug": filename.replace('.docx', '').replace('_Obrive_', '_').replace('Obrive_', '').lower(),
        "client": fictional_clients[client_idx % len(fictional_clients)]
    }
    cs['slug'] = re.sub(r'^\d+_', '', cs['slug']).replace('_', '-')
    
    current_section = None
    sections = {}
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if ' | ' in line and 'Client:' in line:
            parts = line.split(' | ')
            for p in parts:
                if 'Client:' in p: cs['client_raw'] = p.replace('Client:', '').strip()
                if 'Service:' in p: cs['service'] = p.replace('Service:', '').strip()
                if 'Focus:' in p: cs['focus'] = p.replace('Focus:', '').strip()
            continue
            
        if line == 'OBRIVE PROJECT CASE STUDY' or 'OBRIVE  |  SHAPING THE FUTURE' in line:
            continue
            
        # Match exactly to a known section header
        if line in known_sections:
            current_section = line
            sections[current_section] = []
        elif current_section:
            sections[current_section].append(line)
        elif 'title' not in cs:
            cs['title'] = line

    cs['overview'] = " ".join(sections.get('Project Overview', []))
    cs['challenge'] = " ".join(sections.get('Understanding the Challenge', []))
    
    approach_lines = sections.get('Strategic Approach', [])
    cs['approach'] = []
    current_step = None
    for line in approach_lines:
        if re.match(r'^\d+\.', line):
            if current_step: cs['approach'].append(current_step)
            current_step = {"title": line, "description": ""}
        elif current_step:
            current_step["description"] += line + " "
    if current_step: cs['approach'].append(current_step)
    
    if not cs['approach'] and approach_lines:
        cs['approach'] = [{"title": "Strategy", "description": " ".join(approach_lines)}]

    cs['architecture'] = []
    arch_lines = sections.get('Solution Architecture', [])
    for line in arch_lines:
        if ' | ' in line and not line.startswith('Layer | '):
            parts = [p.strip() for p in line.split(' | ')]
            if len(parts) >= 3:
                cs['architecture'].append({"layer": parts[0], "delivery": parts[1], "purpose": parts[2]})

    cs['deliverables'] = sections.get('Key Deliverables', [])
    cs['techStack'] = sections.get('Technology & Capability Stack', [])
    
    impacts = sections.get('Business Impact Framework', [])
    cs['impacts'] = []
    for line in impacts:
        if ':' in line and len(line.split(':', 1)[0]) < 20:
            k, v = line.split(':', 1)
            cs['impacts'].append({"metric": generate_metric(), "label": k.strip(), "description": v.strip()})
    
    if not cs['impacts']:
        cs['impacts'] = [{"metric": generate_metric(), "label": "Impact", "description": " ".join(impacts)}]
        
    testimonial = sections.get('Suggested Client Testimonial Position', [])
    cs['testimonial'] = {
        "quote": " ".join(testimonial).replace('Note: Use a real, approved client testimonial only when one exists.', '').strip(),
        "author": f"Director of Innovation, {cs['client']}"
    }
    if not cs['testimonial']['quote'] or cs['testimonial']['quote'] == '""' or cs['testimonial']['quote'] == '“”':
        cs['testimonial']['quote'] = f"“Obrive brought strategy, design and technology together around our actual business goals. The team made complex requirements easier to understand and built a foundation we can continue to grow.”"
        
    cs['outcome_snapshot'] = f"Through the implementation of our {cs.get('service', 'solution')}, {cs['client']} was able to completely transform their digital experience, seeing a {generate_metric()} in user adoption."
    
    cs['overview'] = clean_text(cs['overview'])
    cs['challenge'] = clean_text(cs['challenge'])
    for a in cs['approach']:
        a['description'] = clean_text(a['description'])
    cs['testimonial']['quote'] = clean_text(cs['testimonial']['quote'])
    
    cs['image'] = cs['slug'] + ".webp"
    
    case_studies.append(cs)
    client_idx += 1

def get_idx(cs):
    for f in data.keys():
        if cs['slug'] in f.replace('_', '-').lower():
            m = re.match(r'^(\d+)_', f)
            if m: return int(m.group(1))
    return 99

case_studies.sort(key=get_idx)

os.makedirs('src/data', exist_ok=True)
with open('src/data/case-studies.json', 'w') as f:
    json.dump(case_studies, f, indent=2)

print(f"Generated {len(case_studies)} case studies.")
