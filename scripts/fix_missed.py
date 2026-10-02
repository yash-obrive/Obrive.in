import re

def replace_with_translate(filepath, pattern, translation_key):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We replace the matched text with `<Translate text="translation_key" />`
    # The pattern should capture surrounding spaces if we don't want to lose indentation,
    # but it's easier to just match the text block and replace it.
    new_content = re.sub(pattern, f'<Translate text="{translation_key}" />', content)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

# 1. PricingSection.tsx
replace_with_translate(
    'src/app/(public)/servicecharges/components/PricingSection.tsx',
    r'USD \$',
    'USD $'
)

# 2. PricingHero.tsx
replace_with_translate(
    'src/app/(public)/servicecharges/components/PricingHero.tsx',
    r'Premium fixed packages for defined scopes\.\s*Enterprise,\s*multi-platform and high-complexity projects move to a custom\s*SOW\.',
    'Premium fixed packages for defined scopes. Enterprise, multi-platform and high-complexity projects move to a custom SOW.'
)

# 3. ContactForm.tsx
replace_with_translate(
    'src/app/(public)/contact/components/ContactForm.tsx',
    r'Full Name \*',
    'Full Name *'
)
replace_with_translate(
    'src/app/(public)/contact/components/ContactForm.tsx',
    r'Email Address \*',
    'Email Address *'
)
replace_with_translate(
    'src/app/(public)/contact/components/ContactForm.tsx',
    r'Service of Interest \*',
    'Service of Interest *'
)
replace_with_translate(
    'src/app/(public)/contact/components/ContactForm.tsx',
    r'Message \*',
    'Message *'
)

# 4. global/page.tsx
replace_with_translate(
    'src/app/(public)/global/page.tsx',
    r"If you're passionate about immersive technology you're in the\s*right place\.",
    "If you're passionate about immersive technology you're in the right place."
)
replace_with_translate(
    'src/app/(public)/global/page.tsx',
    r"Find the right solution, product, industry application, technology\s*resource or support page\. Obrive connects AR, VR, MR, 3D Design and\s*Spatial Computing to real-world business experiences\.",
    "Find the right solution, product, industry application, technology resource or support page. Obrive connects AR, VR, MR, 3D Design and Spatial Computing to real-world business experiences."
)

