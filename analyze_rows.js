const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const line79 = lines[78];

const matches = Array.from(line79.matchAll(/<div className=\"(c x[^\"]*)\">([\s\S]*?)<\/div><\/div>/g));
const rows = {};

matches.forEach(m => {
    const className = m[1];
    const innerContent = m[2];
    if (innerContent.includes('MinervaCheckbox')) return;

    const yMatch = className.match(/y([0-9a-f]+)/);
    if (yMatch) {
        const y = yMatch[1];
        if (!rows[y]) rows[y] = [];
        rows[y].push({ class: className, content: innerContent });
    }
});

Object.keys(rows).sort().forEach(y => {
    console.log(`--- Row y${y} ---`);
    rows[y].forEach(box => {
        console.log(`  Class: ${box.class} | Content length: ${box.content.length}`);
        if (box.content.includes('input')) {
            const inputMatch = box.content.match(/field_([0-9]+)/);
            if (inputMatch) console.log(`    (Text Input: field_${inputMatch[1]})`);
        } else {
            console.log(`    (Empty/Checkbox candidate)`);
        }
    });
});
