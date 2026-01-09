const fs = require('fs');
const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');

const target = 'c x46 y59 w12 h10';
const index = content.indexOf(target);

if (index !== -1) {
    console.log(`Found "${target}" at index ${index}`);
    console.log(`Surrounding: ${content.substring(index - 20, index + 200)}`);
} else {
    console.log(`"${target}" NOT FOUND`);
}
