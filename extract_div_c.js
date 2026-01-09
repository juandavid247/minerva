const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const line79 = lines[78];

const matches = Array.from(line79.matchAll(/<div className=\"(c x[^\"]*)\">([\s\S]*?)<\/div><\/div>/g));
matches.forEach(m => {
    const innerContent = m[2];
    if (!innerContent.includes('MinervaCheckbox')) {
        console.log(`Class: ${m[1]} | Content: ${innerContent}`);
    }
});
