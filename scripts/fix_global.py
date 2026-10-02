filepath = 'src/app/(public)/global/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import {\nimport Translate from \"@/components/shared/Translate\";\n  DEFAULT_COUNTRY,", "import Translate from \"@/components/shared/Translate\";\nimport {\n  DEFAULT_COUNTRY,")

with open(filepath, 'w') as f:
    f.write(content)
