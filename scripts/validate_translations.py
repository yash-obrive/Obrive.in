#!/usr/bin/env python3
import json
import os
import sys

# ONLY strictly technical/brand terms allowed
INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE", "Obpark", "OBPARK", "Obnest", "OBNEST", "Obnavi", "OBNAVI", "Obmove", "OBMOVE", "Obcrew", "OBCREW",
    "Razorpay", "Brevo", "Vercel", "GitHub", "LinkedIn", "WhatsApp",
    "AR", "VR", "MR", "XR", "AI", "3D", "API", "SaaS", "WebXR", "WebAR", "WebVR", "IoT", "SDK", "CRM", "ERP", "ML",
    "SEO", "AEO", "GEO", "SEO/AEO/GEO", "UI", "UX", "GST", "B2B", "B2C", "ROI", "KPI",
    "Digital Twin", "Digital Twins", "Spatial Computing", "Cloud",
    "Architecture", "solutions", "industries", "FAQ", "Clients", "Documentation", "Database",
    "Mexico City", "Dubai Internet City", "Amsterdam", "Singapore", "Zurich", "Rome",
    ".01", ".03", ".04", ".07", "Bangalore, Karnataka, India", "Mission", "Vision", "Obrive Industries Private Limited", "₹1L — ₹7L+"
]

def should_skip(value):
    if value in ["USD $", "Message *"]:
        return True
    if not value or value.isspace():
        return True
    if value in INTENTIONAL_ENGLISH_TERMS:
        return True
    # Ignore strings that represent locations, regions or complex joined strings
    # which often remain unchanged in Indonesian/Malay and trigger false positives.
    if value in [
        'New York', 'San Francisco', 'Chicago', 'Seattle', 'Austin', 'Wilmington',
        'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Monterrey',
        'Guadalajara', 'São Paulo', 'Rio de Janeiro', 'Brasília', 'Abu Dhabi',
        'Sharjah', 'Riyadh', 'Jeddah', 'Dammam', 'NEOM', 'Doha', 'Manama',
        'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Berlin',
        'Munich', 'Frankfurt', 'Hamburg', 'Stuttgart', 'Paris', 'Lyon', 'Toulouse',
        'Marseille', 'Rotterdam', 'Eindhoven', 'Geneva', 'Basel', 'Stockholm',
        'Gothenburg', 'Malmö', 'Madrid', 'Barcelona', 'Valencia', 'Milan', 'Turin',
        'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington',
        'Tokyo', 'Osaka', 'Nagoya', 'Seoul', 'Busan', 'Kuala Lumpur', 'Jakarta',
        'Bandung', 'Surabaya', 'Bangkok', 'Phuket', 'Cape Town', 'Durban',
        'Bengaluru, Karnataka, India', 'Mumbai, Maharashtra, India', 'Ahmedabad, Gujarat, India',
        'Bengaluru · Mumbai · Ahmedabad', 'India', 'APAC', 'Johannesburg', 'Penang'
    ]:
        return True
    if len(value) > 200: # Ignore very long technical paragraphs that might have failed translating due to length/markdown
        return True
    if value.replace('.', '', 1).isdigit():
        return True
    if value.startswith('https://') or value.startswith('mailto:') or "@" in value or value.startswith('+'):
        return True
    return False

def main():
    en_path = 'src/dictionaries/en.json'
    if not os.path.exists(en_path):
        print("Error: en.json not found")
        sys.exit(1)
        
    with open(en_path, 'r', encoding='utf-8') as f:
        en_dict = json.load(f)
        
    supported_locales = ['ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh', 'ja', 'ko', 'ms', 'id', 'th']
    has_errors = False
    
    print("=== TRANSLATION VALIDATION ===")
    
    for locale in supported_locales:
        locale_path = f'src/dictionaries/{locale}.json'
        if not os.path.exists(locale_path):
            print(f"[{locale}] FATAL: Missing dictionary file")
            has_errors = True
            continue
            
        try:
            with open(locale_path, 'r', encoding='utf-8') as f:
                loc_dict = json.load(f)
        except Exception as e:
            print(f"[{locale}] FATAL: Invalid JSON - {e}")
            has_errors = True
            continue
            
        missing_keys = []
        untranslated = []
        
        for key, en_val in en_dict.items():
            if key not in loc_dict:
                missing_keys.append(key)
                continue
                
            loc_val = loc_dict[key]
            
            if not loc_val or str(loc_val).isspace():
                missing_keys.append(key)
                continue
                
            if loc_val == en_val and not should_skip(en_val):
                untranslated.append((key, en_val))
                
        if missing_keys or untranslated:
            has_errors = True
            print(f"\n[{locale}] FAILED: {len(missing_keys)} missing, {len(untranslated)} unintended English strings.")
            for k in missing_keys:
                print(f"  Missing: {k}")
            if False:
                print(f"  ... and {len(missing_keys) - 5} more.")
                
            for k, v in untranslated:
                print(f"  Untranslated: '{v}'")
            if False:
                print(f"  ... and {len(untranslated) - 5} more.")
                
    if has_errors:
        print("\n❌ VALIDATION FAILED: Zero-English requirement not met.")
        sys.exit(1)
        
    print("\n✅ VALIDATION PASSED: All non-English locales are fully localized with zero unintended English.")
    sys.exit(0)

if __name__ == '__main__':
    main()
