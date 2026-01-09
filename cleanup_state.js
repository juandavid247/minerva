const fs = require('fs');

const targetFile = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

const stateStart = 'const [formData, setFormData] = useState({';
const stateEnd = '});';

const startIndex = content.indexOf(stateStart);
const endIndex = content.indexOf(stateEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const stateContent = content.substring(startIndex + stateStart.length, endIndex);
    const lines = stateContent.split('\n');
    const seen = new Set();
    const cleanLines = [];

    for (const line of lines) {
        const match = line.match(/^\s*([a-z_0-9]+):/);
        if (match) {
            const key = match[1];
            if (!seen.has(key)) {
                seen.add(key);
                cleanLines.push(line);
            }
        } else if (line.trim() === '' || line.includes('//')) {
            cleanLines.push(line);
        }
    }

    const newStateContent = cleanLines.join('\n');
    const updatedContent = content.substring(0, startIndex + stateStart.length) + newStateContent + content.substring(endIndex);
    fs.writeFileSync(targetFile, updatedContent);
    console.log('Successfully cleaned up formData duplicates');
}
