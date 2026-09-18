import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
        
    original = content
    
    # 1. Replace content={( <> ... </> )}
    sections = [
        "ChallengeSection", "CompanyOverviewSection", "StrategicApproachSection", "WhyItWorkedSection", "OutcomeSnapshotSection", "FAQAccordionSection",
        "ResourceChallengeSection", "ResourceCompanyOverviewSection", "ResourceStrategicApproachSection", "ResourceWhyItWorkedSection", "ResourceOutcomeSnapshotSection"
    ]
    
    for sec in sections:
        pattern = r'<(' + sec + r')([\s\S]*?)content=\{\(?[\s]*<>([\s\S]*?)</>[\s]*\)?\}\s*([\s\S]*?)/>'
        
        def content_repl(m):
            comp = m.group(1)
            props = m.group(2)
            inner = m.group(3)
            trailing_props = m.group(4)
            return f"<{comp}{props}{trailing_props}>\n{inner}\n</{comp}>"
            
        content = re.sub(pattern, content_repl, content)

    # 2. Replace FAQAccordionSection items={[ ... ]}
    faq_pattern = r'<((?:Resource)?FAQAccordionSection)([\s\S]*?)items=\{\[([\s\S]*?)\]\}\s*([\s\S]*?)/>'
    def faq_repl(m):
        comp = m.group(1)
        props = m.group(2)
        items_str = m.group(3)
        trailing_props = m.group(4)
        
        # parse items_str
        items_res = ""
        item_matches = re.finditer(r'\{\s*question:\s*"([^"]*)",\s*answer:\s*(?:"([^"]*)"|\(\s*<>([\s\S]*?)</>\s*\))\s*,?\s*\},?', items_str)
        for im in item_matches:
            q = im.group(1)
            a_str = im.group(2)
            a_jsx = im.group(3)
            if a_str:
                items_res += f'  <FAQItem question="{q}" answer="{a_str}" />\n'
            elif a_jsx:
                items_res += f'  <FAQItem question="{q}" answer={{<>{a_jsx}</>}} />\n'
                
        return f"<{comp}{props}{trailing_props}>\n{items_res}</{comp}>"
    content = re.sub(faq_pattern, faq_repl, content)

    # 3. Replace ObrivesApproachTable phases={[ ... ]}
    phase_pattern = r'<((?:Resource)?ObrivesApproachTable)([\s\S]*?)phases=\{\[([\s\S]*?)\]\}\s*([\s\S]*?)/>'
    def phase_repl(m):
        comp = m.group(1)
        props = m.group(2)
        phases_str = m.group(3)
        trailing_props = m.group(4)
        
        phases_res = ""
        phase_matches = re.finditer(r'\{\s*phase:\s*"([^"]*)",\s*action:\s*(?:"([^"]*)"|\(\s*<>([\s\S]*?)</>\s*\))\s*,?\s*\},?', phases_str)
        for pm in phase_matches:
            p = pm.group(1)
            a_str = pm.group(2)
            a_jsx = pm.group(3)
            if a_str:
                phases_res += f'  <Phase phase="{p}" action="{a_str}" />\n'
            elif a_jsx:
                phases_res += f'  <Phase phase="{p}" action={{<>{a_jsx}</>}} />\n'
            
        return f"<{comp}{props}{trailing_props}>\n{phases_res}</{comp}>"
    content = re.sub(phase_pattern, phase_repl, content)

    # 4. Replace TheImpactTable metrics={[ ... ]}
    metric_pattern = r'<((?:Resource)?TheImpactTable)([\s\S]*?)metrics=\{\[([\s\S]*?)\]\}\s*([\s\S]*?)/>'
    def metric_repl(m):
        comp = m.group(1)
        props = m.group(2)
        metrics_str = m.group(3)
        trailing_props = m.group(4)
        
        metrics_res = ""
        metric_matches = re.finditer(r'\{\s*metric:\s*"([^"]*)",\s*beforeObrive:\s*"([^"]*)",\s*afterObrive:\s*"([^"]*)"\s*,?\s*\},?', metrics_str)
        for mm in metric_matches:
            m1 = mm.group(1)
            b = mm.group(2)
            a = mm.group(3)
            metrics_res += f'  <Metric metric="{m1}" beforeObrive="{b}" afterObrive="{a}" />\n'
            
        return f"<{comp}{props}{trailing_props}>\n{metrics_res}</{comp}>"
    content = re.sub(metric_pattern, metric_repl, content)
    
    # 5. Replace WhyItWorkedSection items={[ ... ]}
    why_pattern = r'<((?:Resource)?WhyItWorkedSection)([\s\S]*?)items=\{\[([\s\S]*?)\]\}\s*([\s\S]*?)/>'
    def why_repl(m):
        comp = m.group(1)
        props = m.group(2)
        items_str = m.group(3)
        trailing_props = m.group(4)
        
        items_res = ""
        # match optional title and description
        item_matches = re.finditer(r'\{\s*(?:title:\s*"([^"]*)",\s*)?description:\s*(?:"([^"]*)"|\(\s*<>([\s\S]*?)</>\s*\))\s*,?\s*\},?', items_str)
        for im in item_matches:
            title = im.group(1)
            desc_str = im.group(2)
            desc_jsx = im.group(3)
            
            title_prop = f' title="{title}"' if title else ""
            
            if desc_str:
                items_res += f'  <WhyItWorkedItem{title_prop} description="{desc_str}" />\n'
            elif desc_jsx:
                items_res += f'  <WhyItWorkedItem{title_prop}>\n{desc_jsx}\n  </WhyItWorkedItem>\n'
                
        return f"<{comp}{props}{trailing_props}>\n{items_res}</{comp}>"
        
    content = re.sub(why_pattern, why_repl, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Refactored {filepath}")


for d in ['src/content/faq', 'src/content/resources']:
    for filepath in glob.glob(f"{d}/*.mdx"):
        process_file(filepath)

print("Done.")
