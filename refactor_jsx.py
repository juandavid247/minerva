
import json
import re

def refactor_jsx(file_path, mapping_path, output_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    mapping = json.load(open(mapping_path))
    cls_to_field = {m['cls']: m for m in mapping}
    
    # 1. Update State
    names = sorted(list(set(m['name'] for m in mapping)))
    new_state_content = "\n".join([f'    {name}: "",' for name in names])
    content = re.sub(r'const \[formData, setFormData\] = useState\(\{[\s\S]+?\}\);', 
                     f'const [formData, setFormData] = useState({{\n{new_state_content}\n  }});', 
                     content)

    # 2. Replace Checkboxes
    def repl_checkbox(match):
        m = match.group(0)
        name_match = re.search(r'name="([^"]+)"', m)
        cls_match = re.search(r'className="([^"]+)"', m)
        if name_match and cls_match:
            cls = cls_match.group(1)
            f = cls_to_field.get(cls)
            if f:
                return f"""<div className="{f['cls']}">
              <div className="{f['inner_cls']}">
                <input
                  type="text"
                  id="{f['id']}"
                  name="{f['name']}"
                  className="minerva-input"
                  placeholder=""
                  value={{formData.{f['name']}}}
                  onChange={{handleInputChange}}
                />
              </div>
            </div>"""
        return m

    content = re.sub(r'<MinervaCheckbox[\s\S]+?/>', repl_checkbox, content)

    # 3. Update Inputs
    def repl_input_container(match):
        cls = match.group(1)
        f = cls_to_field.get(cls)
        if f:
            return f"""<div className="{f['cls']}">
              <div className="{f['inner_cls']}">
                <input
                  type="text"
                  id="{f['id']}"
                  name="{f['name']}"
                  className="minerva-input"
                  placeholder=""
                  value={{formData.{f['name']}}}
                  onChange={{handleInputChange}}
                />
              </div>
            </div>"""
        return match.group(0)

    content = re.sub(r'<div className="(c [^"]+)">\s*<div[^>]*>\s*<input[\s\S]+?/>\s*</div>\s*</div>', 
                     repl_input_container, content)

    # 4. Insert Missing Field P3 | c xbe y176 w7a h3e
    # It belongs to Page 3.
    target_cls = "c xbe y176 w7a h3e"
    if target_cls not in content:
        f = cls_to_field[target_cls]
        jsx = f"""            <div className="{f['cls']}">
              <div className="{f['inner_cls']}">
                <input
                  type="text"
                  id="{f['id']}"
                  name="{f['name']}"
                  className="minerva-input"
                  placeholder=""
                  value={{formData.{f['name']}}}
                  onChange={{handleInputChange}}
                />
              </div>
            </div>
"""
        # Find Page 3. The current Page 3 has this marker at the end:
        # </div>
        # <div
        #   className="pi"
        #   data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
        # ></div>
        # </div>
        # <div id="pf4"
        
        # We search specifically for the end of pf3.
        # It's at line 3527.
        # Let's try to find the pattern uniquely.
        pattern = r'(data-page-no="3">[\s\S]+?</div>)\s+<div\s+className="pi"'
        match = re.search(pattern, content)
        if match:
            content = content.replace(match.group(1), match.group(1) + "\n" + jsx)

    with open(output_path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    refactor_jsx('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 
                 '/home/juanda/minerva/final_mapping.json', 
                 '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx.new')
