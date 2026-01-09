
import json

source_fields = json.load(open('/home/juanda/minerva/source_test_fields.json'))
jsx_elements = {e['cls']: e for e in json.load(open('/home/juanda/minerva/current_jsx_elements.json'))}
all_candidates = {c['cls']: c for c in json.load(open('/home/juanda/minerva/all_candidates.json'))}

final_mapping = []
used_ids = set()
for c in all_candidates.values():
    if c['id'] and c['id'].startswith('field_'):
        used_ids.add(c['id'])

def get_next_field_id():
    n = 0
    while f"field_{n}" in used_ids:
        n += 1
    new_id = f"field_{n}"
    used_ids.add(new_id)
    return new_id

for source in source_fields:
    cls = source['cls']
    page = source['page']
    inner_cls = source['inner_cls']
    
    name = f"field_{cls.replace(' ', '_')}"
    field_id = ""
    
    if cls in jsx_elements:
        name = jsx_elements[cls]['name']
    
    if cls in all_candidates:
        field_id = all_candidates[cls].get('id', "")
    
    if not field_id:
        field_id = get_next_field_id()
    
    if name.startswith('field_c_'):
        name = field_id

    final_mapping.append({
        "page": page,
        "cls": cls,
        "inner_cls": inner_cls,
        "type": "INPUT",
        "id": field_id,
        "name": name
    })

with open('/home/juanda/minerva/final_mapping.json', 'w') as f:
    json.dump(final_mapping, f, indent=2)
