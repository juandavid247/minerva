const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const line79 = lines[78]; // Page 1

// Extract all tags in order
const tags = Array.from(line79.matchAll(/<(div|MinervaCheckbox)[^>]*>([\s\S]*?)<\/(div|MinervaCheckbox)>/g));

tags.forEach((tag, i) => {
    const fullTag = tag[0];
    const inner = tag[2];

    if (fullTag.includes('className="c ') || fullTag.includes('MinervaCheckbox')) {
        // Find previous and next few text tags
        console.log(`\n[BLOCK ${i}] ${fullTag.substring(0, 100)}...`);
        if (inner.includes('input')) {
            const id = inner.match(/field_[0-9]+/);
            console.log(`  (Contains input: ${id ? id[0] : '?'})`);
        }

        console.log('  --- Nearby Text ---');
        // Search -5 to +5 neighbors
        for (let j = i - 5; j <= i + 5; j++) {
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
