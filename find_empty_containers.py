
import re

with open('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'r') as f:
    content = f.read()

# Find all 'c' containers
containers = re.findall(r'<div className="c (x[0-9a-f]+) (y[0-9a-f]+) [^"]*">(.*?)</div>', content, re.DOTALL)

for x, y, inner in containers:
    if '<input' not in inner and '<MinervaCheckbox' not in inner and 'SignaturePad' not in inner and 'PhotoUpload' not in inner:
        # Clean inner text
        text = re.sub(r'<.*?>', '', inner).strip()
        print(f"Empty container at x: {x}, y: {y}, Text: {text}")
