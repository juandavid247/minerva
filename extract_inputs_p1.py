
import re

with open('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'r') as f:
    content = f.read()

# Find page 1 content
page1_match = re.search(r'<div id="pf1".*?</div>\s*</div>', content, re.DOTALL)
if page1_match:
    page1_html = page1_match.group(0)
    # Find all inputs
    inputs = re.findall(r'<input.*?>', page1_html)
    for inp in inputs:
        print(inp)
else:
    print("Page 1 not found")
