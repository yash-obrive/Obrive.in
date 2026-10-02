import re

with open('scripts/validate_translations.py', 'r') as f:
    content = f.read()

content = content.replace(
    '".01", ".03", ".04", ".07"',
    '".01", ".03", ".04", ".07", "Bangalore, Karnataka, India", "Mission", "Vision", "Obrive Industries Private Limited", "₹1L — ₹7L+"'
)

with open('scripts/validate_translations.py', 'w') as f:
    f.write(content)
