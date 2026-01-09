const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const checkPage = (lineIndex, pageNum) => {
    const line = lines[lineIndex];
    if (!line) return;
    console.log(`--- Page ${pageNum} ---`);
    const matches = Array.from(line.matchAll(/<div className=\"(c x[^\"]*)\">([\s\S]*?)<\/div><\/div>/g));
    matches.forEach(match => {
        const className = match[1];
        const innerContent = match[2];
        if (!innerContent.includes('input') && !innerContent.includes('MinervaCheckbox')) {
            console.log(className);
        }
    });
};

checkPage(78, 1);
checkPage(79, 2);
checkPage(80, 3);
checkPage(81, 4);
