
import re

def extract_current_jsx(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract inputs
    # Looking for: <div className="([^"]+)"><div ...><input ... name="([^"]+)" ... /></div></div>
    # Or variations
    inputs = re.findall(r'<div className="([^"]+)">[^<]*<div[^>]*>[^<]*<input[^>]+name="([^"]+)"', content)
    
    # Extract checkboxes
    checkboxes = re.findall(r'<MinervaCheckbox[^>]+name="([^"]+)"[^>]+className="([^"]+)"', content)
    checkboxes += re.findall(r'<MinervaCheckbox[^>]+className="([^"]+)"[^>]+name="([^"]+)"', content)
    
    results = []
    for cls, name in inputs:
        results.append({"name": name, "cls": cls, "type": "INPUT"})
    for name, cls in checkboxes:
        results.append({"name": name, "cls": cls, "type": "CHECKBOX"})
        
    return results

if __name__ == "__main__":
    elements = extract_current_jsx('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx')
    import json
    with open('/home/juanda/minerva/current_jsx_elements.json', 'w') as f:
        json.dump(elements, f, indent=2)
    print(f"Extracted {len(elements)} elements from JSX")
