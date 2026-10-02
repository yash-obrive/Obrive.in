import glob

files = glob.glob('src/content/*/resources/future-augmented-reality-business-trends-2025.mdx')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if '<ApproachPhaseItem phase="1.' in line:
            # The previous non-empty line needs ">"
            prev = i - 1
            while prev >= 0 and not lines[prev].strip():
                prev -= 1
            if prev >= 0 and 'ResourceObrivesApproachTable' not in lines[prev]:
                if not lines[prev].strip().endswith('">'):
                    lines[prev] = lines[prev].rstrip() + '">\n'
            elif prev >= 0 and 'ResourceObrivesApproachTable' in lines[prev]:
                if not lines[prev].strip().endswith('">'):
                    lines[prev] = lines[prev].rstrip() + '">\n'
            
            break
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
        
print("Fixed.")
