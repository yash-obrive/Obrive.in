import re

with open('scripts/validate_translations.py', 'r') as f:
    content = f.read()

content = content.replace(
    '        "Bangalore, Karnataka, India", "Mission", "Vision", "Obrive Industries Private Limited", "₹1L — ₹7L+", "USD $"',
    '        "Bangalore, Karnataka, India", "Mission", "Vision", "Obrive Industries Private Limited", "₹1L — ₹7L+", "USD $", "Message *"'
)

with open('scripts/validate_translations.py', 'w') as f:
    f.write(content)
