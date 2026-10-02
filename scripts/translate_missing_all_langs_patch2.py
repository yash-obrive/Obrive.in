import re

with open('scripts/translate_missing_all_langs.py', 'r', encoding='utf-8') as f:
    content = f.read()

old_skip = """SKIP_VALUE_RE = [
    re.compile(r"^\\s*$"),
    re.compile(r"^\\d+$"),
    re.compile(r"^https?://\\S+$"),
    re.compile(r"^[a-zA-Z0-9_-]+$"),
]

def should_skip(value: str) -> bool:
    v = value.strip()
    if len(v) <= 1:
        return True
    for pat in SKIP_VALUE_RE:
        if pat.match(v):
            return True
    return False"""

new_skip = """INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE", "Obpark", "OBPARK", "Obnest", "OBNEST", "Obnavi", "OBNAVI", "Obmove", "OBMOVE", "Obcrew", "OBCREW",
    "Razorpay", "Brevo", "Vercel", "GitHub", "LinkedIn", "WhatsApp",
    "AR", "VR", "MR", "XR", "AI", "3D", "API", "SaaS", "WebXR", "WebAR", "WebVR", "IoT", "SDK", "CRM", "ERP", "ML",
    "SEO", "AEO", "GEO", "SEO/AEO/GEO", "UI", "UX", "GST", "B2B", "B2C", "ROI", "KPI",
    "Digital Twin", "Digital Twins", "Spatial Computing", "Cloud",
    ".01", ".03", ".04", ".07"
]

SKIP_VALUE_RE = [
    re.compile(r"^\\s*$"),
    re.compile(r"^\\d+$"),
    re.compile(r"^https?://\\S+$"),
]

def should_skip(value: str) -> bool:
    v = value.strip()
    if len(v) <= 1:
        return True
    if v in INTENTIONAL_ENGLISH_TERMS:
        return True
    for pat in SKIP_VALUE_RE:
        if pat.match(v):
            return True
    return False"""

if old_skip in content:
    content = content.replace(old_skip, new_skip)
    with open('scripts/translate_missing_all_langs.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Could not find old_skip exactly.")
