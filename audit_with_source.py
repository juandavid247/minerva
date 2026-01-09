
import json
import re

def extract_from_jsx(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract inputs with their parent div class
    inputs = re.findall(r'<div className="([^"]+)">[^<]*<div[^>]*>[^<]*<input[^>]+name="([^"]+)"', content)
    
    # Extract checkboxes
    checkboxes = re.findall(r'<MinervaCheckbox[^>]+name="([^"]+)"[^>]+className="([^"]+)"', content)
    checkboxes += re.findall(r'<MinervaCheckbox[^>]+className="([^"]+)"[^>]+name="([^"]+)"', content)
    
    elements = {}
    for cls, name in inputs:
        elements[cls] = {"name": name, "type": "INPUT"}
    for name, cls in checkboxes:
        elements[cls] = {"name": name, "type": "CHECKBOX"}
    return elements

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

source_fields = load_json('/home/juanda/minerva/source_test_fields.json')
jsx_map = extract_from_jsx('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx')

print(f"{'Page':<5} | {'Class':<25} | {'JSX Status':<40}")
print("-" * 80)

missing_count = 0
checkbox_mismatch_count = 0

for field in source_fields:
    cls = field['cls']
    page = field['page']
    
    if cls in jsx_map:
        status = f"OK ({jsx_map[cls]['type']}: {jsx_map[cls]['name']})"
        if jsx_map[cls]['type'] == 'CHECKBOX':
            checkbox_mismatch_count += 1
            status = f"!! CHECKBOX mismatch ({jsx_map[cls]['name']})"
    else:
        status = "MISSING from JSX"
        missing_count += 1
    
    # Only print interesting ones (missing or checkbox mismatch) or every 20th to keep output clean
    if "MISSING" in status or "!!" in status:
        print(f"P{page:<4} | {cls:<25} | {status}")

print(f"\nTotal Source Fields: {len(source_fields)}")
print(f"Missing from JSX: {missing_count}")
print(f"Mapped as Checkbox (expected Input): {checkbox_mismatch_count}")
