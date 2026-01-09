
import json
import re

def extract_from_jsx(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract inputs with their parent div class
    # Example: <div className="c x3 y4e w2 h10"><div ...><input ... name="field_name" ... /></div></div>
    # Actually, it's <div className="c x..."><div ...><input name="..." ... /></div></div>
    inputs = re.findall(r'<div className="([^"]+)">[^<]*<div[^>]*>[^<]*<input[^>]+name="([^"]+)"', content)
    
    # Extract checkboxes
    # Example: <MinervaCheckbox name="chk_cedula_ciudadania" ... className="c x46 y59 w12 h10" />
    checkboxes = re.findall(r'<MinervaCheckbox[^>]+name="([^"]+)"[^>]+className="([^"]+)"', content)
    # Also some might have name after className
    checkboxes += re.findall(r'<MinervaCheckbox[^>]+className="([^"]+)"[^>]+name="([^"]+)"', content)
    
    jsx_elements = []
    for cls, name in inputs:
        jsx_elements.append({
            "name": name,
            "cls": cls,
            "type": "INPUT"
        })
    for name, cls in checkboxes:
        jsx_elements.append({
            "name": name,
            "cls": cls,
            "type": "CHECKBOX"
        })
    return jsx_elements

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

jsx_elements = extract_from_jsx('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx')
json_elements = load_json('/home/juanda/minerva/all_candidates.json')

# Create a map of cls -> id from JSON
json_map = {item['cls']: item['id'] for item in json_elements if item['cls']}

print(f"{'Name':<40} | {'Class':<20} | {'JSON ID':<10} | {'Type'}")
print("-" * 80)

for elem in jsx_elements:
    json_id = json_map.get(elem['cls'], "MISSING")
    print(f"{elem['name']:<40} | {elem['cls']:<20} | {json_id:<10} | {elem['type']}")

# Find inputs in JSON missing from JSX
jsx_names = {elem['name'] for elem in jsx_elements}
jsx_classes = {elem['cls'] for elem in jsx_elements}

print("\n--- JSON Fields missing from JSX ---")
for item in json_elements:
    if item['cls'] not in jsx_classes and item['type'] == 'INPUT':
        print(f"ID: {item['id']}, Class: {item['cls']}")
