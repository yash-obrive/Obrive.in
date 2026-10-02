import re

# 1. Update globals.css
with open('src/app/globals.css', 'a') as f:
    f.write("""
/* RTL Button Animation Overrides */
html[dir="rtl"] .btn__icon.--1 {
  transform: translate(250%) translate(2rem) translateY(-50%);
}
html[dir="rtl"] .btn:hover .btn__icon.--1 {
  transform: translate(0.4rem) translateY(-50%);
}

html[dir="rtl"] .btn:hover .btn__icon.--2 {
  transform: translate(-100%) translate(-2rem);
}

html[dir="rtl"] .btn:hover .btn__label {
  transform: translate(-1.5rem) translate(-0.1rem);
}
html[dir="rtl"] .btn.--play:hover .btn__label {
  transform: translate(-2rem);
}
""")

# 2. Update AnimatedButton.tsx
with open('src/components/shared/buttons/AnimatedButton.tsx', 'r') as f:
    content = f.read()

# Replace RightAnimateIcon with rtl reversed version
content = content.replace(
    '<RightAnimateIcon aria-hidden="true" color={arrowColor} />',
    '<RightAnimateIcon aria-hidden="true" color={arrowColor} className="rtl:-scale-x-100" />'
)

# Replace marginLeft with marginInlineStart
content = content.replace(
    'marginLeft: 8,',
    'marginInlineStart: 8,'
)

with open('src/components/shared/buttons/AnimatedButton.tsx', 'w') as f:
    f.write(content)

print("Button fixes applied!")
