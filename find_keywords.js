const fs = require('fs');
const content = fs.readFileSync('/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx', 'utf8');
const lines = content.split('\n');
const keywords = ['Si', 'No', 'Técnico', 'Tecnólogo', 'Profesional', 'Propia', 'Familiar', 'Alquilada', 'EPS', 'Pensiones', 'Cesantías'];

for (let i = 78; i <= 81; i++) {
    const line = lines[i];
    if (!line) continue;
    console.log(`--- LINE ${i + 1} ---`);
    keywords.forEach(k => {
        let pos = 0;
        while ((pos = line.indexOf(k, pos)) !== -1) {
            console.log(`Found '${k}' at ${pos}: ${line.substring(Math.max(0, pos - 40), Math.min(line.length, pos + 40))}`);
            pos += k.length;
        }
    });
}
