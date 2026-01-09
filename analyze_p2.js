const fs = require('fs');
const content = fs.readFileSync('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'utf8');
const lines = content.split('\n');
const line80 = lines[79]; // Page 2

const tags = Array.from(line80.matchAll(/<(div|MinervaCheckbox)[^>]*>([\s\S]*?)<\/(div|MinervaCheckbox)>/g));

const targetFields = ['field_94', 'field_100', 'field_102', 'field_113', 'field_116', 'field_119'];

tags.forEach((tag, i) => {
    const fullTag = tag[0];
    const inner = tag[2];

    let match = false;
    targetFields.forEach(f => { if (inner.includes(f)) match = true; });

    if (match) {
        console.log(`\n[BLOCK ${i}] ${fullTag.substring(0, 100)}...`);
        console.log('  --- Nearby Text ---');
        for (let j = i - 15; j <= i + 15; j++) {
            if (j >= 0 && j < tags.length && j !== i) {
                const neighbor = tags[j][0];
                if (neighbor.includes('className="t ')) {
                    const text = tags[j][2].replace(/<[^>]*>/g, '').trim();
                    if (text) console.log(`    [${j - i}] ${text}`);
                }
            }
        }
    }
});
