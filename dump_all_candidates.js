const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const results = [];

[79, 80, 81, 82].forEach((lineNo) => {
    const line = lines[lineNo - 1];
    if (!line) return;
    const pageNo = lineNo - 78;

    // Find all div.c
    const divCs = Array.from(line.matchAll(/<div className=\"(c x[^\"]*)\">([\s\S]*?)<\/div><\/div>/g));
    divCs.forEach(m => {
        const cls = m[1];
        const inner = m[2];
        let type = 'EMPTY';
        let id = '';
        if (inner.includes('input')) {
            const idMatch = inner.match(/field_[0-9]+/);
            id = idMatch ? idMatch[0] : 'unknown';
            type = 'INPUT';
        } else if (inner.includes('MinervaCheckbox')) {
            type = 'ALREADY_REPLACED';
        }

        results.push({ page: pageNo, cls, type, id });
    });
});

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('/home/juanda/minerva/all_candidates.json', JSON.stringify(results, null, 2));
