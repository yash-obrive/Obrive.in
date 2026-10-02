import os

with open('scripts/translate_missing_all_langs.py', 'r', encoding='utf-8') as f:
    content = f.read()

old_terms = """INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE",
    "Obpark", "OBPARK",
    "Obnest", "OBNEST",
    "Obnavi", "OBNAVI",
    "Obmove", "OBMOVE",
    "Obcrew", "OBCREW",
    "Razorpay", "Brevo",
    "AR", "VR", "MR", "XR",
    "AI", "3D", "API", "SaaS",
    "WebXR", "WebAR", "WebVR",
    "IoT", "SDK", "CRM", "ERP",
    "SEO", "AEO", "GEO",
    "UI", "UX",
    "GST", "B2B", "B2C",
    "ROI", "KPI", "ML",
    "Digital Twin", "Digital Twins",
    "Spatial Computing",
    "Cloud",
    "GitHub", "LinkedIn", "WhatsApp",
    "Vercel",
    "SEO/AEO/GEO", "SaaS / MVP", "Backend & APIs", "Filter:",
    "Obrive.com Bangalore, India", "Start AR", "Start VR", "VR UX",
    "ENTERPRISE XR", ".01", ".03", ".04", ".07", "OBpark FAQ",
    "Automotive Focus", "VR Labs",
]"""

new_terms = """INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE", "Obpark", "OBPARK", "Obnest", "OBNEST", "Obnavi", "OBNAVI", "Obmove", "OBMOVE", "Obcrew", "OBCREW",
    "Razorpay", "Brevo", "Vercel", "GitHub", "LinkedIn", "WhatsApp",
    "AR", "VR", "MR", "XR", "AI", "3D", "API", "SaaS", "WebXR", "WebAR", "WebVR", "IoT", "SDK", "CRM", "ERP", "ML",
    "SEO", "AEO", "GEO", "SEO/AEO/GEO", "UI", "UX", "GST", "B2B", "B2C", "ROI", "KPI",
    "Digital Twin", "Digital Twins", "Spatial Computing", "Cloud",
    ".01", ".03", ".04", ".07"
]"""

if old_terms in content:
    content = content.replace(old_terms, new_terms)
    with open('scripts/translate_missing_all_langs.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated terms successfully.")
else:
    print("Could not find exact old terms. Here is the array in file:")
    os.system("grep -A 20 'INTENTIONAL_ENGLISH_TERMS =' scripts/translate_missing_all_langs.py")
