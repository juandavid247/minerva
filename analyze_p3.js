const fs = require('fs');
const content = fs.readFileSync('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'utf8');
const lines = content.split('\n');
const line81 = lines[80]; // Page 3

const tags = Array.from(line81.matchAll(/<(div|MinervaCheckbox)[^>]*>([\s\S]*?)<\/(div|MinervaCheckbox)>/g));

tags.forEach((tag, i) => {
    const fullTag = tag[0];
    const inner = tag[2];

    if (fullTag.includes('className="c ') || fullTag.includes('MinervaCheckbox')) {
        console.log(`\n[BLOCK ${i}] ${fullTag.substring(0, 100)}...`);
        console.log('  --- Nearby Text ---');
        for (let j = i - 8; j <= i + 8; j++) {
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
