import re
text = """
<WhyItWorkedSection
  title={<>What Makes MR More Than a Gimmick</>}
  items={[
    {
      description: (
        <>
          It’s about <StyledText>contextual intelligence:</StyledText>
          <br />
          <br />
          <ul>
            <li>
              <StyledText>Hands-free, Heads-up Workflows</StyledText> make
              complex tasks intuitive.
            </li>
          </ul>
        </>
      ),
    },
    {
      description: (
        <>
          It’s not VR. VR isolates you; MR integrates digital data into your
          physical workspace, making it ideal for tasks requiring awareness of
          your surroundings.
        </>
      ),
    },
  ]}
/>
"""

why_pattern = r'<(WhyItWorkedSection)([^>]*)items=\{\[([\s\S]*?)\]\}\s*([^>]*)/>'
def why_repl(m):
    comp = m.group(1)
    props = m.group(2)
    items_str = m.group(3)
    trailing_props = m.group(4)
    print("MATCHED ITEMS STR:\n", items_str)
    
    items_res = ""
    item_matches = re.finditer(r'\{\s*(?:title:\s*"([^"]*)",\s*)?description:\s*(?:"([^"]*)"|\(\s*<>([\s\S]*?)</>\s*\))\s*,?\s*\},?', items_str)
    for im in item_matches:
        title = im.group(1)
        desc_str = im.group(2)
        desc_jsx = im.group(3)
        print("MATCHED ITEM:", title, "DESC JSX:", desc_jsx)
        
        title_prop = f' title="{title}"' if title else ""
        
        if desc_str:
            items_res += f'  <WhyItWorkedItem{title_prop} description="{desc_str}" />\n'
        elif desc_jsx:
            items_res += f'  <WhyItWorkedItem{title_prop}>\n{desc_jsx}\n  </WhyItWorkedItem>\n'
            
    return f"<{comp}{props}{trailing_props}>\n{items_res}</{comp}>"

print(re.sub(why_pattern, why_repl, text))
