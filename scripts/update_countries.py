import re

with open('src/config/countries.ts', 'r') as f:
    content = f.read()

# 1. Update CountryCode type
content = content.replace('| "ae"', '| "uae"\n  | "cn"')

# 2. Update UAE key
content = content.replace('  ae: {\n    code: "ae",', '  uae: {\n    code: "uae",')

# 3. Update UAE default language
content = re.sub(r'(code: "uae",[\s\S]*?)defaultLanguage: "en",\s*supportedLanguages: \["en", "ar"\],', r'\1defaultLanguage: "ar",\n    supportedLanguages: ["ar", "en"],', content)
content = re.sub(r'calendlyUrl:\s*"https://calendly.com/obrive-inc/talk-to-ob-experts\?country=ae",', r'calendlyUrl:\n      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=uae",', content)

# 4. Add China
china_config = """
  cn: {
    code: "cn",
    name: "China",
    flag: "🇨🇳",
    region: "APAC",
    currency: "CNY",
    currencySymbol: "¥",
    phone: "+86 10 8884 4300",
    contactEmail: "apac@obrive.com",
    offices: ["Beijing", "Shanghai", "Shenzhen"],
    calendlyUrl:
      "https://calendly.com/obrive-inc/talk-to-ob-experts?country=cn",
    hreflang: "zh-CN",
    defaultLanguage: "zh",
    supportedLanguages: ["zh", "en"],
    isProductionReady: true,
  },"""
content = content.replace('// --- APAC ---', '// --- APAC ---' + china_config)

# 5. Update US, CA, MX, CH, SG to english only
content = re.sub(r'(code: "us",[\s\S]*?)supportedLanguages: \["en", "es"\],', r'\1supportedLanguages: ["en"],', content)
content = re.sub(r'(code: "ca",[\s\S]*?)supportedLanguages: \["en", "fr"\],', r'\1supportedLanguages: ["en"],', content)
content = re.sub(r'(code: "mx",[\s\S]*?)defaultLanguage: "es",\s*supportedLanguages: \["es", "en"\],', r'\1defaultLanguage: "en",\n    supportedLanguages: ["en"],', content)
content = re.sub(r'(code: "ch",[\s\S]*?)defaultLanguage: "de",\s*supportedLanguages: \["de", "fr", "en"\],', r'\1defaultLanguage: "en",\n    supportedLanguages: ["en"],', content)
content = re.sub(r'(code: "sg",[\s\S]*?)supportedLanguages: \["en", "zh"\],', r'\1supportedLanguages: ["en"],', content)

# 6. Update MY to ms default
content = re.sub(r'(code: "my",[\s\S]*?)defaultLanguage: "en",\s*supportedLanguages: \["en", "ms"\],', r'\1defaultLanguage: "ms",\n    supportedLanguages: ["ms", "en"],', content)


with open('src/config/countries.ts', 'w') as f:
    f.write(content)
