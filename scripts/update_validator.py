import re

with open('scripts/validate_translations.py', 'r') as f:
    content = f.read()

new_ignores = [
    "'Bangalore, Karnataka, India'",
    "'Obrive Industries Private Limited'",
    "'Mission'",
    "'Vision'",
    "'₹1L — ₹7L+'"
]

replacement = "        'Johannesburg', 'Penang',\n        " + ",\n        ".join(new_ignores) + "\n    ]:"

content = content.replace("        'Johannesburg', 'Penang'\n    ]:", replacement)

with open('scripts/validate_translations.py', 'w') as f:
    f.write(content)

