import json
import os
import sys

# Removed regular words like "Start AR", "VR Labs", "Filter:", "Capabilities", "How it Works"
INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE", "Obpark", "OBPARK", "Obnest", "OBNEST", "Obnavi", "OBNAVI", "Obmove", "OBMOVE", "Obcrew", "OBCREW",
    "Razorpay", "Brevo", "Vercel", "GitHub", "LinkedIn", "WhatsApp",
    "AR", "VR", "MR", "XR", "AI", "3D", "API", "SaaS", "WebXR", "WebAR", "WebVR", "IoT", "SDK", "CRM", "ERP", "ML",
    "SEO", "AEO", "GEO", "SEO/AEO/GEO", "UI", "UX", "GST", "B2B", "B2C", "ROI", "KPI",
    "Digital Twin", "Digital Twins", "Spatial Computing", "Cloud",
    ".01", ".03", ".04", ".07"
]

def should_skip(value):
    if not value or value.isspace():
        return True
    if value in INTENTIONAL_ENGLISH_TERMS:
        return True
    if value.replace('.', '', 1).isdigit():
        return True
    # Single tokens that might be acronyms
    if len(value.split()) == 1 and value.isupper() and len(value) <= 5:
        return True
    if value.startswith('https://') or value.startswith('mailto:'):
        return True
    return False

def main():
    en_path = 'src/dictionaries/en.json'
    with open(en_path, 'r', encoding='utf-8') as f:
        en_dict = json.load(f)
    
    total_en_keys = len(en_dict)
    
    supported_locales = ['ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh', 'ja', 'ko', 'ms', 'id', 'th']
    
    for locale in supported_locales:
        locale_path = f'src/dictionaries/{locale}.json'
        if not os.path.exists(locale_path):
            print(f"Missing {locale}.json")
            sys.exit(1)
            
        with open(locale_path, 'r', encoding='utf-8') as f:
            loc_dict = json.load(f)
            
        missing_keys = []
        untranslated = []
        
        for key, en_val in en_dict.items():
            if key not in loc_dict:
                missing_keys.append(key)
                continue
                
            loc_val = loc_dict[key]
            
            if not loc_val:
                missing_keys.append(key)
                continue
                
            if loc_val == en_val and not should_skip(en_val):
                untranslated.append((key, en_val))
                
        print(f"\n--- {locale.upper()} ---")
        print(f"Total keys expected: {total_en_keys}")
        print(f"Missing keys: {len(missing_keys)}")
        print(f"Untranslated exact match: {len(untranslated)}")
        
        if missing_keys or untranslated:
            print("FAILED VALIDATION")
            sys.exit(1)
            
    print("ALL LOCALES PASSED VALIDATION")

if __name__ == '__main__':
    main()
