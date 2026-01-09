
import re

file_path = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx'
with open(file_path, 'r') as f:
    content = f.read()

# The missing field
field_jsx = """            <div className="c xbe y176 w7a h3e">
              <div className="t m1 x42 h11 y10c ff8 fse fc3 sc0 ls0 ws0">
                <input
                  type="text"
                  id="field_247"
                  name="field_247"
                  className="minerva-input"
                  placeholder=""
                  value={formData.field_247}
                  onChange={handleInputChange}
                />
              </div>
            </div>
"""

# Find the place after field_165
# Standard block for field_165 ends with:
#               </div>
#             </div>

pattern = r'(name="field_165"[\s\S]+?</div>\s*</div>)'
match = re.search(pattern, content)
if match:
    new_content = content.replace(match.group(1), match.group(1) + "\n" + field_jsx)
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Inserted field_247 after field_165")
else:
    print("Could not find field_165")
