const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const pages = [78, 79, 80, 81]; // Lines 79, 80, 81, 82 (0-indexed)

pages.forEach((lineIdx, pIdx) => {
    const line = lines[lineIdx];
    if (!line) return;
    console.log(`\n=== PAGE ${pIdx + 1} (Line ${lineIdx + 1}) ===`);
    const divCMatches = Array.from(line.matchAll(/<div className=\"(c x[^\"]*)\">([\s\S]*?)<\/div><\/div>/g));
    divCMatches.forEach(m => {
        const className = m[1];
        const inner = m[2];
        if (inner.includes('MinervaCheckbox')) {
            // console.log(`[ALREADY REPLACED] ${className}`);
            return;
        }

        let type = 'EMPTY?';
        if (inner.includes('input')) {
            const idMatch = inner.match(/id=\"([^\"]*)\"/);
            const nameMatch = inner.match(/name=\"([^\"]*)\"/);
            type = `INPUT (id: ${idMatch ? idMatch[1] : '?'}, name: ${nameMatch ? nameMatch[1] : '?'})`;
        } else if (inner.includes('PhotoUpload')) {
            type = 'PHOTO_UPLOAD';
        } else if (inner.includes('SignaturePad')) {
            type = 'SIGNATURE_PAD';
        }

        console.log(`Class: ${className} | Type: ${type}`);
    });
});
