import re

files_to_update = {
    'src/app/(public)/checkout/components/CheckoutForm.tsx': 'export default function CheckoutForm() {',
    'src/app/(public)/contact/components/ContactForm.tsx': 'export default function ContactForm() {',
    'src/app/(public)/site-map/components/DirectorySearch.tsx': 'export default function DirectorySearch({ categories }: DirectorySearchProps) {',
    'src/components/pages/apply/Details.tsx': 'export function Details({ formData, setFormData, onNext }: DetailsProps) {'
}

placeholder_pattern = re.compile(r'placeholder="([^"]+)"')

for file_path, sig in files_to_update.items():
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'useTranslation' not in content:
            content = 'import { useTranslation } from "@/context/TranslationContext";\n' + content
            
        # Add dict initialization
        dict_init = sig + '\n  const { dictionary } = useTranslation();\n  const dict = dictionary as Record<string, string>;'
        content = content.replace(sig, dict_init)
        
        # Replace placeholders
        def repl(match):
            val = match.group(1)
            if val == 'blur':
                return match.group(0)
            escaped = val.replace('"', '\\"')
            return f'placeholder={{dict["{escaped}"] || "{escaped}"}}'
            
        content = placeholder_pattern.sub(repl, content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    except Exception as e:
        print(f"Failed {file_path}: {e}")
