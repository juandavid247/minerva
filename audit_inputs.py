
import re

with open('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'r') as f:
    content = f.read()

# Extract all text labels and their positions
labels = re.findall(r'<div className="t [^"]* (x[0-9a-f]+) [^"]* (y[0-9a-f]+) [^"]*">(.*?)</div>', content)
print("--- LABELS ---")
for x, y, text in labels:
    # Clean up HTML tags in text
    text = re.sub(r'<.*?>', '', text)
    if any(k in text for k in ["Distrito", "militar", "Expedida", "Nº", "Cedula", "Extranjería"]):
        print(f"Label: {text}, x: {x}, y: {y}")

# Extract all inputs and their positions
inputs = re.findall(r'<div className="c (x[0-9a-f]+) (y[0-9a-f]+) [^"]*">.*?<input[^>]+name="([^"]+)"', content, re.DOTALL)
print("\n--- INPUTS ---")
for x, y, name in inputs:
    print(f"Input: {name}, x: {x}, y: {y}")

# Extract all checkboxes and their positions
checkboxes = re.findall(r'<MinervaCheckbox name="([^"]+)"[^>]*className="c (x[0-9a-f]+) (y[0-9a-f]+)', content)
print("\n--- CHECKBOXES ---")
for name, x, y in checkboxes:
    print(f"Checkbox: {name}, x: {x}, y: {y}")
