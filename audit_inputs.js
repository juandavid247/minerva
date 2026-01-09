const fs = require('fs');
const content = fs.readFileSync('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'utf8');

const regex = /<input type="text" id="(field_\d+)" name="(field_\d+)" className="minerva-input" placeholder="" \/>/g;
let match;
const fields = [];

while ((match = regex.exec(content))) {
    const fieldId = match[1];
    const startIndex = Math.max(0, match.index - 250);
    const endIndex = Math.min(content.length, match.index + match[0].length + 250);
    const context = content.substring(startIndex, endIndex).replace(/[\r\n]+/g, ' ');
    fields.push({ id: fieldId, context });
}

console.log(JSON.stringify(fields, null, 2));
