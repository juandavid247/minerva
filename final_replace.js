const fs = require('fs');

const filePath = '/home/juanda/minerva/minerva-app/src/components/MinervaForm.jsx';
const content = fs.readFileSync(filePath, 'utf8');

const replacementsMap = {
    // Page 1
    "c x4c y5c w19 h10": "chk_si_recomienda",
    "c x4f y5d w1c h10": "chk_no_recomienda",
    "c x51 y5e w1d h14": "chk_si_parientes",
    "c x52 y5d w1e h10": "chk_no_parientes",
    "c x32 y67 w27 h10": "chk_si_trabajo_antes",
    "c x57 y67 w28 h10": "chk_no_trabajo_antes",
    "c x45 y68 w28 h10": "chk_si_solicito_antes",
    "c x54 y64 w22 h10": "chk_propia",
    "c x2b y64 w23 h10": "chk_alquilada_p1",
    "c x54 y69 w29 h18": "chk_agencia",
    "c x54 y6a w2a h14": "chk_amigo",
    "c x58 y6c w2b h1b": "chk_otro",

    // Page 2
    "c x32 yfb w1a h32": "chk_tecnico",
    "c x32 y101 w1a h31": "chk_tecnologo",
    "c x32 yf8 w1a h31": "chk_profesional",
    "c x20 y106 w48 h31": "chk_si_sistemas",
    "c x9d y106 w49 h31": "chk_no_sistemas",
    "c x8a y10b w4c h31": "chk_si_idiomas",

    // Page 3
    "c xb0 y161 w51 h32": "chk_si_deporte",
    "c xb1 y161 w52 h32": "chk_no_deporte",
    "c xa3 y164 w64 h32": "chk_si_distinciones",
    "c x80 y164 w56 h48": "chk_no_distinciones",
    "c xb1 y16b w77 h32": "chk_si_asociacion",
    "c xb0 y16b w78 h32": "chk_no_asociacion",
    "c xa0 y174 w71 h32": "chk_eps_si",
    "c xbc y174 w72 h32": "chk_eps_no",
    "c x32 y174 w73 h32": "chk_pension_si",
    "c x3 y174 w74 h32": "chk_pension_no",

    // Page 4
    "c xe2 y1db w8d h31": "chk_seleccionado_si",
    "c xe2 y1dc w8d h31": "chk_seleccionado_no"
};

let newContent = content;
let replacedCount = 0;

Object.entries(replacementsMap).forEach(([cls, name]) => {
    const regexNested = new RegExp('<div className=\"' + cls + '\">[\\s\\S]*?</div></div>', 'g');
    const regexSimple = new RegExp('<div className=\"' + cls + '\">[\\s\\S]*?</div>', 'g');
    const replacement = `<MinervaCheckbox name="${name}" checked={formData.${name}} onChange={handleCheckboxChange} className="${cls}" />`;

    if (newContent.includes(cls) && !newContent.includes(`<MinervaCheckbox name="${name}"`)) {
        if (newContent.match(regexNested)) {
            newContent = newContent.replace(regexNested, replacement);
            console.log(`Replaced (NESTED): ${cls} -> ${name}`);
            replacedCount++;
        } else if (newContent.match(regexSimple)) {
            newContent = newContent.replace(regexSimple, replacement);
            console.log(`Replaced (SIMPLE): ${cls} -> ${name}`);
            replacedCount++;
        }
    }
});

fs.writeFileSync(filePath, newContent);
console.log(`Total replaced: ${replacedCount}`);
