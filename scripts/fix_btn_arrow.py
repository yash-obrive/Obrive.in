with open('src/components/shared/buttons/AnimatedButton.tsx', 'r') as f:
    content = f.read()

# Revert the tailwind rtl:-scale-x-100 hack
content = content.replace('className="rtl:-scale-x-100"', '')

with open('src/components/shared/buttons/AnimatedButton.tsx', 'w') as f:
    f.write(content)

with open('src/app/globals.css', 'a') as f:
    f.write("""
/* Force SVG flip in RTL for buttons */
html[dir="rtl"] .btn__icon svg {
  transform: scaleX(-1);
}
""")
