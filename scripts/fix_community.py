import os

filepath = 'src/app/(public)/coming-soon/community-form/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace(
    "We're creating a vibrant community platform to connect users, share\n          ideas, and collaborate on projects. Stay tuned for updates and early\n          access opportunities!",
    '<Translate text="We\'re creating a vibrant community platform to connect users, share ideas, and collaborate on projects. Stay tuned for updates and early access opportunities!" />'
)

if 'import Translate' not in content:
    content = 'import Translate from "@/components/shared/Translate";\n' + content

with open(filepath, 'w') as f:
    f.write(content)
