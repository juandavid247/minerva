
import json

def load_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

source_fields = load_json('/home/juanda/minerva/source_test_fields.json')
all_candidates = load_json('/home/juanda/minerva/all_candidates.json')

# Map cls -> item from current all_candidates
current_map = {item['cls']: item for item in all_candidates}

final_mapping = []
source_classes = set()

# Process all source "test" fields
for i, field in enumerate(source_fields):
    cls = field['cls']
    page = field['page']
    source_classes.add(cls)
    
    if cls in current_map:
        item = current_map[cls]
        item['type'] = 'INPUT'  # Ensure it is an input
        if not item['id']:
             item['id'] = f"field_source_{i}" # Should not happen often if we have a good base
        final_mapping.append(item)
    else:
        # New field found in source HTML
        final_mapping.append({
            "page": page,
            "cls": cls,
            "type": "INPUT",
            "id": f"field_new_{i}"
        })

# Also need to decide what to do with fields NOT in source but currently in all_candidates as INPUT
# The user said "todos los que disen test son esos los que son de tipo input"
# This might imply the OTHERS should NOT be inputs (maybe they are just labels that were mis-extracted)

print(f"Total source fields mapped: {len(final_mapping)}")

with open('/home/juanda/minerva/final_audit_mapping.json', 'w') as f:
    json.dump(final_mapping, f, indent=2)
